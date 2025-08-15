"use client";

interface CsvDownloadButtonProps {
  data?: any[];
  fileName?: string;
}

export default function CsvDownloadButton({
  data = [],
  fileName = "export.csv",
}: CsvDownloadButtonProps) {
  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      data.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="rounded bg-azur px-4 py-2 text-white"
    >
      Télécharger CSV
    </button>
  );
}
