import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { PlaceholderPanel } from "@/components/common/placeholder-panel";

export const Route = createFileRoute("/citizen")({
  head: () => ({
    meta: [
      { title: "Citizen Portal — CivicSense" },
      { name: "description", content: "Entry point for residents to report civic issues and track complaints." },
      { property: "og:title", content: "Citizen Portal — CivicSense" },
      { property: "og:description", content: "Entry point for residents to report civic issues and track complaints." },
    ],
  }),
  component: CitizenPortalHome,
});

function CitizenPortalHome() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Citizen Portal" title="Welcome to the Citizen Portal" description="Report civic issues in your area and follow their resolution. Use the navigation above to move between sections." />
      <div className="grid gap-4 md:grid-cols-2">
        <PlaceholderPanel title="Planned for this page" items={["Quick links to reporting and complaint history","Summary of recent activity","Guidance on what can be reported"]} />
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
