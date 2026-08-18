import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { PlaceholderPanel } from "@/components/common/placeholder-panel";

export const Route = createFileRoute("/officer/dashboard")({
  head: () => ({
    meta: [
      { title: "Officer Dashboard — CivicSense" },
      { name: "description", content: "Placeholder dashboard summarising complaint workload for officers." },
      { property: "og:title", content: "Officer Dashboard — CivicSense" },
      { property: "og:description", content: "Placeholder dashboard summarising complaint workload for officers." },
    ],
  }),
  component: OfficerDashboard,
});

function OfficerDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Officer Portal" title="Dashboard" description="A summary of complaint volume, assignments and resolution performance will appear here." />
      <div className="grid gap-4 md:grid-cols-2">
        <PlaceholderPanel title="Planned for this page" items={["Open, in progress and resolved counts","Complaints awaiting action","Recent activity across the department"]} />
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
