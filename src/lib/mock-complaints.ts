/**
 * F3/F5: static mock data for the citizen complaints experience.
 * No backend or database is connected — these rows exist for layout purposes only.
 */

export type ComplaintStatus = "NEW" | "ASSIGNED" | "IN_PROGRESS" | "RESOLVED";
export type ComplaintPriority = "LOW" | "MEDIUM" | "HIGH";

export interface ComplaintTimelineEntry {
  status: ComplaintStatus;
  label: string;
  note: string;
  timestamp: string | null;
}

export interface ComplaintResolution {
  message: string;
  note: string;
  resolvedAt: string;
}

export interface MockComplaint {
  id: string;
  title: string;
  department: string;
  date: string;
  submittedAt: string;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  summary: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    manualAddress?: string;
  };
  timeline: ComplaintTimelineEntry[];
  resolution?: ComplaintResolution;
}

export const statusMeta: Record<
  ComplaintStatus,
  { label: string; badge: "submitted" | "progress" | "resolved" | "neutral" }
> = {
  NEW: { label: "New", badge: "submitted" },
  ASSIGNED: { label: "Assigned", badge: "neutral" },
  IN_PROGRESS: { label: "In progress", badge: "progress" },
  RESOLVED: { label: "Resolved", badge: "resolved" },
};

export const statusOrder: ComplaintStatus[] = ["NEW", "ASSIGNED", "IN_PROGRESS", "RESOLVED"];

export const priorityMeta: Record<ComplaintPriority, { label: string; className: string }> = {
  LOW: { label: "Low priority", className: "border-border bg-muted text-muted-foreground" },
  MEDIUM: { label: "Medium priority", className: "border-info/30 bg-info/10 text-info" },
  HIGH: { label: "High priority", className: "border-destructive/30 bg-destructive/10 text-destructive" },
};

export const complaintFilters = [
  { value: "ALL", label: "All" },
  { value: "NEW", label: "New" },
  { value: "ASSIGNED", label: "Assigned" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "RESOLVED", label: "Resolved" },
] as const;

export type ComplaintFilter = (typeof complaintFilters)[number]["value"];

