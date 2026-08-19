import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FieldShell } from "@/components/common/form-field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  hint?: string | undefined;
  error?: string | undefined;
  disabled?: boolean;
  placeholder?: string;
}

export function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete = "current-password",
  hint,
  error,
  disabled,
  placeholder,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          disabled={disabled}
          {...(placeholder ? { placeholder } : {})}
          aria-invalid={Boolean(error)}
          className={cn("pr-11", error && "border-destructive")}
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          disabled={disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 grid w-10 place-items-center rounded-r-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        >
          {visible ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </FieldShell>
  );
}
