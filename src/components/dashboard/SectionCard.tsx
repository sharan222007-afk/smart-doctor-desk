import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  tone?: "default" | "assessment";
}

export function SectionCard({
  title,
  subtitle,
  icon,
  action,
  children,
  className,
  tone = "default",
}: SectionCardProps) {
  return (
    <section
      className={cn(
        "rounded-lg border border-border bg-card shadow-sm",
        tone === "assessment" && "border-primary/40 ring-1 ring-primary/10",
        className,
      )}
    >
      <header
        className={cn(
          "flex flex-wrap items-start justify-between gap-2 border-b border-border px-4 py-3",
          tone === "assessment" && "bg-primary-soft",
        )}
      >
        <div className="flex items-start gap-2">
          {icon ? <span className="mt-0.5 text-muted-foreground">{icon}</span> : null}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-foreground">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
            ) : null}
          </div>
        </div>
        {action}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}
