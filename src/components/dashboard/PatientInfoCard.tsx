import type { Patient } from "@/types/clinical";

interface Props {
  patient: Patient;
}

export function PatientInfoCard({ patient }: Props) {
  const fields = [
    { label: "Age", value: String(patient.age) },
    { label: "Gender", value: patient.gender },
    { label: "Patient ID", value: patient.id },
    { label: "Language", value: patient.language },
    { label: "Visit Date", value: patient.visitDate },
  ];

  return (
    <section className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
        <div className="md:border-r md:border-border md:pr-8">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Name
          </p>
          <p className="text-lg font-semibold text-foreground">{patient.name}</p>
        </div>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:flex lg:flex-1 lg:justify-between">
          {fields.map((f) => (
            <div key={f.label}>
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {f.label}
              </dt>
              <dd className="text-sm font-medium text-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
