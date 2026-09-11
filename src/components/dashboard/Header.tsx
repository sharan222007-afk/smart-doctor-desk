import { ChevronDown, Hospital, Menu, UserRound } from "lucide-react";
import type { Doctor } from "@/types/clinical";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  doctor: Doctor;
  onToggleQueue: () => void;
}

export function Header({ doctor, onToggleQueue }: HeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onToggleQueue}
          aria-label="Toggle OPD queue"
        >
          <Menu className="size-5" />
        </Button>
        <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Hospital className="size-5" />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-foreground">AI Patient Assistant</p>
          <p className="text-xs text-muted-foreground">Tertiary Government Hospital</p>
        </div>
      </div>

      <div className="hidden text-center leading-tight md:block">
        <p className="text-sm font-semibold text-foreground">Doctor Dashboard</p>
        <p className="text-xs text-muted-foreground">Better information. Better care.</p>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 rounded-md border border-border px-2 py-1.5 text-left transition-colors hover:bg-secondary"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <UserRound className="size-4" />
        </span>
        <span className="hidden leading-tight sm:block">
          <span className="block text-sm font-medium text-foreground">{doctor.name}</span>
          <span className="block text-xs text-muted-foreground">{doctor.department}</span>
        </span>
        <ChevronDown className="size-4 text-muted-foreground" />
      </button>
    </header>
  );
}
