import { AlertTriangle, ClipboardList } from "lucide-react";
import type { MissingItem } from "@/types/clinical";
import { Button } from "@/components/ui/button";
import { SectionCard } from "./SectionCard";

interface Props {
  items: MissingItem[];
  onCollect: () => void;
}

export function MissingInformationCard({ items, onCollect }: Props) {
  return (
    <SectionCard
      title="Missing / Needs Attention"
      subtitle="Additional information required for complete analysis"
      icon={<AlertTriangle className="size-4 text-warning" />}
    >
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.label}
            className="rounded border border-warning/30 bg-warning-soft px-3 py-2"
          >
            <p className="text-sm font-medium text-foreground">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.reason}</p>
          </li>
        ))}
      </ul>
      <Button variant="outline" size="sm" className="mt-3 w-full" onClick={onCollect}>
        <ClipboardList className="size-4" />
        Collect Information (Staff Assistance)
      </Button>
    </SectionCard>
  );
}
