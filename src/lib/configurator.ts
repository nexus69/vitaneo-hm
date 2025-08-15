import type { Activity, DayIndex, Schedule, Slot } from "@/types";
import { DAYS_FR, addDays, mondayOfCurrentWeek } from "@/lib/formatting";
export const EMPTY_WEEK: Schedule = {
  0: { AM: { activityId: null }, PM: { activityId: null }, EV: { activityId: null } },
  1: { AM: { activityId: null }, PM: { activityId: null }, EV: { activityId: null } },
  2: { AM: { activityId: null }, PM: { activityId: null }, EV: { activityId: null } },
  3: { AM: { activityId: null }, PM: { activityId: null }, EV: { activityId: null } },
  4: { AM: { activityId: null }, PM: { activityId: null }, EV: { activityId: null } },
  5: { AM: { activityId: null }, PM: { activityId: null }, EV: { activityId: null } },
  6: { AM: { activityId: null }, PM: { activityId: null }, EV: { activityId: null } }
};
export function cloneWeek(w: Schedule): Schedule { return JSON.parse(JSON.stringify(w)) as Schedule; }
export function canPlace(week: Schedule, day: DayIndex, slot: Slot, activity: Activity): { ok: boolean; reason?: string } {
  if (week[day][slot].activityId) return { ok: false, reason: "Ce créneau est déjà occupé." };
  const pmId = week[day].PM.activityId;
  const evId = week[day].EV.activityId;
  const isPmOffSite = (actId?: string | null) => actId && actId.length > 0 && offSite(actId);
  if (slot === "PM" && activity.location === "off-site" && evId) return { ok: false, reason: "Une activité hors-site l’après-midi bloque la soirée (EV)." };
  if (slot === "EV" && isPmOffSite(pmId)) return { ok: false, reason: "La soirée est bloquée car l’après-midi est hors-site." };
  return { ok: true };
}
let ACTIVITY_INDEX: Record<string, Activity> = {};
export function setActivityIndex(list: Activity[]) { ACTIVITY_INDEX = Object.fromEntries(list.map(a => [a.id, a])); }
function offSite(id: string) { return ACTIVITY_INDEX[id]?.location === "off-site"; }
export function dailyLoad(week: Schedule, day: DayIndex) {
  const cells = week[day];
  return (cells.AM.activityId ? 1 : 0) + (cells.PM.activityId ? 1 : 0) + (cells.EV.activityId ? 1 : 0);
}
export function warnings(week: Schedule): string[] {
  let fullDays = 0;
  for (let d = 0 as DayIndex; d <= 6; d = (d + 1) as DayIndex) { if (dailyLoad(week, d) === 3) fullDays++; }
  return fullDays >= 5 ? ["Charge élevée détectée (≥ 3 activités par jour sur 5 jours ou plus). Envisagez une journée plus légère."] : [];
}
export type Preset = "Zen" | "Tonus" | "Élan";
export function applyPreset(base: Schedule, preset: Preset, activities: Activity[]): Schedule {
  const week = cloneWeek(base);
  const picks = pickActivitiesForPreset(activities, preset);
  const activeDays = preset === "Élan" ? 5 : 7;
  for (let d = 0 as DayIndex; d < activeDays; d = (d + 1) as DayIndex) {
    const dayActs = picks.nextDay();
    for (const [slot, act] of dayActs) {
      if (canPlace(week, d, slot, act).ok) week[d][slot].activityId = act.id;
      if (slot === "PM" && act.location === "off-site") { week[d].EV.activityId = week[d].EV.activityId ?? null; }
    }
  }
  return week;
}
function pickActivitiesForPreset(activities: Activity[], preset: Preset) {
  const byIntensity = (i: Activity["intensity"]) => activities.filter(a => a.intensity === i);
  const poolAM = [...byIntensity("Zen"), ...byIntensity("Tonus")].filter(a => a.slotHints.includes("AM"));
  const poolPM = [...byIntensity(preset === "Zen" ? "Zen" : "Tonus"), ...byIntensity("Élan")].filter(a => a.slotHints.includes("PM"));
  const poolEV = activities.filter(a => a.slotHints.includes("EV"));
  let am = 0, pm = 0, ev = 0;
  const take = (arr: Activity[], i: number) => arr[arr.length ? i % arr.length : i];
  return {
    nextDay(): [ [Slot, Activity], ...Array<[Slot, Activity]>() ] {
      if (preset === "Zen") return [["AM", take(poolAM, am++)]] as any;
      if (preset === "Tonus") return [["AM", take(poolAM, am++)], ["PM", take(poolPM, pm++)]] as any;
      return [["AM", take(poolAM, am++)], ["PM", take(poolPM, pm++)], ["EV", take(poolEV, ev++)]] as any;
    }
  };
}
export function weekToCsv(week: Schedule, activities: Activity[], start?: string) {
  const startDate = start ? new Date(start) : mondayOfCurrentWeek();
  const idx = Object.fromEntries(activities.map(a => [a.id, a]));
  const rows = ["date_iso,jour,slot,activity_id,title,category,intensity,duration_min,location,surcharge_eur"];
  (Object.keys(week) as unknown as DayIndex[]).forEach((d) => {
    (["AM","PM","EV"] as Slot[]).forEach((slot) => {
      const id = week[d][slot].activityId; if (!id) return;
      const a = idx[id]; const date = addDays(startDate, d).toISOString().slice(0,10); const jour = DAYS_FR[d];
      rows.push([date, jour, slot, a.id, csvSafe(a.title), a.category, a.intensity, a.duration_min, a.location, a.surcharge_eur ?? ""].join(","));
    });
  });
  return rows.join("\n");
}
function csvSafe(s: string) { if (s.includes(",") || s.includes('"')) return `"${s.replace(/"/g,'""')}"`; return s; }
