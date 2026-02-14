"use client";

import Link from "next/link";

type BackHomeLinkProps = {
  variant?: "default" | "dark";
  className?: string;
};

export default function BackHomeLink({
  variant = "default",
  className = "",
}: BackHomeLinkProps) {
  const baseClass =
    "inline-block text-xs uppercase tracking-[0.2em] transition-colors hover:text-[var(--lobster-pink)]";

  const variantClass =
    variant === "dark"
      ? "text-white/50 hover:text-[var(--lobster-pink)]"
      : "text-[var(--foreground)]/50";

  return (
    <Link href="/" className={`${baseClass} ${variantClass} ${className}`}>
      ← Back home
    </Link>
  );
}
