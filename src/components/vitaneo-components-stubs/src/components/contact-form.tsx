"use client";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label className="block text-sm font-medium">Votre email</label>
        <input
          type="email"
          required
          className="mt-1 w-full rounded border px-3 py-2"
          placeholder="vous@exemple.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea
          required
          className="mt-1 w-full rounded border px-3 py-2"
          rows={4}
          placeholder="Votre demande…"
        />
      </div>

      <button type="submit" className="rounded bg-azur px-4 py-2 text-white">
        Envoyer
      </button>

      {sent && (
        <p className="text-green-600 text-sm mt-2">
          ✅ Message bien envoyé (démo)
        </p>
      )}
    </form>
  );
}
