import type { DashboardMode } from "@/types/clinical";
import { Button } from "@/components/ui/button";

interface Props {
  mode: DashboardMode;
  editing: boolean;
  onToggleEdit: () => void;
  onVerifySave: () => void;
  onPrimaryAction: () => void;
}

const primaryLabel: Record<DashboardMode, string> = {
  allopathy: "Send to HIS / ABDM →",
  ayush: "Upload to NAMASTE Portal →",
  patient: "Send PDF to Patient",
};

export function BottomActionBar({
  mode,
  editing,
  onToggleEdit,
  onVerifySave,
  onPrimaryAction,
}: Props) {
  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border bg-card px-4 py-3">
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="size-2 rounded-full bg-success" aria-hidden />
        System Online
        <span className="hidden sm:inline">• Integrations run in demo/simulation mode</span>
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {mode === "patient" ? null : (
          <>
            <Button variant="outline" size="sm" onClick={onToggleEdit}>
              {editing ? "Finish Editing" : "Edit AI Data"}
            </Button>
            <Button variant="secondary" size="sm" onClick={onVerifySave}>
              Verify & Save
            </Button>
          </>
        )}
        <Button size="sm" onClick={onPrimaryAction}>
          {primaryLabel[mode]}
        </Button>
      </div>
    </div>
  );
}
