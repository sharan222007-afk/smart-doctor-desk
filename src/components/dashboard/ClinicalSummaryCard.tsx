import { Sparkles } from "lucide-react";
import type { ClinicalSummary } from "@/types/clinical";
import { SectionCard } from "./SectionCard";
import { Input } from "@/components/ui/input";

interface Props {
  summary: ClinicalSummary;
  editable: boolean;
  onChange: (summary: ClinicalSummary) => void;
}

export function ClinicalSummaryCard({ summary, editable, onChange }: Props) {
  const rows: { key: keyof ClinicalSummary; label: string }[] = [
    { key: "chiefComplaint", label: "Chief Complaint" },
    { key: "pastMedicalHistory", label: "Past Medical History" },
    { key: "currentMedication", label: "Current Medication" },
    { key: "allergies", label: "Allergies" },
  ];

  return (
    <SectionCard
      title="AI-Generated Clinical Summary"
      icon={<Sparkles className="size-4 text-primary" />}
      action={
        <span className="rounded border border-primary/30 bg-primary-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          AI extracted - physician verified
        </span>
      }
    >
      <dl className="grid gap-3 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.key}>
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {row.label}
            </dt>
            <dd className="mt-0.5">
              {editable ? (
                <Input
                  value={summary[row.key]}
                  aria-label={row.label}
                  onChange={(e) => onChange({ ...summary, [row.key]: e.target.value })}
                  className="h-8 text-sm"
                />
              ) : (
                <span className="text-sm text-foreground">{summary[row.key]}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 rounded border border-border bg-muted px-3 py-2 text-[11px] text-muted-foreground">
        Extracted by an automated assistant from patient-supplied information. Not a
        diagnosis and not authoritative until the treating physician verifies it.
      </p>
    </SectionCard>
  );
}
