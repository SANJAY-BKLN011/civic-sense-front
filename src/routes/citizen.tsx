import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { AppShell, type NavItem } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { CitizenAuthProvider, useCitizenAuth } from "@/lib/citizen-auth";

const citizenNav: NavItem[] = [
  { label: "Overview", to: "/citizen" },
  { label: "Dashboard", to: "/citizen/dashboard" },
  { label: "Report Issue", to: "/citizen/report" },
  { label: "My Complaints", to: "/citizen/complaints" },
];

export const Route = createFileRoute("/citizen")({
  component: CitizenLayout,
});

function CitizenAuthActions() {
  const { isAuthenticated, isReady, user, signOut } = useCitizenAuth();
  const navigate = useNavigate();

  if (!isReady) return null;

  if (isAuthenticated) {
    return (
      <>
        <span className="hidden max-w-[12rem] truncate text-sm text-muted-foreground sm:block">
          {user?.fullName || user?.email}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            signOut();
            void navigate({ to: "/citizen/login" });
          }}
        >
          Sign out
        </Button>
      </>
    );
  }

  return (
    <>
      <Button asChild variant="ghost" size="sm">
        <Link to="/citizen/login">Sign in</Link>
      </Button>
      <Button asChild size="sm">
        <Link to="/citizen/register">Register</Link>
      </Button>
    </>
  );
}

function CitizenLayout() {
  return (
    <CitizenAuthProvider>
      <AppShell subtitle="Citizen Portal" nav={citizenNav} actions={<CitizenAuthActions />}>
        <Outlet />
      </AppShell>
    </CitizenAuthProvider>
  );
}
