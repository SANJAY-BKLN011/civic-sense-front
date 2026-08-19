/**
 * F3: static mock data for the citizen dashboard.
 * No backend or database is connected — these rows exist for layout purposes only.
 */

export type ComplaintStatus = "NEW" | "ASSIGNED" | "IN_PROGRESS" | "RESOLVED";

export interface MockComplaint {
  id: string;
  title: string;
  department: string;
  date: string;
  status: ComplaintStatus;
  summary: string;
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

export const mockComplaints: MockComplaint[] = [
  {
    id: "CS-1041",
    title: "Pothole near market junction",
    department: "Roads & Infrastructure",
    date: "2026-08-17",
    status: "NEW",
    summary: "Large pothole forming at the market junction crossing, worsening after rain.",
  },
  {
    id: "CS-1038",
    title: "Street light out on 4th Cross",
    department: "Electrical Services",
    date: "2026-08-14",
    status: "ASSIGNED",
    summary: "Two consecutive street lights have been dark for the past week.",
  },
  {
    id: "CS-1032",
    title: "Blocked storm drain on Lake Road",
    department: "Water & Drainage",
    date: "2026-08-09",
    status: "IN_PROGRESS",
    summary: "Drain cover clogged with debris, causing water to pool on the footpath.",
  },
  {
    id: "CS-1024",
    title: "Overflowing waste bin at bus stop",
    department: "Sanitation",
    date: "2026-08-02",
    status: "RESOLVED",
    summary: "Public bin was not cleared for several days; collection has since resumed.",
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
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
