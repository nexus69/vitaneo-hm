import Link from "next/link";
export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-ligne bg-white">
      <div className="container py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="text-mer font-semibold text-lg">Vitanéo</div>
          <p className="mt-2 text-ardoise text-p2">
            Vitanéo n’est pas un établissement médical. Aucun acte de soins ; en cas de besoin, RDV santé &lt; 24 h via partenaires.
            Urgence : 198 / 112.
          </p>
        </div>
        <nav className="grid gap-2">
          <Link className="hover:underline" href="/vitaneo/a-propos">À propos</Link>
          <Link className="hover:underline" href="/nos-resultats">Nos résultats (SLA)</Link>
          <Link className="hover:underline" href="/blog">Blog</Link>
          <Link className="hover:underline" href="/glossaire">Glossaire</Link>
        </nav>
        <nav className="grid gap-2">
          <Link className="hover:underline" href="/legal/mentions">Mentions légales</Link>
          <Link className="hover:underline" href="/legal/confidentialite">Confidentialité</Link>
          <Link className="hover:underline" href="/legal/cookies">Cookies</Link>
          <Link className="hover:underline" href="/faq-contact">FAQ & Contact</Link>
        </nav>
      </div>
      <div className="border-t border-ligne py-4 text-center text-p2 text-ardoise">© {new Date().getFullYear()} Vitanéo — Tous droits réservés.</div>
    </footer>
  );
}
