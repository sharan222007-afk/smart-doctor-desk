import { Link, useLocation } from "@tanstack/react-router";
import { Building2, ChevronDown, HeartPulse, LogOut, Settings, ShieldCheck, Stethoscope, Users } from "lucide-react";
import { useState } from "react";
import { getHealthCentre } from "@/data/clinovaStore";

export function StaffLayout({ children }: { children: React.ReactNode }) {
  const centre = getHealthCentre();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const nav = [
    ["/staff", "Overview"],
    ["/staff/doctors", "Doctors"],
    ["/staff/staff", "Staff"],
    ["/staff/patients", "Patients"],
    ["/staff/digitize", "Digitization"],
  ] as const;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <Link to="/staff" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold">Clinova</span>
              <span className="block text-xs text-muted-foreground">Health Centre Portal</span>
            </span>
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2 text-left hover:bg-muted/40"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </span>
              <span className="hidden sm:block">
                <span className="block max-w-48 truncate text-sm font-medium">{centre.name}</span>
                <span className="block text-xs text-muted-foreground">{centre.id}</span>
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            {open && (
              <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-border bg-card p-2 shadow-lg">
                <div className="border-b border-border px-3 py-3">
                  <p className="text-sm font-semibold">{centre.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{centre.id} • {centre.location}</p>
                </div>
                <div className="py-1">
                  <Link to="/staff/health-centre" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground" onClick={() => setOpen(false)}>
                    <Building2 className="h-4 w-4" /> Health Centre Profile
                  </Link>
                  <button type="button" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground" onClick={() => setOpen(false)}>
                    <Settings className="h-4 w-4" /> Centre Settings
                  </button>
                  <button type="button" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground" onClick={() => setOpen(false)}>
                    <ShieldCheck className="h-4 w-4" /> Security & Access
                  </button>
                  <button type="button" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground" text-destructive onClick={() => setOpen(false)}>
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <nav className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 lg:px-8">
          {nav.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium ${
                location.pathname === to || (to === "/staff" && location.pathname === "/staff/")
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-10">{children}</main>
    </div>
  );
}
