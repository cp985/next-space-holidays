'use client';

import Link from "next/link";
import { Home, Rocket } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050816] px-6">
      {/* background glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* stars */}
      <div className="absolute inset-0 bg-[radial-gradient(white,transparent_1px)] [background-size:40px_40px] opacity-[0.05]" />

      <div className="relative z-10 w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10">
            <Rocket className="h-10 w-10 text-cyan-300" />
          </div>
        </div>

        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-300/70">
          Error 404
        </p>

        <h1 className="mb-4 text-4xl font-bold text-white">
          Lost in deep space
        </h1>

        <p className="mb-8 text-sm leading-relaxed text-white/60">
          The destination you are trying to reach does not exist or has drifted
          beyond our navigation systems.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
        >
          <Home className="h-4 w-4" />
          Return Home
        </Link>
      </div>
    </main>
  );
}