"use client";

type CupidBowProps = {
  direction: "left" | "right";
  onClick: () => void;
};

export default function CupidBow({ direction, onClick }: CupidBowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Scroll ${direction}`}
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-110"
      style={{
        background: "rgba(193, 102, 107, 0.3)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(193, 102, 107, 0.4)",
        boxShadow: "0 4px 20px rgba(193, 102, 107, 0.2)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7 text-[var(--lobster-pink)]"
        style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          d="M4 14 Q12 4 20 14"
        />
        <path fill="currentColor" d="M16 12l-4-4v8l4-4z" />
      </svg>
    </button>
  );
}
