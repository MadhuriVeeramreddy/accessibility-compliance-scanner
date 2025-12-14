"use client";

import { motion } from "framer-motion";

const benefits = [
  {
    label: "Legal Protection",
    title: "Legal Protection",
    description: "Avoid RPWD and SEBI accessibility risk in India by spotting critical issues early. Stay compliant with ADA, WCAG, and Section 508 to protect your business from legal action.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016a11.959 11.959 0 00-8.618-3.04A12.02 12.02 0 0012 2.713z" />
      </svg>
    ),
  },
  {
    label: "Reach More Users",
    title: "Reach More Users",
    description: "Expand your audience by making your website accessible to 15% of the global population with disabilities. Tap into new markets and increase your customer base.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
      </svg>
    ),
  },
  {
    label: "Stronger Brand Trust",
    title: "Stronger Brand Trust / Inclusivity",
    description: "Demonstrate your commitment to inclusivity and accessibility. Build stronger brand trust and show customers you care about all users.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.312-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
];

export default function WhySection() {
  return (
    <section className="relative py-32 overflow-hidden" aria-labelledby="why-heading">
      {/* Subtle dotted background texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ 
          backgroundImage: 'radial-gradient(circle, #4e18e2 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-sm font-medium text-primary">Why Compliance Matters</span>
          </div>
          <h2 
            id="why-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary mb-4"
          >
            Why ADA/WCAG Compliance Matters
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Maximize your website&apos;s accessibility and compliance while maintaining excellent user experience for all visitors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className="inline-flex p-3 rounded-lg bg-gray-50">
                  <div className="text-gray-700">
                    {benefit.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
