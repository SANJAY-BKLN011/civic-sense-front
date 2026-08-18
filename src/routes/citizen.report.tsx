import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { PlaceholderPanel } from "@/components/common/placeholder-panel";

export const Route = createFileRoute("/citizen/report")({
  head: () => ({
    meta: [
      { title: "Report an Issue — CivicSense" },
      { name: "description", content: "Placeholder form layout for submitting a civic issue report." },
      { property: "og:title", content: "Report an Issue — CivicSense" },
      { property: "og:description", content: "Placeholder form layout for submitting a civic issue report." },
    ],
  }),
  component: CitizenReport,
});

function CitizenReport() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Citizen Portal" title="Report an issue" description="The reporting form is not functional yet. This page will collect issue details and location." />
      <div className="grid gap-4 md:grid-cols-2">
        <PlaceholderPanel title="Planned for this page" items={["Category, description and severity fields","Location capture and photo upload","Review and submit step"]} />
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
