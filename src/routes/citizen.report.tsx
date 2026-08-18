import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/page-header";
import { PlaceholderPanel } from "@/components/common/placeholder-panel";
import { SelectField, TextField } from "@/components/common/form-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/citizen/report")({
  head: () => ({
    meta: [
      { title: "Report an Issue — CivicSense" },
      {
        name: "description",
        content: "Placeholder form layout for submitting a civic issue report on CivicSense.",
      },
      { property: "og:title", content: "Report an Issue — CivicSense" },
      {
        property: "og:description",
        content: "Placeholder form layout for submitting a civic issue report on CivicSense.",
      },
    ],
  }),
  component: CitizenReport,
});

const categories = [
  { value: "roads", label: "Roads & potholes" },
  { value: "waste", label: "Waste & sanitation" },
  { value: "water", label: "Water supply & drainage" },
  { value: "lighting", label: "Street lighting" },
  { value: "other", label: "Other" },
];

function CitizenReport() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Citizen Portal"
        title="Report an issue"
        description="The reporting form is not functional yet. This layout shows the fields the final form will collect."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Issue details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextField
              id="issue-title"
              label="Title"
              placeholder="Short summary of the issue"
              disabled
            />
            <SelectField id="issue-category" label="Category" options={categories} />
            <div className="space-y-1.5">
              <label htmlFor="issue-description" className="text-sm font-medium text-foreground">
                Description
              </label>
              <Textarea
                id="issue-description"
                rows={5}
                placeholder="Describe what you observed and where"
                disabled
              />
            </div>
            <TextField
              id="issue-location"
              label="Location"
              placeholder="Street, landmark or ward"
              hint="Map selection will be added later."
              disabled
            />
            <div className="flex flex-wrap gap-2 pt-2">
              <Button disabled>Submit report</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Preview guidelines</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reporting guidelines</DialogTitle>
                    <DialogDescription>
                      Provide an accurate location, a clear description, and a photo where possible.
                      Emergencies should always be reported to local emergency services first.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <PlaceholderPanel
          title="Planned for this page"
          items={[
            "Photo upload and attachment previews",
            "Map-based location selection",
            "Submission confirmation and reference number",
          ]}
        />
      </div>
    </div>
  );
}
