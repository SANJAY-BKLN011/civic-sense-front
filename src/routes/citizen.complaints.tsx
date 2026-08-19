import { createFileRoute } from "@tanstack/react-router";
import { RequireCitizenAuth } from "@/components/auth/require-citizen-auth";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { EmptyState, ErrorMessage, LoadingState } from "@/components/common/states";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/citizen/complaints")({
  head: () => ({
    meta: [
      { title: "My Complaints — CivicSense" },
      {
        name: "description",
        content: "Placeholder list view of civic complaints submitted by a resident.",
      },
      { property: "og:title", content: "My Complaints — CivicSense" },
      {
        property: "og:description",
        content: "Placeholder list view of civic complaints submitted by a resident.",
      },
    ],
  }),
  component: ProtectedCitizenComplaints,
});

const sampleComplaints = [
  { id: "CS-1041", title: "Pothole near market junction", status: "submitted" as const, label: "Submitted" },
  { id: "CS-1038", title: "Street light out on 4th Cross", status: "progress" as const, label: "In progress" },
  { id: "CS-1024", title: "Overflowing waste bin", status: "resolved" as const, label: "Resolved" },
];

function ProtectedCitizenComplaints() {
  return (
    <RequireCitizenAuth>
      <CitizenComplaints />
    </RequireCitizenAuth>
  );
}

function CitizenComplaints() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Citizen Portal"
        title="My complaints"
        description="A list of every issue you have reported, with filters and status tracking. The rows below are static examples."
        actions={<Button variant="outline">Filter</Button>}
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Example complaint list</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-border p-0">
          {sampleComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{complaint.title}</p>
                <p className="text-xs text-muted-foreground">Reference {complaint.id}</p>
              </div>
              <StatusBadge status={complaint.status}>{complaint.label}</StatusBadge>
            </div>
          ))}
        </CardContent>
      </Card>

      <section className="grid gap-4 md:grid-cols-3">
        <LoadingState label="Loading complaints…" />
        <EmptyState
          title="No complaints yet"
          description="Reported issues will appear here once submission is available."
        />
        <ErrorMessage message="Complaints could not be loaded. This is a static example of the error state." />
      </section>
    </div>
  );
}
