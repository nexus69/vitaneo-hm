"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function StickyCtaMobile() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-ligne bg-white/95 backdrop-blur md:hidden">
      <div className="container flex gap-3 py-2">
        <Link href="/activites/configurateur" className="flex-1" aria-label="Composer ma semaine"><Button className="w-full">Composer</Button></Link>
        <Link href="/faq-contact" className="flex-1" aria-label="Ouvrir la page Contact"><Button variant="outline" className="w-full">Contact</Button></Link>
      </div>
    </div>
  );
}
