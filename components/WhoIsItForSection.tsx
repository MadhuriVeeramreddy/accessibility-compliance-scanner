"use client";

import { motion } from "framer-motion";

const audiences = [
  {
    title: "Agencies",
    description: "Deliver compliant websites to clients with confidence. Generate professional audit reports that demonstrate your commitment to accessibility.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.645-5.963-1.75A10.07 10.07 0 016.5 18.75m9.5-2.25a9.09 9.09 0 00-1.5-.064 3 3 0 01-2.682-2.68m-1.5 1.5a9.09 9.09 0 00-1.5.064 3 3 0 012.682 2.68m-1.5 1.5a9.09 9.09 0 00-1.5-.064 3 3 0 01-2.682-2.68m-1.5 1.5a9.09 9.09 0 00-1.5.064 3 3 0 012.682 2.68m-1.5 1.5a9.09 9.09 0 00-1.5-.064 3 3 0 01-2.682-2.68" />
      </svg>
    ),
  },
  {
    title: "SMBs",
    description: "Protect your business from legal risk while expanding your audience. Affordable accessibility compliance without the enterprise price tag.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: "Developers",
    description: "Get actionable, code-level fixes for every issue. Save hours of manual testing with automated scans and detailed remediation guides.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

export default function WhoIsItForSection() {
  return (
    <section className="relative py-32 overflow-hidden" aria-labelledby="who-is-it-for-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-primary">Built for Every Team</span>
          </div>
          <h2 
            id="who-is-it-for-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary mb-4"
          >
            Who Is It For
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built for teams that need fast, accurate accessibility compliance without the complexity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-gray-300 shadow-sm hover:shadow-xl transition-all duration-300 text-center overflow-hidden"
            >
              {/* Gradient border edge */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 via-primary-500/0 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Soft shadow on hover */}
              <div className="absolute inset-0 rounded-2xl shadow-lg shadow-primary/0 group-hover:shadow-primary/10 transition-shadow duration-300"></div>

              {/* Icon */}
              <div className="relative z-10 mb-6">
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-primary-50 to-purple-50 border border-primary-100 group-hover:border-primary-200 group-hover:scale-110 transition-all duration-300">
                  <div className="text-primary">
                    {audience.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors duration-300">
                  {audience.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {audience.description}
                </p>
              </div>

              {/* Hover elevation effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
