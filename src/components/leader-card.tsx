"use client";
import Image from "next/image";
import { Leader } from "@/types";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { personJsonLd } from "@/lib/seo";
export default function LeaderCard({ leader }: { leader: Leader }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="rounded-2xl border border-ligne bg-white shadow-elev1">
      <button onClick={() => setOpen(true)} className="w-full text-left" aria-label={`Ouvrir la fiche de ${leader.name}`}>
        <div className="aspect-[4/3] relative"><Image src={leader.photo.src} alt={leader.photo.alt} fill className="object-cover rounded-t-2xl" /></div>
        <div className="p-4">
          <h3 className="text-h3 text-mer">{leader.name}</h3>
          <p className="text-ardoise">{leader.role}</p>
          <div className="mt-2 flex flex-wrap gap-2">{leader.expertise.map(e => <span key={e} className="rounded-full bg-jasmin/60 px-2 py-0.5 text-[12px] text-ardoise">{e}</span>)}</div>
        </div>
      </button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-ligne bg-white p-4 shadow-elev3 focus:outline-none" aria-label={`Fiche ${leader.name}`}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(leader)) }} />
            <div className="grid gap-4 md:grid-cols-[200px,1fr]">
              <div className="relative h-[180px] md:h-[220px]"><Image src={leader.photo.src} alt={leader.photo.alt} fill className="object-cover rounded-2xl" /></div>
              <div>
                <h3 className="text-h3 text-mer">{leader.name}</h3>
                <p className="text-ardoise">{leader.role} • {leader.yearsExp} ans d’expérience</p>
                <p className="mt-2 text-p2 text-ardoise"><strong>Langues :</strong> {leader.languages.join(", ")}</p>
                <p className="mt-1 text-p2 text-ardoise"><strong>Expertises :</strong> {leader.expertise.join(", ")}</p>
                <div className="mt-3 text-ardoise">
                  <p className="font-medium text-mer">Bio</p><p>{leader.bio}</p>
                  <p className="font-medium text-mer mt-2">Engagements</p>
                  <ul className="list-disc pl-5">{leader.commitments.map(c => <li key={c}>{c}</li>)}</ul>
                </div>
                <p className="mt-3 text-[13px] text-ardoise">Rappel : service non médicalisé ; SLA 8h–20h, 7j/7 (heure de Paris). Nos résultats sont publiés chaque mois.</p>
              </div>
            </div>
            <div className="mt-3 flex justify-end"><Dialog.Close asChild><Button variant="ghost" aria-label="Fermer">Fermer</Button></Dialog.Close></div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </article>
  );
}
