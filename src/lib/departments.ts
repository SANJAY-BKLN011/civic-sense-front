/** F4: static department list for the citizen report form (no backend). */

export const OTHER_DEPARTMENT = "other";

export const departments = [
  { value: "sanitation", label: "Municipality / Sanitation" },
  { value: "roads", label: "Roads & Infrastructure" },
  { value: "water", label: "Water Supply" },
  { value: "electricity", label: "Electricity" },
  { value: "traffic", label: "Traffic" },
  { value: "public-health", label: "Public Health" },
  { value: "environment", label: "Environment / Parks" },
  { value: "fire", label: "Fire & Emergency" },
  { value: "transport", label: "Public Transport" },
  { value: "housing", label: "Housing / Building Issues" },
  { value: OTHER_DEPARTMENT, label: "Other / Not Sure" },
] as const;

export function departmentLabel(value: string) {
  return departments.find((d) => d.value === value)?.label ?? "";
}

export const TITLE_MAX = 120;
export const DESCRIPTION_MAX = 1000;

export function generateMockComplaintId() {
  const n = 1000 + Math.floor(Math.random() * 9000);
  return `CIV-${n}`;
}
