import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { AppShell, type NavItem } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";

const officerNav: NavItem[] = [
  { label: "Overview", to: "/officer" },
  { label: "Dashboard", to: "/officer/dashboard" },
  { label: "Complaints", to: "/officer/complaints" },
  { label: "Profile", to: "/officer/profile" },
];

export const Route = createFileRoute("/officer")({
  component: OfficerLayout,
});

function OfficerLayout() {
  return (
    <AppShell
      subtitle="Officer Portal"
      nav={officerNav}
      actions={
        <>
          <Button asChild variant="ghost" size="sm">
            <Link to="/officer/login">Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/officer/register">Register</Link>
          </Button>
        </>
      }
    >
      <Outlet />
    </AppShell>
  );
}
