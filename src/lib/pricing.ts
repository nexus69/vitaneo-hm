import data from "@/data/pricing.json";
type Season = "basse" | "moyenne" | "haute";
type Hotel = "hotel4" | "hotel5";
export function baseWeek(hotel: Hotel) { return (data as any).base_week[hotel] as number; }
export function seasonCoeff(season: Season) { return (data as any).season_coeff[season] as number; }
export function supplementSingle(hotel: Hotel) { return (data as any).supplements.single[hotel] as number; }
export function supplements() { return (data as any).supplements as { transfers_per_person: number; pass_tonus: number; pass_elan: number; options: Record<string, number>; }; }
export function exampleWeekTypeTonus4(): number {
  const b = baseWeek("hotel4");
  const { pass_tonus, options } = supplements();
  return b + pass_tonus + options["voile"] + options["cuisine"];
}
