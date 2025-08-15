import Section from "@/components/section";
import SimulatorWizard from "@/components/simulator-wizard";
export default function Page() {
  return (
    <Section>
      <h1>Simulateur d’éligibilité</h1>
      <p className="text-ardoise">10 questions • 2–3 minutes • Non médical • Non stocké avant devis.</p>
      <div className="mt-6"><SimulatorWizard /></div>
    </Section>
  );
}
