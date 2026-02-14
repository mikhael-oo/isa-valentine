"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const CLICKABLE_SELECTOR = "a, button, [role='button'], [data-cursor-heart]";

function isOverClickable(x: number, y: number): boolean {
  const elements = document.elementsFromPoint(x, y);
  return elements.some((el) => el.closest(CLICKABLE_SELECTOR));
}

type Bubble = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  type: "bubble" | "heart";
};

export default function LoveBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const idRef = useRef(0);
  const lastBubbleRef = useRef(0);
  const lastHeartRef = useRef(0);
  const bubbleThrottle = 180;
  const heartThrottle = 100;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const now = Date.now();
      const overClickable = isOverClickable(e.clientX, e.clientY);

      if (overClickable) {
        if (now - lastHeartRef.current < heartThrottle) return;
        lastHeartRef.current = now;
        const size = 6 + Math.random() * 6;
        const delay = Math.random() * 0.05;
        setBubbles((prev) => [
          ...prev.slice(-18),
          {
            id: idRef.current++,
            x: e.clientX,
            y: e.clientY,
            size,
            delay,
            type: "heart",
          },
        ]);
      } else {
        if (now - lastBubbleRef.current < bubbleThrottle) return;
        lastBubbleRef.current = now;
        const size = 24 + Math.random() * 20;
        const delay = Math.random() * 0.15;
        setBubbles((prev) => [
          ...prev.slice(-12),
          {
            id: idRef.current++,
            x: e.clientX,
            y: e.clientY,
            size,
            delay,
            type: "bubble",
          },
        ]);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const removeBubble = useCallback((id: number) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998]"
      aria-hidden
    >
      {bubbles.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: item.x,
            top: item.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: item.type === "bubble" ? [0, 1, 1.15] : [0, 1, 1.2],
            opacity: item.type === "bubble" ? [0, 0.6, 0] : [0, 0.9, 0],
          }}
          transition={{
            duration: item.type === "bubble" ? 1.5 : 1,
            delay: item.delay,
            ease: "easeOut",
          }}
          onAnimationComplete={() => removeBubble(item.id)}
        >
          {item.type === "heart" ? (
            <svg
              viewBox="0 0 24 24"
              className="text-[var(--lobster-pink)]"
              style={{ width: item.size, height: item.size }}
            >
              <path
                fill="currentColor"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              style={{ width: item.size, height: item.size }}
              className="text-[var(--lobster-pink)]"
            >
              <path
                fill="currentColor"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
