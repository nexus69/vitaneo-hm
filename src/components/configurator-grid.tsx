"use client";

import { useMemo, useState } from "react";
import activitiesData from "@/data/activities.json";
import type {
  Activity,
  DayIndex,
  Schedule,
  Slot,
  ActivityCategory,
  ActivityIntensity,
} from "@/types";
import { Button } from "@/components/ui/button";
import { canPlace, setActivityIndex } from "@/lib/configurator";
import { DAYS_FR } from "@/lib/formatting";
import { cn } from "@/lib/utils";

type Props = { week: Schedule; setWeek: (w: Schedule) => void };

// Filtres
const categories: ActivityCategory[] = [
  "Mouvement",
  "Mer & plein air",
  "Culture & artisanat",
  "Bien-être & cuisine",
  "Social & sorties",
];
const intensities: ActivityIntensity[] = ["Zen", "Tonus", "Élan"];
type FilterCat = ActivityCategory | "Toutes";
type FilterInt = ActivityIntensity | "Toutes";

export default function ConfiguratorGrid({ week, setWeek }: Props) {
  const activities = activitiesData as Activity[];

  const [selected, setSelected] = useState<Activity | null>(null);
  const [cat, setCat] = useState<FilterCat>("Toutes");
  const [inten, setInten] = useState<FilterInt>("Toutes");
  const [msg, setMsg] = useState<string | null>(null);

  useMemo(() => setActivityIndex(activities), [activities]);

  const list = activities.filter(
    (a) => (cat === "Toutes" || a.category === cat) && (inten === "Toutes" || a.intensity === inten)
  );

  function place(day: DayIndex, slot: Slot) {
    setMsg(null);
    if (!selected) return setMsg("Sélectionnez d’abord une activité.");
    const check = canPlace(week, day, slot, selected);
    if (!check.ok) {
      setMsg(check.reason || "Impossible de placer cette activité.");
      return;
    }
    const next = structuredClone(week);
    next[day][slot].activityId = selected.id;
    if (slot === "PM" && selected.location === "off-site") {
      next[day].EV.activityId = null;
    }
    setWeek(next);
  }

  function remove(day: DayIndex, slot: Slot) {
    setMsg(null);
    const next = structuredClone(week);
    next[day][slot].activityId = null;
    setWeek(next);
  }

  function selectedLabel(a: Activity | null) {
    if (!a) return "Aucune sélection";
    return `${a.title} • ${a.intensity} • ${a.category}`;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
      {/* Colonne de gauche : liste + filtres */}
      <aside className="rounded-2xl border border-ligne bg-white p-4 shadow-elev1">
        <h3 className="text-h3 text-mer">Activités</h3>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <select
            aria-label="Filtrer par catégorie"
            className="rounded-xl border border-ligne p-2"
            value={cat}
            onChange={(e) => setCat(e.target.value as FilterCat)}
          >
            <option value="Toutes">Toutes catégories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            aria-label="Filtrer par intensité"
            className="rounded-xl border border-ligne p-2"
            value={inten}
            onChange={(e) => setInten(e.target.value as FilterInt)}
          >
            <option value="Toutes">Toutes intensités</option>
            {intensities.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <p className="mt-2 text-p2 text-ardoise">
          Sélection actuelle : <em>{selectedLabel(selected)}</em>
        </p>

        <ul className="mt-3 max-h-[50vh] space-y-2 overflow-auto" aria-label="Liste des activités">
          {list.map((a) => (
            <li key={a.id}>
              <button
                className={cn(
                  "w-full rounded-xl border border-ligne p-3 text-left hover:bg-jasmin/60",
                  selected?.id === a.id && "bg-jasmin/60 ring-2 ring-azur"
                )}
                onClick={() => setSelected(a)}
                aria-pressed={selected?.id === a.id}
                aria-label={`Choisir l’activité ${a.title}`}
              >
                <div className="font-medium text-mer">{a.title}</div>
                <div className="text-p2 text-ardoise">
                  {a.category} • {a.intensity} • {a.duration_min} min •{" "}
                  {a.location === "off-site" ? "Hors-site" : "Sur place"}
                  {a.surcharge_eur ? ` • +${a.surcharge_eur}€` : ""}
                </div>
              </button>
            </li>
          ))}
        </ul>

        {msg && (
          <p role="alert" className="mt-3 rounded-xl bg-jasmin/60 p-2 text-ardoise">
            ⚠️ {msg}
          </p>
        )}
      </aside>

      {/* Grille 7×3 */}
      <div className="overflow-x-auto rounded-2xl border border-ligne bg-white p-4 shadow-elev1">
        <table className="w-full min-w-[760px]" role="grid" aria-label="Grille de la semaine">
          <thead>
            <tr>
              <th className="p-2 text-left text-ardoise">Créneau</th>
              {DAYS_FR.map((d, i) => (
                <th key={i} className="p-2 text-left text-ardoise">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(["AM", "PM", "EV"] as Slot[]).map((slot) => (
              <tr key={slot} className="border-t border-ligne">
                <th scope="row" className="p-2 text-left text-ardoise">
                  {slot === "AM"
                    ? "Matin (09:00–11:30)"
                    : slot === "PM"
                    ? "Après-midi (15:00–17:30)"
                    : "Soirée (19:00–21:00)"}
                </th>

                {(Array.from({ length: 7 }, (_, i) => i) as DayIndex[]).map((day) => {
                  const id = week[day][slot].activityId;
                  const act = activities.find((a) => a.id === id) || null;

                  const blockedEV =
                    slot === "EV" &&
                    week[day]["PM"].activityId &&
                    activities.find((a) => a.id === week[day]["PM"].activityId)?.location ===
                      "off-site";

                  return (
                    <td key={`${slot}-${day}`} className={cn("p-2 align-top", blockedEV && "opacity-60")}>
                      <div className="min-h-[90px] rounded-xl border border-ligne p-3">
                        {act ? (
                          <div>
                            <div className="font-medium text-mer">{act.title}</div>
                            <div className="text-p2 text-ardoise">
                              {act.category} • {act.intensity}
                              {act.surcharge_eur ? ` • +${act.surcharge_eur}€` : ""}
                            </div>
                            <div className="mt-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                aria-label="Retirer cette activité"
                                onClick={() => remove(day, slot)}
                              >
                                Retirer
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => place(day, slot)}
                            aria-label={`Ajouter une activité le ${DAYS_FR[day]} (${slot})`}
                          >
                            Ajouter
                          </Button>
                        )}
                        {blockedEV && !act && (
                          <div className="mt-2 text-[12px] text-ardoise">Bloqué : PM hors-site.</div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-3 text-p2 text-ardoise">
          Règles : 1 activité/slot • PM hors-site bloque EV • alerte de charge si semaine trop dense.
        </p>
      </div>
    </div>
  );
}
