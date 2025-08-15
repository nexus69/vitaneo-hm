import { NextRequest } from "next/server";
import activitiesData from "@/data/activities.json";
import { weekToCsv } from "@/lib/configurator";
import type { Schedule } from "@/types";
export async function POST(req: NextRequest) {
  try {
    const { week, weekStart } = (await req.json()) as { week: Schedule; weekStart?: string };
    const csv = weekToCsv(week, activitiesData as any, weekStart);
    return new Response(csv, { status: 200, headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": 'attachment; filename="vitaneo-semaine.csv"' } });
  } catch (e) {
    return new Response("Requête invalide", { status: 400 });
  }
}
