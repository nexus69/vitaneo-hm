import Image from "next/image";
import { Assistant } from "@/types";
import { cn } from "@/lib/utils";
type Props = { a: Assistant; onOpen?: (a: Assistant) => void; className?: string };
export default function PersonCard({ a, onOpen, className }: Props) {
  return (
    <article className={cn("rounded-2xl border border-ligne bg-white shadow-elev1", className)}>
      <button onClick={() => onOpen?.(a)} className="w-full text-left" aria-label={`Ouvrir la fiche de ${a.name}`}>
        <div className="aspect-[4/3] relative">
          <Image src={a.photo.src} alt={a.photo.alt} fill className="object-cover rounded-t-2xl" sizes="(min-width: 768px) 400px, 100vw" />
        </div>
        <div className="p-4">
          <h3 className="text-h3 text-mer">{a.name}</h3>
          <p className="text-ardoise">{a.role}{a.partner ? " — Partenaire" : ""}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {a.languages.map(l => (<span key={l} className="rounded-full border border-ligne px-2 py-0.5 text-[12px] text-ardoise">{l}</span>))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {a.skills.slice(0,3).map(s => (<span key={s} className="rounded-full bg-jasmin/60 px-2 py-0.5 text-[12px] text-ardoise">{s}</span>))}
          </div>
        </div>
      </button>
    </article>
  );
}
