import type { Assistant, Leader } from "@/types";
export function personJsonLd(p: Pick<Assistant | Leader, "name" | "role" | "photo" | "languages">, imageAbsUrl?: string) {
  const img = imageAbsUrl || (p as any).photo?.src;
  return { "@context":"https://schema.org", "@type":"Person", "name": p.name, "jobTitle": p.role, "worksFor": { "@type":"Organization", "name":"Vitanéo" }, "knowsLanguage": (p.languages as any).map((l: string) => l.toLowerCase().slice(0,2)), "image": img };
}
