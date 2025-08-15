import Hero from "@/components/hero";
import Section from "@/components/section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ResultsStrip from "@/components/results-strip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section>
        <h2>Ce que c’est • Ce que ça n’est pas</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Ce que c’est</CardTitle></CardHeader>
            <CardContent className="text-ardoise">
              <ul className="list-disc pl-5 space-y-1">
                <li>Séjours non médicalisés en hôtels 4–5★</li>
                <li>Activités à la carte selon votre rythme</li>
                <li>Assistance légère 8h–20h (heure de Paris)</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Ce que ça n’est pas</CardTitle></CardHeader>
            <CardContent className="text-ardoise">
              <ul className="list-disc pl-5 space-y-1">
                <li>Aucun acte de soins</li>
                <li>Pas d’EHPAD / pas de médicalisation</li>
                <li>RDV santé &lt; 24 h via partenaires si besoin</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>
      <Section><ResultsStrip /></Section>
    </>
  );
}
