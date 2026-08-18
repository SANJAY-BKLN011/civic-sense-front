import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { PlaceholderPanel } from "@/components/common/placeholder-panel";

export const Route = createFileRoute("/officer")({
  head: () => ({
    meta: [
      { title: "Officer Portal — CivicSense" },
      { name: "description", content: "Entry point for municipal officers managing civic complaints." },
      { property: "og:title", content: "Officer Portal — CivicSense" },
      { property: "og:description", content: "Entry point for municipal officers managing civic complaints." },
    ],
  }),
  component: OfficerPortalHome,
});

function OfficerPortalHome() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Officer Portal" title="Welcome to the Officer Portal" description="Review and manage complaints assigned to your department. Use the navigation above to move between sections." />
      <div className="grid gap-4 md:grid-cols-2">
        <PlaceholderPanel title="Planned for this page" items={["Workload summary across departments","Shortcuts to open complaints","Profile and assignment settings"]} />
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
