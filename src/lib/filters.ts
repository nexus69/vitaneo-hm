import type { Assistant } from "@/types";
export type AssistFilters = { language?: string; role?: string; skill?: string; q?: string };
export function uniqueLanguages(list: Assistant[]) { return Array.from(new Set(list.flatMap(a => a.languages))); }
export function uniqueRoles(list: Assistant[]) { return Array.from(new Set(list.map(a => a.role))); }
export function uniqueSkills(list: Assistant[]) { return Array.from(new Set(list.flatMap(a => a.skills))); }
export function filterAssistants(list: Assistant[], f: AssistFilters) {
  return list.filter(a => {
    const okLang = !f.language || a.languages.includes(f.language);
    const okRole = !f.role || a.role === f.role;
    const okSkill = !f.skill || a.skills.includes(f.skill);
    const q = (f.q || "").trim().toLowerCase();
    const okQ = !q || [a.name, a.role, ...a.skills].join(" ").toLowerCase().includes(q);
    return okLang && okRole && okSkill && okQ;
  });
}
