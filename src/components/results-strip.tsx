import results from "@/data/results.json";
export default function ResultsStrip() {
  const last = (results as any[]).slice(-1)[0];
  if (!last) return null;
  const m = last.month;
  return (
    <div className="rounded-2xl border border-ligne bg-jasmin p-4 shadow-elev1">
      <div className="flex flex-wrap items-center gap-4">
        <strong className="text-mer">Nos résultats — {m}</strong>
        <span>Accusé &lt;15 min : {last.ack15}%</span>
        <span>Solution &lt;2 h : {last.solve2h}%</span>
        <span>RDV &lt;24 h : {last.rdv24h}%</span>
        <span>NPS : {last.nps}</span>
        <a className="underline ml-auto" href="/nos-resultats" aria-label="Voir l’historique des résultats">Voir l’historique</a>
      </div>
    </div>
  );
}
