export type SimulatorOption = { value: string; label: string; points: 0 | 1 | 2; veto?: boolean; };
export type SimulatorQuestion = { id: string; title: string; help?: string; options: SimulatorOption[]; };
export type SimulatorAnswer = Record<string, string>;
export type SimulatorResultLevel = "Zen" | "Tonus" | "Élan";
export type SimulatorFormat = "Découverte (7–10 j)" | "Vitalité (3–8 sem)" | "Hivernage (1–3 mois)";

export type Slot = "AM" | "PM" | "EV";
export const SLOTS: Slot[] = ["AM", "PM", "EV"];
export type ActivityCategory = "Mouvement" | "Mer & plein air" | "Culture & artisanat" | "Bien-être & cuisine" | "Social & sorties";
export type ActivityIntensity = "Zen" | "Tonus" | "Élan";
export type ActivityLocation = "on-site" | "off-site";
export interface Activity { id: string; title: string; category: ActivityCategory; intensity: ActivityIntensity; duration_min: number; location: ActivityLocation; slotHints: Slot[]; surcharge_eur?: number; capacity: number; }
export interface ScheduleCell { activityId: string | null; }
export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type Schedule = { [day in DayIndex]: { AM: ScheduleCell; PM: ScheduleCell; EV: ScheduleCell }; };
export interface CsvItem { date_iso: string; jour: string; slot: Slot; activity_id: string; title: string; category: ActivityCategory; intensity: ActivityIntensity; duration_min: number; location: ActivityLocation; surcharge_eur?: number; }

export interface Photo { src: string; alt: string; }
export interface Assistant {
  id: string; name: string; role: string; yearsExp: number; languages: string[]; skills: string[];
  bio: string; missions: string; situations: string[]; availabilityNote: string; partner: boolean; photo: Photo;
}
export interface Leader { id: string; name: string; role: string; yearsExp: number; languages: string[]; expertise: string[]; bio: string; commitments: string[]; photo: Photo; }
