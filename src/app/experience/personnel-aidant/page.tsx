"use client";
import Section from "@/components/section";
import data from "@/data/team_assist.json";
import type { Assistant } from "@/types";
import PersonCard from "@/components/person-card";
import PersonModal from "@/components/person-modal";
import PersonFilters from "@/components/person-filters";
import { useMemo, useState } from "react";
import { filterAssistants } from "@/lib/filters";
export default function Page() {
  const assistants = data as Assistant[];
  const [filters, setFilters] = useState({});
  const [active, setActive] = useState<Assistant | null>(null);
  const list = useMemo(() => filterAssistants(assistants, filters as any), [assistants, filters]);
  return (
    <Section>
      <h1>Personnel aidant</h1>
      <p className="text-ardoise">Assistance légère, non médicalisée. Filtres par langues, compétences et rôle.</p>
      <div className="mt-4"><PersonFilters data={assistants} onChange={setFilters as any} /></div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map(a => (<PersonCard key={a.id} a={a} onOpen={setActive} />))}</div>
      <p className="mt-6 text-p2 text-ardoise">* Assistance légère ; aucun acte de soins. En cas de besoin, RDV santé &lt; 24 h via partenaires. Urgence : 198/112.</p>
      {active && <PersonModal a={active} onClose={() => setActive(null)} />}
    </Section>
  );
}
