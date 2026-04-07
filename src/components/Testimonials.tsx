"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, ImageIcon } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  quote: string;
  name: string;
  flag: string;
  program: string;
  duration: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Best decision I ever made. Lost 8kg in 4 weeks and learned Muay Thai. The trainers are world-class.",
    name: "Sarah M.",
    flag: "\u{1F1E6}\u{1F1FA}",
    program: "Weight Loss Premium",
    duration: "4 weeks",
  },
  {
    quote:
      "Kru Chat is an incredible teacher. I came as a complete beginner and left feeling like a fighter.",
    name: "Marcus W.",
    flag: "\u{1F1E9}\u{1F1EA}",
    program: "Muay Thai Premium",
    duration: "2 weeks",
  },
  {
    quote:
      "The food alone is worth the trip. Every meal tracked with macros, and it actually tastes amazing.",
    name: "Emma L.",
    flag: "\u{1F1EC}\u{1F1E7}",
    program: "Fitness Standard",
    duration: "2 weeks",
  },
  {
    quote:
      "Tony and the team create something special here. It\u2019s not just a gym \u2014 it\u2019s a community.",
    name: "Johan K.",
    flag: "\u{1F1F8}\u{1F1EA}",
    program: "Body Transformation",
    duration: "12 weeks",
  },
  {
    quote:
      "I\u2019ve been to camps in Phuket and Chiang Mai. Nothing compares to FitKoh. The beach location is unreal.",
    name: "Alex R.",
    flag: "\u{1F1FA}\u{1F1F8}",
    program: "Muay Thai Standard",
    duration: "4 weeks",
  },
  {
    quote:
      "Came for 2 weeks, stayed for 8. That should tell you everything.",
    name: "Yuki T.",
    flag: "\u{1F1EF}\u{1F1F5}",
    program: "Fitness Premium",
    duration: "2 weeks \u2192 extended",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className="fill-orange text-orange"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="reviews"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-background"
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,153,102,0.5) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-card-border bg-card-bg text-xs tracking-[0.25em] uppercase text-muted mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green inline-block" />
            Social Proof
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-6xl tracking-wide text-foreground"
          >
            WHAT GUESTS ARE{" "}
            <span className="text-gradient-green">SAYING</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-2xl mx-auto text-muted text-base sm:text-lg leading-relaxed"
          >
            With a smart review engine, collecting feedback like this would be
            automatic.
          </motion.p>
        </motion.div>

        {/* Testimonial grid */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="group relative rounded-xl border border-card-border bg-card-bg p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-green/30 hover:shadow-[0_8px_40px_rgba(0,153,102,0.08)]"
            >
              {/* Quote mark */}
              <Quote
                size={32}
                className="absolute top-5 right-5 text-green/10 group-hover:text-green/20 transition-colors duration-300"
              />

              {/* Stars */}
              <Stars />

              {/* Quote text */}
              <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-foreground italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author line */}
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name} {t.flag}
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    {t.program} &middot; {t.duration}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Bottom divider */}
      <div className="section-divider mt-24" />
    </section>
  );
}
