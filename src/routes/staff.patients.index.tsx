import { createFileRoute, Link } from "@tanstack/react-router";
import { FilePlus2, Search, UserPlus, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { StaffLayout } from "@/components/portal/StaffLayout";
import { getPatients, type ClinovaPatient } from "@/data/clinovaStore";

export const Route = createFileRoute("/staff/patients/")({
  component: PatientManagement,
});

function PatientManagement() {
  const patients = getPatients();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return patients.filter((patient) =>
      !q
        ? true
        : `${patient.id} ${patient.name} ${patient.mobile} ${patient.currentComplaint}`
            .toLowerCase()
            .includes(q),
    );
  }, [patients, search]);

  return (
    <StaffLayout>
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-primary">PATIENT DIRECTORY</p>
          <h1 className="mt-2 text-3xl font-semibold">Patients</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Create a patient identity and optionally start staff-assisted
            history digitization.
          </p>
        </div>

        <Link
          to="/staff/patients/register"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <UserPlus className="h-4 w-4" />
          Register Patient
        </Link>
      </div>

      <section className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-4 border-b border-border p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-semibold">Patient Records</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {patients.length} patient identities in this centre
            </p>
          </div>

          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search patient or ID"
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 pl-9 text-sm outline-none"
            />
          </div>
        </div>

        <div className="divide-y divide-border">
          {filtered.map((patient) => (
            <PatientRow key={patient.id} patient={patient} />
          ))}

          {!filtered.length && (
            <div className="p-10 text-center text-sm text-muted-foreground">
              No patient records match your search.
            </div>
          )}
        </div>
      </section>
    </StaffLayout>
  );
}

function PatientRow({ patient }: { patient: ClinovaPatient }) {
  const queueStatus =
    patient.visitStatus === "in-consultation"
      ? "In consultation"
      : patient.visitStatus === "completed"
        ? "Completed"
        : "Waiting";

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserRound className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-semibold">{patient.name}</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {patient.age} • {patient.gender} • {patient.language}
            </p>

            <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <b className="text-foreground">{patient.id}</b>
              <span>OPD Queue • {queueStatus}</span>
              <span>
                {patient.historyCompleted
                  ? "History completed"
                  : "History pending"}
              </span>
            </div>
          </div>
        </div>

        <Link
          to="/staff/digitize"
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          <FilePlus2 className="h-4 w-4" />
          Digitize
        </Link>
      </div>
    </div>
  );
}
