import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
type Hotel = { id: string; name: string; stars: number; city: string; transferMin: number; photo: { src: string; alt: string }; services: string[]; notes?: string; };
export default function HotelCard({ h }: { h: Hotel }) {
  return (
    <Card>
      <div className="relative aspect-[4/3]"><Image src={h.photo.src} alt={h.photo.alt} fill className="object-cover rounded-t-2xl" /></div>
      <CardHeader><CardTitle>{h.name} <span className="text-ardoise text-p2">• {h.stars}★ — {h.city}</span></CardTitle></CardHeader>
      <CardContent className="text-ardoise">
        <p>Transfert aéroport ≈ {h.transferMin} min</p>
        <ul className="mt-2 list-disc pl-5">{h.services.map(s => <li key={s}>{s}</li>)}</ul>
        {h.notes && <p className="mt-2 text-p2">{h.notes}</p>}
      </CardContent>
    </Card>
  );
}
