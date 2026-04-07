"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageCircle,
  CreditCard,
  Search,
  Globe,
  Megaphone,
  Video,
  LayoutDashboard,
  HardHat,
  ArrowDown,
  type LucideIcon,
} from "lucide-react";

interface Service {
  title: string;
  problem: string;
  solution: string;
  connector: string;
  icon: LucideIcon;
  tag?: string;
  image: string;
}

const services: Service[] = [
  {
    title: "AI Booking Chatbot",
    problem: "A guest messages at 3am asking about Muay Thai packages. Nobody replies. By morning, they've booked a competitor.",
    solution: "An AI assistant that answers instantly — in any language, 24/7. It knows your programs, pricing, trainers, and accommodation inside out.",
    connector: "Now that guests get instant answers...",
    icon: MessageCircle,
    tag: "LIVE DEMO ON THIS PAGE",
    image: "/images/service-chatbot.jpg",
  },
  {
    title: "Automated Booking & Payments",
    problem: "The chatbot recommends a package. The guest says 'I want to book.' Now what? Email ping-pong? Manual invoicing?",
    solution: "The guest picks their program, chooses accommodation, sees the real price, and pays their deposit — all in under 60 seconds. No staff needed.",
    connector: "With bookings flowing in automatically...",
    icon: CreditCard,
    tag: "LIVE DEMO",
    image: "/images/service-booking.jpg",
  },
  {
    title: "AI Video Content Factory",
    problem: "Your trainers create amazing moments every day — Muay Thai pad sessions, beach training, transformations. But nobody's filming, editing, or posting.",
    solution: "AI turns raw training footage into polished social content automatically. Clip highlights, add captions in any language, post to Instagram, TikTok, and YouTube. Your trainers create content just by doing what they already do.",
    connector: "With content flowing out in every language...",
    icon: Video,
    image: "/images/service-reviews.jpg",
  },
  {
    title: "Multilingual Content & Avatars",
    problem: "Your audience is global — Aussies, Germans, Russians, French — but all your content is in English.",
    solution: "One video of Tony → AI creates versions in 5 languages. Same voice, same personality, different language. HeyGen avatar technology.",
    connector: "Now you're speaking everyone's language...",
    icon: Globe,
    image: "/images/service-multilingual.jpg",
  },
  {
    title: "Ads Automation",
    problem: "Running Google and Meta ads in multiple languages? That's a full-time job — and an expensive one.",
    solution: "AI writes ad copy in any language, targets the right audience per region, and optimizes spend automatically. Your German ads are written in German. Your Russian ads in Russian.",
    connector: "With ads driving traffic from everywhere...",
    icon: Megaphone,
    image: "/images/service-ads.jpg",
  },
  {
    title: "AEO / GEO Optimization",
    problem: "Right now, Lionheart doesn't appear in the top 10 when someone asks ChatGPT 'best Muay Thai in Thailand.' That's thousands of potential guests who never hear about you.",
    solution: "Imagine someone types 'Muay Thai Thailand' into ChatGPT — and Lionheart pops up in the top 5. We make that happen with AI-optimized content across ChatGPT, Perplexity, and Google AI Overviews.",
    connector: "With visibility locked in everywhere...",
    icon: Search,
    image: "/images/service-aeo.jpg",
  },
  {
    title: "Staff & Ops Dashboard",
    problem: "Trainers, cleaners, kitchen, construction — all managed through group chats and verbal instructions. Tony is the bottleneck.",
    solution: "AI-powered dashboard: automated scheduling, task assignments, meal counts pulled straight from bookings. Everyone knows what to do without asking.",
    connector: "And when the operation is running itself...",
    icon: LayoutDashboard,
    image: "/images/service-dashboard.jpg",
  },
  {
    title: "Construction Project Tracker",
    problem: "Building new accommodation while running two businesses — managing contractors, timelines, budgets. Things slip through the cracks.",
    solution: "AI project management: real-time milestone tracking, delay alerts, contractor communication, budget visibility. Clarence's core expertise.",
    connector: "",
    icon: HardHat,
    image: "/images/service-construction.jpg",
  },
];

