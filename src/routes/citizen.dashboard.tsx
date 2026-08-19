import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ClipboardList,
  FileText,
  ListChecks,
  Loader2,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import { RequireCitizenAuth } from "@/components/auth/require-citizen-auth";
import { ComplaintRow } from "@/components/citizen/complaint-row";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState, ErrorMessage, LoadingState } from "@/components/common/states";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCitizenAuth } from "@/lib/citizen-auth";
import { mockComplaints, mockStats } from "@/lib/mock-complaints";

export const Route = createFileRoute("/citizen/dashboard")({
  head: () => ({
    meta: [
      { title: "Citizen Dashboard — CivicSense" },
      {
        name: "description",
        content: "Overview of your reported civic issues, statuses and quick reporting actions.",
      },
      { property: "og:title", content: "Citizen Dashboard — CivicSense" },
      {
        property: "og:description",
        content: "Overview of your reported civic issues, statuses and quick reporting actions.",
      },
    ],
  }),
  component: ProtectedCitizenDashboard,
});

function ProtectedCitizenDashboard() {
  return (
    <RequireCitizenAuth>
      <CitizenDashboard />
    </RequireCitizenAuth>
  );
}

const stats = [
  {
    label: "Total complaints",
    value: mockStats.total,
    icon: ClipboardList,
    tone: "bg-primary/10 text-primary",
  },
  {
    label: "New",
    value: mockStats.new,
    icon: Sparkles,
    tone: "bg-info/10 text-info",
  },
  {
    label: "In progress",
    value: mockStats.inProgress,
    icon: Loader2,
    tone: "bg-warning/15 text-warning",
  },
  {
    label: "Resolved",
    value: mockStats.resolved,
    icon: CheckCircle2,
    tone: "bg-success/10 text-success",
  },
];

function CitizenDashboard() {
  const { user } = useCitizenAuth();
  const firstName = (user?.fullName || user?.email || "Resident").split(/[\s@]/)[0] ?? "Resident";
  const recent = mockComplaints.slice(0, 4);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Citizen Portal"
        title={`Welcome back, ${firstName}`}
        description="Report civic issues in your area and keep track of how they are being resolved. The figures below use sample data."
        actions={
          <Button asChild>
            <Link to="/citizen/report">
              <PlusCircle className="size-4" aria-hidden="true" />
              Report an Issue
            </Link>
          </Button>
        }
      />

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-base font-semibold text-foreground">Spotted a problem nearby?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Submit a report with a description and location so the right department can act on it.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link to="/citizen/report">Report an Issue</Link>
          </Button>
        </CardContent>
      </Card>

      <section aria-label="Complaint statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 py-5">
              <span className={`grid size-11 shrink-0 place-items-center rounded-md ${stat.tone}`}>
                <stat.icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-2xl font-semibold leading-tight text-foreground">
                  {stat.value}
                </span>
                <span className="block truncate text-sm text-muted-foreground">{stat.label}</span>
              </span>
            </CardContent>
          </Card>
        ))}
      </section>

      <section aria-label="Recent complaints">
        <Card>
          <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <CardTitle className="text-base">Recent complaints</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/citizen/complaints">View all</Link>
            </Button>
          </CardHeader>
          <CardContent className="divide-y divide-border p-0">
            {recent.length > 0 ? (
              recent.map((complaint) => (
                <ComplaintRow key={complaint.id} complaint={complaint} />
              ))
            ) : (
              <div className="p-6">
                <EmptyState
                  title="No complaints yet"
                  description="Issues you report will appear here."
                />
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section aria-label="Quick actions" className="grid gap-4 md:grid-cols-2">
        <QuickAction
          to="/citizen/report"
          icon={<FileText className="size-5" aria-hidden="true" />}
          title="Report New Issue"
          description="Describe a civic problem and send it to the relevant department."
        />
        <QuickAction
          to="/citizen/complaints"
          icon={<ListChecks className="size-5" aria-hidden="true" />}
          title="View My Complaints"
          description="Browse everything you have reported and check current statuses."
        />
      </section>

      <section aria-label="Dashboard states" className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Dashboard states (examples)</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <LoadingState label="Loading your dashboard…" />
          <EmptyState
            title="No complaints yet"
            description="Once you report an issue it will show up on this dashboard."
            action={
              <Button asChild size="sm">
                <Link to="/citizen/report">Report an Issue</Link>
              </Button>
            }
          />
          <ErrorMessage message="Dashboard data could not be loaded. This is a static example of the error state." />
        </div>
      </section>
    </div>
  );
}

function QuickAction({
  to,
  icon,
  title,
  description,
}: {
  to: "/citizen/report" | "/citizen/complaints";
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="grid size-10 place-items-center rounded-md bg-primary/10 text-primary">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        <span className="mt-1 block text-sm text-muted-foreground">{description}</span>
      </span>
    </Link>
  );
}
