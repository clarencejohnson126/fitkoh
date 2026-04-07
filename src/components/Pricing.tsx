"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dumbbell,
  Flame,
  Swords,
  Timer,
  CircleDot,
  Sparkles,
  ShieldCheck,
  Leaf,
  Trophy,
  Check,
  Home,
  ChevronRight,
  X,
  MapPin,
} from "lucide-react";

/* ────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────── */

interface PriceOption {
  duration: string;
  weeks: number;
  price: number;
}

interface Program {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  standard: PriceOption[] | null;
  premium: PriceOption[] | null;
  includes: { standard?: string[]; premium?: string[] };
}

const PROGRAMS: Program[] = [
  {
    id: "weight-loss",
    name: "Weight Loss",
    icon: <Flame className="w-6 h-6" />,
    description: "Transform your body with guided nutrition & training",
    standard: [
      { duration: "1 Week", weeks: 1, price: 12500 },
      { duration: "2 Weeks", weeks: 2, price: 23000 },
      { duration: "4 Weeks", weeks: 4, price: 38000 },
    ],
    premium: [
      { duration: "1 Week", weeks: 1, price: 17500 },
      { duration: "2 Weeks", weeks: 2, price: 33000 },
      { duration: "4 Weeks", weeks: 4, price: 60000 },
    ],
    includes: {
      standard: [
        "Daily group training sessions",
        "Nutrition plan & meal guidance",
        "Body composition analysis",
        "Weekly progress check-ins",
      ],
      premium: [
        "Everything in Standard",
        "1-on-1 personal training sessions",
        "Custom meal plan by nutritionist",
        "Supplement guidance",
        "Priority scheduling",
      ],
    },
  },
  {
    id: "fitness",
    name: "Fitness",
    icon: <Dumbbell className="w-6 h-6" />,
    description: "General fitness bootcamp for all levels",
    standard: [
      { duration: "1 Week", weeks: 1, price: 12500 },
      { duration: "2 Weeks", weeks: 2, price: 23000 },
      { duration: "4 Weeks", weeks: 4, price: 38000 },
    ],
    premium: [
      { duration: "1 Week", weeks: 1, price: 17500 },
      { duration: "2 Weeks", weeks: 2, price: 33000 },
      { duration: "4 Weeks", weeks: 4, price: 60000 },
    ],
    includes: {
      standard: [
        "Daily group fitness sessions",
        "Functional training & HIIT",
        "Beach workouts & outdoor training",
        "Weekly progress tracking",
      ],
      premium: [
        "Everything in Standard",
        "1-on-1 personal training",
        "Customized workout program",
        "Recovery & mobility sessions",
        "Performance analytics",
      ],
    },
  },
  {
    id: "muay-thai",
    name: "Muay Thai",
    icon: <Swords className="w-6 h-6" />,
    description: "Authentic Thai boxing with experienced trainers",
    standard: [
      { duration: "1 Week", weeks: 1, price: 8500 },
      { duration: "2 Weeks", weeks: 2, price: 16000 },
      { duration: "4 Weeks", weeks: 4, price: 29000 },
    ],
    premium: [
      { duration: "1 Week", weeks: 1, price: 13500 },
      { duration: "2 Weeks", weeks: 2, price: 24500 },
      { duration: "4 Weeks", weeks: 4, price: 44000 },
    ],
    includes: {
      standard: [
        "2 Muay Thai sessions per day",
        "Pad work & bag training",
        "Sparring sessions",
        "Conditioning workouts",
      ],
      premium: [
        "Everything in Standard",
        "Private 1-on-1 sessions",
        "Video technique analysis",
        "Fighter diet plan",
        "Stadium fight preparation",
      ],
    },
  },
  {
    id: "hyrox",
    name: "HYROX",
    icon: <Timer className="w-6 h-6" />,
    description: "Competition-level HYROX race preparation",
    standard: [
      { duration: "1 Week", weeks: 1, price: 12500 },
      { duration: "2 Weeks", weeks: 2, price: 23000 },
      { duration: "4 Weeks", weeks: 4, price: 38000 },
    ],
    premium: [
      { duration: "1 Week", weeks: 1, price: 20500 },
      { duration: "2 Weeks", weeks: 2, price: 37000 },
      { duration: "4 Weeks", weeks: 4, price: 65000 },
    ],
    includes: {
      standard: [
        "HYROX-specific workout programming",
        "Running & functional training",
        "Race simulation sessions",
        "Group training environment",
      ],
      premium: [
        "Everything in Standard",
        "1-on-1 coaching & race strategy",
        "SkiErg, sled, wall balls access",
        "Pacing & transition drills",
        "Competition readiness assessment",
      ],
    },
  },
  {
    id: "padel",
    name: "Padel",
    icon: <CircleDot className="w-6 h-6" />,
    description: "Learn & improve padel on Koh Samui courts",
    standard: null,
    premium: [
      { duration: "1 Week", weeks: 1, price: 17500 },
      { duration: "2 Weeks", weeks: 2, price: 33000 },
      { duration: "4 Weeks", weeks: 4, price: 60000 },
    ],
    includes: {
      premium: [
        "Daily padel coaching sessions",
        "Court time included",
        "Technique & match play",
        "Fitness cross-training",
        "Equipment provided",
      ],
    },
  },
  {
    id: "body-transformation",
    name: "Body Transformation",
    icon: <Sparkles className="w-6 h-6" />,
    description: "Intensive all-inclusive body overhaul program",
    standard: null,
    premium: [
      { duration: "4 Weeks", weeks: 4, price: 90750 },
      { duration: "12 Weeks", weeks: 12, price: 220000 },
    ],
    includes: {
      premium: [
        "Daily personal training",
        "Full nutrition plan & meal prep",
        "Weekly body scans & bloodwork",
        "Supplement protocol",
        "Mental coaching & accountability",
        "Before/after documentation",
      ],
    },
  },
  {
    id: "martial-art-ultra",
    name: "Martial Art Ultra",
    icon: <ShieldCheck className="w-6 h-6" />,
    description: "Elite multi-discipline martial arts immersion",
    standard: null,
    premium: [
      { duration: "4 Weeks", weeks: 4, price: 115000 },
      { duration: "12 Weeks", weeks: 12, price: 286000 },
    ],
    includes: {
      premium: [
        "Muay Thai, BJJ & MMA training",
        "3 sessions per day",
        "Private coaching included",
        "Fight camp environment",
        "Strength & conditioning",
        "Recovery & physio support",
      ],
    },
  },
  {
    id: "detox",
    name: "Detox",
    icon: <Leaf className="w-6 h-6" />,
    description: "Cleanse & reset with guided detox protocols",
    standard: [
      { duration: "3 Days", weeks: 0.43, price: 18600 },
      { duration: "5 Days", weeks: 0.71, price: 26000 },
    ],
    premium: null,
    includes: {
      standard: [
        "Juice cleanse program",
        "Daily yoga & meditation",
        "Infrared sauna sessions",
        "Colonic hydrotherapy",
        "Wellness consultations",
      ],
    },
  },
  {
    id: "muay-thai-only",
    name: "Muay Thai Training Only",
    icon: <Trophy className="w-6 h-6" />,
    description: "Pure training access — no extras, just fight",
    standard: [
      { duration: "1 Week", weeks: 1, price: 3500 },
      { duration: "2 Weeks", weeks: 2, price: 6500 },
      { duration: "3 Weeks", weeks: 3, price: 9000 },
      { duration: "4 Weeks", weeks: 4, price: 11000 },
    ],
    premium: null,
    includes: {
      standard: [
        "2 group Muay Thai sessions/day",
        "Pad work & heavy bag",
        "Open gym access",
        "Training with locals & fighters",
      ],
    },
  },
];

