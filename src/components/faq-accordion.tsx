import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import faqs from "@/data/faqs.json";
export default function FaqAccordion() {
  return (
    <Accordion type="single" collapsible>
      {(faqs as { q: string; a: string }[]).map((f, i) => (
        <AccordionItem key={i} value={`faq-${i}`}>
          <AccordionTrigger className="text-mer">{f.q}</AccordionTrigger>
          <AccordionContent className="text-ardoise">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
