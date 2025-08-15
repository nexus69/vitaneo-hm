import { Clock } from "lucide-react";
export default function SlaHeader() {
  return (
    <div className="border-b border-or/40 bg-jasmin">
      <div className="container flex items-center gap-2 py-2 text-[14px] text-ardoise">
        <Clock className="h-4 w-4 text-azur" aria-hidden />
        <span><strong className="text-mer">Service 8h–20h, 7j/7</strong> — accusé &lt; 15 min <span className="sr-only">,</span><span aria-label="heure de Paris"> (heure de Paris)</span></span>
      </div>
    </div>
  );
}
