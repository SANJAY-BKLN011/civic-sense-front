import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2 } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { TextField } from "@/components/common/form-field";
import { ErrorMessage } from "@/components/common/states";
import { Button } from "@/components/ui/button";
import { useCitizenAuth } from "@/lib/citizen-auth";
import { validateEmail } from "@/lib/validation";

export const Route = createFileRoute("/citizen/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Citizen Password — CivicSense" },
      { name: "description", content: "Request password reset instructions for your CivicSense citizen account." },
      { property: "og:title", content: "Reset Citizen Password — CivicSense" },
      { property: "og:description", content: "Request password reset instructions for your CivicSense citizen account." },
    ],
  }),
  component: CitizenForgotPassword,
});

function CitizenForgotPassword() {
  const { requestPasswordReset } = useCitizenAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    const emailError = validateEmail(email);
    setError(emailError);
    if (emailError) return;

    setSubmitting(true);
    try {
      await requestPasswordReset(email.trim());
      setSubmitted(true);
    } catch {
      setFormError("Unable to submit the request right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Forgot password"
      description="Enter the email linked to your citizen account and we'll show the next steps."
      footer={
        <>
          Remembered it?{" "}
          <Link to="/citizen/login" className="font-medium text-primary hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      {submitted ? (
        <div
          role="status"
          aria-live="polite"
          className="flex items-start gap-3 rounded-lg border border-border bg-muted/50 px-4 py-3"
        >
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              Password reset instructions have been requested.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              No email is actually sent yet — delivery will be added when accounts go live.
            </p>
          </div>
        </div>
      ) : (
        <>
          {formError ? <ErrorMessage title="Request failed" message={formError} /> : null}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <TextField
              id="forgot-email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={error}
              disabled={submitting}
            />
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Submitting…
                </>
              ) : (
                "Request reset instructions"
              )}
            </Button>
          </form>
        </>
      )}
    </AuthCard>
  );
}
