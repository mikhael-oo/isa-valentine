"use client";

type LiquidGlassCardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function LiquidGlassCard({
  children,
  className = "",
  style = {},
}: LiquidGlassCardProps) {
  return (
    <div
      className={className}
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:
          "inset 1px 1px 2px rgba(255,255,255,0.15), inset -1px -1px 2px rgba(0,0,0,0.05), var(--glass-shadow)",
        border: "1px solid var(--glass-border)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
