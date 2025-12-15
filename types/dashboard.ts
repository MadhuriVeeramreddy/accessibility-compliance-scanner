// Shared types for dashboard components

export type ScanStatus = "queued" | "processing" | "completed" | "failed";

export interface DashboardScan {
  id: string;
  websiteUrl: string;
  dateSubmitted: string;
  status: ScanStatus;
  score: number | null;
}
