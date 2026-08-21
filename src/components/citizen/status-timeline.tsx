import { Check, Circle, Loader2 } from "lucide-react";
import {
  formatComplaintDateTime,
  statusOrder,
  type ComplaintStatus,
  type ComplaintTimelineEntry,
} from "@/lib/mock-complaints";
import { cn } from "@/lib/utils";

export function StatusTimeline({
  timeline,
  status,
}: {
  timeline: ComplaintTimelineEntry[];
  status: ComplaintStatus;
}) {
  const currentIndex = statusOrder.indexOf(status);

  return (
    <ol className="space-y-0">
      {timeline.map((entry, index) => {
        const entryIndex = statusOrder.indexOf(entry.status);
        const isDone = entryIndex < currentIndex;
        const isCurrent = entryIndex === currentIndex;
        const isLast = index === timeline.length - 1;

        return (
          <li key={entry.status} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border",
                  isDone && "border-success/40 bg-success/10 text-success",
                  isCurrent && "border-primary bg-primary text-primary-foreground",
                  !isDone && !isCurrent && "border-border bg-muted text-muted-foreground",
                )}
                aria-hidden="true"
              >
                {isDone ? (
                  <Check className="size-4" />
                ) : isCurrent ? (
                  <Loader2 className="size-4" />
                ) : (
                  <Circle className="size-3" />
                )}
              </span>
              {!isLast ? (
                <span
                  className={cn("mt-1 w-px flex-1", isDone ? "bg-success/40" : "bg-border")}
                  aria-hidden="true"
                />
              ) : null}
            </div>

            <div className={cn("min-w-0", isLast ? "pb-0" : "pb-6")}>
              <p
                className={cn(
                  "text-sm font-medium",
                  isCurrent ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {entry.label}
                {isCurrent ? (
                  <span className="ml-2 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    Current
                  </span>
                ) : null}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {entry.timestamp ? formatComplaintDateTime(entry.timestamp) : "Pending"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{entry.note}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
