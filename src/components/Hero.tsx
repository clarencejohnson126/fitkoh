"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background layers ── */}

      {/* Hero background image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/85 via-[#0a0a0a]/75 to-[#0a0a0a]/95" />

      {/* Green orb — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(0,153,102,0.4) 0%, transparent 70%)",
        }}
      />
      {/* Animated pulse on the green orb */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,153,102,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Orange orb — bottom left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(222,95,4,0.35) 0%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -bottom-28 -left-28 w-[450px] h-[450px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(222,95,4,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Diagonal accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[35%] -left-20 w-[60%] h-[1px] origin-left rotate-[8deg] opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,153,102,0.6), transparent)",
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-[30%] -right-20 w-[50%] h-[1px] origin-right -rotate-[6deg] opacity-15"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(222,95,4,0.5), transparent)",
        }}
      />

      {/* Grid overlay — very subtle */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center"
      >
        {/* Agency badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs tracking-[0.25em] uppercase text-white/60 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            Built by Rebelz AI Agency
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={fadeUp}
          className="font-[var(--font-display)] text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95] tracking-wide text-white mt-4"
        >
          WHAT IF
          <br />
          <span className="text-gradient-green">TECHNOLOGY</span> WORKED
          <br />
          AS HARD AS YOUR TRAINERS?
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="mt-6 md:mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-white/50 leading-relaxed"
        >
          More bookings, less admin, zero missed messages&nbsp;&mdash;
          with the same team you already trust.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Primary CTA */}
          <a
            href="#services"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-green text-white font-semibold tracking-wide text-sm sm:text-base overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,153,102,0.35)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">See What&apos;s Possible</span>
          </a>

          {/* Secondary CTA */}
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-white/20 text-white/60 hover:text-orange hover:border-orange/40 font-medium tracking-wide text-sm sm:text-base transition-all duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-orange/60 group-hover:bg-orange transition-colors duration-300 group-hover:shadow-[0_0_8px_rgba(222,95,4,0.5)]" />
            Try the AI Chatbot
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          variants={fadeUp}
          className="mt-14 text-xs tracking-[0.2em] uppercase text-white/30"
        >
          Live prototype &middot; Real AI &middot; Stripe test payments
        </motion.p>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] tracking-[0.35em] uppercase text-white/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-white/20" />
        </motion.div>
      </motion.div>

      {/* Bottom fade into white background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
