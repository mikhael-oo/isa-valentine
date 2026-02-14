"use client";

import { useRef } from "react";
import { MOMENTS } from "@/data/moments";
import PageBackground from "@/app/components/PageBackground";
import CupidBow from "@/app/components/CupidBow";
import LiquidGlassCard from "@/app/components/LiquidGlassCard";

const CARD_WIDTH = 360;
const CARD_GAP = 48;
const WAVE_AMPLITUDE = 72;

/** Builds an SVG path for a wavy line through alternating points */
function buildWavePath(count: number) {
  const slotWidth = CARD_WIDTH + CARD_GAP;

  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const x = CARD_WIDTH / 2 + i * slotWidth;
    const y = 20 + (i % 2 === 0 ? 0 : WAVE_AMPLITUDE);
    points.push({ x, y });
  }

  if (points.length < 2) return "";

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.x + curr.x) / 2;
    d += ` C ${midX} ${prev.y} ${midX} ${curr.y} ${curr.x} ${curr.y}`;
  }
  return d;
}

export default function MomentsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const wavePath = buildWavePath(MOMENTS.length);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <PageBackground variant="moments" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1
          className="mb-16 text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl"
          style={{
            color: "var(--foreground)",
            opacity: 0.65,
            textShadow: "0 2px 20px rgba(0,0,0,0.1)",
          }}
        >
          Our Moments
        </h1>

        <div className="mb-6 flex items-center justify-between gap-4">
          <CupidBow direction="left" onClick={() => scroll("left")} />
          <p className="text-sm text-[var(--foreground)]/60">
            Scroll to explore our story
          </p>
          <CupidBow direction="right" onClick={() => scroll("right")} />
        </div>

        {/* Wavy timeline carousel - needs min-height for wave undulation */}
        <div
          ref={scrollRef}
          data-moments-scroll
          className="relative flex overflow-x-auto pb-8 pt-4 scroll-smooth"
          style={{
            minHeight: 420,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            [data-moments-scroll]::-webkit-scrollbar { display: none; }
          `}</style>
          <div className="relative flex gap-12 pr-8" style={{ minWidth: "min-content" }}>
            {/* Wavy connector line - behind cards */}
            <svg
              className="absolute left-0 top-0 h-full"
              style={{
                width:
                  MOMENTS.length * CARD_WIDTH + (MOMENTS.length - 1) * CARD_GAP,
                height: WAVE_AMPLITUDE + 140,
                overflow: "visible",
              }}
            >
              <path
                d={wavePath}
                fill="none"
                stroke="var(--lobster-pink)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.7}
              />
            </svg>

            {MOMENTS.map((moment, index) => (
              <article
                key={moment.id}
                className="relative flex shrink-0 flex-col"
                style={{
                  width: CARD_WIDTH,
                  marginTop: index % 2 === 0 ? 0 : WAVE_AMPLITUDE,
                }}
              >
                {/* Large semi-transparent number */}
                <span
                  className="absolute -top-2 -left-2 select-none text-[8rem] font-bold leading-none"
                  style={{
                    color: "var(--foreground)",
                    opacity: 0.08,
                    lineHeight: 1,
                  }}
                >
                  {index + 1}
                </span>

                {/* Timeline node on the wave */}
                <div
                  className="relative z-10 mb-4 flex justify-center"
                  style={{ marginLeft: 0 }}
                >
                  <div
                    className="h-4 w-4 shrink-0 rounded-full"
                    style={{
                      background: "var(--lobster-pink)",
                      boxShadow: "0 0 0 4px rgba(193, 102, 107, 0.25)",
                    }}
                  />
                </div>

                {/* Card */}
                <LiquidGlassCard className="relative rounded-2xl p-6">
                  <time
                    className="mb-2 block text-sm font-medium"
                    style={{ color: "var(--lobster-pink)" }}
                  >
                    {moment.date}
                  </time>
                  <p className="mb-4 leading-relaxed text-[var(--foreground)]/90">
                    {moment.description}
                  </p>
                  {moment.image && (
                    <div className="overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={moment.image}
                        alt=""
                        className="h-48 w-full object-cover"
                      />
                    </div>
                  )}
                </LiquidGlassCard>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
