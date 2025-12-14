"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getScan } from "@/lib/api";
import AccessibilityReport from "@/components/AccessibilityReport";

export default function ScanningPage() {
  const params = useParams();
  const router = useRouter();
  const scanId = params.id as string;
  
  const [scan, setScan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!scanId) return;

    let pollInterval: NodeJS.Timeout;

    const pollScan = async () => {
      try {
        const scanData = await getScan(scanId);
        setScan(scanData);
        setLoading(false);

        // If scan is completed or failed, stop polling
        if (scanData.status === 'completed' || scanData.status === 'failed') {
          if (pollInterval) {
            clearInterval(pollInterval);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch scan status');
        setLoading(false);
        if (pollInterval) {
          clearInterval(pollInterval);
        }
      }
    };

    // Initial poll
    pollScan();

    // Poll every 2 seconds if scan is still in progress
    pollInterval = setInterval(() => {
      if (scan?.status === 'queued' || scan?.status === 'processing') {
        pollScan();
      }
    }, 2000);

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [scanId, scan?.status]);

  // Get website URL from scan data
  const websiteUrl = scan?.website?.url || '';

  // If scan is completed, show the report
  if (scan?.status === 'completed') {
    // Extract violations from metaJson - metaJson.axe is an array of violations
    const violations = scan.metaJson?.axe || [];
    
    // Expand violations into individual issues (one per node) to match PDF counting
    const issues: any[] = [];
    if (Array.isArray(violations)) {
      violations.forEach((violation: any) => {
        // If violation has nodes, expand each node into a separate issue
        if (violation.nodes && Array.isArray(violation.nodes)) {
          violation.nodes.forEach((node: any) => {
            // Normalize impact to lowercase to match filter values
            const impact = (violation.impact || 'moderate').toLowerCase();
            issues.push({
              id: violation.id,
              help: violation.help || violation.description || '',
              description: violation.description || violation.help || '',
              impact: impact as 'critical' | 'serious' | 'moderate' | 'minor',
              helpUrl: violation.helpUrl || '',
              tags: violation.tags || [],
              nodes: [node], // Single node per issue
            });
          });
        } else {
          // If no nodes, create one issue for the violation
          // Normalize impact to lowercase to match filter values
          const impact = (violation.impact || 'moderate').toLowerCase();
          issues.push({
            id: violation.id,
            help: violation.help || violation.description || '',
            description: violation.description || violation.help || '',
            impact: impact as 'critical' | 'serious' | 'moderate' | 'minor',
            helpUrl: violation.helpUrl || '',
            tags: violation.tags || [],
            nodes: [],
          });
        }
      });
    }
    
    // Extract GIGW results from metaJson
    const gigwResults = scan.metaJson?.gigw || null;
    
    return (
      <AccessibilityReport
        website={websiteUrl}
        scanDate={scan.createdAt}
        score={scan.score}
        issues={issues}
        scanId={scan.id}
        gigwResults={gigwResults}
      />
    );
  }

  // If scan failed, show error
  if (scan?.status === 'failed' || error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl border border-red-200 shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Scan Failed</h2>
            <p className="text-gray-600 mb-6">{error || 'The scan encountered an error. Please try again.'}</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show scanning UI - Matching final structure
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header - Matching final structure */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Scan New Website
              </button>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-6 py-2.5 rounded-lg font-semibold">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Scanning...</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Accessibility Scan Report</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{websiteUrl || 'Loading...'}</span>
            <span>•</span>
            <span>Scanning in progress...</span>
          </div>
        </div>

        {/* Score Card - Loading State */}
        <div className="mb-8 rounded-2xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Accessibility Score</p>
              <div className="flex items-baseline gap-3">
                <div className="w-20 h-16 bg-primary-200 rounded-lg animate-pulse"></div>
                <span className="text-2xl font-semibold text-gray-500">/ 100</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600 mb-1">Total Issues</p>
              <div className="w-12 h-10 bg-primary-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Lighthouse Metrics & Severity Breakdown - Loading State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Lighthouse Metrics Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-primary-200 rounded animate-pulse"></div>
              <div className="h-5 w-32 bg-primary-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-12 bg-primary-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Severity Breakdown Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-primary-200 rounded animate-pulse"></div>
              <div className="h-5 w-32 bg-primary-200 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <div className="h-8 w-8 bg-primary-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-16 bg-primary-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Issues Section - Loading State */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="h-6 w-40 bg-primary-200 rounded mb-6 animate-pulse"></div>
          
          {/* Filter Buttons Loading */}
          <div className="flex flex-wrap items-center gap-2 mb-6 pb-6 border-b border-gray-200">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-9 w-20 bg-primary-100 rounded-lg animate-pulse"></div>
            ))}
          </div>

          {/* Issue Placeholders */}
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-primary-50 border-l-4 border-primary-200 rounded-lg p-4 animate-pulse">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-5 w-20 bg-primary-200 rounded"></div>
                      <div className="h-5 w-32 bg-primary-200 rounded"></div>
                    </div>
                    <div className="h-4 w-full bg-primary-200 rounded mb-2"></div>
                    <div className="h-3 w-48 bg-primary-200 rounded"></div>
                  </div>
                  <div className="w-5 h-5 bg-primary-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Message */}
        <div className="mt-8 flex items-start gap-3 bg-primary-50 border border-primary-200 rounded-lg p-4">
          <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-primary-800">
            It usually takes up to 12 seconds. You will see the results when scanning is completed.
          </p>
        </div>
      </main>
    </div>
  );
}
