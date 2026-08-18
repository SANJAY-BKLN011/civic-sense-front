import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, MapPin, ShieldCheck, Users } from "lucide-react";
import { BrandMark, SiteFooter } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CivicSense — Report and Track Civic Issues" },
      {
        name: "description",
        content:
          "CivicSense lets citizens report local civic issues and follow their resolution, while officers manage and close complaints.",
      },
      { property: "og:title", content: "CivicSense — Report and Track Civic Issues" },
      {
        property: "og:description",
        content:
          "Report potholes, waste, lighting and water issues, then track resolution progress in one place.",
      },
    ],
  }),
  component: Landing,
});

const steps = [
  {
    icon: MapPin,
    title: "Report an issue",
    body: "Describe the problem, add a location and a photo so the right department can act.",
  },
  {
    icon: ClipboardList,
    title: "Track progress",
    body: "Every complaint gets a status you can follow from submission to resolution.",
  },
  {
    icon: ShieldCheck,
    title: "See it resolved",
    body: "Officers review, assign and close complaints with a transparent record.",
  },
];

function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
          <BrandMark subtitle="Civic issue reporting" />
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/officer">Officers</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/citizen">Citizens</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b border-border bg-surface">
          <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Public service platform
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
              Report civic issues and follow them through to resolution
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              CivicSense connects residents with the officers responsible for their neighbourhood.
              Submit a complaint, receive a tracking status, and see what gets fixed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/citizen">Enter Citizen Portal</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/officer">Enter Officer Portal</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-xl font-semibold text-foreground sm:text-2xl">How it works</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <Card key={step.title}>
                <CardHeader className="gap-2">
                  <span className="grid size-9 place-items-center rounded-md bg-accent text-accent-foreground">
                    <step.icon className="size-5" aria-hidden="true" />
                  </span>
                  <CardTitle className="text-base">{step.title}</CardTitle>
                  <CardDescription>{step.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-surface">
          <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-14 sm:px-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="size-5 text-primary" aria-hidden="true" />
                  Citizen Portal
                </CardTitle>
                <CardDescription>
                  Register, report an issue in your area and track every complaint you have filed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link to="/citizen">Continue as citizen</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
                  Officer Portal
                </CardTitle>
                <CardDescription>
                  Review incoming complaints, manage workload and record resolutions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline">
                  <Link to="/officer">Continue as officer</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
