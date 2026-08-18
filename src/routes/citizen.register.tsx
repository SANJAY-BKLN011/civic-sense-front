import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { PlaceholderPanel } from "@/components/common/placeholder-panel";

export const Route = createFileRoute("/citizen/register")({
  head: () => ({
    meta: [
      { title: "Citizen Registration — CivicSense" },
      { name: "description", content: "Placeholder registration screen for new CivicSense citizen accounts." },
      { property: "og:title", content: "Citizen Registration — CivicSense" },
      { property: "og:description", content: "Placeholder registration screen for new CivicSense citizen accounts." },
    ],
  }),
  component: CitizenRegister,
});

function CitizenRegister() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Citizen Portal" title="Create an account" description="Registration is not implemented yet. This screen will hold the citizen sign-up form." />
      <div className="grid gap-4 md:grid-cols-2">
        <PlaceholderPanel title="Planned for this page" items={["Name, email, phone and ward fields","Password and confirmation","Terms acceptance and submit"]} />
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
