import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { PlaceholderPanel } from "@/components/common/placeholder-panel";

export const Route = createFileRoute("/officer/profile")({
  head: () => ({
    meta: [
      { title: "Officer Profile — CivicSense" },
      { name: "description", content: "Placeholder profile page for officer account details." },
      { property: "og:title", content: "Officer Profile — CivicSense" },
      { property: "og:description", content: "Placeholder profile page for officer account details." },
    ],
  }),
  component: OfficerProfile,
});

function OfficerProfile() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Officer Portal" title="Profile" description="Officer account details, department and jurisdiction settings will appear here." />
      <div className="grid gap-4 md:grid-cols-2">
        <PlaceholderPanel title="Planned for this page" items={["Officer identity and contact details","Department and jurisdiction","Notification preferences"]} />
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
