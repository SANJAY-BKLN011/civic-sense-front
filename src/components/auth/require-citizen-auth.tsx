import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { EmptyState, LoadingState } from "@/components/common/states";
import { Button } from "@/components/ui/button";
import { useCitizenAuth } from "@/lib/citizen-auth";

/**
 * Frontend gate for citizen pages that will require a real session later.
 * Today it reads the mock auth state only — no server-side protection exists.
 */
export function RequireCitizenAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, isReady } = useCitizenAuth();

  if (!isReady) {
    return <LoadingState label="Checking your session…" />;
  }

  if (!isAuthenticated) {
    return (
      <EmptyState
        icon={<Lock className="size-5" aria-hidden="true" />}
        title="Sign in to continue"
        description="This page is part of the citizen account area. Sign in or create an account to view it."
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <Button asChild size="sm">
              <Link to="/citizen/login">Sign in</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/citizen/register">Register</Link>
            </Button>
          </div>
        }
      />
    );
  }

  return <>{children}</>;
}
