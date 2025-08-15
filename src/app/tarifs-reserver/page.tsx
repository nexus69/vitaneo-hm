import Section from "@/components/section";
import PriceTable from "@/components/price-table";
import MiniSimulator from "@/components/mini-simulator";
import ContactForm from "@/components/contact-form";
import SlaBannerFull from "@/components/sla-banner-full";
export default function Page() {
  return (
    <>
      <Section><h1>Tarifs & Réserver</h1><p className="text-ardoise">Grilles “à partir de”, saisonnalité, suppléments, semaine-type. Simulateur d’éligibilité et formulaire de devis.</p></Section>
      <Section><SlaBannerFull /></Section>
      <Section><PriceTable /></Section>
      <Section><h2 id="simulateur" className="mb-2">Éligibilité & format conseillé</h2><MiniSimulator /></Section>
      <Section><h2 id="devis">Demander un devis</h2><div className="rounded-2xl border border-ligne bg-white p-4 shadow-elev1"><ContactForm variant="devis" /><p className="mt-3 text-p2 text-ardoise">Réponse sous 24 h ouvrées. Données non stockées avant devis pour le simulateur ; le formulaire est soumis à consentement explicite.</p></div></Section>
    </>
  );
}