function ServiceRow({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const Icon = service.icon;
  const sectionBg = index % 2 === 0 ? "bg-background" : "bg-section-alt";

  return (
    <div ref={ref} className={`${sectionBg} -mx-6 md:-mx-10 px-6 md:px-10`}>
      {/* Connector text from previous service */}
      {index > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center py-8 md:py-12"
        >
          <div className="section-divider w-full max-w-5xl" />
          {services[index - 1].connector && (
            <div className="flex flex-col items-center gap-3 mt-8">
              <ArrowDown className="w-4 h-4 text-green/40" />
              <p className="text-green/60 text-sm md:text-base font-[var(--font-body)] italic tracking-wide">
                {services[index - 1].connector}
              </p>
            </div>
          )}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 md:py-20`}
      >
        {/* Text side */}
        <div className={`space-y-5 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          {/* Number + Icon row */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center gap-4"
          >
            <span className="font-[var(--font-display)] text-6xl md:text-7xl tracking-tight text-foreground/[0.04] select-none leading-none">
              {number}
            </span>
            <div className="w-12 h-12 rounded-xl bg-card-bg border border-card-border flex items-center justify-center">
              <Icon className="w-5 h-5 text-green" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-[var(--font-display)] text-3xl md:text-4xl lg:text-5xl tracking-wide uppercase text-foreground leading-[1.1]"
          >
            {service.title}
          </motion.h3>

          {/* Tag */}
          {service.tag && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="inline-flex items-center gap-2 bg-green/10 border border-green/30 rounded-full px-4 py-1.5"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green" />
              </span>
              <span className="text-green text-xs font-semibold tracking-widest uppercase font-[var(--font-body)]">
                {service.tag}
              </span>
            </motion.div>
          )}

          {/* Problem */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="bg-card-bg border border-card-border rounded-lg p-4"
          >
            <p className="text-xs uppercase tracking-widest text-orange font-[var(--font-body)] mb-2">
              The problem
            </p>
            <p className="font-[var(--font-body)] text-muted text-sm md:text-base leading-relaxed">
              {service.problem}
            </p>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <p className="text-xs uppercase tracking-widest text-green font-[var(--font-body)] mb-2">
              The solution
            </p>
            <p className="font-[var(--font-body)] text-foreground/90 text-sm md:text-base leading-relaxed">
              {service.solution}
            </p>
          </motion.div>
        </div>

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`${isEven ? "lg:order-1" : "lg:order-2"}`}
        >
          <div className="relative group">
            {/* Card */}
            <div className="relative aspect-video rounded-2xl bg-card-bg border border-card-border overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              {/* Corner accent */}
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-[var(--font-body)] tracking-widest uppercase text-white/60 drop-shadow-sm">
                  {number}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="services" className="relative py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-card-bg border border-card-border rounded-full px-5 py-2 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green" />
            <span className="text-xs tracking-[0.2em] uppercase text-muted font-[var(--font-body)]">
              The Journey
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[var(--font-display)] text-4xl md:text-6xl lg:text-7xl tracking-wider uppercase leading-[1.05]"
          >
            <span className="text-foreground">HERE&apos;S HOW IT</span>
            <br />
            <span className="text-gradient-green">ALL COMES TOGETHER</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-muted text-base md:text-lg font-[var(--font-body)] max-w-2xl mx-auto"
          >
            Each solution builds on the last. Start with one, add more when you&apos;re ready.
            No pressure — just possibilities.
          </motion.p>
        </div>

        {/* Service rows */}
        {services.map((service, i) => (
          <ServiceRow key={service.title} service={service} index={i} />
        ))}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center pt-16 pb-8"
        >
          <div className="section-divider max-w-5xl mx-auto mb-16" />
          <p className="font-[var(--font-display)] text-2xl md:text-3xl tracking-wider uppercase text-foreground/80 mb-4">
            START WITH ONE. SCALE WHEN READY.
          </p>
          <p className="text-muted font-[var(--font-body)] text-base max-w-lg mx-auto">
            Every feature above is something we can build. Let&apos;s start with what matters most to you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
