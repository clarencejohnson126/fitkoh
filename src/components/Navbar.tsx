"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasHero, setHasHero] = useState(false);

  useEffect(() => {
    // Check if page has a dark hero section
    setHasHero(!!document.getElementById("hero"));
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-card-border shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="relative group flex items-baseline gap-0"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span
              className={`font-[var(--font-display)] text-2xl md:text-3xl tracking-wider transition-colors ${
                !hasHero || scrolled ? "text-dark" : "text-white"
              }`}
            >
              FIT
            </span>
            <span className="font-[var(--font-display)] text-2xl md:text-3xl tracking-wider text-green transition-colors">
              KOH
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green ml-0.5 mb-1 group-hover:scale-150 transition-transform" />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 group ${
                    !hasHero || scrolled
                      ? "text-dark/70 hover:text-dark"
                      : "text-muted hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-green rounded-full transition-all duration-300 group-hover:w-3/5" />
                </a>
              </li>
            ))}
            <li className="ml-3">
              <a
                href="#pricing"
                className="relative overflow-hidden px-5 py-2 text-sm font-semibold tracking-wide rounded-md bg-green text-white hover:bg-green-light transition-all duration-300"
              >
                Book Now
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden relative z-[110] p-2 -mr-2 transition-colors ${
              (!hasHero || scrolled) && !mobileOpen ? "text-dark" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-white/98 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            {/* Decorative background glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-green/5 rounded-full blur-[120px] pointer-events-none" />

            <nav className="flex flex-col items-center gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-[var(--font-display)] text-4xl tracking-widest text-dark/80 hover:text-green transition-colors duration-300 py-3"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#pricing"
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                className="mt-6 px-10 py-3 text-lg font-semibold tracking-wide rounded-md bg-green text-white hover:bg-green-light transition-colors duration-300"
              >
                Book Now
              </motion.a>
            </nav>

            {/* Bottom branding in mobile menu */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 text-xs tracking-[0.3em] uppercase text-muted/50"
            >
              Rebelz AI Agency
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
