import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusCircle, Search, SearchX } from "lucide-react";
import { RequireCitizenAuth } from "@/components/auth/require-citizen-auth";
import { ComplaintRow } from "@/components/citizen/complaint-row";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState, ErrorMessage, LoadingState } from "@/components/common/states";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  complaintFilters,
  mockComplaints,
  searchComplaints,
  type ComplaintFilter,
} from "@/lib/mock-complaints";

export const Route = createFileRoute("/citizen/complaints/")({
  head: () => ({
    meta: [
      { title: "My Complaints — CivicSense" },
      {
        name: "description",
        content: "Track the progress of civic issues you have reported, with filters and search.",
      },
      { property: "og:title", content: "My Complaints — CivicSense" },
      {
        property: "og:description",
        content: "Track the progress of civic issues you have reported, with filters and search.",
      },
    ],
  }),
  component: ProtectedCitizenComplaints,
});

function ProtectedCitizenComplaints() {
  return (
    <RequireCitizenAuth>
      <CitizenComplaints />
    </RequireCitizenAuth>
  );
}

function CitizenComplaints() {
  const [filter, setFilter] = useState<ComplaintFilter>("ALL");
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchComplaints(mockComplaints, query, filter), [query, filter]);

  const hasComplaints = mockComplaints.length > 0;
  const isSearching = query.trim().length > 0 || filter !== "ALL";

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Citizen Portal"
        title="My Complaints"
        description="Track the progress of issues you have reported."
        actions={
          <Button asChild size="sm">
            <Link to="/citizen/report">
              <PlusCircle className="size-4" aria-hidden="true" />
              Report an Issue
            </Link>
          </Button>
        }
      />

      <Card>
        <CardHeader className="gap-4">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div className="min-w-0 space-y-1.5">
              <Label htmlFor="complaint-search" className="text-sm font-medium">
                Search complaints
              </Label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="complaint-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by complaint ID, title or department"
                  className="pl-9"
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground sm:pb-2">
              {results.length} of {mockComplaints.length} shown
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
            {complaintFilters.map((option) => (
              <Button
                key={option.value}
                type="button"
                size="sm"
                variant={filter === option.value ? "default" : "outline"}
                aria-pressed={filter === option.value}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="divide-y divide-border p-0">
          {!hasComplaints ? (
            <div className="p-6">
              <EmptyState
                title="No complaints yet"
                description="Issues you report will appear here so you can track their progress."
                action={
                  <Button asChild size="sm">
                    <Link to="/citizen/report">Report an Issue</Link>
                  </Button>
                }
              />
            </div>
          ) : results.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={<SearchX className="size-5" aria-hidden="true" />}
                title="No matching complaints"
                description={
                  isSearching
                    ? "Try a different search term or clear the status filter."
                    : "Nothing to show right now."
                }
                action={
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setQuery("");
                      setFilter("ALL");
                    }}
                  >
                    Clear filters
                  </Button>
                }
              />
            </div>
          ) : (
            results.map((complaint) => (
              <ComplaintRow key={complaint.id} complaint={complaint} showPriority />
            ))
          )}
        </CardContent>
      </Card>

      <section aria-label="Interface states" className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">
          Example states (static preview)
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <LoadingState label="Loading complaints…" />
          <EmptyState
            title="No complaints yet"
            description="Reported issues will appear here once submission is available."
          />
          <ErrorMessage message="Complaints could not be loaded. This is a static example of the error state." />
        </div>
      </section>
    </div>
  );
}
