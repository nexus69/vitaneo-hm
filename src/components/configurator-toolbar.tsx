"use client";
import { Button } from "@/components/ui/button";
import type { Preset, Schedule } from "@/lib/configurator";
import { applyPreset, warnings } from "@/lib/configurator";
import activities from "@/data/activities.json";
import { useMemo } from "react";
type Props = { week: Schedule; setWeek: (w: Schedule) => void; onExport: () => void; onReset: () => void; };
export default function ConfiguratorToolbar({ week, setWeek, onExport, onReset }: Props) {
  const warns = useMemo(() => warnings(week), [week]);
  function setPreset(p: Preset) {
    const { setActivityIndex } = require("@/lib/configurator");
    setActivityIndex(activities as any);
    setWeek(applyPreset(week, p, activities as any));
  }
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex gap-2" role="group" aria-label="Préréglages de semaine">
        <Button variant="outline" onClick={() => setPreset("Zen")} aria-label="Appliquer le préréglage Zen">Zen (1/j)</Button>
        <Button variant="outline" onClick={() => setPreset("Tonus")} aria-label="Appliquer le préréglage Tonus">Tonus (2/j)</Button>
        <Button variant="outline" onClick={() => setPreset("Élan")} aria-label="Appliquer le préréglage Élan">Élan (3/j, 4–5 j)</Button>
      </div>
      <div className="ml-auto flex gap-2">
        <Button variant="ghost" onClick={onReset} aria-label="Vider la semaine">Vider</Button>
        <Button onClick={onExport} aria-label="Exporter la semaine en CSV">Exporter CSV</Button>
      </div>
      {warns.length > 0 && (<div role="status" className="basis-full rounded-xl border border-ligne bg-jasmin/60 p-3 text-ardoise">{warns.map((w,i) => <p key={i}>⚠️ {w}</p>)}</div>)}
    </div>
  );
}
