import { Stethoscope } from "lucide-react";
import type { Assessment, CaseRoutingStatus } from "@/types/clinical";
import { SectionCard } from "./SectionCard";
import { CaseRouting } from "./CaseRouting";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  assessment: Assessment;
  onChange: (assessment: Assessment) => void;
  routing: CaseRoutingStatus;
  onRoutingChange: (routing: CaseRoutingStatus) => void;
  readOnly: boolean;
}

const fields: { key: keyof Assessment; label: string; rows: number }[] = [
  { key: "diagnosis", label: "Diagnosis / Clinical Notes", rows: 3 },
  { key: "medicines", label: "Prescribed Medicines", rows: 3 },
  { key: "investigations", label: "Advised Investigations / Lab Tests", rows: 3 },
];

export function DoctorAssessment({
  assessment,
  onChange,
  routing,
  onRoutingChange,
  readOnly,
}: Props) {
  return (
    <SectionCard
      tone="assessment"
      title="Doctor's Final Assessment & Prescription"
      subtitle="Review AI data above. Enter final clinical notes to generate the official patient record."
      icon={<Stethoscope className="size-4 text-primary" />}
      action={
        <span className="rounded border border-primary/30 bg-card px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          {readOnly ? "Read-only in Patient View" : "Physician authored"}
        </span>
      }
    >
      <div className="grid gap-3 lg:grid-cols-3">
        {fields.map((f) => (
          <div key={f.key}>
            <label
              htmlFor={`assessment-${f.key}`}
              className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
            >
              {f.label}
            </label>
            <Textarea
              id={`assessment-${f.key}`}
              rows={f.rows}
              readOnly={readOnly}
              value={assessment[f.key]}
              onChange={(e) => onChange({ ...assessment, [f.key]: e.target.value })}
              className="mt-1 text-sm"
            />
          </div>
        ))}
      </div>

      {readOnly ? null : (
        <CaseRouting value={routing} onChange={onRoutingChange} />
      )}

      <p className="mt-3 text-[11px] text-muted-foreground">
        This section is the treating physician's authoritative record for the current visit,
        not automated output.
      </p>
    </SectionCard>
  );
}
