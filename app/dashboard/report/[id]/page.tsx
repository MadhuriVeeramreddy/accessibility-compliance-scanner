"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/dashboard/Navbar";
import ScoreMeter from "@/components/dashboard/ScoreMeter";
import IssueAccordion from "@/components/dashboard/IssueAccordion";
import ProgressBar from "@/components/dashboard/ProgressBar";
import { getScan } from "@/lib/api";

type Severity = "critical" | "serious" | "moderate" | "minor";

interface ReportIssue {
  id: string;
  ruleId: string;
  description: string;
  selector: string;
  severity: Severity;
  suggestion?: string;
}

interface Report {
  id: string;
  websiteUrl: string;
  websiteName: string;
  scanDate: string;
  status: "queued" | "processing" | "completed" | "failed";
  score: number;
  issues: ReportIssue[];
}

// Mock data - replace with actual API call
const mockReport: Report = {
  id: "1",
  websiteUrl: "https://www.barrierbreak.com",
  websiteName: "Barrier Break",
  scanDate: "2025-12-04T09:46:18.135Z",
  status: "completed",
  score: 97,
  issues: [
    {
      id: "1",
      ruleId: "link-in-text-block",
      description: "Ensure links are distinguished from surrounding text in a way that does not rely on color",
      selector: "a",
      severity: "serious",
      suggestion: "Add underline or other visual indicator to links",
    },
    {
      id: "2",
      ruleId: "meta-refresh",
      description: "Ensure <meta http-equiv=\"refresh\"> is not used for delayed refresh",
      selector: "meta [http-equiv=\"refresh\"]",
      severity: "critical",
      suggestion: "Remove the meta refresh tag or use a redirect with proper HTTP status code",
    },
  ],
};

export default function ReportPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<Report>(mockReport);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setLoading(false), 1000);
  }, [params.id]);

  const severityCounts = {
    critical: report.issues.filter((i) => i.severity === "critical").length,
    serious: report.issues.filter((i) => i.severity === "serious").length,
    moderate: report.issues.filter((i) => i.severity === "moderate").length,
    minor: report.issues.filter((i) => i.severity === "minor").length,
  };

  // Map report status to ProgressBar status
  const getProgressBarStatus = (status: Report["status"]): "queued" | "running" | "analyzing" | "generating" | "completed" => {
    switch (status) {
      case "queued":
        return "queued";
      case "processing":
        return "running";
      case "completed":
        return "completed";
      case "failed":
        return "completed"; // Show as completed even if failed
      default:
        return "queued";
    }
  };

  const handleDownloadPDF = () => {
    // TODO: Implement PDF download
    console.log("Downloading PDF report...");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                {report.websiteName || "Accessibility Report"}
              </h1>
              <p className="text-slate-600 mb-4">{report.websiteUrl}</p>
              <div className="text-sm text-slate-500">
                Scanned on {new Date(report.scanDate).toLocaleString("en-US")}
              </div>
            </div>

            {/* Progress Bar (if not completed) */}
            {report.status !== "completed" && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Scan Progress</h2>
                <ProgressBar status={getProgressBarStatus(report.status)} />
              </div>
            )}

            {/* Score Meter */}
            {report.status === "completed" && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
                <h2 className="text-lg font-semibold text-slate-900 mb-6">Accessibility Score</h2>
                <div className="flex justify-center">
                  <ScoreMeter score={report.score} size={200} loading={loading} />
                </div>
              </div>
            )}

            {/* Violations Summary */}
            {report.status === "completed" && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Violations Summary</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-3xl font-bold text-[#E11D48] mb-1">{severityCounts.critical}</div>
                    <div className="text-sm font-medium text-red-700">Critical</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="text-3xl font-bold text-[#F97316] mb-1">{severityCounts.serious}</div>
                    <div className="text-sm font-medium text-orange-700">Serious</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-3xl font-bold text-[#FACC15] mb-1">{severityCounts.moderate}</div>
                    <div className="text-sm font-medium text-yellow-700">Moderate</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-3xl font-bold text-[#22C55E] mb-1">{severityCounts.minor}</div>
                    <div className="text-sm font-medium text-green-700">Minor</div>
                  </div>
                </div>
              </div>
            )}

            {/* Issues List */}
            {report.status === "completed" && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Detailed Issues ({report.issues.length})
                </h2>
                <IssueAccordion issues={report.issues} loading={loading} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Download PDF Card */}
            {report.status === "completed" && (
              <div className="bg-gradient-to-br from-primary to-primary-600 rounded-xl shadow-lg p-6 text-white sticky top-24">
                <h3 className="text-lg font-semibold mb-2">Download Report</h3>
                <p className="text-sm text-primary-100 mb-6">
                  Get a detailed PDF report with all findings and recommendations
                </p>
                <button
                  onClick={handleDownloadPDF}
                  className="w-full bg-white text-primary font-semibold py-3 px-4 rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download PDF Report
                </button>
              </div>
            )}

            {/* Info Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">About This Report</h3>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>
                    Higher scores indicate better accessibility compliance with WCAG 2.1 standards.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>
                    Issues are categorized by severity to help prioritize fixes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

