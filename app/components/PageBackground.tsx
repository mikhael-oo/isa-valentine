"use client";

type PageBackgroundVariant = "full" | "moments" | "subtle";

type PageBackgroundProps = {
  variant?: PageBackgroundVariant;
};

/**
 * Flexfolio-inspired mesh gradients. Uses CSS vars --gradient-orb-1..4
 * for theme-aware colors. High contrast maintained in both light and dark mode.
 */
export default function PageBackground({ variant = "full" }: PageBackgroundProps) {
  if (variant === "subtle") {
    return (
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 0%, var(--gradient-orb-2) 0%, transparent 60%)",
          }}
        />
      </div>
    );
  }

  if (variant === "moments") {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -left-[20%] -top-[20%] h-[80%] w-[70%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--gradient-orb-2) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -bottom-[15%] -right-[15%] h-[70%] w-[60%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--gradient-orb-1) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-[30%] right-[25%] h-[50%] w-[50%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--gradient-orb-3) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Top-left warm orb */}
      <div
        className="absolute -left-[25%] -top-[25%] h-[90%] w-[80%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--gradient-orb-2) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      {/* Bottom-right accent orb */}
      <div
        className="absolute -bottom-[30%] -right-[30%] h-[90%] w-[80%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--gradient-orb-1) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      {/* Center-teal accent */}
      <div
        className="absolute bottom-[20%] right-[15%] h-[60%] w-[55%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--gradient-orb-3) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      {/* Top-right cool accent */}
      <div
        className="absolute -top-[10%] right-[10%] h-[60%] w-[50%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--gradient-orb-4) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
