"use client";

import { Button } from "@/components/ui/button";
import type { Activity, Schedule } from "@/types";
import { weekToCsv } from "@/lib/configurator";

type Props = {
  week: Schedule;
  activities: Activity[];
  filename?: string;
};

export default function CsvDownloadButton({
  week,
  activities,
  filename = "vitaneo-semaine.csv",
}: Props) {
  const onDownload = () => {
    const csv = weekToCsv(week, activities);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Button type="button" onClick={onDownload} aria-label="Exporter la semaine au format CSV">
      Exporter en CSV
    </Button>
  );
}
