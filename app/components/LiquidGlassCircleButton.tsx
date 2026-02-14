"use client";

type LiquidGlassCircleButtonProps = {
  href?: string;
  "aria-label": string;
};

export default function LiquidGlassCircleButton({
  href,
  "aria-label": ariaLabel,
}: LiquidGlassCircleButtonProps) {
  const content = (
    <>
      <span
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="relative z-10 h-5 w-5 text-white/95"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </>
  );

  const sharedProps = {
    "aria-label": ariaLabel,
    className:
      "relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full transition-all duration-200 hover:scale-105",
    style: {
      background: "rgba(15, 23, 42, 0.5)",
      backdropFilter: "blur(24px) saturate(1.2)",
      WebkitBackdropFilter: "blur(24px) saturate(1.2)",
      boxShadow:
        "inset 1px 1px 2px rgba(255,255,255,0.08), inset -1px -1px 2px rgba(0,0,0,0.2), 0 8px 32px rgba(0,0,0,0.2)",
      border: "1px solid rgba(255,255,255,0.06)",
    },
  };

  if (href) {
    return (
      <a href={href} {...sharedProps}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" {...sharedProps}>
      {content}
    </button>
  );
}
