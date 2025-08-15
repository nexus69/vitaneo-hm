import type { SimulatorAnswer, SimulatorQuestion, SimulatorResultLevel, SimulatorFormat } from "@/types";
export function scoreAnswers(questions: SimulatorQuestion[], answers: SimulatorAnswer) {
  let total = 0;
  let veto = false;
  for (const q of questions) {
    const val = answers[q.id];
    const opt = q.options.find(o => o.value === val);
    if (!opt) continue;
    total += opt.points;
    if (opt.veto) veto = true;
  }
  const level = mapScoreToLevel(total);
  const format = mapToFormat(total, answers["duree"] as string | undefined);
  return { total, veto, level, format };
}
export function mapScoreToLevel(score: number): SimulatorResultLevel {
  if (score <= 6) return "Zen";
  if (score <= 13) return "Tonus";
  return "Élan";
}
export function mapToFormat(score: number, duree?: string): SimulatorFormat {
  if (duree === "7-10j") return "Découverte (7–10 j)";
  if (duree === "3-8sem") return "Vitalité (3–8 sem)";
  if (duree === "1-3mois") return "Hivernage (1–3 mois)";
  if (score <= 6) return "Découverte (7–10 j)";
  if (score <= 13) return "Vitalité (3–8 sem)";
  return "Hivernage (1–3 mois)";
}
