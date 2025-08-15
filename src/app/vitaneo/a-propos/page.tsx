import Section from "@/components/section";
import leadersData from "@/data/leaders.json";
import type { Leader } from "@/types";
import LeaderCard from "@/components/leader-card";
export default function Page() {
  const leaders = leadersData as Leader[];
  const orgJsonLd = { "@context":"https://schema.org", "@type":"Organization", "name":"Vitanéo", "url":"https://vitaneo.example", "logo":"https://vitaneo.example/img/logo.png" };
  return (
    <>
      <Section><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <h1>À propos</h1>
        <div className="mt-3 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-ligne bg-white p-4 shadow-elev1">
            <h2>Mission</h2>
            <p className="text-ardoise">Offrir des séjours non médicalisés, personnalisés et sécurisants, avec activités à la carte et assistance légère.</p>
          </div>
          <div className="rounded-2xl border border-ligne bg-white p-4 shadow-elev1">
            <h2>Vision</h2>
            <p className="text-ardoise">Devenir la référence FR/TN des séjours vitalité en hôtels 4–5★, avec transparence des tarifs et SLA publics.</p>
          </div>
          <div className="rounded-2xl border border-ligne bg-white p-4 shadow-elev1">
            <h2>Valeurs</h2>
            <ul className="list-disc pl-5 text-ardoise"><li>Respect & autonomie</li><li>Transparence & qualité</li><li>Convivialité & sécurité douce</li></ul>
          </div>
        </div>
      </Section>
      <Section>
        <h2>Équipe dirigeante</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map(l => <LeaderCard key={l.id} leader={l} />)}
        </div>
        <p className="mt-6 text-p2 text-ardoise">Rappel : service non médicalisé ; SLA 8h–20h, 7j/7 (heure de Paris). Consultez <a className="underline" href="/nos-resultats">Nos résultats</a>.</p>
      </Section>
    </>
  );
}
