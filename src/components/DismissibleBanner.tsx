"use client";

import { useState, type ReactNode } from "react";

// One boundary, one reason to be a Client Component: the Tutup button.
// The banner's data and markup arrive as `children`, already rendered on the
// server, so this file needs to know nothing about pizzas.
export default function DismissibleBanner({
  children,
}: {
  children: ReactNode;
}) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Pizza of the Day"
      className="relative mb-8 overflow-hidden rounded-2xl bg-brand text-white shadow-sm"
    >
      {children}
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-3 rounded-full bg-white/20 px-3 py-1 text-sm font-medium hover:bg-white/30"
      >
        Tutup
      </button>
    </aside>
  );
}