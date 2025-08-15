"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
export default function AccessibilityControls() {
  const [contrast, setContrast] = useState<boolean>(false);
  const [scale, setScale] = useState<0 | 1 | 2>(0);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("hc", contrast);
    root.style.setProperty("--fs-base", scale === 0 ? "16px" : scale === 1 ? "18px" : "20px");
  }, [contrast, scale]);
  return (
    <div role="group" aria-label="Contrôles d’accessibilité" className="flex items-center gap-2">
      <Button variant="outline" size="sm" aria-label="Taille de texte standard" onClick={() => setScale(0)}>A</Button>
      <Button variant="outline" size="sm" aria-label="Augmenter la taille de texte" onClick={() => setScale(1)}>A+</Button>
      <Button variant="outline" size="sm" aria-label="Augmenter fortement la taille de texte" onClick={() => setScale(2)}>A++</Button>
      <Button variant="secondary" size="sm" aria-pressed={contrast} aria-label="Activer le contraste élevé" onClick={() => setContrast((v) => !v)}>Contraste</Button>
    </div>
  );
}
