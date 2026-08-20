import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Info, Loader2, Send } from "lucide-react";
import { RequireCitizenAuth } from "@/components/auth/require-citizen-auth";
import { PageHeader } from "@/components/common/page-header";
import { FieldShell, TextField } from "@/components/common/form-field";
import { ErrorMessage } from "@/components/common/states";
import { PhotoUpload } from "@/components/citizen/photo-upload";
import { LocationPicker, type Coordinates } from "@/components/citizen/location-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DESCRIPTION_MAX,
  OTHER_DEPARTMENT,
  TITLE_MAX,
  departmentLabel,
  departments,
  generateMockComplaintId,
} from "@/lib/departments";

export const Route = createFileRoute("/citizen/report")({
  head: () => ({
    meta: [
      { title: "Report a Civic Issue — CivicSense" },
      {
        name: "description",
        content:
          "Report a civic issue in your area with a photo, description and location so it reaches the right department.",
      },
      { property: "og:title", content: "Report a Civic Issue — CivicSense" },
      {
        property: "og:description",
        content:
          "Report a civic issue in your area with a photo, description and location so it reaches the right department.",
      },
    ],
  }),
  component: ProtectedCitizenReport,
});

function ProtectedCitizenReport() {
  return (
    <RequireCitizenAuth>
      <CitizenReport />
    </RequireCitizenAuth>
  );
}

interface SubmissionResult {
  id: string;
  department: string;
  submittedAt: Date;
}

interface Errors {
  photo?: string | undefined;
  title?: string | undefined;
  department?: string | undefined;
  description?: string | undefined;
  location?: string | undefined;
}

