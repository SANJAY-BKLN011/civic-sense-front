import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { PlaceholderPanel } from "@/components/common/placeholder-panel";

export const Route = createFileRoute("/officer/login")({
  head: () => ({
    meta: [
      { title: "Officer Sign In — CivicSense" },
      { name: "description", content: "Placeholder sign-in screen for CivicSense officer accounts." },
      { property: "og:title", content: "Officer Sign In — CivicSense" },
      { property: "og:description", content: "Placeholder sign-in screen for CivicSense officer accounts." },
    ],
  }),
  component: OfficerLogin,
});

function OfficerLogin() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Officer Portal" title="Officer sign in" description="Officer authentication is not implemented yet. This screen will hold the sign-in form." />
      <div className="grid gap-4 md:grid-cols-2">
        <PlaceholderPanel title="Planned for this page" items={["Official email and password fields","Department selection","Link to officer registration"]} />
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
