"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Enter URL",
    description: "Simply paste your website URL. Our scanner will automatically detect your site's structure and begin analysis.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Scan",
    description: "Our scanner analyzes your website against WCAG, ADA, Section 508, and other compliance standards in minutes.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Get Report",
    description: "Receive a detailed PDF report with prioritized issues, exact fixes, and compliance scores. Share with your team instantly.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden" aria-labelledby="how-it-works-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-primary">Simple & Fast Process</span>
          </div>
          <h2 
            id="how-it-works-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary mb-4"
          >
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get a comprehensive accessibility audit in three simple steps. No technical knowledge required.
          </p>
        </motion.div>

        <div className="relative">
          {/* Progress Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200"></div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-14 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex flex-col h-full"
              >
                {/* Connector Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-6 w-12 h-0.5 bg-primary-300">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-primary-300 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                )}

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 p-8 group flex flex-col h-full">
                  {/* Numbered Badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                        <span className="text-2xl font-bold text-white">{step.number}</span>
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl opacity-20 blur group-hover:opacity-30 transition-opacity"></div>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-primary-200 to-transparent hidden lg:block"></div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed flex-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dashboard Preview Mockup - Enhanced visibility */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <div className="relative bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl shadow-primary/20 overflow-hidden">
             Soft shadow behind mockup 
            <div className="absolute -inset-4 bg-gradient-to-br from-primary-100/50 to-purple-100/50 rounded-3xl blur-2xl -z-10"></div>
            <div className="space-y-4">
               Mock Dashboard Header
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg"></div>
                  <div>
                    <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-2 w-24 bg-gray-100 rounded mt-1 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Mock Score Card 
              <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl p-6 border border-primary-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-20 bg-primary-200 rounded animate-pulse"></div>
                </div>
                <div className="h-16 w-full bg-white rounded-lg border border-gray-200 animate-pulse"></div>
              </div>

              {/* Mock Metrics Grid 
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="h-3 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
                    <div className="h-6 w-16 bg-primary-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon Notice 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-500 mb-4">
            Multi‑page scans, weekly monitoring, and remediation support coming next.
          </p>
        </motion.div> */}
      </div>
    </section>
  );
}
