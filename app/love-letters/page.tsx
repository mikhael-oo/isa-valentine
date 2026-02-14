"use client";

import { useState } from "react";
import { LOVE_LETTERS, getExcerpt, type LoveLetter } from "@/data/love-letters";
import { formatLetterBody } from "@/app/utils/formatLetterBody";
import LetterModal from "@/app/components/LetterModal";
import PageBackground from "@/app/components/PageBackground";
import BackHomeLink from "@/app/components/BackHomeLink";

export default function LoveLettersPage() {
  const [selectedLetter, setSelectedLetter] = useState<LoveLetter | null>(null);

  return (
    <div className="relative min-h-screen">
      <PageBackground variant="subtle" />

      <LetterModal letter={selectedLetter} onClose={() => setSelectedLetter(null)} />

      <article className="mx-auto max-w-3xl px-6 py-20">

        {/* Editorial headline - Heilig style */}
        <header className="mb-20">
          <p
            className="mb-4 text-xs font-medium uppercase tracking-[0.3em]"
            style={{ color: "var(--lobster-pink)" }}
          >
            For you, my love
          </p>
          <h1
            className="text-4xl font-normal leading-[1.2] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-domine), Georgia, serif",
            }}
          >
            Feelings I couldn't express
            <span className="italic"> out loud.</span>
          </h1>
        </header>

        {/* Intro - long-form editorial */}
        <div className="mb-24 border-l-2 pl-8" style={{ borderColor: "var(--lobster-pink)" }}>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--foreground)]/80">
            Some things are easier to write than to speak. This is a place for
            the letters I wish I could hand you in person—the ones that get
            stuck in my throat when I look at you. Scroll down, take your time.
            There is no rush. Only love.
          </p>
        </div>

        {/* Numbered letter entries - journal style */}
        <div className="space-y-24">
          {LOVE_LETTERS.map((letter, index) => {
            const number = String(index + 1).padStart(3, "0");

            return (
              <section
                key={letter.id}
                className="group"
                id={`letter-${letter.id}`}
              >
                <div className="mb-6 flex items-baseline gap-6">
                  <span
                    className="text-5xl font-light tabular-nums"
                    style={{
                      color: "var(--foreground)",
                      opacity: 0.15,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {number}
                  </span>
                  <time
                    className="text-sm uppercase tracking-widest"
                    style={{ color: "var(--lobster-pink)" }}
                  >
                    {letter.date}
                  </time>
                </div>

                <h2 className="mb-4 text-2xl font-normal tracking-tight sm:text-3xl">
                  {letter.title}
                </h2>

                <p className="mb-6 max-w-xl text-[var(--foreground)]/75 leading-relaxed">
                  {formatLetterBody(getExcerpt(letter.body))}
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedLetter(letter)}
                  className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest transition-colors hover:opacity-80"
                  style={{ color: "var(--lobster-pink)" }}
                >
                  Read full letter
                </button>
              </section>
            );
          })}
        </div>

        {/* Closing - Heilig-style "Soll die Reise weitergehen?" */}
        <footer className="mt-32 pt-16">
          <p
            className="text-center text-sm uppercase tracking-[0.2em]"
            style={{ color: "var(--foreground)", opacity: 0.5 }}
          >
            More letters to come.
          </p>
          <p className="mt-2 text-center text-2xl italic text-[var(--foreground)]/70">
            Forever yours.
          </p>
        </footer>
      </article>
    </div>
  );
}
