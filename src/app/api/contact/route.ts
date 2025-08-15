import { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Contact/Devis reçu (MVP):", data);
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response(JSON.stringify({ ok: false }), { status: 400, headers: { "Content-Type": "application/json" } });
  }
}
