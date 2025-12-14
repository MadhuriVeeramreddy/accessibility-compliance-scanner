"use client";

import { motion } from "framer-motion";

const differentiators = [
  {
    title: "Includes RPWD / IS 17802 / GIGW Context",
    description: "Every report includes RPWD Act 2016, IS 17802, and GIGW context—designed specifically for Indian compliance requirements.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Designed for Agencies, Clinics, and SaaS Founders",
    description: "Built for Indian teams—not just developers. Reports are actionable for agencies, clinics, and SaaS founders who need compliance insights.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Actionable Fixes with Owners",
    description: "Every issue includes step-by-step fixes with clear ownership (Developer / Designer / Content) so you know exactly who should fix what.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
];

export default function WhyDifferentSection() {
  return (
    <section id="why-different" className="relative py-24 overflow-hidden bg-white" aria-labelledby="why-different-heading">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Highlight Banner */}
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
            <span className="text-sm font-medium text-primary">Built With Industry-Leading Accessibility Engines</span>
          </div>
          <h2 
            id="why-different-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary mb-4"
          >
            Why We&apos;re Different (for India)
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built specifically for Indian teams with local compliance context and actionable fixes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-primary-50 to-purple-50 border border-primary-100 group-hover:border-primary-200 transition-all duration-300">
                  <div className="text-primary">
                    {item.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
