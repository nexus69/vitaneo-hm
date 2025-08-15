"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavMega from "./nav-mega";
import NavMobile from "./nav-mobile";
import SlaHeader from "./sla-banner";
import { usePathname } from "next/navigation";
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-jasmin/90 backdrop-blur-md border-b border-ligne">
      <SlaHeader />
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-mer font-semibold text-lg" aria-label="Accueil Vitanéo">Vitanéo</Link>
        </div>
        <nav className="ml-6 hidden lg:block"><NavMega /></nav>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/faq-contact"><Button variant="secondary" className="hidden md:inline-flex" aria-label="Aller à Contact">Contact</Button></Link>
          <button onClick={() => setOpen((v) => !v)} className="lg:hidden inline-flex items-center justify-center rounded-2xl border border-ligne h-10 w-10" aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      <div id="menu-mobile" className={open ? "block lg:hidden" : "hidden"}>
        <NavMobile onNavigate={() => setOpen(false)} currentPath={pathname} />
      </div>
    </header>
  );
}
