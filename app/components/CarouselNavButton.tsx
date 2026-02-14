"use client";

type CarouselNavButtonProps = {
  direction: "prev" | "next";
  onClick: () => void;
};

export default function CarouselNavButton({
  direction,
  onClick,
}: CarouselNavButtonProps) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${isPrev ? "Previous" : "Next"} image`}
      className={`absolute top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 shrink-0 items-center justify-center text-3xl font-light text-white transition-opacity hover:opacity-100 sm:h-14 sm:w-14 sm:text-5xl ${
        isPrev ? "left-2 sm:left-4" : "right-2 sm:right-4"
      }`}
      style={{
        textShadow:
          "0 2px 20px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.3)",
        opacity: 0.9,
      }}
    >
      {isPrev ? "<" : ">"}
    </button>
  );
}
