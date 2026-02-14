"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { LoveLetter } from "@/data/love-letters";
import { formatLetterBody } from "@/app/utils/formatLetterBody";

type LetterModalProps = {
  letter: LoveLetter | null;
  onClose: () => void;
};

export default function LetterModal({ letter, onClose }: LetterModalProps) {
  const [lang, setLang] = useState<"en" | "es">("en");

  useEffect(() => {
    if (!letter) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [letter, onClose]);

  useEffect(() => {
    if (letter) setLang("en");
  }, [letter]);

  const hasSpanish =
    letter != null && letter.bodyEs != null && letter.bodyEs.trim() !== "";
  const body =
    letter != null
      ? lang === "es" && hasSpanish
        ? letter.bodyEs!
        : letter.body
      : "";

  return (
    <AnimatePresence mode="wait">
      {letter && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Card modal - springy bounce animation */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
              y: 24,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 12,
              transition: { duration: 0.2 },
            }}
            transition={{
              type: "spring",
              damping: 22,
              stiffness: 400,
            }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-3rem)] max-w-lg -translate-x-1/2 -translate-y-1/2"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="letter-title"
          >
            {/* Card with envelope feel */}
            <div
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(24px)",
                boxShadow:
                  "0 25px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)",
                border: "1px solid var(--glass-border)",
              }}
            >
              {/* Decorative top edge - envelope flap */}
              <div
                className="h-2 w-full"
                style={{
                  background: `linear-gradient(90deg, transparent, var(--lobster-pink), transparent)`,
                  opacity: 0.3,
                }}
              />

              <div className="p-6 sm:p-8">
                {/* Close button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close letter"
                  className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-black/5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 text-[var(--foreground)]/60"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Wax seal / heart accent */}
                <div className="mb-4 flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      damping: 12,
                      stiffness: 200,
                      delay: 0.15,
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{
                      background: "var(--lobster-pink)",
                      opacity: 0.8,
                      boxShadow: "0 2px 12px rgba(193, 102, 107, 0.4)",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="h-5 w-5"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </motion.div>
                </div>

                <time
                  className="mb-1 block text-center text-xs uppercase tracking-widest"
                  style={{ color: "var(--lobster-pink)" }}
                >
                  {letter.date}
                </time>
                <h2
                  id="letter-title"
                  className="mb-6 text-center text-xl font-normal tracking-tight sm:text-2xl"
                >
                  {letter.title}
                </h2>

                {hasSpanish && (
                  <div className="mb-4 flex justify-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => setLang("en")}
                      className={`rounded-l-full px-2.5 py-1 text-[10px] uppercase tracking-wider transition-colors ${
                        lang === "en"
                          ? "bg-[var(--lobster-pink)]/30 text-[var(--lobster-pink)]"
                          : "text-[var(--foreground)]/50 hover:text-[var(--foreground)]/70"
                      }`}
                      aria-pressed={lang === "en"}
                      aria-label="English"
                    >
                      EN
                    </button>
                    <button
                      type="button"
                      onClick={() => setLang("es")}
                      className={`rounded-r-full px-2.5 py-1 text-[10px] uppercase tracking-wider transition-colors ${
                        lang === "es"
                          ? "bg-[var(--lobster-pink)]/30 text-[var(--lobster-pink)]"
                          : "text-[var(--foreground)]/50 hover:text-[var(--foreground)]/70"
                      }`}
                      aria-pressed={lang === "es"}
                      aria-label="Español (Colombia)"
                    >
                      ES
                    </button>
                  </div>
                )}

                <div className="max-h-[50vh] overflow-y-auto pr-2">
                  <p className="whitespace-pre-wrap text-[var(--foreground)]/90 leading-relaxed">
                    {formatLetterBody(body)}
                  </p>
                </div>

                <p className="mt-6 text-center text-sm italic text-[var(--foreground)]/60">
                  &hearts; {lang === "es" && hasSpanish ? "Con amor" : "With love"}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
