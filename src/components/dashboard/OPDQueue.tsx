import { useMemo, useState } from "react";
import { Lock, Search } from "lucide-react";
import type { Patient, TriageLevel } from "@/types/clinical";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const triageLabel: Record<TriageLevel, string> = {
  routine: "Routine",
  moderate: "Moderate",
  high: "High Risk",
};

const triageClass: Record<TriageLevel, string> = {
  routine: "bg-secondary text-secondary-foreground border-border",
  moderate: "bg-warning-soft text-warning border-warning/30",
  high: "bg-urgent-soft text-urgent border-urgent/30",
};

interface QueueProps {
  patients: Patient[];
  selectedId: string;
  onSelect: (patient: Patient) => void;
}

export function OPDQueue({ patients, selectedId, onSelect }: QueueProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.complaint.toLowerCase().includes(q),
    );
  }, [patients, query]);

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">
          OPD Waiting Queue (Triage)
        </h2>
        <div className="relative mt-2">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patient name or ID"
            aria-label="Search patients"
            className="h-9 pl-8 text-sm"
          />
        </div>
      </div>

      <ul className="flex-1 space-y-2 overflow-y-auto p-3">
        {filtered.map((patient) => (
          <PatientQueueItem
            key={patient.id}
            patient={patient}
            selected={patient.id === selectedId}
            onSelect={onSelect}
          />
        ))}
        {filtered.length === 0 ? (
          <li className="px-1 py-6 text-center text-sm text-muted-foreground">
            No patients match this search.
          </li>
        ) : null}
      </ul>
    </div>
  );
}

function PatientQueueItem({
  patient,
  selected,
  onSelect,
}: {
  patient: Patient;
  selected: boolean;
  onSelect: (patient: Patient) => void;
}) {
  const locked = patient.assignment.kind === "locked";

  return (
    <li>
      <button
        type="button"
        disabled={locked}
        aria-current={selected ? "true" : undefined}
        onClick={() => onSelect(patient)}
        className={cn(
          "w-full rounded-md border border-border bg-card p-3 text-left transition-colors",
          !locked && "hover:border-primary/50 hover:bg-primary-soft",
          selected && "border-primary bg-primary-soft ring-1 ring-primary/30",
          locked && "cursor-not-allowed bg-muted/60 opacity-80",
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-foreground">{patient.name}</p>
          <span
            className={cn(
              "shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase",
              triageClass[patient.triage],
            )}
          >
            {triageLabel[patient.triage]}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {patient.age} Yrs • {patient.gender}
          {patient.assignment.kind === "active" ? ` • ID: ${patient.id}` : ""}
        </p>
        <p className="mt-1.5 text-xs text-foreground">{patient.complaint}</p>

        <p
          className={cn(
            "mt-2 flex items-center gap-1 border-t border-border pt-2 text-[11px] font-medium",
            patient.assignment.kind === "active" && "text-primary",
            locked && "text-urgent",
            patient.assignment.kind === "assigned" && "text-muted-foreground",
          )}
        >
          {locked ? <Lock className="size-3" /> : null}
          {assignmentLabel(patient)}

        </p>
        {locked ? (
          <p className="mt-1 text-[11px] text-muted-foreground">
            You cannot claim this case.
          </p>
        ) : null}
      </button>
    </li>
  );
}

function assignmentLabel(patient: Patient) {
  const a = patient.assignment;
  if (a.kind === "active") return `Active: ${a.doctorName}`;
  if (a.kind === "locked")
    return `Case Locked: ${a.doctorName}${a.note ? ` (${a.note})` : ""}`;
  return `Assigned: ${a.doctorName}`;
}
