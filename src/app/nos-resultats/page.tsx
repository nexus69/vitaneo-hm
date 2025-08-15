import Section from "@/components/section";
import results from "@/data/results.json";
export default function Page() {
  const rows = results as { month: string; ack15: number; solve2h: number; rdv24h: number; nps: number; cases: number; note?: string }[];
  return (
    <Section>
      <h1>Nos résultats (SLA)</h1>
      <p className="text-ardoise">Tableau mensuel : accusé &lt; 15 min, solution &lt; 2 h, RDV &lt; 24 h, NPS, dossiers.</p>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-ligne bg-white shadow-elev1">
        <table className="w-full min-w-[720px]">
          <thead><tr><th className="p-2 text-left">Mois</th><th className="p-2 text-left">Accusé &lt; 15 min</th><th className="p-2 text-left">Solution &lt; 2 h</th><th className="p-2 text-left">RDV &lt; 24 h</th><th className="p-2 text-left">NPS</th><th className="p-2 text-left">Dossiers</th><th className="p-2 text-left">Note</th></tr></thead>
          <tbody>
            {rows.map(r => (<tr key={r.month} className="border-t border-ligne">
              <td className="p-2">{r.month}</td><td className="p-2">{r.ack15}%</td><td className="p-2">{r.solve2h}%</td><td className="p-2">{r.rdv24h}%</td><td className="p-2">{r.nps}</td><td className="p-2">{r.cases}</td><td className="p-2">{r.note || "—"}</td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
