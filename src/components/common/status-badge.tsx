import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      status: {
        submitted: "border-info/30 bg-info/10 text-info",
        progress: "border-warning/40 bg-warning/15 text-warning",
        resolved: "border-success/30 bg-success/10 text-success",
        rejected: "border-destructive/30 bg-destructive/10 text-destructive",
        neutral: "border-border bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { status: "neutral" },
  },
);

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ status }), className)}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </span>
  );
}
