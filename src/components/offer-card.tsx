import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
type Offer = { id: string; title: string; duration: string; pitch: string; includes: string[]; options: string[]; discounts: string[]; disclaimer: string; };
export default function OfferCard({ o }: { o: Offer }) {
  return (
    <Card>
      <CardHeader><CardTitle>{o.title} <span className="text-ardoise text-p2">• {o.duration}</span></CardTitle></CardHeader>
      <CardContent className="text-ardoise">
        <p>{o.pitch}</p>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          <div><p className="font-medium text-mer">Inclus</p><ul className="mt-1 list-disc pl-5">{o.includes.map(i => <li key={i}>{i}</li>)}</ul></div>
          <div><p className="font-medium text-mer">Options</p><ul className="mt-1 list-disc pl-5">{o.options.map(i => <li key={i}>{i}</li>)}</ul></div>
          <div><p className="font-medium text-mer">Remises</p><ul className="mt-1 list-disc pl-5">{o.discounts.map(i => <li key={i}>{i}</li>)}</ul></div>
        </div>
        <p className="mt-3 text-p2">{o.disclaimer}</p>
        <div className="mt-4 flex gap-2">
          <a href="/tarifs-reserver"><Button>Demander un devis</Button></a>
          <a href="/activites/configurateur"><Button variant="outline">Composer ma semaine</Button></a>
        </div>
      </CardContent>
    </Card>
  );
}
