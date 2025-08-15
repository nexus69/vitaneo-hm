import Section from "@/components/section";
import FaqAccordion from "@/components/faq-accordion";
import ContactForm from "@/components/contact-form";
import SlaBannerFull from "@/components/sla-banner-full";
export default function Page() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP || "+21600000000";
  const phone = process.env.NEXT_PUBLIC_PHONE || "+21600000000";
  const email = process.env.NEXT_PUBLIC_EMAIL || "contact@vitaneo.example";
  return (
    <>
      <Section><h1>FAQ & Contact</h1><p className="text-ardoise">Service 8h–20h, 7j/7 (heure de Paris). Accusé &lt; 15 min ; solution &lt; 2 h ; RDV santé &lt; 24 h via partenaires.</p></Section>
      <Section><SlaBannerFull /></Section>
      <Section><div className="mt-6"><FaqAccordion /></div></Section>
      <Section>
        <h2>Nous contacter</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-ligne bg-white p-4 shadow-elev1">
            <p><strong>WhatsApp :</strong> <a className="underline" href={`https://wa.me/${wa.replace(/\D/g,"")}`}>{wa}</a></p>
            <p className="mt-1"><strong>Téléphone :</strong> <a className="underline" href={`tel:${phone}`}>{phone}</a></p>
            <p className="mt-1"><strong>E-mail :</strong> <a className="underline" href={`mailto:${email}`}>{email}</a></p>
            <p className="mt-3 text-p2 text-ardoise">FR-only. Données traitées pour répondre à votre demande et établir un devis (conservation 24 mois).</p>
          </div>
          <div className="rounded-2xl border border-ligne bg-white p-4 shadow-elev1"><ContactForm variant="contact" /></div>
        </div>
      </Section>
    </>
  );
}
