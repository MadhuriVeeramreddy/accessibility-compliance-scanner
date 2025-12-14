"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/dashboard/Navbar";
import SummaryCard from "@/components/dashboard/SummaryCard";
import ScanTable from "@/components/dashboard/ScanTable";
import { getScan } from "@/lib/api";

type ScanStatus = "completed" | "processing" | "failed" | "queued";

interface Scan {
  id: string;
  websiteUrl: string;
  dateSubmitted: string;
  status: ScanStatus;
  score: number | null;
}

// Mock data - replace with actual API calls
const mockScans: Scan[] = [
  {
    id: "1",
    websiteUrl: "https://www.barrierbreak.com",
    dateSubmitted: "2025-12-04T09:46:18.135Z",
    status: "completed",
    score: 97,
  },
  {
    id: "2",
    websiteUrl: "https://www.example.com",
    dateSubmitted: "2025-12-03T10:01:59.790Z",
    status: "processing",
    score: null,
  },
  {
    id: "3",
    websiteUrl: "https://www.test.com",
    dateSubmitted: "2025-12-02T08:30:00.000Z",
    status: "completed",
    score: 85,
  },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [scans, setScans] = useState<Scan[]>(mockScans);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const totalScans = scans.length;
  const passedScans = scans.filter((s) => s.status === "completed" && s.score && s.score >= 70).length;
  const failedScans = scans.filter((s) => s.status === "failed").length;
  const avgScore =
    scans
      .filter((s) => s.score !== null)
      .reduce((acc, s) => acc + (s.score || 0), 0) /
    scans.filter((s) => s.score !== null).length || 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Monitor your website accessibility scans and compliance status</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SummaryCard
            title="Total Scans"
            value={totalScans}
            icon={
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            loading={loading}
          />
          <SummaryCard
            title="Passed Scans"
            value={passedScans}
            icon={
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            }
            trend={{ value: "+12%", isPositive: true }}
            loading={loading}
          />
          <SummaryCard
            title="Failed Scans"
            value={failedScans}
            icon={
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
            loading={loading}
          />
          <SummaryCard
            title="Average Score"
            value={avgScore > 0 ? `${Math.round(avgScore)}/100` : "—"}
            icon={
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            loading={loading}
          />
        </div>

        {/* Scan Table */}
        <ScanTable scans={scans} loading={loading} />
      </main>
    </div>
  );
}

