import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { PlaceholderPanel } from "@/components/common/placeholder-panel";

export const Route = createFileRoute("/officer/register")({
  head: () => ({
    meta: [
      { title: "Officer Registration — CivicSense" },
      { name: "description", content: "Placeholder registration screen for CivicSense officer accounts." },
      { property: "og:title", content: "Officer Registration — CivicSense" },
      { property: "og:description", content: "Placeholder registration screen for CivicSense officer accounts." },
    ],
  }),
  component: OfficerRegister,
});

function OfficerRegister() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Officer Portal" title="Officer registration" description="Officer onboarding is not implemented yet. This screen will hold the registration request form." />
      <div className="grid gap-4 md:grid-cols-2">
        <PlaceholderPanel title="Planned for this page" items={["Officer name, ID and department","Jurisdiction or ward assignment","Verification request submission"]} />
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
