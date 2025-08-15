"use client";

export default function ConfiguratorToolbar() {
  return (
    <div className="flex items-center gap-2 border rounded p-3">
      <button className="rounded border px-3 py-1">Réinitialiser</button>
      <button className="rounded bg-azur px-3 py-1 text-white">Valider</button>
    </div>
  );
}
