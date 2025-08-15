"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const items = [
  { href: "/sejours", label: "Séjours" },
  { href: "/activites", label: "Activités à la carte" },
  { href: "/lieu-hebergement", label: "Lieu & Hébergement" },
  { href: "/experience", label: "Expérience" },
  { href: "/tarifs-reserver", label: "Tarifs & Réserver" },
  { href: "/faq-contact", label: "FAQ & Contact" },
];
export default function NavMega() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-4">
      {items.map((it) => (
        <li key={it.href}>
          <Link href={it.href} className={cn("px-3 py-2 rounded-xl text-p2 hover:bg-jasmin/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", pathname?.startsWith(it.href) ? "text-mer font-medium underline underline-offset-4" : "text-ardoise")}>
            {it.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
