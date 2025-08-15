import type { Activity, DayIndex, Schedule, Slot } from "@/types";
import { DAYS_FR, addDays, mondayOfCurrentWeek } from "@/lib/formatting";

// Semaine vide (7 j × 3 slots)
export const EMPTY_WEEK: Schedule = {
  0: { AM: { activityId: null }, PM: { activityId: null }, EV: { activityId: null } },
  1: { AM: { activityId: null }, PM: { activityId: null }, EV: { activityId: null } },
  2: { AM: { activityId: null }, PM: { activityId: null }, EV: { activityId: null } },
  3: { AM: { activityId: null }, PM: { activityId: null }, EV: { activityId: null } },
  4: { AM: { activityId: null }, PM: { activityId: null }, EV: { activityId: null } },
  5: { AM: { activityId: null }, PM: { activityId: null }, EV: { activityId: null } },
  6: { AM: { activityId: null }, PM: { activityId: null }, EV: { activityId: null } }
};

export function cloneWeek(w: Schedule): Schedule {
  return JSON.parse(JSON.stringify(w)) as Schedule;
}

// Règles de placement (1/slot, PM hors-site bloque EV, etc.)
export function canPlace(
  week: Schedule,
  day: DayIndex,
  slot: Slot,
  activity: Activity
): { ok: boolean; reason?: string } {
  if (week[day][slot].activityId) return { ok: false, reason: "Ce créneau est déjà occupé." };

  const pmId = week[day].PM.activityId;
  const evId = week[day].EV.activityId;
  const isPmOffSite = (actId?: string | null) => actId && actId.length > 0 && offSite(actId);

  if (slot === "PM" && activity.location === "off-site" && evId)
    return { ok: false, reason: "Une activité hors-site l’après-midi bloque la soirée (EV)." };

  if (slot === "EV" && isPmOffSite(pmId))
    return { ok: false, reason: "La soirée est bloquée car l’après-midi est hors-site." };

  return { ok: true };
}

// Index d’activités pour tests rapides (hors-site, etc.)
let ACTIVITY_INDEX: Record<string, Activity> = {};
export function setActivityIndex(list: Activity[]) {
  ACTIVITY_INDEX = Object.fromEntries(list.map((a) => [a.id, a]));
}
function offSite(id: string) {
  return ACTIVITY_INDEX[id]?.location === "off-site";
}

// Charge quotidienne (0..3)
export function dailyLoad(week: Schedule, day: DayIndex) {
  const cells = week[day];
  return (cells.AM.activityId ? 1 : 0) + (cells.PM.activityId ? 1 : 0) + (cells.EV.activityId ? 1 : 0);
}

// Avertissements (charge élevée ≥ 3 act/jour sur ≥ 5 jours)
export function warnings(week: Schedule): string[] {
  let fullDays = 0;
  for (let d = 0 as DayIndex; d <= 6; d = (d + 1) as DayIndex) {
    if (dailyLoad(week, d) === 3) fullDays++;
  }
  return fullDays >= 5
    ? ["Charge élevée détectée (≥ 3 activités par jour sur 5 jours ou plus). Envisagez une journée plus légère."]
    : [];
}

export type Preset = "Zen" | "Tonus" | "Élan";

// Application d’un préréglage Zen/Tonus/Élan
export function applyPreset(base: Schedule, preset: Preset, activities: Activity[]): Schedule {
  const week = cloneWeek(base);
  const picks = pickActivitiesForPreset(activities, preset);
  const activeDays = preset === "Élan" ? 5 : 7;

  for (let d = 0 as DayIndex; d < activeDays; d = (d + 1) as DayIndex) {
    const dayActs = picks.nextDay();
    for (const [slot, act] of dayActs) {
      if (canPlace(week, d, slot, act).ok) week[d][slot].activityId = act.id;

      // Si on place un PM hors-site, on libère explicitement EV ce jour-là
      if (slot === "PM" && act.location === "off-site") {
        week[d].EV.activityId = null;
      }
    }
  }
  return week;
}

// Sélection d’activités selon le preset (retourne les créneaux du « jour suivant »)
function pickActivitiesForPreset(activities: Activity[], preset: Preset) {
  const byIntensity = (i: Activity["intensity"]) => activities.filter((a) => a.intensity === i);
  const poolAM = [...byIntensity("Zen"), ...byIntensity("Tonus")].filter((a) => a.slotHints.includes("AM"));
  const poolPM = [...byIntensity(preset === "Zen" ? "Zen" : "Tonus"), ...byIntensity("Élan")].filter((a) =>
    a.slotHints.includes("PM")
  );
  const poolEV = activities.filter((a) => a.slotHints.includes("EV"));

  let am = 0,
    pm = 0,
    ev = 0;

  // Choix circulaire, avec repli sur la liste globale si le pool est vide
  const take = (arr: Activity[], i: number): Activity => {
    if (arr.length > 0) return arr[i % arr.length];
    return activities[i % activities.length];
  };

  return {
    // ✅ Type simple et sûr (corrige l’erreur “Expected ',' got '{'”)
    nextDay(): Array<[Slot, Activity]> {
      if (preset === "Zen") return [["AM", take(poolAM, am++)]];
      if (preset === "Tonus") return [["AM", take(poolAM, am++)], ["PM", take(poolPM, pm++)]];
      return [
        ["AM", take(poolAM, am++)],
        ["PM", take(poolPM, pm++)],
        ["EV", take(poolEV, ev++)]
      ];
    }
  };
}

// Export CSV (date_iso, jour, slot, activity_id, …)
export function weekToCsv(week: Schedule, activities: Activity[], start?: string) {
  const startDate = start ? new Date(start) : mondayOfCurrentWeek();
  const idx = Object.fromEntries(activities.map((a) => [a.id, a]));
  const rows = ["date_iso,jour,slot,activity_id,title,category,intensity,duration_min,location,surcharge_eur"];

  for (let d = 0 as DayIndex; d <= 6; d = (d + 1) as DayIndex) {
    (["AM", "PM", "EV"] as Slot[]).forEach((slot) => {
      const id = week[d][slot].activityId;
      if (!id) return;
      const a = idx[id] as Activity;
      const date = addDays(startDate, d).toISOString().slice(0, 10);
      const jour = DAYS_FR[d];
      rows.push(
        [date, jour, slot, a.id, csvSafe(a.title), a.category, a.intensity, a.duration_min, a.location, a.surcharge_eur ?? ""].join(",")
      );
    });
  }
  return rows.join("\n");
}

function csvSafe(s: string) {
  if (s.includes(",") || s.includes('"')) return `"${s.replace(/"/g, '""')}"`;
  return s;
}
