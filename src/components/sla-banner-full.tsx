import { Clock } from "lucide-react";
export default function SlaBannerFull() {
  return (
    <div className="rounded-2xl border border-or/40 bg-jasmin p-4 shadow-elev1">
      <div className="flex flex-wrap items-center gap-3">
        <Clock className="h-5 w-5 text-azur" aria-hidden />
        <strong className="text-mer">SLA service 8h–20h, 7j/7</strong>
        <span>Accusé &lt; 15 min</span>
        <span>• Solution &lt; 2 h</span>
        <span>• RDV santé &lt; 24 h (via partenaires)</span>
        <span aria-label="Heure de Paris">— heure de Paris</span>
      </div>
    </div>
  );
}
