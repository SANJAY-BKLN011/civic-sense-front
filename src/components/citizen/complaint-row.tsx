import { Link } from "@tanstack/react-router";
import { ChevronRight, ImageIcon } from "lucide-react";
import { StatusBadge } from "@/components/common/status-badge";
import {
  formatComplaintDate,
  priorityMeta,
  statusMeta,
  type MockComplaint,
} from "@/lib/mock-complaints";
import { cn } from "@/lib/utils";

export function ComplaintRow({
  complaint,
  showPriority = false,
}: {
  complaint: MockComplaint;
  showPriority?: boolean;
}) {
  const meta = statusMeta[complaint.status];
  const priority = priorityMeta[complaint.priority];

  return (
    <Link
      to="/citizen/complaints/$complaintId"
      params={{ complaintId: complaint.id }}
      className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-6"
    >
      <span
        className="grid size-12 shrink-0 place-items-center rounded-md border border-border bg-muted text-muted-foreground"
        aria-hidden="true"
      >
        <ImageIcon className="size-5" />
      </span>

      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-foreground">
          {complaint.title}
        </span>
        <span className="mt-1 block truncate text-xs text-muted-foreground">
          {complaint.id} · {complaint.department} · {formatComplaintDate(complaint.date)}
        </span>
        <span className="mt-2 flex flex-wrap items-center gap-2 sm:hidden">
          <StatusBadge status={meta.badge}>{meta.label}</StatusBadge>
          {showPriority ? (
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                priority.className,
              )}
            >
              {priority.label}
            </span>
          ) : null}
        </span>
      </span>

      <span className="flex shrink-0 items-center gap-3">
        {showPriority ? (
          <span
            className={cn(
              "hidden rounded-full border px-2 py-0.5 text-xs font-medium sm:inline-flex",
              priority.className,
            )}
          >
            {priority.label}
          </span>
        ) : null}
        <span className="hidden sm:block">
          <StatusBadge status={meta.badge}>{meta.label}</StatusBadge>
        </span>
        <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
      </span>
    </Link>
  );
}
