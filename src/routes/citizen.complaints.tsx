import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { PlaceholderPanel } from "@/components/common/placeholder-panel";

export const Route = createFileRoute("/citizen/complaints")({
  head: () => ({
    meta: [
      { title: "My Complaints — CivicSense" },
      { name: "description", content: "Placeholder list view of complaints submitted by a resident." },
      { property: "og:title", content: "My Complaints — CivicSense" },
      { property: "og:description", content: "Placeholder list view of complaints submitted by a resident." },
    ],
  }),
  component: CitizenComplaints,
});

function CitizenComplaints() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Citizen Portal" title="My complaints" description="A list of every issue you have reported, with filters and status tracking." />
      <div className="grid gap-4 md:grid-cols-2">
        <PlaceholderPanel title="Planned for this page" items={["Filterable list of submitted complaints","Status timeline for each complaint","Officer responses and resolution notes"]} />
        <PlaceholderPanel
          title="Not built yet"
          items={[
            "No backend, database or authentication is connected.",
            "Content shown here is static placeholder material.",
          ]}
        />
      </div>
    </div>
  );
}
