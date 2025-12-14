"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { downloadPDF, createWebsite, createScan } from "@/lib/api";
import Footer from "./Footer";

interface Issue {
  id: string;
  help: string;
  description: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  helpUrl: string;
  tags: string[];
  nodes: Array<{
    html: string;
    target: string[];
    impact: string;
    failureSummary?: string;
  }>;
}

interface AccessibilityReportProps {
  website: string;
  scanDate: string;
  score: number | null;
  issues: Issue[];
  scanId: string;
  gigwResults?: any;
}

export default function AccessibilityReport({
  website,
  scanDate,
  score,
  issues,
  scanId,
  gigwResults,
}: AccessibilityReportProps) {
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'serious' | 'moderate' | 'minor'>('all');
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [showGIGWDetails, setShowGIGWDetails] = useState(false);
  const [expandedChecks, setExpandedChecks] = useState<Set<string>>(new Set());
  const [scanUrl, setScanUrl] = useState("");
  const [scanName, setScanName] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadError(null);
    
    try {
      await downloadPDF(scanId);
    } catch (error) {
      setDownloadError(error instanceof Error ? error.message : 'Failed to download PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleScanNewWebsite = async () => {
    if (!scanUrl.trim()) {
      setScanError("Please enter a valid URL");
      return;
    }

    try {
      setScanError(null);
      setIsScanning(true);
      
      // Step 1: Create website
      const website = await createWebsite(scanUrl, scanName || undefined);
      
      // Step 2: Create scan
      const scan = await createScan(website.id);
      
      // Close dialog and navigate to scanning page
      setShowScanDialog(false);
      setScanUrl("");
      setScanName("");
      router.push(`/scan/${scan.id}`);
    } catch (err) {
      setScanError(err instanceof Error ? err.message : "Failed to start scan");
    } finally {
      setIsScanning(false);
    }
  };

  const calculateScore = (issues: Issue[]): number => {
    if (issues.length === 0) return 100;
    
    let totalDeduction = 0;
    issues.forEach((issue) => {
      switch (issue.impact) {
        case 'critical':
          totalDeduction += 10;
          break;
        case 'serious':
          totalDeduction += 5;
          break;
        case 'moderate':
          totalDeduction += 2;
          break;
        case 'minor':
          totalDeduction += 1;
          break;
      }
    });
    
    return Math.max(0, 100 - totalDeduction);
  };

  const finalScore = score || calculateScore(issues);

  // Calculate severity breakdown
  const severityCounts = {
    critical: issues.filter(i => i.impact === 'critical').length,
    serious: issues.filter(i => i.impact === 'serious').length,
    moderate: issues.filter(i => i.impact === 'moderate').length,
    minor: issues.filter(i => i.impact === 'minor').length,
  };

  const totalIssues = issues.length;

  // Filter issues based on active filter
  const filteredIssues = activeFilter === 'all' 
    ? issues 
    : issues.filter(i => i.impact === activeFilter);

  // Calculate GIGW 3.0 Compliance Status
  const getGIGWComplianceStatus = () => {
    if (!gigwResults) return 'Not Assessed';
    
    if (gigwResults.passed) {
      return 'Compliant';
    }
    
    const percentage = gigwResults.totalChecks > 0 
      ? (gigwResults.passedChecks / gigwResults.totalChecks) * 100 
      : 0;
    
    if (percentage >= 75) {
      return 'Largely Compliant';
    } else if (percentage >= 50) {
      return 'Partially Compliant';
    } else {
      return 'Non-Compliant';
    }
  };

  const gigwStatus = getGIGWComplianceStatus();
  const getGIGWStatusColor = () => {
    if (gigwStatus === 'Compliant') return 'text-green-600';
    if (gigwStatus === 'Largely Compliant') return 'text-yellow-600';
    if (gigwStatus === 'Partially Compliant') return 'text-orange-600';
    if (gigwStatus === 'Non-Compliant') return 'text-red-600';
    return 'text-gray-600';
  };

  // Get score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-50 border-green-200';
    if (score >= 70) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', count: 'text-red-600' };
      case 'serious':
        return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', count: 'text-orange-600' };
      case 'moderate':
        return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', count: 'text-yellow-600' };
      case 'minor':
        return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', count: 'text-blue-600' };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', count: 'text-gray-600' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
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
                onClick={() => setShowScanDialog(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Scan New Website
              </button>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Download PDF report"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Download Error Message */}
        {downloadError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-800">{downloadError}</p>
            </div>
          </div>
        )}

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Accessibility Scan Report</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{website}</span>
            <span>•</span>
            <span>{new Date(scanDate).toLocaleString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}</span>
          </div>
        </div>

        {/* Score Card - Large Hero Section */}
        <div className={`mb-8 rounded-2xl border-2 p-8 ${getScoreBgColor(finalScore)}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Lighthouse Score</p>
              <div className="flex items-baseline gap-3">
                <span className={`text-6xl font-bold ${getScoreColor(finalScore)}`}>
                  {finalScore}
                </span>
                <span className="text-2xl font-semibold text-gray-500">/ 100</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600 mb-1">Total Issues</p>
              <p className="text-3xl font-bold text-text-primary">{totalIssues}</p>
            </div>
          </div>
        </div>

        {/* GIGW 3.0 Compliance & Severity Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* GIGW 3.0 Compliance Status Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              GIGW 3.0 Compliance Status
            </h2>
            
            {gigwResults ? (
              <div className="space-y-4">
                {/* Compliance Status & Checks Passed */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Compliance Status</span>
                    <span className={`text-sm font-semibold ${getGIGWStatusColor()}`}>
                      {gigwStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Checks Passed</span>
                    <span className="text-sm font-semibold text-text-primary">
                      {gigwResults.passedChecks} of {gigwResults.totalChecks}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        gigwStatus === 'Compliant' ? 'bg-green-600' :
                        gigwStatus === 'Largely Compliant' ? 'bg-yellow-600' :
                        gigwStatus === 'Partially Compliant' ? 'bg-orange-600' :
                        'bg-red-600'
                      }`}
                      style={{ width: `${(gigwResults.passedChecks / gigwResults.totalChecks) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Violations Found */}
                {gigwResults.violations && gigwResults.violations.length > 0 && (
                  <div className="pb-4 border-b border-gray-200">
                    <div className="text-sm font-semibold text-gray-700 mb-3">Violations Found ({gigwResults.violations.length}):</div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {gigwResults.violations.map((violation: any, index: number) => (
                        <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold flex-shrink-0 ${
                              violation.severity === 'critical' ? 'bg-red-600 text-white' :
                              violation.severity === 'serious' ? 'bg-orange-600 text-white' :
                              'bg-yellow-600 text-white'
                            }`}>
                              {violation.severity?.toUpperCase() || 'MODERATE'}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-gray-900 mb-1">
                                {violation.rule?.replace('GIGW 3.0 - ', '') || 'GIGW Violation'}
                              </div>
                              <div className="text-xs text-gray-700">
                                {violation.description || violation.impact}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Individual Checks - Expandable */}
                <div>
                  <button
                    onClick={() => setShowGIGWDetails(!showGIGWDetails)}
                    className="w-full text-sm text-primary hover:text-primary-600 font-medium flex items-center justify-between py-2 px-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <span>{showGIGWDetails ? 'Hide' : 'Show'} Individual Checks</span>
                    <svg 
                      className={`w-4 h-4 transition-transform ${showGIGWDetails ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showGIGWDetails && gigwResults.details && (
                    <div className="mt-3 space-y-2">
                      {Object.entries(gigwResults.details).map(([check, data]: [string, any]) => {
                        const passed = data.passed;
                        const violation = gigwResults.violations?.find((v: any) => v.rule === check);
                        const isExpanded = expandedChecks.has(check);
                        return (
                          <div key={check} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => {
                                const newExpanded = new Set(expandedChecks);
                                if (isExpanded) {
                                  newExpanded.delete(check);
                                } else {
                                  newExpanded.add(check);
                                }
                                setExpandedChecks(newExpanded);
                              }}
                              className="w-full flex items-center gap-2 p-3 hover:bg-gray-50 transition-colors text-left"
                            >
                              <div className={`flex-shrink-0 ${passed ? 'text-green-600' : 'text-red-600'}`}>
                                {passed ? (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className={`text-sm font-medium ${passed ? 'text-gray-700' : 'text-gray-900'}`}>
                                  {check.replace('GIGW 3.0 - ', '')}
                                </div>
                              </div>
                              <svg 
                                className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {isExpanded && (
                              <div className="px-3 pb-3 pt-0 border-t border-gray-100 bg-gray-50">
                                {passed ? (
                                  <div className="text-xs text-gray-600 mt-2">
                                    This check passed successfully.
                                  </div>
                                ) : violation ? (
                                  <div className="text-xs text-gray-700 mt-2">
                                    <div className="font-medium mb-1">Issue:</div>
                                    <div>{violation.description || violation.impact}</div>
                                  </div>
                                ) : (
                                  <div className="text-xs text-gray-600 mt-2">
                                    This check failed. Review the violation details above.
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 text-center py-4">
                GIGW compliance data not available
              </div>
            )}
          </div>

          {/* Severity Breakdown Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Issues by Severity
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className={`${getSeverityColor('critical').bg} ${getSeverityColor('critical').border} border rounded-lg p-4`}>
                <div className={`text-3xl font-bold ${getSeverityColor('critical').count} mb-1`}>
                  {severityCounts.critical}
                </div>
                <div className={`text-sm font-medium ${getSeverityColor('critical').text}`}>
                  Critical
                </div>
              </div>
              <div className={`${getSeverityColor('serious').bg} ${getSeverityColor('serious').border} border rounded-lg p-4`}>
                <div className={`text-3xl font-bold ${getSeverityColor('serious').count} mb-1`}>
                  {severityCounts.serious}
                </div>
                <div className={`text-sm font-medium ${getSeverityColor('serious').text}`}>
                  Serious
                </div>
              </div>
              <div className={`${getSeverityColor('moderate').bg} ${getSeverityColor('moderate').border} border rounded-lg p-4`}>
                <div className={`text-3xl font-bold ${getSeverityColor('moderate').count} mb-1`}>
                  {severityCounts.moderate}
                </div>
                <div className={`text-sm font-medium ${getSeverityColor('moderate').text}`}>
                  Moderate
                </div>
              </div>
              <div className={`${getSeverityColor('minor').bg} ${getSeverityColor('minor').border} border rounded-lg p-4`}>
                <div className={`text-3xl font-bold ${getSeverityColor('minor').count} mb-1`}>
                  {severityCounts.minor}
                </div>
                <div className={`text-sm font-medium ${getSeverityColor('minor').text}`}>
                  Minor
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issues Summary */}
        {totalIssues > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text-primary">
                Issues Found ({totalIssues})
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-6 pb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({totalIssues})
              </button>
              <button
                onClick={() => setActiveFilter('critical')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'critical'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                }`}
              >
                Critical ({severityCounts.critical})
              </button>
              <button
                onClick={() => setActiveFilter('serious')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'serious'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                }`}
              >
                Serious ({severityCounts.serious})
              </button>
              <button
                onClick={() => setActiveFilter('moderate')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'moderate'
                    ? 'bg-yellow-600 text-white shadow-sm'
                    : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200'
                }`}
              >
                Moderate ({severityCounts.moderate})
              </button>
              <button
                onClick={() => setActiveFilter('minor')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === 'minor'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                }`}
              >
                Minor ({severityCounts.minor})
              </button>
            </div>
            
            {filteredIssues.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">No {activeFilter !== 'all' ? activeFilter : ''} issues found</p>
                {activeFilter !== 'all' && (
                  <button
                    onClick={() => setActiveFilter('all')}
                    className="mt-4 text-primary hover:text-primary-600 font-medium text-sm"
                  >
                    View all issues
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredIssues.map((issue, index) => {
                const severityColors = getSeverityColor(issue.impact);
                // Create unique key combining id, index, and selector to avoid duplicate keys
                const uniqueKey = `${issue.id}-${index}-${issue.nodes?.[0]?.target?.[0] || ''}`;
                return (
                  <div
                    key={uniqueKey}
                    className={`${severityColors.bg} ${severityColors.border} border-l-4 rounded-lg p-4 hover:shadow-md transition-shadow duration-200`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2.5 py-1 rounded text-xs font-semibold ${severityColors.text} ${severityColors.bg} border ${severityColors.border}`}>
                            {issue.impact.toUpperCase()}
                          </span>
                          <code className="text-xs text-gray-600 bg-white px-2 py-1 rounded font-mono border border-gray-200">
                            {issue.id}
                          </code>
                        </div>
                        <p className="text-sm text-text-primary font-medium mb-1">
                          {issue.description || issue.help}
                        </p>
                        {issue.nodes && issue.nodes.length > 0 && issue.nodes[0].target && (
                          <p className="text-xs text-gray-500 mt-2">
                            Found in: <code className="bg-white px-1.5 py-0.5 rounded font-mono">{issue.nodes[0].target[0]}</code>
                          </p>
                        )}
                      </div>
                      {issue.helpUrl && (
                        <a
                          href={issue.helpUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 text-primary hover:text-primary-600 transition-colors"
                          title="Learn more"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {totalIssues === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-text-primary mb-2">No Issues Found!</h3>
            <p className="text-gray-600">Your website is fully accessible and compliant.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Scan New Website Dialog */}
      {showScanDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text-primary">Scan New Website</h2>
              <button
                onClick={() => {
                  setShowScanDialog(false);
                  setScanUrl("");
                  setScanName("");
                  setScanError(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close dialog"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Error Message */}
            {scanError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-800">{scanError}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label htmlFor="scan-url" className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
                  <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <input
                    id="scan-url"
                    type="text"
                    placeholder="https://example.com"
                    value={scanUrl}
                    onChange={(e) => setScanUrl(e.target.value)}
                    className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-sm"
                    disabled={isScanning}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !isScanning) {
                        handleScanNewWebsite();
                      }
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="scan-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Website Name (Optional)
                </label>
                <input
                  id="scan-name"
                  type="text"
                  placeholder="My Website"
                  value={scanName}
                  onChange={(e) => setScanName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm"
                  disabled={isScanning}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isScanning) {
                      handleScanNewWebsite();
                    }
                  }}
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowScanDialog(false);
                    setScanUrl("");
                    setScanName("");
                    setScanError(null);
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  disabled={isScanning}
                >
                  Cancel
                </button>
                <button
                  onClick={handleScanNewWebsite}
                  disabled={isScanning || !scanUrl.trim()}
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isScanning ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Starting Scan...</span>
                    </>
                  ) : (
                    'Start Scan'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
