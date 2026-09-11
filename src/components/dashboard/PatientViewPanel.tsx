import type { Patient } from "@/types/clinical";
import { patientViewContent } from "@/data/demo";
import { SectionCard } from "./SectionCard";

export function PatientViewPanel({ patient }: { patient: Patient }) {
  const rows = [
    { label: "మీ సమస్య / Complaint", value: patientViewContent.complaint },
    { label: "గత అనారోగ్యం / History", value: patientViewContent.history },
    { label: "మందులు / Medication", value: patientViewContent.medication },
  ];

  return (
    <SectionCard
      title="Patient View (Read-Only)"
      subtitle={`${patient.name} • ${patient.language} • Demo content`}
    >
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.label} className="rounded border border-border bg-muted/60 px-3 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {r.label}
            </p>
            <p className="mt-1 text-base leading-relaxed text-foreground">{r.value}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Simplified summary for the patient. Demo content only.
      </p>
    </SectionCard>
  );
}
