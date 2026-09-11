import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { demoTranscript } from "@/data/demo";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function VoiceTranscriptModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Patient Voice Transcript</DialogTitle>
          <DialogDescription>
            Demo transcript — future Bhashini integration point. No external service is called.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Patient's Exact Spoken Words
            </p>
            <p className="mt-1 rounded border border-border bg-muted/60 p-3 text-sm leading-relaxed text-foreground">
              {demoTranscript.spoken}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              System Translated & Structured
            </p>
            <p className="mt-1 rounded border border-primary/30 bg-primary-soft p-3 text-sm text-foreground">
              {demoTranscript.translated}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
