"use client";

import { useState, useEffect, useRef } from "react";
import PageBackground from "./components/PageBackground";
import LiquidGlassCard from "./components/LiquidGlassCard";
import { useTheme } from "./context/ThemeContext";

const TITLES = [
  "I love you.",
  "I adore you.",
  "I admire you.",
  "You mean the world to me.",
  "You are my everything",
  "I love you more than words can say",
  "You are my gift",
  "My source of inspiration",
  "My forever queen"
];

// Darker colors for light mode (high contrast on light background)
const TITLE_COLORS_LIGHT = [
  "#9a4a4f", // lobster-pink darker
  "#2d5f7a", // cerulean darker
  "#2f7a77", // tropical-teal darker
  "#8a6b3a", // warm brown
];

// Lighter colors for dark mode (high contrast on dark background)
const TITLE_COLORS_DARK = [
  "#e07a80", // lobster-pink lighter
  "#6ba8d4", // cerulean lighter
  "#6bc4c1", // tropical-teal lighter
  "#e8c99a", // soft-fawn lighter
];

const CHAR_MS = 180; // ~35 WPM typing speed
const PAUSE_AFTER_TYPING_MS = 1500;

export default function Home() {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting" | "pause">("typing");
  const indexRef = useRef(0);
  const phaseRef = useRef(phase);
  indexRef.current = index;
  phaseRef.current = phase;

  const colors = theme === "light" ? TITLE_COLORS_LIGHT : TITLE_COLORS_DARK;

  useEffect(() => {
    const tick = () => {
      const i = indexRef.current;
      const target = TITLES[i];

      setDisplayText((prev) => {
        const p = phaseRef.current;
        if (p === "typing") {
          if (prev === target) {
            phaseRef.current = "pause";
            setPhase("pause");
            return prev;
          }
          return target.slice(0, prev.length + 1);
        }
        if (p === "deleting") {
          if (prev.length === 0) {
            const next = (i + 1) % TITLES.length;
            indexRef.current = next;
            phaseRef.current = "typing";
            setIndex(next);
            setPhase("typing");
            return TITLES[next].slice(0, 1);
          }
          return prev.slice(0, -1);
        }
        return prev;
      });
    };

    const id = setInterval(tick, CHAR_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (phase === "pause") {
      const id = setTimeout(() => {
        phaseRef.current = "deleting";
        setPhase("deleting");
      }, PAUSE_AFTER_TYPING_MS);
      return () => clearTimeout(id);
    }
  }, [phase]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <PageBackground variant="full" />

      {/* Landing banner */}
      <main className="flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <LiquidGlassCard className="mx-auto max-w-3xl rounded-3xl p-8 text-center sm:p-12 md:p-16">
          <h1
            className="mb-6 text-4xl font-semibold tracking-tight drop-shadow-sm transition-colors duration-300 sm:text-5xl md:text-6xl"
            style={{ color: colors[index % colors.length] }}
          >
            {displayText}
            <span
              className="inline-block"
              style={{ animation: "caret-blink 1s step-end infinite" }}
              aria-hidden
            >
              |
            </span>
          </h1>
          <p className="mb-4 text-lg leading-relaxed text-[var(--foreground)]/90 sm:text-xl md:text-2xl">
            This is our canvas—a place where I get to show you, in more ways than one, how much you mean to me, my Isabelita.
          </p>
          <p className="text-base text-[var(--foreground)]/75 sm:text-lg">
            More to come, my love. &hearts;
          </p>
        </LiquidGlassCard>
      </main>
    </div>
  );
}
