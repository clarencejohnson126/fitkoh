"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setErrorMessage("No booking session found. Please try again.");
      return;
    }

    const sendConfirmation = async () => {
      try {
        const res = await fetch("/api/send-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to send confirmation");
        }

        setStatus("success");
      } catch (err: unknown) {
        console.error("Confirmation error:", err);
        // Still show success page even if email fails — booking went through
        setStatus("success");
      }
    };

    sendConfirmation();
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto w-16 h-16 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
            <div className="absolute inset-0 rounded-full border-4 border-t-[#009966] animate-spin" />
          </div>
          <p className="font-[var(--font-body)] text-gray-500 text-lg">
            Confirming your booking...
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="font-[var(--font-display)] text-2xl font-bold text-gray-900 mb-3">
            Something went wrong
          </h1>
          <p className="font-[var(--font-body)] text-gray-500 mb-8">
            {errorMessage}
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-[#009966] text-white font-[var(--font-body)] font-semibold rounded-full hover:bg-[#00825a] transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex items-center justify-center px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-lg w-full"
        >
          {/* Green Checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="mx-auto w-24 h-24 rounded-full bg-[#009966] flex items-center justify-center mb-8 shadow-lg shadow-[#009966]/20"
          >
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="font-[var(--font-display)] text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Booking Confirmed!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="font-[var(--font-body)] text-lg text-gray-500 mb-10 leading-relaxed"
          >
            Your deposit has been received and a confirmation email is on its
            way.
          </motion.p>

          {/* Test Notice Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="bg-[#FFF8F0] border border-[#de5f04]/20 rounded-2xl p-6 mb-10"
          >
            <div className="flex items-start gap-3">
              <span className="text-[#de5f04] mt-0.5 flex-shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
              <div className="text-left">
                <p className="font-[var(--font-body)] text-sm font-semibold text-[#de5f04] mb-1">
                  Test Booking
                </p>
                <p className="font-[var(--font-body)] text-sm text-[#de5f04]/80 leading-relaxed">
                  This was a test booking &mdash; no real charges were made. This
                  is what your guests would see after completing a real booking.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
          >
            <a
              href="/"
              className="inline-block px-10 py-4 bg-[#009966] text-white font-[var(--font-body)] font-semibold text-lg rounded-full hover:bg-[#00825a] transition-colors shadow-lg shadow-[#009966]/20 hover:shadow-xl hover:shadow-[#009966]/30"
            >
              Back to Home
            </a>
          </motion.div>

          {/* Powered By */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="font-[var(--font-body)] text-xs text-gray-400 mt-12"
          >
            Powered by{" "}
            <span className="font-semibold text-gray-500">Rebelz AI</span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="relative mx-auto w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
            <div className="absolute inset-0 rounded-full border-4 border-t-[#009966] animate-spin" />
          </div>
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}