function CitizenReport() {
  const [photo, setPhoto] = useState<{ name: string; url: string } | null>(null);
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [manualLocation, setManualLocation] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  function validate(): Errors {
    const next: Errors = {};
    const trimmedTitle = title.trim();
    if (!trimmedTitle) next.title = "Issue title is required.";
    else if (trimmedTitle.length < 5) next.title = "Give a slightly longer title.";
    else if (trimmedTitle.length > TITLE_MAX)
      next.title = `Title must be ${TITLE_MAX} characters or fewer.`;

    if (!department) next.department = "Select a responsible department.";

    const trimmedDescription = description.trim();
    if (!trimmedDescription) next.description = "Description is required.";
    else if (trimmedDescription.length < 20)
      next.description = "Add at least 20 characters so the issue is clear.";
    else if (trimmedDescription.length > DESCRIPTION_MAX)
      next.description = `Description must be ${DESCRIPTION_MAX} characters or fewer.`;

    if (!coords && !manualLocation.trim())
      next.location = "Capture your location or describe it manually.";

    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    const nextErrors = { ...validate(), ...(errors.photo ? { photo: errors.photo } : {}) };
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setFormError("Please fix the highlighted fields before submitting.");
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitting(false);
    setResult({
      id: generateMockComplaintId(),
      department: departmentLabel(department),
      submittedAt: new Date(),
    });
  }

  if (result) {
    return <SuccessScreen result={result} />;
  }

  const locationSummary = coords
    ? `${coords.latitude}, ${coords.longitude}${manualLocation.trim() ? ` — ${manualLocation.trim()}` : ""}`
    : manualLocation.trim();

  return (
    <div className="space-y-8">
      <div>
        <Button asChild variant="ghost" size="sm" className="-ml-2 mb-2">
          <Link to="/citizen/dashboard">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to dashboard
          </Link>
        </Button>
        <PageHeader
          eyebrow="Citizen Portal"
          title="Report a Civic Issue"
          description="Help improve your community by reporting civic issues in your area."
        />
      </div>

      <form onSubmit={handleSubmit} noValidate className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Issue details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <PhotoUpload
                previewUrl={photo?.url ?? null}
                fileName={photo?.name}
                error={errors.photo}
                onSelect={(file, url) => {
                  setPhoto({ name: file.name, url });
                  setErrors((prev) => ({ ...prev, photo: undefined }));
                }}
                onRemove={() => setPhoto(null)}
                onError={(message) => {
                  setPhoto(null);
                  setErrors((prev) => ({ ...prev, photo: message }));
                }}
              />

              <TextField
                id="issue-title"
                label="Issue title"
                placeholder="Garbage overflowing near the public park"
                maxLength={TITLE_MAX}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                hint={`${title.length}/${TITLE_MAX} characters`}
                {...(errors.title ? { error: errors.title } : {})}
              />

              <FieldShell
                id="issue-department"
                label="Select Responsible Department"
                {...(errors.department ? { error: errors.department } : {})}
              >
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger id="issue-department" className="w-full" aria-invalid={Boolean(errors.department)}>
                    <SelectValue placeholder="Choose a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldShell>

              {department === OTHER_DEPARTMENT ? (
                <InfoNote>
                  Our system will help route your complaint to the appropriate department.
                </InfoNote>
              ) : null}

              <FieldShell
                id="issue-description"
                label="Describe the Issue"
                hint={`${description.length}/${DESCRIPTION_MAX} characters`}
                {...(errors.description ? { error: errors.description } : {})}
              >
                <Textarea
                  id="issue-description"
                  rows={6}
                  maxLength={DESCRIPTION_MAX}
                  aria-invalid={Boolean(errors.description)}
                  placeholder="Explain what happened and provide useful details about the issue..."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </FieldShell>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Location of the Issue</CardTitle>
            </CardHeader>
            <CardContent>
              <LocationPicker
                coords={coords}
                manualLocation={manualLocation}
                {...(errors.location ? { error: errors.location } : {})}
                onCoords={setCoords}
                onManualLocation={setManualLocation}
              />
            </CardContent>
          </Card>

          <InfoNote>Priority will be determined based on the issue details.</InfoNote>
        </div>

        <div className="space-y-6">
          <Card className="lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle className="text-base">Review your report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {photo ? (
                <img
                  src={photo.url}
                  alt="Preview of the issue photo you selected"
                  className="h-36 w-full rounded-md object-cover"
                />
              ) : (
                <div className="grid h-36 w-full place-items-center rounded-md border border-dashed border-border text-xs text-muted-foreground">
                  No photo selected
                </div>
              )}

              <SummaryRow label="Title" value={title.trim()} />
              <SummaryRow label="Department" value={departmentLabel(department)} />
              <SummaryRow label="Description" value={description.trim()} />
              <SummaryRow label="Location" value={locationSummary} />

              {formError ? <ErrorMessage message={formError} /> : null}

              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="size-4" aria-hidden="true" />
                )}
                {submitting ? "Submitting…" : "Submit Complaint"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}

function InfoNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-info/30 bg-info/10 px-4 py-3">
      <Info className="mt-0.5 size-4 shrink-0 text-info" aria-hidden="true" />
      <p className="text-sm text-foreground">{children}</p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border pt-3 first:border-t-0 first:pt-0">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 whitespace-pre-wrap break-words text-sm text-foreground">
        {value || <span className="text-muted-foreground">Not provided yet</span>}
      </p>
    </div>
  );
}

function SuccessScreen({ result }: { result: SubmissionResult }) {
  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <CardContent className="space-y-6 py-10 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Complaint Submitted Successfully!</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep your complaint ID handy to track progress.
            </p>
          </div>

          <dl className="grid gap-3 rounded-lg border border-border bg-muted/40 px-4 py-4 text-left text-sm">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
              <dt className="text-muted-foreground">Complaint ID</dt>
              <dd className="text-right font-mono font-semibold text-foreground">{result.id}</dd>
            </div>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
              <dt className="text-muted-foreground">Department</dt>
              <dd className="text-right font-medium text-foreground">{result.department}</dd>
            </div>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
              <dt className="text-muted-foreground">Submitted</dt>
              <dd className="text-right font-medium text-foreground">
                {result.submittedAt.toLocaleString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </dd>
            </div>
          </dl>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link to="/citizen/complaints">View My Complaints</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/citizen/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
