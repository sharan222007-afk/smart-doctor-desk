import { Check, CircleDashed } from "lucide-react";
import type { AIAnalysis } from "@/types/clinical";
import { SectionCard } from "./SectionCard";
import { cn } from "@/lib/utils";

export function AIAnalysisCard({ analysis }: { analysis: AIAnalysis }) {
  return (
    <SectionCard title="AI Analysis" subtitle="Information processed / completed">
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-semibold text-foreground">{analysis.percent}%</span>
        <span className="text-xs text-muted-foreground">
          {analysis.processed} of {analysis.total} information sections processed
        </span>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={analysis.percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Information sections processed"
      >
        <div className="h-full rounded-full bg-primary" style={{ width: `${analysis.percent}%` }} />
      </div>

      <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
        {analysis.sections.map((s) => {
          const done = s.status === "completed";
          return (
            <li
              key={s.label}
              className={cn(
                "flex items-center gap-2 rounded border px-2 py-1.5 text-sm",
                done
                  ? "border-success/25 bg-success-soft text-foreground"
                  : "border-dashed border-warning/40 bg-warning-soft text-muted-foreground",
              )}
            >
              {done ? (
                <Check className="size-4 shrink-0 text-success" />
              ) : (
                <CircleDashed className="size-4 shrink-0 text-warning" />
              )}
              {s.label}
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-[11px] text-muted-foreground">
        Demo state only — no AI analysis has actually been performed in this version.
      </p>
    </SectionCard>
  );
}
