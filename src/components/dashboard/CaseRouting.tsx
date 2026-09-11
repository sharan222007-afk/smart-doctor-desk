import type { CaseRoutingStatus } from "@/types/clinical";
import { cn } from "@/lib/utils";

interface Props {
  value: CaseRoutingStatus;
  onChange: (value: CaseRoutingStatus) => void;
  disabled?: boolean;
}

const options: {
  id: CaseRoutingStatus;
  heading: string;
  title: string;
  description: string;
}[] = [
  {
    id: "awaiting-lab",
    heading: "Awaiting Lab Reports",
    title: "Awaiting Lab Reports (Case Locked to Dr. Meera)",
    description:
      "Patient will return after tests. Case stays securely locked to Dr. Meera Sharma. Other doctors cannot claim this case.",
  },
  {
    id: "complete",
    heading: "Case Complete",
    title: "Case Complete / Discharged",
    description:
      "Finalize consultation. No further tests required. Case closed and removed from active queue.",
  },
];

export function CaseRouting({ value, onChange, disabled }: Props) {
  return (
    <fieldset disabled={disabled} className="mt-4">
      <legend className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        Case Routing Status & Doctor Lock
      </legend>
      <div className="mt-2 grid gap-2 md:grid-cols-2">
        {options.map((opt) => {
          const selected = value === opt.id;
          return (
            <label
              key={opt.id}
              className={cn(
                "flex cursor-pointer gap-2 rounded border p-3 transition-colors",
                selected
                  ? "border-primary bg-primary-soft ring-1 ring-primary/30"
                  : "border-border bg-card hover:bg-secondary",
                disabled && "cursor-not-allowed opacity-60",
              )}
            >
              <input
                type="radio"
                name="case-routing"
                className="mt-1 size-4 accent-[var(--primary)]"
                checked={selected}
                onChange={() => onChange(opt.id)}
              />
              <span>
                <span className="block text-sm font-semibold text-foreground">{opt.heading}</span>
                <span className="block text-xs font-medium text-foreground">{opt.title}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{opt.description}</span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
