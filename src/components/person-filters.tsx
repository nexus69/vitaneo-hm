"use client";
import { useState } from "react";
import type { Assistant } from "@/types";
import { uniqueLanguages, uniqueRoles, uniqueSkills } from "@/lib/filters";
import { Button } from "@/components/ui/button";
type Props = { data: Assistant[]; onChange: (f: { language?: string; role?: string; skill?: string; q?: string }) => void; };
export default function PersonFilters({ data, onChange }: Props) {
  const [language, setLanguage] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [skill, setSkill] = useState<string>("");
  const [q, setQ] = useState<string>("");
  const langs = uniqueLanguages(data);
  const roles = uniqueRoles(data);
  const skills = uniqueSkills(data);
  function apply() { onChange({ language: language || undefined, role: role || undefined, skill: skill || undefined, q: q || undefined }); }
  function reset() { setLanguage(""); setRole(""); setSkill(""); setQ(""); onChange({}); }
  return (
    <div className="grid gap-2 md:grid-cols-4">
      <input aria-label="Rechercher" placeholder="Rechercher (nom, rôle, compétence)" className="rounded-xl border border-ligne p-2" value={q} onChange={e => setQ(e.target.value)} />
      <select aria-label="Filtrer par langue" className="rounded-xl border border-ligne p-2" value={language} onChange={e => setLanguage(e.target.value)}>
        <option value="">Toutes langues</option>{langs.map(l => <option key={l} value={l}>{l}</option>)}
      </select>
      <select aria-label="Filtrer par rôle" className="rounded-xl border border-ligne p-2" value={role} onChange={e => setRole(e.target.value)}>
        <option value="">Tous rôles</option>{roles.map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      <select aria-label="Filtrer par compétence" className="rounded-xl border border-ligne p-2" value={skill} onChange={e => setSkill(e.target.value)}>
        <option value="">Toutes compétences</option>{skills.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <div className="md:col-span-4 flex gap-2">
        <Button onClick={apply}>Appliquer</Button>
        <Button variant="outline" onClick={reset}>Réinitialiser</Button>
      </div>
    </div>
  );
}
