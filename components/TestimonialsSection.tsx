"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Lead Developer",
    company: "TechFlow Agency",
    content: "DesiA11y saved us hours of manual testing. The actionable fixes make it easy to address issues quickly.",
    avatar: "SC",
  },
  {
    name: "Michael Rodriguez",
    role: "Founder",
    company: "Digital Solutions Co.",
    content: "Finally, an accessibility tool that doesn't just tell us what's wrong—it shows us exactly how to fix it.",
    avatar: "MR",
  },
  {
    name: "Emily Johnson",
    role: "Product Manager",
    company: "StartupXYZ",
    content: "The PDF reports are professional and client-ready. Our clients appreciate the detailed compliance documentation.",
    avatar: "EJ",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="testimonials-heading">
      <div className="text-center mb-16">
        <h2 
          id="testimonials-heading"
          className="text-hero-h2 font-extrabold text-text-primary mb-4"
        >
          Trusted by Teams Worldwide
        </h2>
        <p className="text-hero-p font-light text-text-primary max-w-2xl mx-auto">
          See what developers, agencies, and businesses are saying about DesiA11y.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold text-sm">{testimonial.avatar}</span>
              </div>
              <div>
                <div className="font-semibold text-text-primary">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
              </div>
            </div>
            <p className="text-hero-p font-light text-text-primary leading-relaxed">
              &ldquo;{testimonial.content}&rdquo;
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

