"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Assistant } from "@/types";
import { Button } from "@/components/ui/button";
import { personJsonLd } from "@/lib/seo";
type Props = { a: Assistant | null; onClose: () => void };
export default function PersonModal({ a, onClose }: Props) {
  if (!a) return null;
  const phone = process.env.NEXT_PUBLIC_PHONE || "+21600000000";
  const email = process.env.NEXT_PUBLIC_EMAIL || "contact@vitaneo.example";
  return (
    <Dialog.Root open onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-ligne bg-white p-4 shadow-elev3 focus:outline-none" aria-label={`Fiche ${a.name}`}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(a)) }} />
          <div className="grid gap-4 md:grid-cols-[200px,1fr]">
            <div className="relative h-[180px] md:h-[220px]"><Image src={a.photo.src} alt={a.photo.alt} fill className="object-cover rounded-2xl" /></div>
            <div>
              <h3 className="text-h3 text-mer">{a.name}</h3>
              <p className="text-ardoise">{a.role}{a.partner ? " — Partenaire" : ""} • {a.yearsExp} ans d’expérience</p>
              <p className="mt-2 text-p2 text-ardoise"><strong>Langues :</strong> {a.languages.join(", ")}</p>
              <p className="mt-1 text-p2 text-ardoise"><strong>Compétences :</strong> {a.skills.join(", ")}</p>
              <div className="mt-3 prose prose-p:my-1 prose-li:my-0 text-ardoise">
                <p className="font-medium text-mer">Bio</p><p>{a.bio}</p>
                <p className="font-medium text-mer mt-2">Missions</p><p>{a.missions}</p>
                <p className="font-medium text-mer mt-2">Exemples de situations</p>
                <ul className="list-disc pl-5">{a.situations.map(s => <li key={s}>{s}</li>)}</ul>
              </div>
              <p className="mt-3 text-p2 text-ardoise"><strong>Disponibilités :</strong> {a.availabilityNote}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={`tel:${phone}`}><Button>Appeler</Button></a>
                <a href={`mailto:${email}?subject=Contact%20Vitan%C3%A9o%20-%20${encodeURIComponent(a.name)}`}><Button variant="outline">Écrire</Button></a>
              </div>
              <p className="mt-4 text-[13px] text-ardoise">Vitaneo n’est <strong>pas</strong> un établissement médical. Aucun acte de soins ; en cas de besoin, RDV santé &lt; 24 h via partenaires. Urgence : 198/112.</p>
            </div>
          </div>
          <div className="mt-3 flex justify-end"><Dialog.Close asChild><Button variant="ghost" aria-label="Fermer">Fermer</Button></Dialog.Close></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
