"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWebsite, createScan } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScanDialogOpen, setIsScanDialogOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleScan = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      
      const website = await createWebsite(url);
      const scan = await createScan(website.id);
      
      setIsScanDialogOpen(false);
      setUrl("");
      router.push(`/scan/${scan.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start scan");
      setIsLoading(false);
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerOffset = 80; // Account for sticky header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 group-hover:scale-105 transition-all duration-300 overflow-hidden">
                {/* Background fill with brand color gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-600 to-primary-700"></div>
                {/* Simple geometric rocket logo */}
                <svg className="w-6 h-6 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  {/* Two sides of triangle (no bottom line) */}
                  <path d="M12 2L6 18" />
                  <path d="M12 2L18 18" />
                  {/* Vertical line from top vertex to 3/4 height */}
                  <path d="M12 2L12 14" />
                  {/* Two slant lines from bottom vertexes to 3/4 point on vertical line */}
                  <path d="M6 18L12 14" />
                  <path d="M18 18L12 14" />
                </svg>
                {/* Accent dot - Indian connection */}
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full border-2 border-primary shadow-sm z-20"></div>
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              </div>
              <span className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                Desi<span className="text-primary font-extrabold">A11y</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex md:items-center md:space-x-8 md:flex-1 md:justify-center">
            <a
              href="#features"
              onClick={(e) => handleSmoothScroll(e, '#features')}
              className="text-text-primary hover:text-primary transition-colors duration-200 font-medium text-sm sm:text-base"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => handleSmoothScroll(e, '#how-it-works')}
              className="text-text-primary hover:text-primary transition-colors duration-200 font-medium text-sm sm:text-base"
            >
              How It Works
            </a>
            <a
              href="#why-different"
              onClick={(e) => handleSmoothScroll(e, '#why-different')}
              className="text-text-primary hover:text-primary transition-colors duration-200 font-medium text-sm sm:text-base"
            >
              Why We&apos;re Different
            </a>
            <a
              href="#faq"
              onClick={(e) => handleSmoothScroll(e, '#faq')}
              className="text-text-primary hover:text-primary transition-colors duration-200 font-medium text-sm sm:text-base"
            >
              FAQ
            </a>
          </div>

          {/* Right Side - CTA */}
          <div className="hidden md:flex md:items-center">
              <button 
                onClick={() => setIsScanDialogOpen(true)}
                className="px-4 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium text-sm sm:text-base transition-all duration-200 flex items-center gap-1 shadow-lg shadow-primary/20 hover:shadow-primary/30"
              >
                Scan Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <button 
              onClick={() => setIsScanDialogOpen(true)}
              className="px-3 py-1.5 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-md shadow-primary/20"
            >
              Scan Now
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              <motion.svg
                className="h-6 w-6 absolute"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={false}
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                  rotate: isMenuOpen ? 90 : 0,
                  scale: isMenuOpen ? 0.8 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </motion.svg>
              <motion.svg
                className="h-6 w-6 absolute"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={false}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  rotate: isMenuOpen ? 0 : -90,
                  scale: isMenuOpen ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </motion.svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Full Page Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Menu Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ 
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                }}
                className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-600 to-primary-700"></div>
                      <svg className="w-5 h-5 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L6 18" />
                        <path d="M12 2L18 18" />
                        <path d="M12 2L12 14" />
                        <path d="M6 18L12 14" />
                        <path d="M18 18L12 14" />
                      </svg>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-white rounded-full border-2 border-primary shadow-sm z-20"></div>
                    </div>
                    <span className="text-lg font-bold text-text-primary">
                      Desi<span className="text-primary font-extrabold">A11y</span>
                    </span>
                  </div>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                      aria-label="Close menu"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex-1 px-6 py-8 space-y-2">
                    {[
                      { href: "#features", label: "Features" },
                      { href: "#how-it-works", label: "How It Works" },
                      { href: "#why-different", label: "Why We're Different" },
                      { href: "#faq", label: "FAQ" },
                    ].map((item, index) => (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          handleSmoothScroll(e, item.href);
                          setIsMenuOpen(false);
                        }}
                        className="block px-4 py-3 rounded-lg text-base font-medium text-text-primary hover:bg-gray-50 hover:text-primary transition-all duration-200"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.08,
                          ease: "easeOut",
                        }}
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </nav>

                  {/* Scan Now Button */}
                  <div className="p-6 border-t border-gray-200">
                    <motion.button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsScanDialogOpen(true);
                      }}
                      className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <span>Scan Now</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Scan Dialog */}
      {isScanDialogOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setIsScanDialogOpen(false);
            setError(null);
            setUrl("");
          }}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-text-primary">Scan Your Website</h3>
              <button
                onClick={() => {
                  setIsScanDialogOpen(false);
                  setError(null);
                  setUrl("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="text"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && url.trim() && !isLoading) {
                    handleScan();
                  }
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                disabled={isLoading}
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsScanDialogOpen(false);
                  setError(null);
                  setUrl("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleScan}
                disabled={!url.trim() || isLoading}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Starting...
                  </>
                ) : (
                  "Start Scan"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

