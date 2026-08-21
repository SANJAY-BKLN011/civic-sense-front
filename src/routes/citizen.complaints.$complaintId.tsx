import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, ImageIcon, LayoutDashboard, MapPin } from "lucide-react";
import { RequireCitizenAuth } from "@/components/auth/require-citizen-auth";
import { StatusTimeline } from "@/components/citizen/status-timeline";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { EmptyState } from "@/components/common/states";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatComplaintDateTime,
  mockComplaints,
  priorityMeta,
  statusMeta,
} from "@/lib/mock-complaints";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/citizen/complaints/$complaintId")({
  head: () => ({
    meta: [
      { title: "Complaint Tracking — CivicSense" },
      {
        name: "description",
        content: "Track a single civic complaint: status timeline, location and resolution details.",
      },
      { property: "og:title", content: "Complaint Tracking — CivicSense" },
      {
        property: "og:description",
        content: "Track a single civic complaint: status timeline, location and resolution details.",
      },
    ],
  }),
  component: ProtectedComplaintDetail,
});

function ProtectedComplaintDetail() {
  return (
    <RequireCitizenAuth>
      <ComplaintDetail />
    </RequireCitizenAuth>
  );
}

function ComplaintDetail() {
  const { complaintId } = useParams({ from: "/citizen/complaints/$complaintId" });
  const complaint = mockComplaints.find((item) => item.id === complaintId);

  if (!complaint) {
    return (
      <div className="space-y-8">
        <PageHeader eyebrow="Citizen Portal" title="Complaint not found" />
        <EmptyState
          title={`No complaint matches ${complaintId}`}
          description="Complaint details are static placeholders in this prototype."
          action={
            <Button asChild size="sm" variant="outline">
              <Link to="/citizen/complaints">Back to My Complaints</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const meta = statusMeta[complaint.status];
  const priority = priorityMeta[complaint.priority];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={`Complaint ${complaint.id}`}
        title={complaint.title}
        description={complaint.summary}
        actions={
          <>
            <Button asChild variant="outline" size="sm">
              <Link to="/citizen/complaints">
                <ArrowLeft className="size-4" aria-hidden="true" />
                My Complaints
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/citizen/dashboard">
                <LayoutDashboard className="size-4" aria-hidden="true" />
                Dashboard
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Complaint information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className="grid h-44 place-items-center rounded-md border border-dashed border-border bg-muted text-muted-foreground"
                aria-hidden="true"
              >
                <ImageIcon className="size-6" />
              </div>
              <p className="text-sm leading-relaxed text-foreground">{complaint.description}</p>
              <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">Status</dt>
                  <dd className="mt-1">
                    <StatusBadge status={meta.badge}>{meta.label}</StatusBadge>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">Priority</dt>
                  <dd className="mt-1">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-2 py-0.5 text-xs font-medium",
                        priority.className,
                      )}
                    >
                      {priority.label}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Department
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">{complaint.department}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Submitted
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">
                    {formatComplaintDateTime(complaint.submittedAt)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    Complaint ID
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">{complaint.id}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <div className="min-w-0 text-sm">
                  <p className="text-foreground">
                    {complaint.location.manualAddress ?? "No address description provided"}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Latitude {complaint.location.latitude.toFixed(4)} · Longitude{" "}
                    {complaint.location.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Map view is not part of this prototype stage.
              </p>
            </CardContent>
          </Card>

          {complaint.resolution ? (
            <Card className="border-success/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
                  Resolution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm font-medium text-foreground">
                  {complaint.resolution.message}
                </p>
                <p className="text-sm text-muted-foreground">{complaint.resolution.note}</p>
                <p className="text-xs text-muted-foreground">
                  Resolved on {formatComplaintDateTime(complaint.resolution.resolvedAt)}
                </p>
                <div
                  className="grid h-32 place-items-center rounded-md border border-dashed border-border bg-muted text-muted-foreground"
                  aria-hidden="true"
                >
                  <ImageIcon className="size-5" />
                </div>
                <p className="text-xs text-muted-foreground">Resolution photo placeholder.</p>
              </CardContent>
            </Card>
          ) : null}
        </div>

        <Card className="lg:sticky lg:top-24 lg:self-start">
          <CardHeader>
            <CardTitle className="text-base">Status timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusTimeline timeline={complaint.timeline} status={complaint.status} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
