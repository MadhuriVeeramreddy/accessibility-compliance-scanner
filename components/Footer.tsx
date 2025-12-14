"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Twitter",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      href: "#",
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      href: "#",
    },
    {
      name: "GitHub",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      href: "#",
    },
  ];

  return (
    <footer className="relative mt-32 bg-white border-t-2 border-gray-200">
      {/* Enhanced top border gradient line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Company Bio */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-600 to-primary-700"></div>
                <svg className="w-7 h-7 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L6 18" />
                  <path d="M12 2L18 18" />
                  <path d="M12 2L12 14" />
                  <path d="M6 18L12 14" />
                  <path d="M18 18L12 14" />
                </svg>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full border-2 border-primary shadow-sm z-20"></div>
              </div>
              <span className="text-xl font-bold text-text-primary">
                Desi<span className="text-primary">A11y</span>
              </span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Built for Indian teams. Automated ADA/WCAG compliance scanning with actionable fixes. Protect your business, expand your audience, stay compliant.
            </p>
            {/* Social Media Icons - Enhanced hover */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Product</h3>
              <ul className="space-y-3">
              <li>
                  <a href="#features" className="text-sm text-gray-700 hover:text-primary font-medium transition-colors">
                  Features
                  </a>
              </li>
              <li>
                  <a href="#how-it-works" className="text-sm text-gray-700 hover:text-primary font-medium transition-colors">
                  How It Works
                  </a>
              </li>
              <li>
                  <a href="#why-different" className="text-sm text-gray-700 hover:text-primary font-medium transition-colors">
                    Why We&apos;re Different
                  </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Resources</h3>
              <ul className="space-y-3">
              <li>
                  <a href="#faq" className="text-sm text-gray-700 hover:text-primary font-medium transition-colors">
                  FAQ
                  </a>
              </li>
              <li>
                  <a href="/sample-report.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-primary font-medium transition-colors">
                    Sample Report
                  </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Legal</h3>
              <ul className="space-y-3">
              <li>
                  <Link href="/privacy" className="text-sm text-gray-700 hover:text-primary font-medium transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                  <Link href="/terms" className="text-sm text-gray-700 hover:text-primary font-medium transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>© {currentYear} DesiA11y. All rights reserved.</span>
            </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Made with</span>
            <span className="text-red-500">❤️</span>
            <span>for accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
