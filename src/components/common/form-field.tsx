import type { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FieldShellProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

export function FieldShell({ id, label, hint, error, className, children }: FieldShellProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      {children}
      {hint && !error ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      {error ? (
        <p className="text-xs font-medium text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
}

export function TextField({ id, label, hint, error, className, ...props }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <Input
        id={id}
        aria-invalid={Boolean(error)}
        className={cn(error && "border-destructive", className)}
        {...props}
      />
    </FieldShell>
  );
}

interface SelectFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}

export function SelectField({
  id,
  label,
  placeholder = "Select an option",
  hint,
  error,
  options,
  defaultValue,
}: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <Select defaultValue={defaultValue}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldShell>
  );
}
