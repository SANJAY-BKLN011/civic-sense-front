import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { PlaceholderPanel } from "@/components/common/placeholder-panel";

export const Route = createFileRoute("/officer/complaints")({
  head: () => ({
    meta: [
      { title: "Complaints Queue — CivicSense" },
      { name: "description", content: "Placeholder complaint queue view for municipal officers." },
      { property: "og:title", content: "Complaints Queue — CivicSense" },
      { property: "og:description", content: "Placeholder complaint queue view for municipal officers." },
    ],
  }),
  component: OfficerComplaints,
});

function OfficerComplaints() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Officer Portal" title="Complaints" description="The complaint queue with filtering, assignment and status updates will live here." />
      <div className="grid gap-4 md:grid-cols-2">
        <PlaceholderPanel title="Planned for this page" items={["Queue of incoming complaints","Filters by category, ward and status","Assignment and resolution actions"]} />
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
