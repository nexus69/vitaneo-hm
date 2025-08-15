import { baseWeek, seasonCoeff, supplements, exampleWeekTypeTonus4 } from "@/lib/pricing";
import { fmtEuro } from "@/lib/formatting";
export default function PriceTable() {
  const base4 = baseWeek("hotel4");
  const base5 = baseWeek("hotel5");
  const coeffs = { basse: seasonCoeff("basse"), moyenne: seasonCoeff("moyenne"), haute: seasonCoeff("haute") };
  const supp = supplements();
  const example = exampleWeekTypeTonus4();
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-ligne bg-white p-4 shadow-elev1">
        <h3 className="text-h3 text-mer">Tarifs “à partir de” (semaine)</h3>
        <table className="mt-3 w-full">
          <thead><tr><th className="text-left p-2">Catégorie</th><th className="text-left p-2">Basse</th><th className="text-left p-2">Moyenne</th><th className="text-left p-2">Haute</th></tr></thead>
          <tbody>
            <tr className="border-t border-ligne"><td className="p-2">Hôtel 4★</td><td className="p-2">{fmtEuro(base4 * coeffs.basse)}</td><td className="p-2">{fmtEuro(base4 * coeffs.moyenne)}</td><td className="p-2">{fmtEuro(base4 * coeffs.haute)}</td></tr>
            <tr className="border-t border-ligne"><td className="p-2">Hôtel 5★</td><td className="p-2">{fmtEuro(base5 * coeffs.basse)}</td><td className="p-2">{fmtEuro(base5 * coeffs.moyenne)}</td><td className="p-2">{fmtEuro(base5 * coeffs.haute)}</td></tr>
          </tbody>
        </table>
        <p className="mt-2 text-p2 text-ardoise">Base en chambre double, hors vols/transferts. Basse : nov–mars • Moyenne : avr–juin, sept–oct • Haute : juil–août.</p>
      </div>
      <div className="rounded-2xl border border-ligne bg-white p-4 shadow-elev1">
        <h3 className="text-h3 text-mer">Suppléments & options</h3>
        <ul className="mt-3 grid gap-2">
          <li>Supplément single : 4★ {fmtEuro(supp.single.hotel4)} • 5★ {fmtEuro(supp.single.hotel5)}</li>
          <li>Transferts aéroport : {fmtEuro(supp.transfers_per_person)} / pers</li>
          <li>Pass Tonus : {fmtEuro(supp.pass_tonus)} / sem • Pass Élan : {fmtEuro(supp.pass_elan)} / sem</li>
          <li>Options premium (indicatif) : Golf {fmtEuro(supp.options.golf)} • Voile {fmtEuro(supp.options.voile)} • Cuisine {fmtEuro(supp.options.cuisine)}</li>
        </ul>
        <p className="mt-2 text-p2 text-ardoise">Surcoûts partenaires signalés avant réservation.</p>
      </div>
      <div className="lg:col-span-2 rounded-2xl border border-ligne bg-white p-4 shadow-elev1">
        <h3 className="text-h3 text-mer">Semaine-type (exemple)</h3>
        <p className="mt-2 text-ardoise">Tonus 4★ : 790 € + 120 € + 25 € + 10 € → <strong>≈ {fmtEuro(example)}</strong> (hors vols/transferts).</p>
      </div>
    </div>
  );
}
