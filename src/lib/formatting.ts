export const fmtEuro = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
export const DAYS_FR = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"] as const;
export function mondayOfCurrentWeek(d = new Date()): Date {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7; // Lundi=0
  date.setDate(date.getDate() - day);
  date.setHours(0,0,0,0);
  return date;
}
export function addDays(base: Date, days: number) { const d = new Date(base); d.setDate(d.getDate() + days); return d; }
