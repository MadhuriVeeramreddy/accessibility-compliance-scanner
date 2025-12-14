"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How accurate are the accessibility scores?",
    answer: "Our automated scans cover approximately 60–70% of accessibility issues. We use Axe-core and Lighthouse, the industry's most trusted accessibility engines. However, some issues (like keyboard navigation flow, screen reader experience, and complex ARIA patterns) require manual testing for complete accuracy.",
  },
  {
    question: "Which standards do you check?",
    answer: "We check against WCAG 2.1 Level AA, IS 17802, and include GIGW references and RPWD Act 2016 context in every report. This ensures your website meets both international and Indian accessibility requirements.",
  },
  {
    question: "Do you store my scans or need a login?",
    answer: "For MVP, no login is required. We only store data temporarily to generate your PDF report. Once you download your report, scan data is not retained for long-term storage. Future versions may include optional account creation for scan history.",
  },
  {
    question: "How long does a scan take?",
    answer: "Most single-page scans complete in under 1 minute. You'll receive real-time progress updates throughout the process showing scan initiation, queued status, processing, and report generation.",
  },
  {
    question: "What's included in the PDF report?",
    answer: "Each PDF report includes your accessibility score, a breakdown of issues by severity (Critical, Serious, Moderate, Minor), detailed issue descriptions with CSS selectors, step-by-step fix recommendations with owner assignments (Developer/Designer/Content), and references to WCAG 2.1, IS 17802, RPWD, and GIGW standards.",
  },
  {
    question: "Can I scan multiple pages at once?",
    answer: "Multi-page scanning is coming soon. Currently, we scan one page at a time. For now, you can scan multiple pages by running separate scans for each URL.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-32 overflow-hidden" aria-labelledby="faq-heading">
      {/* Subtle background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-sm font-medium text-primary">Got Questions?</span>
          </div>
          <h2 
            id="faq-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary mb-4"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about DesiA11y.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-gradient-to-r from-primary-100 to-purple-100 border-b-2 border-primary-200' 
                    : 'hover:bg-gray-50'
                }`}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className={`text-lg font-semibold transition-colors flex-1 ${
                  openIndex === index ? 'text-primary' : 'text-text-primary'
                }`}>
                  {faq.question}
                </span>
                <motion.svg
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-colors ${
                    openIndex === index ? 'text-primary' : 'text-gray-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-3 bg-gradient-to-r from-primary-50/50 to-purple-50/50">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
