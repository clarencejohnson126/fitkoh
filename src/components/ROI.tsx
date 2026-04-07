"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageCircle,
  CreditCard,
  Video,
  Globe,
  Megaphone,
  Search,
  LayoutDashboard,
  HardHat,
  Download,
  FileSpreadsheet,
  type LucideIcon,
} from "lucide-react";

interface ROICard {
  service: string;
  icon: LucideIcon;
  type: "revenue" | "savings" | "both";
  amount: number;
  label: string;
  explanation: string;
  breakdown: string;
}

const roiData: ROICard[] = [
  {
    service: "AI Booking Chatbot",
    icon: MessageCircle,
    type: "revenue",
    amount: 180000,
    label: "Revenue Recovery",
    explanation:
      "Guests message at 3am. Nobody replies. By morning, they booked a competitor. An AI chatbot captures those lost leads instantly.",
    breakdown:
      "~60 inquiries/month \u00d7 30% lost to slow response = 18 leads. Recover 40% = 7 bookings \u00d7 \u0e3f25,000 avg",
  },
  {
    service: "Automated Booking & Payments",
    icon: CreditCard,
    type: "both",
    amount: 85000,
    label: "Time Saved + Faster Deposits",
    explanation:
      "No more email ping-pong or manual invoicing. Guests book and pay deposits in 60 seconds. Staff time freed up, no-shows reduced.",
    breakdown:
      "40hrs/month staff time saved (\u0e3f25,000) + 5 fewer no-shows \u00d7 \u0e3f12,000 deposit = \u0e3f60,000",
  },
  {
    service: "AI Video Content Factory",
    icon: Video,
    type: "savings",
    amount: 130000,
    label: "Content Production Savings",
    explanation:
      "Professional social media content costs ฿50,000+/month to produce. AI turns raw training footage into polished clips with captions in any language — automatically.",
    breakdown:
      "Save ฿50,000/month on videographer + editor. AI-generated content reaches 3x more markets \u2192 3 extra bookings/month \u00d7 \u0e3f25,000 = \u0e3f80,000 additional revenue.",
  },
  {
    service: "Multilingual Content & Avatars",
    icon: Globe,
    type: "revenue",
    amount: 200000,
    label: "New Market Revenue",
    explanation:
      "Your content is English-only. Germans, Russians, and French tourists never find you. AI-translated video and content opens these markets overnight.",
    breakdown:
      "8 new bookings/month from non-English speakers \u00d7 \u0e3f25,000 avg",
  },
  {
    service: "Ads Automation",
    icon: Megaphone,
    type: "both",
    amount: 95000,
    label: "Cost Reduction + Better ROAS",
    explanation:
      "AI writes ad copy in any language, optimizes targeting per region, and cuts the need for an expensive agency.",
    breakdown:
      "Save \u0e3f45,000/month on agency fees + 20% improved ROAS on \u0e3f250,000 monthly spend = \u0e3f50,000 extra",
  },
  {
    service: "AEO / GEO Optimization",
    icon: Search,
    type: "revenue",
    amount: 75000,
    label: "AI Search Visibility",
    explanation:
      'People are asking ChatGPT and Perplexity "best Muay Thai camp Koh Samui." If you\'re not optimized for AI search, you\'re invisible.',
    breakdown:
      "3 extra bookings/month from AI search users \u00d7 \u0e3f25,000 avg",
  },
  {
    service: "Staff & Ops Dashboard",
    icon: LayoutDashboard,
    type: "savings",
    amount: 60000,
    label: "Operational Efficiency",
    explanation:
      "Stop managing everything through group chats. Automated scheduling, task assignments, and meal counts from booking data.",
    breakdown:
      "Fewer scheduling errors (\u0e3f20,000) + Tony saves 15hrs/month (\u0e3f25,000) + reduced food waste (\u0e3f15,000)",
  },
  {
    service: "Construction Project Tracker",
    icon: HardHat,
    type: "savings",
    amount: 150000,
    label: "Delay Prevention",
    explanation:
      "Construction delays during your expansion could cost hundreds of thousands per month. AI tracking catches problems before they become expensive.",
    breakdown:
      "Avg delay costs ~\u0e3f300,000/month. AI tracking prevents 50% of avoidable delays",
  },
];

const totalMonthly = roiData.reduce((sum, item) => sum + item.amount, 0);
const totalAnnual = totalMonthly * 12;

