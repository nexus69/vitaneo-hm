"use client";
import Section from "@/components/section";
import ConfiguratorGrid from "@/components/configurator-grid";
import ConfiguratorToolbar from "@/components/configurator-toolbar";
import CsvDownloadButton from "@/components/csv-download-button";
import { useState } from "react";
import { EMPTY_WEEK } from "@/lib/configurator";
import type { Schedule } from "@/types";
export default function Page() {
  const [week, setWeek] = useState<Schedule>(structuredClone(EMPTY_WEEK));
  function reset() { setWeek(structuredClone(EMPTY_WEEK)); }
  return (
    <Section>
      <h1>Composer ma semaine</h1>
      <p className="text-ardoise">Choisissez vos activités sur la grille <strong>7×3</strong>. Règles : <em>1 activité/slot ; une activité hors-site l’après-midi bloque la soirée ;</em> alerte de charge si semaine trop dense.</p>
      <div className="mt-6"><ConfiguratorToolbar week={week} setWeek={setWeek} onReset={reset} onExport={() => {}} /></div>
      <div className="mt-6"><ConfiguratorGrid week={week} setWeek={setWeek} /></div>
      <div className="mt-6 flex justify-end"><CsvDownloadButton week={week} /></div>
      <p className="mt-4 text-p2 text-ardoise">Export CSV : <code>date_iso, jour, slot, activity_id, title, category, intensity, duration_min, location, surcharge_eur</code>.</p>
    </Section>
  );
}