export const mockComplaints: MockComplaint[] = [
  {
    id: "CIV-1041",
    title: "Pothole near market junction",
    department: "Roads & Infrastructure",
    date: "2026-08-17",
    submittedAt: "2026-08-17T09:12:00Z",
    status: "NEW",
    priority: "HIGH",
    summary: "Large pothole forming at the market junction crossing, worsening after rain.",
    description:
      "A large pothole has formed at the market junction crossing. It has widened after the last two days of rain and two-wheelers are swerving into oncoming traffic to avoid it.",
    location: {
      latitude: 12.9721,
      longitude: 77.5933,
      manualAddress: "Market Junction, near bus shelter, Ward 12",
    },
    timeline: [
      {
        status: "NEW",
        label: "Complaint submitted",
        note: "Your report was received and given a reference number.",
        timestamp: "2026-08-17T09:12:00Z",
      },
      { status: "ASSIGNED", label: "Complaint assigned", note: "Awaiting department assignment.", timestamp: null },
      { status: "IN_PROGRESS", label: "Work started", note: "An officer will begin work on site.", timestamp: null },
      { status: "RESOLVED", label: "Resolved", note: "Resolution details will appear here.", timestamp: null },
    ],
  },
  {
    id: "CIV-1038",
    title: "Street light out on 4th Cross",
    department: "Electrical Services",
    date: "2026-08-14",
    submittedAt: "2026-08-14T18:40:00Z",
    status: "ASSIGNED",
    priority: "MEDIUM",
    summary: "Two consecutive street lights have been dark for the past week.",
    description:
      "Two consecutive street lights on 4th Cross have been dark for about a week, leaving the stretch near the park entrance unlit after sunset.",
    location: {
      latitude: 12.9655,
      longitude: 77.6012,
      manualAddress: "4th Cross, opposite park entrance",
    },
    timeline: [
      {
        status: "NEW",
        label: "Complaint submitted",
        note: "Your report was received and given a reference number.",
        timestamp: "2026-08-14T18:40:00Z",
      },
      {
        status: "ASSIGNED",
        label: "Complaint assigned to Electrical Services",
        note: "A field officer has been allotted to inspect the lights.",
        timestamp: "2026-08-15T10:05:00Z",
      },
      { status: "IN_PROGRESS", label: "Work started", note: "Work has not started yet.", timestamp: null },
      { status: "RESOLVED", label: "Resolved", note: "Resolution details will appear here.", timestamp: null },
    ],
  },
  {
    id: "CIV-1032",
    title: "Blocked storm drain on Lake Road",
    department: "Water & Drainage",
    date: "2026-08-09",
    submittedAt: "2026-08-09T07:55:00Z",
    status: "IN_PROGRESS",
    priority: "HIGH",
    summary: "Drain cover clogged with debris, causing water to pool on the footpath.",
    description:
      "The storm drain outside the Lake Road community hall is clogged with leaves and plastic. Water pools across the footpath and pedestrians step onto the road.",
    location: {
      latitude: 12.9588,
      longitude: 77.5841,
      manualAddress: "Lake Road, beside community hall",
    },
    timeline: [
      {
        status: "NEW",
        label: "Complaint submitted",
        note: "Your report was received and given a reference number.",
        timestamp: "2026-08-09T07:55:00Z",
      },
      {
        status: "ASSIGNED",
        label: "Complaint assigned to Water & Drainage",
        note: "Assigned to the ward drainage crew.",
        timestamp: "2026-08-09T11:20:00Z",
      },
      {
        status: "IN_PROGRESS",
        label: "Officer started working on the issue",
        note: "Desilting of the drain line is underway.",
        timestamp: "2026-08-10T09:00:00Z",
      },
      { status: "RESOLVED", label: "Resolved", note: "Resolution details will appear here.", timestamp: null },
    ],
  },
  {
    id: "CIV-1024",
    title: "Overflowing waste bin at bus stop",
    department: "Municipality / Sanitation",
    date: "2026-08-02",
    submittedAt: "2026-08-02T08:30:00Z",
    status: "RESOLVED",
    priority: "LOW",
    summary: "Public bin was not cleared for several days; collection has since resumed.",
    description:
      "The public waste bin at the main bus stop was overflowing and garbage had spread onto the pavement.",
    location: {
      latitude: 12.9702,
      longitude: 77.5899,
      manualAddress: "Main bus stop, Station Road",
    },
    timeline: [
      {
        status: "NEW",
        label: "Complaint submitted",
        note: "Your report was received and given a reference number.",
        timestamp: "2026-08-02T08:30:00Z",
      },
      {
        status: "ASSIGNED",
        label: "Complaint assigned to Municipality Department",
        note: "Allotted to the Ward 9 sanitation supervisor.",
        timestamp: "2026-08-02T09:15:00Z",
      },
      {
        status: "IN_PROGRESS",
        label: "Officer started working on the issue",
        note: "Collection vehicle dispatched to the location.",
        timestamp: "2026-08-03T09:00:00Z",
      },
      {
        status: "RESOLVED",
        label: "Complaint resolved",
        note: "Site cleared and bin restored to the collection route.",
        timestamp: "2026-08-03T13:45:00Z",
      },
    ],
    resolution: {
      message: "Garbage has been cleared from the reported location.",
      note: "The bin has been added back to the twice-daily collection route to prevent repeat overflow.",
      resolvedAt: "2026-08-03T13:45:00Z",
    },
  },
];

export const mockStats = {
  total: mockComplaints.length,
  new: mockComplaints.filter((c) => c.status === "NEW").length,
  inProgress: mockComplaints.filter((c) => c.status === "IN_PROGRESS" || c.status === "ASSIGNED")
    .length,
  resolved: mockComplaints.filter((c) => c.status === "RESOLVED").length,
};

export function formatComplaintDate(iso: string) {
  const date = new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatComplaintDateTime(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export function searchComplaints(
  complaints: MockComplaint[],
  query: string,
  filter: ComplaintFilter,
) {
  const q = query.trim().toLowerCase();
  return complaints.filter((c) => {
    if (filter !== "ALL" && c.status !== filter) return false;
    if (!q) return true;
    return (
      c.id.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.department.toLowerCase().includes(q)
    );
  });
}
