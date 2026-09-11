import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/staff")({ component: StaffShell });

function StaffShell() {
  return <Outlet />;
}
