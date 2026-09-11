import { ChevronDown, Hospital, Menu, UserRound, ShieldCheck, LogOut, X, Pencil } from "lucide-react";
import { useState } from "react";
import type { Doctor } from "@/types/clinical";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  doctor: Doctor;
  onToggleQueue: () => void;
}

export function Header({ doctor, onToggleQueue }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const doctorData = doctor as Doctor & {
    qualification?: string;
    specialization?: string;
    registrationNumber?: string;
    mobile?: string;
    email?: string;
    language?: string;
    healthCentreId?: string;
  };

  function openProfile() {
    setOpen(false);
    setProfileOpen(true);
  }

  return (
    <>
      <header className="relative z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-card px-4 lg:px-6">
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

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-1.5 text-left transition-colors hover:bg-secondary"
            aria-expanded={open}
            aria-label="Open doctor account menu"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <UserRound className="size-4" />
            </span>

            <span className="hidden leading-tight sm:block">
              <span className="block max-w-[170px] truncate text-sm font-medium text-foreground">
                {doctor.name}
              </span>
              <span className="block text-xs text-muted-foreground">
                {doctor.department}
              </span>
            </span>

            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-40 cursor-default"
                aria-label="Close doctor account menu"
                onClick={() => setOpen(false)}
              />

              <div className="absolute right-0 top-12 z-50 w-[320px] overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="border-b border-border px-5 py-4">
                  <p className="font-semibold text-foreground">{doctor.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{doctor.department}</p>
                  <p className="mt-1 text-xs font-semibold text-primary">
                    Doctor ID: {doctor.id}
                  </p>
                </div>

                <div className="p-2">
                  <button
                    type="button"
                    onClick={openProfile}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-secondary"
                  >
                    <UserRound className="size-5 text-muted-foreground" />
                    <span>
                      <span className="block text-sm font-medium text-foreground">
                        Doctor Profile
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        View professional account details
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-secondary"
                  >
                    <ShieldCheck className="size-5 text-muted-foreground" />
                    <span>
                      <span className="block text-sm font-medium text-foreground">
                        Security & Access
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        Authentication and access settings
                      </span>
                    </span>
                  </button>

                  <div className="my-1 border-t border-border" />

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-muted-foreground hover:bg-secondary"
                  >
                    <LogOut className="size-5" />
                    <span>
                      <span className="block text-sm font-medium">Sign out</span>
                      <span className="block text-xs">
                        Sign out will be connected to authentication
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      {profileOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/30 p-4 pt-20">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close doctor profile"
            onClick={() => setProfileOpen(false)}
          />

          <section className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-start justify-between border-b border-border px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UserRound className="size-7" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-foreground">{doctor.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {doctorData.specialization || doctor.department} • {doctor.department}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-primary">
                    Doctor ID: {doctor.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                aria-label="Close profile"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <ProfileField label="Full name" value={doctor.name} />
              <ProfileField label="Department" value={doctor.department} />
              <ProfileField label="Qualification" value={doctorData.qualification} />
              <ProfileField label="Specialization" value={doctorData.specialization} />
              <ProfileField label="Medical registration number" value={doctorData.registrationNumber} />
              <ProfileField label="Preferred language" value={doctorData.language} />
              <ProfileField label="Mobile number" value={doctorData.mobile} />
              <ProfileField label="Official email" value={doctorData.email} />
              <ProfileField label="Health Centre" value="Tertiary Government Hospital" />
              <ProfileField label="Health Centre ID" value={doctorData.healthCentreId || "HC-GJ-00001"} />
            </div>

            <div className="flex items-center justify-between border-t border-border bg-secondary/30 px-6 py-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-4" />
                Logged-in doctor account
              </div>
              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function ProfileField({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium text-foreground">
        {value || "Not provided"}
      </p>
    </div>
  );
}
