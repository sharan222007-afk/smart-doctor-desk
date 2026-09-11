import { AlertOctagon, Info, ShieldCheck } from "lucide-react";
import type { AlertKind, DecisionSupportAlert } from "@/types/clinical";
import { SectionCard } from "./SectionCard";
import { cn } from "@/lib/utils";

const styles: Record<AlertKind, string> = {
  urgent: "border-urgent/30 bg-urgent-soft",
  verify: "border-warning/30 bg-warning-soft",
  info: "border-success/25 bg-success-soft",
};

const titleColor: Record<AlertKind, string> = {
  urgent: "text-urgent",
  verify: "text-warning",
  info: "text-success",
};

function AlertIcon({ kind }: { kind: AlertKind }) {
  if (kind === "urgent") return <AlertOctagon className="size-4 text-urgent" />;
  if (kind === "verify") return <ShieldCheck className="size-4 text-warning" />;
  return <Info className="size-4 text-success" />;
}

export function DecisionSupportCard({ alerts }: { alerts: DecisionSupportAlert[] }) {
  return (
    <SectionCard title="Doctor Instructions" subtitle="Decision support for physician review">
      <ul className="space-y-2">
        {alerts.map((a) => (
          <li
            key={a.id}
            className={cn("flex items-start gap-2 rounded border px-3 py-2", styles[a.kind])}
          >
            <AlertIcon kind={a.kind} />
            <div>
              <p
                className={cn(
                  "text-[11px] font-semibold uppercase tracking-wide",
                  titleColor[a.kind],
                )}
              >
                {a.title}
              </p>
              <p className="text-sm text-foreground">{a.detail}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Demonstration data. No clinical decision-support engine is running in this version.
      </p>
    </SectionCard>
  );
}
