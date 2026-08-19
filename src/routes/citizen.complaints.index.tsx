import { createFileRoute } from "@tanstack/react-router";
import { RequireCitizenAuth } from "@/components/auth/require-citizen-auth";
import { ComplaintRow } from "@/components/citizen/complaint-row";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState, ErrorMessage, LoadingState } from "@/components/common/states";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockComplaints } from "@/lib/mock-complaints";

export const Route = createFileRoute("/citizen/complaints/")({
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
          {mockComplaints.map((complaint) => (
            <ComplaintRow key={complaint.id} complaint={complaint} />
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