function formatTHB(amount: number): string {
  return new Intl.NumberFormat("en-US").format(amount);
}

function ROICardComponent({
  card,
  index,
}: {
  card: ROICard;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = card.icon;

  const typeLabel =
    card.type === "revenue"
      ? "Monthly revenue increase"
      : card.type === "savings"
        ? "Monthly savings"
        : "Monthly savings + revenue";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="bg-card-bg border border-card-border rounded-xl overflow-hidden border-l-[3px] border-l-green"
    >
      <div className="p-5 md:p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-green" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-[var(--font-display)] text-base md:text-lg tracking-wide uppercase text-foreground leading-tight">
                {card.service}
              </h3>
              <p className="text-xs text-muted font-[var(--font-body)] mt-0.5">
                {card.label}
              </p>
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted font-[var(--font-body)] mb-1">
            {typeLabel}
          </p>
          <p className="font-[var(--font-display)] text-3xl md:text-4xl tracking-tight text-green leading-none">
            +&#3647;{formatTHB(card.amount)}
          </p>
        </div>

        {/* Explanation */}
        <p className="font-[var(--font-body)] text-sm text-foreground/80 leading-relaxed mb-3">
          {card.explanation}
        </p>

        {/* Breakdown */}
        <div className="bg-background/60 rounded-lg px-3 py-2.5 border border-card-border">
          <p className="text-[10px] uppercase tracking-[0.12em] text-muted/70 font-[var(--font-body)] mb-1">
            How we calculated this
          </p>
          <p className="text-xs text-muted font-[var(--font-body)] leading-relaxed">
            {card.breakdown}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ROI() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const totalRef = useRef<HTMLDivElement>(null);
  const totalInView = useInView(totalRef, { once: true, margin: "-60px" });

  return (
    <section id="roi" className="relative py-24 md:py-32 bg-section-alt">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-card-bg border border-card-border rounded-full px-5 py-2 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-orange" />
            <span className="text-xs tracking-[0.2em] uppercase text-muted font-[var(--font-body)]">
              The Business Case
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[var(--font-display)] text-4xl md:text-6xl lg:text-7xl tracking-wider uppercase leading-[1.05]"
          >
            <span className="text-foreground">THE NUMBERS THAT</span>
            <br />
            <span className="text-gradient-green">MATTER</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-muted text-base md:text-lg font-[var(--font-body)] max-w-2xl mx-auto"
          >
            Estimated monthly impact based on your current operation.
            Conservative figures.
          </motion.p>
        </div>

        {/* ROI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {roiData.map((card, i) => (
            <ROICardComponent key={card.service} card={card} index={i} />
          ))}
        </div>

        {/* Total Summary Row */}
        <motion.div
          ref={totalRef}
          initial={{ opacity: 0, y: 50 }}
          animate={totalInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 md:mt-14 rounded-2xl bg-dark overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Numbers */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-[var(--font-body)] mb-3">
                  Total Estimated Monthly Impact
                </p>
                <p className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-none mb-2">
                  +&#3647;{formatTHB(totalMonthly)}
                </p>
                <p className="text-white/30 font-[var(--font-body)] text-sm">
                  per month
                </p>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-[var(--font-body)] mb-2">
                    Annual Projection
                  </p>
                  <p className="font-[var(--font-display)] text-2xl md:text-3xl lg:text-4xl tracking-tight text-green leading-none">
                    +&#3647;{formatTHB(totalAnnual)}
                  </p>
                  <p className="text-white/30 font-[var(--font-body)] text-sm mt-1">
                    per year
                  </p>
                </div>
              </div>

              {/* Disclaimer + CTA */}
              <div className="space-y-6">
                <p className="text-white/50 font-[var(--font-body)] text-sm leading-relaxed">
                  These are conservative estimates. Actual results depend on
                  implementation timeline, market conditions, and your team&apos;s
                  adoption. We can break down each number together.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/api/download-projection?format=pdf"
                    className="inline-flex items-center justify-center gap-2 bg-green hover:bg-green/90 text-white font-[var(--font-body)] text-sm font-medium px-5 py-3 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Full 3-Year Projection
                  </a>
                  <a
                    href="/api/download-projection?format=xlsx"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white/70 hover:text-white font-[var(--font-body)] text-sm px-5 py-3 rounded-lg transition-colors"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    Excel Version
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
