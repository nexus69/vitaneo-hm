"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true); // v1 : confirmation immédiate (pas d’envoi serveur)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-label="Formulaire de contact / devis">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className="block text-p2 text-ardoise">Nom complet</label>
          <input id="nom" name="nom" required className="mt-1 w-full rounded-xl border border-ligne p-3 focus:outline-none focus:ring-2 focus:ring-azur" />
        </div>
        <div>
          <label htmlFor="email" className="block text-p2 text-ardoise">E-mail</label>
          <input id="email" name="email" type="email" required className="mt-1 w-full rounded-xl border border-ligne p-3 focus:outline-none focus:ring-2 focus:ring-azur" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-p2 text-ardoise">Téléphone</label>
          <input id="phone" name="phone" required className="mt-1 w-full rounded-xl border border-ligne p-3 focus:outline-none focus:ring-2 focus:ring-azur" />
        </div>
        <div>
          <label htmlFor="profil" className="block text-p2 text-ardoise">Profil</label>
          <select id="profil" name="profil" className="mt-1 w-full rounded-xl border border-ligne p-3 focus:outline-none focus:ring-2 focus:ring-azur">
            <option>Voyageur 55–75</option>
            <option>Famille / proche</option>
          </select>
        </div>
        <div>
          <label htmlFor="hotel" className="block text-p2 text-ardoise">Hôtel</label>
          <select id="hotel" name="hotel" className="mt-1 w-full rounded-xl border border-ligne p-3 focus:outline-none focus:ring-2 focus:ring-azur">
            <option>4★</option>
            <option>5★</option>
            <option>Indifférent</option>
          </select>
        </div>
        <div>
          <label htmlFor="rythme" className="block text-p2 text-ardoise">Rythme</label>
          <select id="rythme" name="rythme" className="mt-1 w-full rounded-xl border border-ligne p-3 focus:outline-none focus:ring-2 focus:ring-azur">
            <option>Zen</option>
            <option>Tonus</option>
            <option>Élan</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="dates" className="block text-p2 text-ardoise">Dates souhaitées</label>
        <input id="dates" name="dates" placeholder="JJ/MM/AAAA → JJ/MM/AAAA" className="mt-1 w-full rounded-xl border border-ligne p-3 focus:outline-none focus:ring-2 focus:ring-azur" />
      </div>

      <div>
        <label htmlFor="comment" className="block text-p2 text-ardoise">Commentaires</label>
        <textarea id="comment" name="comment" rows={4} className="mt-1 w-full rounded-xl border border-ligne p-3 focus:outline-none focus:ring-2 focus:ring-azur" />
      </div>

      <div className="text-[13px] text-ardoise">
        En envoyant ce formulaire, vous acceptez que vos données soient utilisées pour répondre et établir un devis.
        Conservation 24 mois. Droits : privacy@vitaneo.example.
      </div>

      <Button type="submit" className="rounded-2xl">Envoyer</Button>

      {sent && (
        <p role="status" className="rounded-xl bg-jasmin/60 p-3 text-ardoise">
          Merci ! Nous accusons réception <strong>&lt; 15 min</strong> (heure de Paris).
        </p>
      )}
    </form>
  );
}
