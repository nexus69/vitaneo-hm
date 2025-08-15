"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import SimulatorWizard from "./simulator-wizard";
export default function MiniSimulator() {
  const [open, setOpen] = useState(false);
  return (
    <div id="simulateur" className="rounded-2xl border border-ligne bg-white p-6 shadow-elev1">
      <h3 className="text-h3 text-mer">Mini-simulateur d’éligibilité</h3>
      <p className="mt-2 text-ardoise">10 questions • 2–3 minutes • Non médical • Non stocké avant devis.</p>
      <div className="mt-4">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild><Button aria-haspopup="dialog">Lancer le mini-simulateur</Button></Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/30" />
            <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-ligne bg-white p-4 shadow-elev3 focus:outline-none" aria-label="Mini-simulateur d’éligibilité">
              <div className="max-h-[80vh] overflow-auto p-1"><SimulatorWizard compact /></div>
              <div className="mt-3 flex justify-end"><Dialog.Close asChild><Button variant="outline" aria-label="Fermer">Fermer</Button></Dialog.Close></div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
