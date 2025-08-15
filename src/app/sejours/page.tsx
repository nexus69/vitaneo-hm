import Section from "@/components/section";
import OfferCard from "@/components/offer-card";
import offers from "@/data/offers.json";
export default function Page() {
  const list = offers as any[];
  return (
    <>
      <Section><h1>Séjours</h1><p className="text-ardoise">Cinq formules pour composer votre expérience : Découverte, Vitalité, Hivernage, Duo & Amis, Télétravail 55+.</p></Section>
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {list.map((o) => <OfferCard key={o.id} o={o} />)}
        </div>
        <p className="mt-6 text-p2 text-ardoise">* Non médicalisé ; aucun acte de soins. Surcoûts partenaires signalés avant réservation.</p>
      </Section>
    </>
  );
}
