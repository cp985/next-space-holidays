"use client";

import Link from "next/link";
import { Home, Orbit, RefreshCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#050816] px-6">
          {/* ambient glow */}
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

          {/* subtle stars */}
          <div className="absolute inset-0 bg-[radial-gradient(white,transparent_1px)] [background-size:40px_40px] opacity-[0.04]" />

          {/* floating orb */}
          <div className="absolute top-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10 w-full max-w-2xl rounded-[32px] border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-2xl">
            <div className="mb-8 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
                <Orbit className="h-12 w-12 text-cyan-200" />
              </div>
            </div>

            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300/70">
              Critical System Failure
            </p>

            <h1 className="mb-5 text-5xl font-bold tracking-tight text-white">
              Mission interrupted
            </h1>

            <p className="mx-auto mb-10 max-w-lg text-sm leading-relaxed text-white/60">
              A critical navigation error occurred while loading the station.
              Our systems are attempting to restore the communication channel.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => reset()}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/20"
              >
                <RefreshCcw className="h-4 w-4" />
                Reconnect
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
              >
                <Home className="h-4 w-4" />
                Return Home
              </Link>
            </div>

            {process.env.NODE_ENV === "development" && (
              <div className="mt-8 rounded-2xl border border-red-500/10 bg-red-500/5 p-4 text-left text-xs text-red-200/70">
                {error.message}
              </div>
            )}
          </div>
        </main>
      </body>
    </html>
  );
}