import { FileText } from "lucide-react";
import type { ClinicalDocument } from "@/types/clinical";
import { SectionCard } from "./SectionCard";

interface Props {
  complaint: string;
  documents: ClinicalDocument[];
}

export function CurrentVisitCard({ complaint, documents }: Props) {
  return (
    <SectionCard title="Current Visit" subtitle="New information from this consultation">
      <div className="rounded border border-primary/30 bg-primary-soft px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            New Complaint
          </p>
          <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold uppercase text-primary-foreground">
            New
          </span>
        </div>
        <p className="text-sm text-foreground">{complaint}</p>
      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        Uploaded Documents (OCR Scanned)
      </p>
      <ul className="mt-1.5 space-y-1.5">
        {documents.map((doc) => (
          <li
            key={doc.id}
            className="flex items-center gap-2 rounded border border-border bg-muted/60 px-3 py-2"
          >
            <FileText className="size-4 text-urgent" />
            <span className="text-sm text-foreground">{doc.fileName}</span>
            <span className="ml-auto text-[11px] text-muted-foreground">{doc.note}</span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
