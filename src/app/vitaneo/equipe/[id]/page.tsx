import Section from "@/components/section";
import data from "@/data/leaders.json";
import type { Leader } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { personJsonLd } from "@/lib/seo";
export default function Page({ params }: { params: { id: string } }) {
  const l = (data as Leader[]).find(x => x.id === params.id);
  if (!l) return notFound();
  return (
    <Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(l)) }} />
      <h1>{l.name}</h1>
      <p className="text-ardoise">{l.role} • {l.yearsExp} ans d’expérience</p>
      <div className="mt-4 grid gap-4 md:grid-cols-[300px,1fr]">
        <div className="relative h-[240px]"><Image src={l.photo.src} alt={l.photo.alt} fill className="object-cover rounded-2xl" /></div>
        <div>
          <p><strong>Langues :</strong> {l.languages.join(", ")}</p>
          <p className="mt-1"><strong>Expertises :</strong> {l.expertise.join(", ")}</p>
          <div className="mt-3 space-y-2">
            <p className="font-medium text-mer">Bio</p><p>{l.bio}</p>
            <p className="font-medium text-mer mt-2">Engagements</p>
            <ul className="list-disc pl-5">{l.commitments.map(c => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
