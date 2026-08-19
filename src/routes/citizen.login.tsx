import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { PasswordField } from "@/components/auth/password-field";
import { TextField } from "@/components/common/form-field";
import { ErrorMessage } from "@/components/common/states";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCitizenAuth } from "@/lib/citizen-auth";
import { validateEmail, validatePassword } from "@/lib/validation";

export const Route = createFileRoute("/citizen/login")({
  head: () => ({
    meta: [
      { title: "Citizen Sign In — CivicSense" },
      { name: "description", content: "Sign in to your CivicSense citizen account to report civic issues and track their resolution." },
      { property: "og:title", content: "Citizen Sign In — CivicSense" },
      { property: "og:description", content: "Sign in to your CivicSense citizen account to report civic issues and track their resolution." },
    ],
  }),
  component: CitizenLogin,
});

function CitizenLogin() {
  const navigate = useNavigate();
  const { signIn } = useCitizenAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const nextErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    setSubmitting(true);
    try {
      await signIn({ email: email.trim(), password, remember });
      await navigate({ to: "/citizen/dashboard" });
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Unable to sign in right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Sign in"
      description="Access your citizen account to report issues and follow their progress."
      footer={
        <>
          New to CivicSense?{" "}
          <Link to="/citizen/register" className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      {formError ? <ErrorMessage title="Sign in failed" message={formError} /> : null}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <TextField
          id="login-email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
          disabled={submitting}
        />

        <PasswordField
          id="login-password"
          label="Password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          disabled={submitting}
          placeholder="Your password"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="login-remember"
              checked={remember}
              onCheckedChange={(checked) => setRemember(checked === true)}
              disabled={submitting}
            />
            <Label htmlFor="login-remember" className="text-sm font-normal text-muted-foreground">
              Remember me
            </Label>
          </div>
          <Link
            to="/citizen/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </Button>

        <p className="text-xs text-muted-foreground">
          Prototype interface: no account data is sent anywhere. Any email with a password of at
          least 6 characters signs you in locally.
        </p>
      </form>
    </AuthCard>
  );
}
