import { Lock } from "lucide-react";
import type { TimelineEvent } from "@/types/clinical";
import { SectionCard } from "./SectionCard";
import { cn } from "@/lib/utils";

interface Props {
  events: TimelineEvent[];
  onOpen: (event: TimelineEvent) => void;
}

export function PatientTimeline({ events, onOpen }: Props) {
  const previous = events.filter((e) => !e.current).length;

  return (
    <SectionCard
      title="Patient Timeline (Read-Only Historical Records)"
      subtitle={`${previous} Previous Consultations`}
    >
      <ol className="flex snap-x gap-3 overflow-x-auto pb-1">
        {events.map((event) => (
          <li key={event.id} className="w-64 shrink-0 snap-start">
            <button
              type="button"
              disabled={event.current}
              onClick={() => onOpen(event)}
              className={cn(
                "h-full w-full rounded border p-3 text-left transition-colors",
                event.current
                  ? "cursor-default border-primary bg-primary-soft"
                  : "border-border bg-muted/50 hover:border-primary/50 hover:bg-secondary",
              )}
            >
              <p className="text-sm font-semibold text-foreground">{event.date}</p>
              <p className="text-xs text-muted-foreground">{event.doctorName}</p>
              <ul className="mt-2 space-y-0.5">
                {event.lines.map((line) => (
                  <li key={line} className="text-sm text-foreground">
                    {line}
                  </li>
                ))}
              </ul>
              <span
                className={cn(
                  "mt-3 inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase",
                  event.current
                    ? "border-primary/30 bg-card text-primary"
                    : "border-success/30 bg-success-soft text-success",
                )}
              >
                {event.current ? null : <Lock className="size-3" />}
                {event.current ? "Current Visit" : "Verified (Read-Only)"}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Select a previous consultation to view its verified record.
      </p>
    </SectionCard>
  );
}
