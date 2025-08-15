"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Section from "./section";
export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-jasmin">
      <Section className="relative z-10">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} className="text-h1 text-mer">
          La vitalité au soleil, à votre rythme
        </motion.h1>
        <p className="mt-4 max-w-2xl text-ardoise">Séjours non médicalisés en hôtels 4–5★, activités à la carte, assistance légère et transparence des tarifs.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/sejours"><Button>Voir les séjours</Button></Link>
          <Link href="/activites/configurateur"><Button variant="outline">Composer ma semaine</Button></Link>
          <Link href="/tarifs-reserver#simulateur"><Button variant="ghost">Éligibilité</Button></Link>
        </div>
      </Section>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,134,166,0.08),transparent_60%)]" />
    </div>
  );
}
