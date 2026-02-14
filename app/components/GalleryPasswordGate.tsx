"use client";

import { useCallback } from "react";
import BackHomeLink from "./BackHomeLink";

type GalleryPasswordGateProps = {
  password: string;
  onUnlock: () => void;
  onWrongPassword: () => void;
  error?: string;
  passwordValue: string;
  onPasswordChange: (value: string) => void;
  onErrorClear: () => void;
};

export default function GalleryPasswordGate({
  password,
  onUnlock,
  onWrongPassword,
  error = "",
  passwordValue,
  onPasswordChange,
  onErrorClear,
}: GalleryPasswordGateProps) {
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (passwordValue === password) {
        onUnlock();
      } else {
        onWrongPassword();
      }
    },
    [password, passwordValue, onUnlock, onWrongPassword]
  );

  return (
    <div className="fixed inset-0 flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-6">
      <div className="w-full max-w-sm">
        <BackHomeLink className="mb-8" />
        <h1 className="mb-2 text-2xl font-normal tracking-tight text-[var(--foreground)]">
          Private Gallery
        </h1>
        <p className="mb-8 text-sm text-[var(--foreground)]/60">
          Enter the password to view our photos.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={passwordValue}
            onChange={(e) => {
              onPasswordChange(e.target.value);
              onErrorClear();
            }}
            placeholder="Password"
            className="w-full border-b border-[var(--foreground)]/20 bg-transparent px-0 py-3 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-[var(--lobster-pink)] focus:outline-none"
            autoFocus
          />
          {error && (
            <p className="text-sm text-[var(--lobster-pink)]">{error}</p>
          )}
          <button
            type="submit"
            className="w-full border border-[var(--foreground)]/30 py-3 text-sm uppercase tracking-widest transition-colors hover:border-[var(--lobster-pink)] hover:text-[var(--lobster-pink)]"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
