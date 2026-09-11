import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/staff/patients")({ component: PatientsShell });

function PatientsShell() {
  return <Outlet />;
}
