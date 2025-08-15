"use client";
import { useEffect, useMemo, useState } from "react";
import type { SimulatorAnswer, SimulatorQuestion } from "@/types";
import data from "@/data/simulator.json";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { scoreAnswers } from "@/lib/simulator";
type Props = { compact?: boolean };
export default function SimulatorWizard({ compact = false }: Props) {
  const questions = data as SimulatorQuestion[];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SimulatorAnswer>({});
  const [submitted, setSubmitted] = useState(false);
  const current = questions[step];
  const totalSteps = questions.length;
  const progressPct = Math.round(((step + 1) / totalSteps) * 100);
  useEffect(() => { setSubmitted(false); }, [step]);
  function onChoose(qid: string, value: string) { setAnswers(prev => ({ ...prev, [qid]: value })); }
  function next() { if (step < totalSteps - 1) setStep(step + 1); else setSubmitted(true); }
  function prev() { if (step > 0) setStep(step - 1); }
  function restart() { setAnswers({}); setStep(0); setSubmitted(false); }
  const result = useMemo(() => scoreAnswers(questions, answers), [answers, questions]);
  if (submitted) {
    return (
      <div className="rounded-2xl border border-ligne bg-white p-6 shadow-elev2">
        <h3 className="text-h3 text-mer">Votre résultat</h3>
        {result.veto ? (
          <p className="mt-3 text-ardoise"><strong>Veto d’éligibilité détecté :</strong> vous avez indiqué « non autonome ». Vitaneo est un service non médicalisé. Nous pouvons toutefois vous orienter vers des partenaires adaptés.</p>
        ) : (
          <>
            <p className="mt-3 text-ardoise">Score total : <strong>{result.total}</strong> / 20</p>
            <p className="mt-1">Niveau conseillé : <strong>{result.level}</strong></p>
            <p className="mt-1">Format conseillé : <strong>{result.format}</strong></p>
          </>
        )}
        <div className="mt-5 flex flex-wrap gap-3">
          <Button onClick={restart}>Recommencer</Button>
          <a href="/activites/configurateur" className="inline-flex"><Button variant="outline">Composer ma semaine</Button></a>
          <a href="/tarifs-reserver#devis" className="inline-flex"><Button variant="secondary">Demander un devis</Button></a>
        </div>
        <p className="mt-4 text-p2 text-ardoise">Auto-déclaratif, non médical, et <strong>non stocké avant devis</strong>. Service 8h–20h, 7j/7 (heure de Paris).</p>
      </div>
    );
  }
  return (
    <form className={cn("rounded-2xl border border-ligne bg-white p-6 shadow-elev1", compact && "p-4")} aria-labelledby="simu-title">
      <div className="flex items-center justify-between">
        <h3 id="simu-title" className="text-h3 text-mer">Éligibilité — Étape {step + 1} / {totalSteps}</h3>
        <div aria-label={`Progression ${progressPct}%`} className="text-p2 text-ardoise">{progressPct}%</div>
      </div>
      <fieldset className="mt-4">
        <legend className="text-p1 font-medium">{current.title}</legend>
        {current.help && <p className="mt-1 text-p2 text-ardoise">{current.help}</p>}
        <div role="radiogroup" aria-label={current.title} className="mt-3 grid gap-2">
          {current.options.map(opt => {
            const id = `${current.id}-${opt.value}`;
            const checked = answers[current.id] === opt.value;
            return (
              <label key={id} htmlFor={id} className={cn("flex items-center gap-3 rounded-xl border border-ligne p-3 hover:bg-jasmin/40 cursor-pointer", checked && "ring-2 ring-azur bg-jasmin/60")}>
                <input type="radio" id={id} name={current.id} value={opt.value} checked={checked} onChange={() => onChoose(current.id, opt.value)} className="h-4 w-4" />
                <span>{opt.label}</span>
                {opt.veto && <span className="ml-auto rounded-full bg-azur/10 px-2 py-0.5 text-[12px] text-azur">Veto</span>}
              </label>
            );
          })}
        </div>
      </fieldset>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="button" variant="outline" onClick={prev} disabled={step === 0}>Précédent</Button>
        <Button type="button" onClick={next} disabled={!answers[current.id]} aria-disabled={!answers[current.id]}>
          {step === totalSteps - 1 ? "Voir mon résultat" : "Suivant"}
        </Button>
        <p className="ml-auto text-p2 text-ardoise">Non médical • Non stocké avant devis</p>
      </div>
    </form>
  );
}
