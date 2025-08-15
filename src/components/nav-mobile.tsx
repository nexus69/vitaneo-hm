"use client";
import Link from "next/link";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
type Props = { onNavigate?: () => void; currentPath?: string | null };
const sections = [
  { href: "/sejours", label: "Séjours" },
  { href: "/activites", label: "Activités à la carte", children: [
      { href: "/activites", label: "Toutes les activités" },
      { href: "/activites/configurateur", label: "Composer ma semaine" },
    ],
  },
  { href: "/lieu-hebergement", label: "Lieu & Hébergement" },
  { href: "/experience", label: "Expérience", children: [
      { href: "/experience/personnel-aidant", label: "Personnel aidant" }
    ],
  },
  { href: "/tarifs-reserver", label: "Tarifs & Réserver" },
  { href: "/faq-contact", label: "FAQ & Contact" },
];
export default function NavMobile({ onNavigate, currentPath }: Props) {
  return (
    <div className="border-t border-ligne bg-white">
      <Accordion type="single" collapsible>
        {sections.map((sec, idx) => (
          <AccordionItem key={sec.href} value={`sec-${idx}`}>
            <AccordionTrigger>
              <Link href={sec.href} onClick={onNavigate} className={cn("mr-auto", currentPath?.startsWith(sec.href) && "underline underline-offset-4 text-mer")}>{sec.label}</Link>
            </AccordionTrigger>
            {sec.children && (
              <AccordionContent>
                <ul className="space-y-2 pl-4">
                  {sec.children.map((ch) => (
                    <li key={ch.href}>
                      <Link href={ch.href} onClick={onNavigate} className={cn("text-ardoise hover:underline", currentPath?.startsWith(ch.href) && "text-mer")}>
                        {ch.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
