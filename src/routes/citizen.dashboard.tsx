import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { PlaceholderPanel } from "@/components/common/placeholder-panel";

export const Route = createFileRoute("/citizen/dashboard")({
  head: () => ({
    meta: [
      { title: "Citizen Dashboard — CivicSense" },
      { name: "description", content: "Placeholder dashboard summarising a resident's civic complaints." },
      { property: "og:title", content: "Citizen Dashboard — CivicSense" },
      { property: "og:description", content: "Placeholder dashboard summarising a resident's civic complaints." },
    ],
  }),
  component: CitizenDashboard,
});

function CitizenDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Citizen Portal" title="Dashboard" description="An overview of your reported issues and their current status will appear here." />
      <div className="grid gap-4 md:grid-cols-2">
        <PlaceholderPanel title="Planned for this page" items={["Counts by status: submitted, in progress, resolved","Most recent complaint activity","Shortcut to report a new issue"]} />
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
