import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { AppShell, type NavItem } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";

const citizenNav: NavItem[] = [
  { label: "Overview", to: "/citizen" },
  { label: "Dashboard", to: "/citizen/dashboard" },
  { label: "Report Issue", to: "/citizen/report" },
  { label: "My Complaints", to: "/citizen/complaints" },
];

export const Route = createFileRoute("/citizen")({
  component: CitizenLayout,
});

function CitizenLayout() {
  return (
    <AppShell
      subtitle="Citizen Portal"
      nav={citizenNav}
      actions={
        <>
          <Button asChild variant="ghost" size="sm">
            <Link to="/citizen/login">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/citizen/register">Register</Link>
          </Button>
        </>
      }
    >
      <Outlet />
    </AppShell>
  );
}
