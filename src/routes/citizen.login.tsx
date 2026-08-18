import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { PlaceholderPanel } from "@/components/common/placeholder-panel";

export const Route = createFileRoute("/citizen/login")({
  head: () => ({
    meta: [
      { title: "Citizen Sign In — CivicSense" },
      { name: "description", content: "Placeholder sign-in screen for CivicSense citizen accounts." },
      { property: "og:title", content: "Citizen Sign In — CivicSense" },
      { property: "og:description", content: "Placeholder sign-in screen for CivicSense citizen accounts." },
    ],
  }),
  component: CitizenLogin,
});

function CitizenLogin() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Citizen Portal" title="Sign in" description="Account access is not implemented yet. This screen will hold the citizen sign-in form." />
      <div className="grid gap-4 md:grid-cols-2">
        <PlaceholderPanel title="Planned for this page" items={["Email and password fields","Forgot password link","Link to citizen registration"]} />
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
