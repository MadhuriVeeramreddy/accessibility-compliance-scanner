"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createWebsite, createScan } from "@/lib/api";
import { motion } from "framer-motion";

type ScanState = 'idle' | 'creating-website' | 'creating-scan' | 'scanning' | 'completed' | 'error';

export default function HeroSection() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [scanId, setScanId] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      setError(null);
      setScanState('creating-website');
      
      const website = await createWebsite(url, name || undefined);
      setScanState('creating-scan');
      const scan = await createScan(website.id);
      setScanId(scan.id);
      
      await new Promise(resolve => setTimeout(resolve, 300));
      router.push(`/scan/${scan.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start scan");
      setScanState('error');
    }
  };

  // Show report if scan is completed
  if (scanState === 'completed' && scanResult) {
    return null; // Handled by AccessibilityReport component
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Full-width gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-purple-50 to-blue-50"></div>
      
      {/* Floating blurred orbs - Enhanced with more elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        {/* Additional floating elements for brand personality */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-35 animate-blob animation-delay-3000"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 rounded-full mb-6"
          >
            <span className="text-xs sm:text-sm font-semibold text-green-800">NEW</span>
            {/* <span className="text-xs sm:text-sm font-medium text-green-700">Announcing API 2.0</span> */}
          </motion.div>

          {/* Main Headline - Split into two lines */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-primary mb-6 leading-[1.1] tracking-tight"
          >
            The most powerful{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              accessibility platform.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{
            letterSpacing: '-0.03em',
          }}
          >
            Unlock the potential of your website with our next-level accessibility scanner. Transform your compliance workflows and achieve WCAG 2.1 / IS 17802 compliance today.
          </motion.p>

          {/* URL Input - Clean, minimal design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mb-8 max-w-2xl mx-auto"
          >
            <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl p-2 shadow-lg">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center bg-white rounded-lg px-4 py-3.5 border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter your website URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && url.trim() && scanState === 'idle') {
                        handleScan();
                      }
                    }}
                    className="flex-1 outline-none bg-transparent text-gray-900 placeholder-gray-400 text-sm sm:text-base md:text-base"
                    aria-label="Website URL input"
                  />
                </div>
                <button
                  onClick={handleScan}
                  disabled={!url.trim() || scanState !== 'idle'}
                  className="px-5 sm:px-6 py-3 sm:py-3.5 bg-primary hover:bg-primary-600 text-white rounded-lg text-sm sm:text-base font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30"
                >
                  <span>Scan</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-center"
              >
                <p className="text-sm text-red-800">{error}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Social Proof Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-gray-600"
          >
            <span className="font-medium">Powered by</span>
            <span className="font-semibold text-primary">axe‑core</span>
            <span className="text-gray-400">•</span>
            <span className="font-semibold text-primary">Lighthouse</span>
            <div className="flex items-center gap-2 ml-2">
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center" title="WCAG 2.1">
                <span className="text-xs font-bold text-primary">W</span>
              </div>
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center" title="IS 17802">
                <span className="text-xs font-bold text-primary">IS</span>
              </div>
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center" title="RPWD Act 2016">
                <span className="text-xs font-bold text-primary">RP</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Loading Overlay */}
      {(scanState === 'creating-website' || scanState === 'creating-scan') && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full mx-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {scanState === 'creating-website' ? 'Creating Website...' : 'Starting Scan...'}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Please wait while we prepare your scan
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
