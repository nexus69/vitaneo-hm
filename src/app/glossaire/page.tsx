import Section from "@/components/section";
const ITEMS: { term: string; def: string }[] = [
  { term: "RSS (Résidence Services Seniors)", def: "Logements avec services pour personnes autonomes, non médicalisés." },
  { term: "EHPAD", def: "Établissement d’hébergement pour personnes âgées dépendantes — médicalisé." },
  { term: "APL / ALS", def: "Aides au logement (France), conditions selon situation. Indication générale ; voir organismes officiels." },
  { term: "TNC", def: "Transport non collectif — transferts aéroport par prestataire partenaire." },
  { term: "RGPD", def: "Règlement général sur la protection des données – protections et droits des personnes." },
  { term: "CTA", def: "Call To Action — bouton d’action (ex. Demander un devis)." }
];
export default function Page() {
  return (
    <Section>
      <h1>Glossaire</h1>
      <dl className="mt-4 divide-y divide-ligne rounded-2xl border border-ligne bg-white shadow-elev1">
        {ITEMS.map((i) => (<div key={i.term} className="grid gap-2 p-4 md:grid-cols-[240px,1fr]"><dt className="font-medium text-mer">{i.term}</dt><dd className="text-ardoise">{i.def}</dd></div>))}
      </dl>
      <p className="mt-4 text-p2 text-ardoise">Service et site en français (FR-only). Pour toute question, <a className="underline" href="/faq-contact">contactez-nous</a>.</p>
    </Section>
  );
}
