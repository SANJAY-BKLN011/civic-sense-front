import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { AuthCard } from "@/components/auth/auth-card";
import { PasswordField } from "@/components/auth/password-field";
import { TextField } from "@/components/common/form-field";
import { ErrorMessage } from "@/components/common/states";
import { Button } from "@/components/ui/button";
import { useCitizenAuth } from "@/lib/citizen-auth";
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validatePhone,
} from "@/lib/validation";

export const Route = createFileRoute("/citizen/register")({
  head: () => ({
    meta: [
      { title: "Citizen Registration — CivicSense" },
      { name: "description", content: "Create a CivicSense citizen account to report civic issues and track their resolution." },
      { property: "og:title", content: "Citizen Registration — CivicSense" },
      { property: "og:description", content: "Create a CivicSense citizen account to report civic issues and track their resolution." },
    ],
  }),
  component: CitizenRegister,
});

interface FieldErrors {
  fullName?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  password?: string | undefined;
  confirmPassword?: string | undefined;
}

function CitizenRegister() {
  const navigate = useNavigate();
  const { signUp } = useCitizenAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const nextErrors: FieldErrors = {
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      phone: validatePhone(phone),
      password: validatePassword(password),
      confirmPassword: !confirmPassword
        ? "Please confirm your password."
        : confirmPassword !== password
          ? "Passwords do not match."
          : undefined,
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setSubmitting(true);
    try {
      await signUp({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      });
      await navigate({ to: "/citizen/dashboard" });
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Unable to create your account right now.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthCard
      title="Create an account"
      description="Register as a resident to report civic issues and follow their resolution."
      footer={
        <>
          Already registered?{" "}
          <Link to="/citizen/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      {formError ? <ErrorMessage title="Registration failed" message={formError} /> : null}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <TextField
          id="register-name"
          label="Full name"
          autoComplete="name"
          placeholder="Asha Kumar"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          error={errors.fullName}
          disabled={submitting}
        />
        <TextField
          id="register-email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
          disabled={submitting}
        />
        <TextField
          id="register-phone"
          label="Phone number"
          type="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          hint="Used for updates about your reports."
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          error={errors.phone}
          disabled={submitting}
        />
        <PasswordField
          id="register-password"
          label="Password"
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
          hint="At least 6 characters."
          error={errors.password}
          disabled={submitting}
        />
        <PasswordField
          id="register-confirm-password"
          label="Confirm password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={errors.confirmPassword}
          disabled={submitting}
        />

        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Creating account…
            </>
          ) : (
            "Register"
          )}
        </Button>

        <p className="text-xs text-muted-foreground">
          Prototype interface: details are kept in your browser only and are not sent anywhere.
        </p>
      </form>
    </AuthCard>
  );
}
