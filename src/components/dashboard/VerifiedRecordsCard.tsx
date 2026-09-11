import { BadgeCheck, Lock } from "lucide-react";
import type { MedicalRecord } from "@/types/clinical";
import { SectionCard } from "./SectionCard";

export function VerifiedRecordsCard({ records }: { records: MedicalRecord[] }) {
  return (
    <SectionCard
      title="Previous Verified Medical Record (ABHA ID Sync)"
      subtitle="Automatically fetched from government health database (demo data)"
      icon={<Lock className="size-4" />}
    >
      <ul className="grid gap-2 sm:grid-cols-2">
        {records.map((r) => (
          <li
            key={r.id}
            className="flex items-start justify-between gap-3 rounded border border-border bg-muted/60 px-3 py-2"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{r.title}</p>
              <p className="text-xs text-muted-foreground">{r.detail}</p>
            </div>
            <span className="flex shrink-0 items-center gap-1 rounded border border-success/30 bg-success-soft px-1.5 py-0.5 text-[10px] font-semibold uppercase text-success">
              <BadgeCheck className="size-3" />
              {r.status}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Lock className="size-3" />
        Historical records are immutable and read-only. Demo data — no live ABHA connection.
      </p>
    </SectionCard>
  );
}
