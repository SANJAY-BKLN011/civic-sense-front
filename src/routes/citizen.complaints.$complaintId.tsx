import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { RequireCitizenAuth } from "@/components/auth/require-citizen-auth";
import { PageHeader } from "@/components/common/page-header";
import { PlaceholderPanel } from "@/components/common/placeholder-panel";
import { StatusBadge } from "@/components/common/status-badge";
import { EmptyState } from "@/components/common/states";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatComplaintDate, mockComplaints, statusMeta } from "@/lib/mock-complaints";

export const Route = createFileRoute("/citizen/complaints/$complaintId")({
  head: () => ({
    meta: [
      { title: "Complaint Details — CivicSense" },
      {
        name: "description",
        content: "Placeholder detail view for a single civic complaint reported by a resident.",
      },
      { property: "og:title", content: "Complaint Details — CivicSense" },
      {
        property: "og:description",
        content: "Placeholder detail view for a single civic complaint reported by a resident.",
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
          title={`No mock complaint matches ${complaintId}`}
          description="Complaint details are static placeholders in this prototype."
          action={
            <Button asChild size="sm" variant="outline">
              <Link to="/citizen/complaints">Back to my complaints</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const meta = statusMeta[complaint.status];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={`Reference ${complaint.id}`}
        title={complaint.title}
        description={complaint.summary}
        actions={
          <Button asChild variant="outline" size="sm">
            <Link to="/citizen/complaints">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back
            </Link>
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Complaint summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="grid h-40 place-items-center rounded-md border border-dashed border-border bg-muted text-muted-foreground"
              aria-hidden="true"
            >
              <ImageIcon className="size-6" />
            </div>
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Status</dt>
                <dd className="mt-1">
                  <StatusBadge status={meta.badge}>{meta.label}</StatusBadge>
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Department</dt>
                <dd className="mt-1 text-sm text-foreground">{complaint.department}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Reported on</dt>
                <dd className="mt-1 text-sm text-foreground">
                  {formatComplaintDate(complaint.date)}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Reference</dt>
                <dd className="mt-1 text-sm text-foreground">{complaint.id}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <PlaceholderPanel
          title="Planned for this page"
          items={[
            "Full status timeline and officer updates",
            "Photo attachments and location map",
            "Citizen feedback once resolved",
          ]}
        />
      </div>
    </div>
  );
}