interface Accommodation {
  id: string;
  name: string;
  pricePerNight: number;
  description: string;
  gradient: string;
  image: string;
}

const ACCOMMODATIONS: Accommodation[] = [
  {
    id: "fitkoh-aparts",
    name: "FitKoh Apartments",
    pricePerNight: 1800,
    description: "On-site apartments, steps from the gym",
    gradient: "from-blue-900/40 to-indigo-900/40",
    image: "/images/accom-garden.jpg",
  },
  {
    id: "garden-1bed",
    name: "Garden 1-Bed Bungalow",
    pricePerNight: 2000,
    description: "Cozy garden bungalow surrounded by nature",
    gradient: "from-green-900/40 to-emerald-900/40",
    image: "/images/accom-garden.jpg",
  },
  {
    id: "neena-resort",
    name: "Neena Resort",
    pricePerNight: 2000,
    description: "Comfortable resort with pool access",
    gradient: "from-cyan-900/40 to-teal-900/40",
    image: "/images/accom-garden.jpg",
  },
  {
    id: "sundeck",
    name: "Sundeck Bungalow",
    pricePerNight: 3000,
    description: "Private sundeck with stunning views",
    gradient: "from-orange-900/40 to-amber-900/40",
    image: "/images/accom-sundeck.jpg",
  },
  {
    id: "small-beach",
    name: "Small Beach Bungalow",
    pricePerNight: 3200,
    description: "Beachfront living, just steps to the sand",
    gradient: "from-sky-900/40 to-blue-900/40",
    image: "/images/accom-beach.jpg",
  },
  {
    id: "large-beach",
    name: "Large Beach Bungalow",
    pricePerNight: 3800,
    description: "Spacious beachfront bungalow with extras",
    gradient: "from-violet-900/40 to-purple-900/40",
    image: "/images/accom-beach.jpg",
  },
  {
    id: "garden-2bed",
    name: "Garden 2-Bed Bungalow",
    pricePerNight: 4000,
    description: "Two bedrooms, perfect for couples or friends",
    gradient: "from-lime-900/40 to-green-900/40",
    image: "/images/accom-garden.jpg",
  },
  {
    id: "garden-2bed-deluxe",
    name: "Garden 2-Bed Deluxe",
    pricePerNight: 4000,
    description: "Upgraded finishes, premium garden setting",
    gradient: "from-rose-900/40 to-pink-900/40",
    image: "/images/accom-garden.jpg",
  },
  {
    id: "mountain-1bed",
    name: "Mountain 1-Bed",
    pricePerNight: 3500,
    description: "Elevated views with mountain breeze",
    gradient: "from-slate-800/40 to-gray-900/40",
    image: "/images/accom-garden.jpg",
  },
  {
    id: "mountain-2bed",
    name: "Mountain 2-Bed",
    pricePerNight: 5800,
    description: "Spacious mountain retreat, two bedrooms",
    gradient: "from-stone-800/40 to-neutral-900/40",
    image: "/images/accom-garden.jpg",
  },
  {
    id: "ban-elso-villa",
    name: "Ban Elso 3-Bed Villa",
    pricePerNight: 7500,
    description: "Luxury villa with private pool & full kitchen",
    gradient: "from-yellow-900/40 to-amber-900/40",
    image: "/images/accom-garden.jpg",
  },
];

