import Section from "@/components/section";
export default function Page() {
  return (
    <Section>
      <h1>Blog</h1>
      <ul className="mt-4 space-y-3">
        <li className="rounded-2xl border border-ligne bg-white p-4 shadow-elev1"><h3 className="text-h3 text-mer">Guide pratique : préparer son séjour en Tunisie (FR)</h3><p className="text-ardoise">Climat, formalités courantes, santé (partenaires), usages locaux.</p></li>
        <li className="rounded-2xl border border-ligne bg-white p-4 shadow-elev1"><h3 className="text-h3 text-mer">Idées d’activités à la carte : mer, culture & artisanat</h3><p className="text-ardoise">Choisir selon rythme : Zen, Tonus, Élan.</p></li>
        <li className="rounded-2xl border border-ligne bg-white p-4 shadow-elev1"><h3 className="text-h3 text-mer">Comprendre nos SLA publics</h3><p className="text-ardoise">Pourquoi publier accusé, solution, RDV &lt; 24 h.</p></li>
      </ul>
    </Section>
  );
}
