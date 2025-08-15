"use client";
import { useState } from "react";

export default function MiniSimulator() {
  const [nights, setNights] = useState(30);
  const pricePerNight = 55;
  const total = nights * pricePerNight;

  return (
    <div className="rounded border p-4 space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-sm">Nombre de nuits</label>
        <input
          className="w-24 border rounded px-2 py-1"
          type="number"
          min={7}
          value={nights}
          onChange={(e) => setNights(Number(e.target.value))}
        />
      </div>
      <div className="text-sm">Prix estimé : <strong>{total.toLocaleString()} €</strong></div>
    </div>
  );
}
