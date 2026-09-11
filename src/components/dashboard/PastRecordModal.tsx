import { Lock } from "lucide-react";
import type { TimelineEvent } from "@/types/clinical";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  event: TimelineEvent | null;
  onClose: () => void;
}

export function PastRecordModal({ event, onClose }: Props) {
  return (
    <Dialog open={!!event} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verified Past Record (Read-Only)</DialogTitle>
          <DialogDescription>
            This consultation record is locked and cannot be edited.
          </DialogDescription>
        </DialogHeader>

        {event ? (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Date
                </p>
                <p className="text-sm text-foreground">{event.date}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Verifying Physician
                </p>
                <p className="text-sm text-foreground">{event.doctorName}</p>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Physician Verified Assessment
              </p>
              <p className="mt-1 rounded border border-border bg-muted/60 p-3 text-sm text-foreground">
                {event.assessment}
              </p>
            </div>
            <p className="flex items-center gap-1.5 rounded border border-border bg-secondary px-3 py-2 text-xs text-muted-foreground">
              <Lock className="size-3.5" />
              Read-only historical record — editing is disabled.
            </p>
          </div>
        ) : null}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
