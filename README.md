# Vitanéo — v1 (FR-only, premium)

Site Next.js (App Router, TypeScript, `/src`), Tailwind, shadcn/ui (Radix), Framer Motion.  
Cible : seniors autonomes 55–75 & familles. **Service non médicalisé**.  
Objectifs v1 : conversion (devis/contact) & réassurance (SLA publics), configurateur semaine + simulateur éligibilité.

## Démarrage

### Prérequis
- Node 18+ (LTS), pnpm (recommandé) ou npm/yarn.

### Installation & run
```bash
pnpm i
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
```

### Variables d’environnement
Copier `.env.template` → `.env.local` et ajuster :
```
NEXT_PUBLIC_WHATSAPP=+21600000000
NEXT_PUBLIC_PHONE=+21600000000
NEXT_PUBLIC_EMAIL=contact@vitaneo.example
NEXT_PUBLIC_SALES_EMAIL=devis@vitaneo.example
NEXT_PUBLIC_SLA_HOURS=8h-20h, 7j/7 (heure de Paris)
```

## Recette & KPI
```bash
pnpm check:a11y:routes
pnpm check:lh
pnpm check:lh:mobile
```

<!-- trigger -->
