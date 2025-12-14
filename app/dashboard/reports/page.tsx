"use client";

import Navbar from "@/components/dashboard/Navbar";
import ScanTable from "@/components/dashboard/ScanTable";

const mockScans = [
  {
    id: "1",
    websiteUrl: "https://www.barrierbreak.com",
    dateSubmitted: "2025-12-04T09:46:18.135Z",
    status: "completed" as const,
    score: 97,
  },
  {
    id: "2",
    websiteUrl: "https://www.example.com",
    dateSubmitted: "2025-12-03T10:01:59.790Z",
    status: "completed" as const,
    score: 85,
  },
  {
    id: "3",
    websiteUrl: "https://www.test.com",
    dateSubmitted: "2025-12-02T08:30:00.000Z",
    status: "completed" as const,
    score: 92,
  },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Reports</h1>
          <p className="text-slate-600">View all your accessibility scan reports</p>
        </div>
        <ScanTable scans={mockScans} />
      </main>
    </div>
  );
}

