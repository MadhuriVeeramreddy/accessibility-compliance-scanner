"use client";

import { useState } from "react";

interface Issue {
  id: string;
  ruleId: string;
  description: string;
  selector: string;
  severity: "critical" | "serious" | "moderate" | "minor";
  suggestion?: string;
}

interface IssueAccordionProps {
  issues: Issue[];
  loading?: boolean;
}

const severityColors = {
  critical: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bg-[#E11D48] text-white" },
  serious: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", badge: "bg-[#F97316] text-white" },
  moderate: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", badge: "bg-[#FACC15] text-black" },
  minor: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", badge: "bg-[#22C55E] text-white" },
};

export default function IssueAccordion({ issues, loading }: IssueAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-slate-200 p-4 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (issues.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No Issues Found!</h3>
        <p className="text-sm text-slate-600">Your website is fully accessible and compliant.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {issues.map((issue, index) => {
        const severity = severityColors[issue.severity];
        const isOpen = openIndex === index;

        return (
          <div
            key={issue.id}
            className={`bg-white rounded-lg border ${severity.border} ${severity.bg} overflow-hidden transition-all duration-200 ${
              isOpen ? "shadow-md" : "shadow-sm"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${severity.badge}`}>
                  {issue.severity.toUpperCase()}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm font-mono font-semibold text-slate-900 bg-white px-2 py-0.5 rounded">
                      {issue.ruleId}
                    </code>
                  </div>
                  <p className="text-sm text-slate-700 line-clamp-1">{issue.description}</p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpen && (
              <div className="px-6 pb-4 border-t border-slate-200 pt-4 space-y-3 animate-fadeIn">
                <div>
                  <p className="text-xs font-semibold text-slate-600 mb-1">Affected Element</p>
                  <code className="text-xs font-mono bg-slate-100 text-slate-900 px-2 py-1 rounded block break-all">
                    {issue.selector}
                  </code>
                </div>
                {issue.suggestion && (
                  <div>
                    <p className="text-xs font-semibold text-slate-600 mb-1">Suggested Fix</p>
                    <p className="text-sm text-slate-700 bg-white px-3 py-2 rounded border border-slate-200">
                      {issue.suggestion}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