/* ────────────────────────────────────────────
   HELPERS
   ──────────────────────────────────────────── */

function formatPrice(n: number): string {
  return n.toLocaleString("en-US");
}

function getStartingPrice(p: Program): number {
  const prices: number[] = [];
  if (p.standard) prices.push(...p.standard.map((o) => o.price));
  if (p.premium) prices.push(...p.premium.map((o) => o.price));
  return Math.min(...prices);
}

function getStartingUnit(p: Program): string {
  // For detox, show /program. For others, /week.
  if (p.id === "detox") return "/program";
  return "/week";
}

function getNights(weeks: number): number {
  return Math.round(weeks * 7);
}

/* ────────────────────────────────────────────
   STEP BADGE
   ──────────────────────────────────────────── */

function StepBadge({ step, label }: { step: number; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green/10 text-green font-bold text-sm border border-green/30">
        {step}
      </span>
      <h3 className="font-[var(--font-display)] text-xl md:text-2xl tracking-wide text-foreground uppercase">
        {label}
      </h3>
    </div>
  );
}

/* ────────────────────────────────────────────
   MAIN COMPONENT
   ──────────────────────────────────────────── */

export default function Pricing() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedTier, setSelectedTier] = useState<"standard" | "premium">("standard");
  const [selectedDuration, setSelectedDuration] = useState<PriceOption | null>(null);
  const [selectedAccom, setSelectedAccom] = useState<string | null>(null); // id or "own"
  const [isBooking, setIsBooking] = useState(false);

  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  // When program changes, reset downstream
  useEffect(() => {
    if (selectedProgram) {
      // default to first available tier
      if (selectedProgram.standard) {
        setSelectedTier("standard");
      } else {
        setSelectedTier("premium");
      }
      setSelectedDuration(null);
      setSelectedAccom(null);
      setTimeout(() => step2Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, [selectedProgram]);

  // Scroll to step 3 when duration selected
  useEffect(() => {
    if (selectedDuration) {
      setTimeout(() => step3Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, [selectedDuration]);

  // Scroll to step 4 when accommodation selected
  useEffect(() => {
    if (selectedAccom !== null) {
      setTimeout(() => step4Ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, [selectedAccom]);

  // When tier changes, reset duration
  useEffect(() => {
    setSelectedDuration(null);
    setSelectedAccom(null);
  }, [selectedTier]);

  // Current tier options
  const tierOptions = selectedProgram
    ? selectedTier === "standard"
      ? selectedProgram.standard
      : selectedProgram.premium
    : null;

  const tierIncludes = selectedProgram
    ? selectedTier === "standard"
      ? selectedProgram.includes.standard
      : selectedProgram.includes.premium
    : null;

  // Pricing calculations
  const nights = selectedDuration ? getNights(selectedDuration.weeks) : 0;
  const accomObj =
    selectedAccom && selectedAccom !== "own"
      ? ACCOMMODATIONS.find((a) => a.id === selectedAccom)
      : null;
  const accomTotal = accomObj ? accomObj.pricePerNight * nights : 0;
  const subtotal = (selectedDuration?.price ?? 0) + accomTotal;
  const afterVAT = subtotal * 1.07;
  const total = Math.round(afterVAT * 1.05);
  const deposit = Math.round(total * 0.5);

  async function handleBookNow() {
    if (!selectedProgram || !selectedDuration) return;
    setIsBooking(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programName: selectedProgram.name,
          tier: selectedTier,
          duration: selectedDuration.duration,
          accommodation: selectedAccom === "own" ? "Own arrangement" : accomObj?.name ?? "None",
          totalAmount: total,
          depositAmount: deposit,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Checkout error:", data.error);
        alert(`Booking failed: ${data.error || "Unknown error"}`);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong — no checkout URL returned.");
      }
    } catch (err) {
      console.error("Checkout fetch error:", err);
      alert("Could not connect to payment server. Please try again.");
    } finally {
      setIsBooking(false);
    }
  }

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden bg-section-alt">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green/[0.03] rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-5 text-xs font-semibold tracking-[0.2em] uppercase rounded-full bg-green/10 text-green border border-green/20">
            Live Demo — Automated Booking
          </span>
          <h2 className="font-[var(--font-display)] text-4xl md:text-6xl tracking-wide text-foreground mb-4">
            SEE HOW EASY BOOKING COULD BE
          </h2>
          <p className="text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Your guests pick a program, choose accommodation, and pay — all in under 60 seconds.
          </p>
        </motion.div>

        {/* ── STEP 1: Choose Program ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <StepBadge step={1} label="Choose Your Program" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROGRAMS.map((prog) => {
              const isSelected = selectedProgram?.id === prog.id;
              return (
                <motion.button
                  key={prog.id}
                  onClick={() => setSelectedProgram(prog)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-green/5 border-green glow-green"
                      : "bg-card-bg border-card-border hover:border-green/30"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                        isSelected ? "bg-green/10 text-green" : "bg-card-border text-muted"
                      } transition-colors`}
                    >
                      {prog.icon}
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-green flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <h4 className="font-[var(--font-display)] text-lg tracking-wide text-foreground mb-1">
                    {prog.name}
                  </h4>
                  <p className="text-muted text-sm mb-3 leading-relaxed">{prog.description}</p>
                  <p className="text-sm">
                    <span className="text-green font-semibold">
                      from {formatPrice(getStartingPrice(prog))} THB
                    </span>
                    <span className="text-muted">{getStartingUnit(prog)}</span>
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ── STEP 2: Tier & Duration ── */}
        <AnimatePresence>
          {selectedProgram && (
            <motion.div
              ref={step2Ref}
              key="step2"
              initial={{ opacity: 0, y: 40, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 overflow-hidden"
            >
              <div className="section-divider mb-16" />
              <StepBadge step={2} label="Choose Tier & Duration" />

              {/* Tier toggle */}
              <div className="flex gap-3 mb-8">
                {selectedProgram.standard && (
                  <button
                    onClick={() => setSelectedTier("standard")}
                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                      selectedTier === "standard"
                        ? "bg-green text-white shadow-lg shadow-green/20"
                        : "bg-card-bg text-foreground border border-card-border hover:border-green/30"
                    }`}
                  >
                    Standard
                  </button>
                )}
                {selectedProgram.premium && (
                  <button
                    onClick={() => setSelectedTier("premium")}
                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                      selectedTier === "premium"
                        ? "bg-green text-white shadow-lg shadow-green/20"
                        : "bg-card-bg text-foreground border border-card-border hover:border-green/30"
                    }`}
                  >
                    Premium
                  </button>
                )}
              </div>

              {/* Duration buttons */}
              {tierOptions && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {tierOptions.map((opt) => {
                    const isActive = selectedDuration?.duration === opt.duration;
                    return (
                      <motion.button
                        key={opt.duration}
                        onClick={() => setSelectedDuration(opt)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`px-5 py-4 rounded-xl border text-left transition-all duration-300 min-w-[140px] cursor-pointer ${
                          isActive
                            ? "bg-card-bg border-green glow-green"
                            : "bg-card-bg border-card-border hover:border-card-border/80"
                        }`}
                      >
                        <p
                          className={`font-semibold text-sm mb-1 ${
                            isActive ? "text-green" : "text-foreground"
                          }`}
                        >
                          {opt.duration}
                        </p>
                        <p className="text-orange font-bold text-lg">
                          {formatPrice(opt.price)}{" "}
                          <span className="text-muted text-xs font-normal">THB</span>
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* What's included */}
              {tierIncludes && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-card-bg border border-card-border rounded-xl p-6"
                >
                  <h4 className="text-sm font-semibold tracking-wide text-muted uppercase mb-4">
                    What&apos;s Included
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tierIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-green mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── STEP 3: Accommodation ── */}
        <AnimatePresence>
          {selectedDuration && (
            <motion.div
              ref={step3Ref}
              key="step3"
              initial={{ opacity: 0, y: 40, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 overflow-hidden"
            >
              <div className="section-divider mb-16" />
              <StepBadge step={3} label="Add Accommodation" />
              <p className="text-muted text-sm mb-6 -mt-3">
                {nights} night{nights !== 1 ? "s" : ""} based on your{" "}
                {selectedDuration.duration.toLowerCase()} selection
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Own arrangement card */}
                <motion.button
                  onClick={() => setSelectedAccom("own")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    selectedAccom === "own"
                      ? "bg-green/5 border-green glow-green"
                      : "bg-card-bg border-card-border hover:border-green/30"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                        selectedAccom === "own"
                          ? "bg-green/10 text-green"
                          : "bg-card-border text-muted"
                      } transition-colors`}
                    >
                      <X className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-[var(--font-display)] text-base tracking-wide text-foreground">
                        I&apos;ll Arrange My Own
                      </h4>
                      <p className="text-green text-sm font-semibold">No extra cost</p>
                    </div>
                  </div>
                  <p className="text-muted text-sm">Already have a place or prefer to book separately</p>
                </motion.button>

                {ACCOMMODATIONS.map((acc) => {
                  const isActive = selectedAccom === acc.id;
                  return (
                    <motion.button
                      key={acc.id}
                      onClick={() => setSelectedAccom(acc.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`text-left rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "border-green glow-green"
                          : "border-card-border hover:border-green/30"
                      }`}
                    >
                      {/* Accommodation image */}
                      <div className="h-24 relative">
                        <img
                          src={acc.image}
                          alt={acc.name}
                          className="w-full h-full object-cover"
                        />
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 w-6 h-6 rounded-full bg-green flex items-center justify-center"
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                      <div className="p-4 bg-card-bg">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-semibold text-sm text-foreground leading-tight">
                            {acc.name}
                          </h4>
                        </div>
                        <p className="text-muted text-xs mb-2">{acc.description}</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-orange font-bold text-base">
                            {formatPrice(acc.pricePerNight)}
                          </span>
                          <span className="text-muted text-xs">THB/night</span>
                        </div>
                        <p className="text-muted text-xs mt-1">
                          {formatPrice(acc.pricePerNight * nights)} THB total ({nights} nights)
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── STEP 4: Summary ── */}
        <AnimatePresence>
          {selectedAccom !== null && selectedDuration && selectedProgram && (
            <motion.div
              ref={step4Ref}
              key="step4"
              initial={{ opacity: 0, y: 40, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 20, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 overflow-hidden"
            >
              <div className="section-divider mb-16" />
              <StepBadge step={4} label="Your Package Summary" />

              <div className="max-w-xl mx-auto bg-white border border-card-border rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-green/5 p-6 border-b border-card-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green/10 flex items-center justify-center text-green">
                      {selectedProgram.icon}
                    </div>
                    <div>
                      <h4 className="font-[var(--font-display)] text-xl tracking-wide text-foreground">
                        {selectedProgram.name}
                      </h4>
                      <p className="text-sm text-muted capitalize">
                        {selectedTier} — {selectedDuration.duration}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="p-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Program ({selectedDuration.duration})</span>
                    <span className="text-foreground font-medium">
                      {formatPrice(selectedDuration.price)} THB
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted flex items-center gap-1.5">
                      {selectedAccom === "own" ? (
                        <>
                          <MapPin className="w-3.5 h-3.5" /> Own accommodation
                        </>
                      ) : (
                        <>
                          <Home className="w-3.5 h-3.5" /> {accomObj?.name} ({nights} nights)
                        </>
                      )}
                    </span>
                    <span className="text-foreground font-medium">
                      {selectedAccom === "own" ? "—" : `${formatPrice(accomTotal)} THB`}
                    </span>
                  </div>

                  <div className="border-t border-card-border pt-3 flex justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span className="text-foreground">{formatPrice(subtotal)} THB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">VAT (7%)</span>
                    <span className="text-foreground">
                      {formatPrice(Math.round(subtotal * 0.07))} THB
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Service Charge (5%)</span>
                    <span className="text-foreground">
                      {formatPrice(Math.round(afterVAT * 0.05))} THB
                    </span>
                  </div>

                  <div className="border-t border-card-border pt-4 flex justify-between items-baseline">
                    <span className="text-foreground font-semibold">Total</span>
                    <span className="text-gradient-green font-bold text-2xl">
                      {formatPrice(total)} THB
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted">50% Deposit Due Now</span>
                    <span className="text-orange font-bold text-lg">
                      {formatPrice(deposit)} THB
                    </span>
                  </div>
                </div>

                {/* Book button */}
                <div className="p-6 pt-2">
                  <motion.button
                    onClick={handleBookNow}
                    disabled={isBooking}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl font-bold text-base tracking-wide transition-all duration-300 cursor-pointer bg-green hover:bg-green/90 text-white shadow-lg shadow-green/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isBooking ? (
                      <span className="animate-pulse">Processing...</span>
                    ) : (
                      <>
                        BOOK NOW — PAY {formatPrice(deposit)} THB DEPOSIT
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                  <p className="text-center text-muted text-xs mt-3">
                    Test mode — no real charges will be made
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
