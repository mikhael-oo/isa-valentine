"use client";

import { useState } from "react";

type LiquidGlassButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
};

export default function LiquidGlassButton({
  children,
  className = "",
  href,
}: LiquidGlassButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = {
    background: "rgba(244, 114, 182, 0.4)",
    backdropFilter: "blur(24px) saturate(1.2)",
    WebkitBackdropFilter: "blur(24px) saturate(1.2)",
    boxShadow: isHovered
      ? "inset 1px 1px 2px rgba(255,255,255,0.2), inset -1px -1px 2px rgba(0,0,0,0.08), 0 0 40px rgba(244, 114, 182, 0.25), 0 8px 32px rgba(0,0,0,0.15)"
      : "inset 1px 1px 2px rgba(255,255,255,0.15), inset -1px -1px 2px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.12)",
    border: "1px solid rgba(255,255,255,0.12)",
  };

  const content = (
    <>
      {/* Reddish-orange glow on hover */}
      {isHovered && (
        <span
          className="pointer-events-none absolute inset-0 rounded-full opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(251, 113, 133, 0.35) 0%, transparent 70%)",
            filter: "blur(12px)",
          }}
        />
      )}
      <span className="relative z-10 font-medium text-white drop-shadow-sm">
        {children}
      </span>
    </>
  );

  const sharedProps = {
    className: `relative overflow-hidden rounded-full px-8 py-3.5 text-center transition-all duration-300 ease-out ${className}`,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    style: baseStyles,
  };

  if (href) {
    return <a href={href} {...sharedProps}>{content}</a>;
  }

  return <button type="button" {...sharedProps}>{content}</button>;
}
