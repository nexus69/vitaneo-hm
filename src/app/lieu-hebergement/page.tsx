import Section from "@/components/section";
import HotelCard from "@/components/hotel-card";
import hotels from "@/data/hotels.json";
import SlaBannerFull from "@/components/sla-banner-full";
export default function Page() {
  const list = hotels as any[];
  return (
    <>
      <Section>
        <h1>Lieu & Hébergement</h1>
        <p className="text-ardoise">Pourquoi la Tunisie ? Climat généreux (~300 jours de soleil), proximité (~2 h depuis la France), français courant, confort hôtellerie 4–5★ et coût maîtrisé. Réseau de soins moderne via partenaires (RDV santé &lt; 24 h si besoin).</p>
      </Section>
      <Section>
        <h2>Nos hôtels partenaires</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((h) => <HotelCard key={h.id} h={h} />)}
        </div>
        <p className="mt-6 text-p2 text-ardoise">* Service non médicalisé. Urgence : 198 / 112. Les services et aménagements peuvent varier selon l’hôtel.</p>
      </Section>
      <Section><SlaBannerFull /></Section>
    </>
  );
}
