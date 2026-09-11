import { Mic } from "lucide-react";
import type { DashboardMode } from "@/types/clinical";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const modes: { id: DashboardMode; label: string }[] = [
  { id: "allopathy", label: "Allopathy (MBBS)" },
  { id: "ayush", label: "AYUSH Mode" },
  { id: "patient", label: "Patient View" },
];

interface ModeTabsProps {
  mode: DashboardMode;
  onChange: (mode: DashboardMode) => void;
  onOpenTranscript: () => void;
}

export function ModeTabs({ mode, onChange, onOpenTranscript }: ModeTabsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div
        role="tablist"
        aria-label="Dashboard mode"
        className="inline-flex flex-wrap gap-1 rounded-md border border-border bg-card p-1"
      >
        {modes.map((m) => (
          <button
            key={m.id}
            role="tab"
            type="button"
            aria-selected={mode === m.id}
            onClick={() => onChange(m.id)}
            className={cn(
              "rounded px-3 py-1.5 text-sm font-medium transition-colors",
              mode === m.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={onOpenTranscript}>
        <Mic className="size-4" />
        Open Patient Voice Transcript
      </Button>
    </div>
  );
}
