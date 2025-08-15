"use client";

export default function CsvDownloadButton({
  data = [],
  fileName = "export.csv",
}: { data?: any[]; fileName?: string }) {
  const download = () => {
    const csv = "data:text/csv;charset=utf-8," +
      data.map(r => Object.values(r).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  return (
    <button onClick={download} className="rounded bg-azur px-4 py-2 text-white">
      Télécharger CSV
    </button>
  );
}
