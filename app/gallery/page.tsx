"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GalleryPasswordGate from "@/app/components/GalleryPasswordGate";
import BackHomeLink from "@/app/components/BackHomeLink";
import CarouselNavButton from "@/app/components/CarouselNavButton";

type GalleryItem = { id: string; image: string };

const GALLERY_PASSWORD =
  process.env.NEXT_PUBLIC_GALLERY_PASSWORD ?? "love";

export default function GalleryPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [counterEditing, setCounterEditing] = useState(false);
  const [counterInput, setCounterInput] = useState("");

  const handleCounterSubmit = useCallback(() => {
    const n = parseInt(counterInput, 10);
    if (!Number.isNaN(n) && n >= 1 && n <= items.length) {
      setCurrentIndex(n - 1);
    }
    setCounterEditing(false);
    setCounterInput("");
  }, [counterInput, items.length]);

  useEffect(() => {
    if (!isUnlocked) return;
    setLoading(true);
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setCurrentIndex(0);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [isUnlocked]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) =>
      i === 0 ? items.length - 1 : i - 1
    );
  }, [items.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) =>
      i === items.length - 1 ? 0 : i + 1
    );
  }, [items.length]);

  useEffect(() => {
    if (!isUnlocked) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isUnlocked, goPrev, goNext]);

  useEffect(() => {
    if (!isUnlocked) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isUnlocked]);

  if (!isUnlocked) {
    return (
      <GalleryPasswordGate
        password={GALLERY_PASSWORD}
        onUnlock={() => setIsUnlocked(true)}
        onWrongPassword={() => setError("Wrong password. Try again.")}
        error={error}
        passwordValue={passwordValue}
        onPasswordChange={setPasswordValue}
        onErrorClear={() => setError("")}
      />
    );
  }

  const item = items[currentIndex];

  if (loading) {
    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-black">
        <p className="text-white/60">Loading gallery…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-black px-6">
        <BackHomeLink variant="dark" className="mb-8" />
        <p className="text-center text-white/70">
          No images yet. Add photos to <code className="rounded bg-white/10 px-2 py-1">public/gallery/</code> and they’ll appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-30 flex flex-col overflow-hidden bg-black">
      {/* Background: same image, zoomed + blurred */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt=""
            className="absolute inset-0 h-full w-full scale-[2] object-cover object-center blur-3xl"
            aria-hidden
          />
          {/* Dark overlay for contrast so nav text stays readable */}
          <div className="absolute inset-0 bg-black/30" aria-hidden />
        </motion.div>
      </AnimatePresence>

      {/* Overlay: clear image centered with < > arrows overlaid on sides */}
      <div className="relative z-10 flex h-full flex-1 items-center justify-center px-14 py-4 sm:px-20">
        <CarouselNavButton direction="prev" onClick={goPrev} />

        {/* Main image */}
        <main className="flex w-full flex-1 items-center justify-center min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-sm bg-black/50 shadow-2xl aspect-[3/4] sm:aspect-[4/3]"
              style={{
                boxShadow: "0 50px 100px rgba(0,0,0,0.4)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt=""
                className="h-full w-full object-contain object-center"
              />
            </motion.div>
          </AnimatePresence>
        </main>

        <CarouselNavButton direction="next" onClick={goNext} />
      </div>

      {/* Slide counter - bottom center, click to jump to image */}
      <div className="absolute bottom-24 left-0 right-0 z-20 flex justify-center">
        {counterEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCounterSubmit();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="number"
              min={1}
              max={items.length}
              value={counterInput}
              onChange={(e) => setCounterInput(e.target.value)}
              onBlur={handleCounterSubmit}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setCounterEditing(false);
                  setCounterInput("");
                }
              }}
              placeholder={`1-${items.length}`}
              autoFocus
              className="w-16 rounded-full bg-black/60 px-3 py-1.5 text-center text-xs uppercase tracking-widest text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/50"
            />
            <span className="text-xs uppercase tracking-widest text-white/70">
              / {items.length}
            </span>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => {
              setCounterInput(String(currentIndex + 1));
              setCounterEditing(true);
            }}
            className="rounded-full bg-black/40 px-4 py-1.5 text-xs uppercase tracking-widest text-white/90 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
            aria-label={`Image ${currentIndex + 1} of ${items.length}. Click to jump to a specific image.`}
          >
            {currentIndex + 1} / {items.length}
          </button>
        )}
      </div>
    </div>
  );
}
