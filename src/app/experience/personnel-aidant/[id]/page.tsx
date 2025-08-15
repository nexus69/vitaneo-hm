import Section from "@/components/section";
import data from "@/data/team_assist.json";
import type { Assistant } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { personJsonLd } from "@/lib/seo";
import { Button } from "@/components/ui/button";
export default function Page({ params }: { params: { id: string } }) {
  const a = (data as Assistant[]).find(x => x.id === params.id);
  if (!a) return notFound();
  const phone = process.env.NEXT_PUBLIC_PHONE || "+21600000000";
  const email = process.env.NEXT_PUBLIC_EMAIL || "contact@vitaneo.example";
  return (
    <Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(a)) }} />
      <h1>{a.name}</h1>
      <p className="text-ardoise">{a.role}{a.partner ? " — Partenaire" : ""} • {a.yearsExp} ans d’expérience</p>
      <div className="mt-4 grid gap-4 md:grid-cols-[300px,1fr]">
        <div className="relative h-[240px]"><Image src={a.photo.src} alt={a.photo.alt} fill className="object-cover rounded-2xl" /></div>
        <div>
          <p><strong>Langues :</strong> {a.languages.join(", ")}</p>
          <p className="mt-1"><strong>Compétences :</strong> {a.skills.join(", ")}</p>
          <div className="mt-3 space-y-2">
            <p className="font-medium text-mer">Bio</p><p>{a.bio}</p>
            <p className="font-medium text-mer mt-2">Missions</p><p>{a.missions}</p>
            <p className="font-medium text-mer mt-2">Exemples de situations</p>
            <ul className="list-disc pl-5">{a.situations.map(s => <li key={s}>{s}</li>)}</ul>
          </div>
          <p className="mt-3"><strong>Disponibilités :</strong> {a.availabilityNote}</p>
          <div className="mt-4 flex gap-2">
            <a href={`tel:${phone}`}><Button>Appeler</Button></a>
            <a href={`mailto:${email}?subject=Contact%20Vitan%C3%A9o%20-%20${encodeURIComponent(a.name)}`}><Button variant="outline">Écrire</Button></a>
          </div>
          <p className="mt-4 text-[13px] text-ardoise">Service non médicalisé. RDV santé &lt; 24 h via partenaires. Urgence : 198/112.</p>
        </div>
      </div>
    </Section>
  );
}
