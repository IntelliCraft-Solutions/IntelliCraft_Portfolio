"use client"

import { useMemo } from "react"

type Token = {
  id: string
  // label only for accessibility; visuals are CSS/SVG
  label: string
}

export function TokenBridge() {
  const tokens: Token[] = useMemo(
    () =>
      ["α", "β", "γ", "δ", "ε", "ζ"].map((t, i) => ({
        id: `${t}-${i}`,
        label: `token ${t}`,
      })),
    []
  )

  return (
    <div className="absolute inset-0">
      <div className="h-full w-full relative">
        {/* Bridges */}
        <div className="absolute left-1/2 -translate-x-1/2 top-8 sm:top-6 lg:top-4 w-[140%] max-w-none rotate-[-18deg]" aria-hidden>
          <div className="h-14 sm:h-16 lg:h-20 rounded-full bg-[rgba(255,255,255,0.04)] border border-white/10 shadow-[0_10px_40px_rgba(168,85,247,0.25)_inset]" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 sm:bottom-6 lg:bottom-4 w-[140%] max-w-none rotate-[-18deg]" aria-hidden>
          <div className="h-14 sm:h-16 lg:h-20 rounded-full bg-[rgba(255,255,255,0.04)] border border-white/10 shadow-[0_10px_40px_rgba(236,72,153,0.25)_inset]" />
        </div>

        {/* Conversion light */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 rounded-full" aria-hidden>
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.35),rgba(168,85,247,0.15)_45%,transparent_70%)] blur-2xl animate-pulse" />
          <div className="absolute inset-[22%] rounded-full border-2 border-fuchsia-500/70 shadow-[0_0_40px_rgba(236,72,153,0.65)] animate-[flicker_3s_ease_infinite]" />
        </div>

        {/* Tokens */}
        {tokens.map((t, i) => (
          <div
            key={t.id}
            className="absolute inset-0"
            style={{
              // stagger start time per token
              animationDelay: `${i * 0.65}s`,
              animationDuration: "6s",
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
              animationName: "tokenTravel",
            } as any}
          >
            {/* Upper coin (pre‑conversion) */}
            <div className="token coin-up">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <radialGradient id={`g-up-${i}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="70%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill={`url(#g-up-${i})`} />
                <circle cx="50" cy="50" r="26" fill="#0b1220" stroke="#64748b" strokeWidth="2" />
                <path d="M40 50a10 10 0 1 0 20 0a10 10 0 1 0 -20 0" fill="#94a3b8" />
              </svg>
            </div>

            {/* Lower coin (post‑conversion) */}
            <div className="token coin-down">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <radialGradient id={`g-dn-${i}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f0abfc" />
                    <stop offset="70%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#6b21a8" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill={`url(#g-dn-${i})`} />
                <circle cx="50" cy="50" r="26" fill="#0b1220" stroke="#f0abfc" strokeWidth="2" />
                <path d="M35 52l10 10l20-24" stroke="#f0abfc" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <span className="sr-only">{t.label}</span>
          </div>
        ))}

        <style jsx>{`
          @keyframes tokenTravel {
            0% {
              /* start at left on upper bridge */
              transform: translate3d(-48%, -34%, 0);
            }
            18% {
              transform: translate3d(-12%, -36%, 0);
            }
            33% {
              /* over the light */
              transform: translate3d(0%, -32%, 0);
            }
            46% {
              /* drop to lower bridge */
              transform: translate3d(6%, -8%, 0);
            }
            66% {
              /* roll on lower bridge */
              transform: translate3d(24%, 0%, 0);
            }
            100% {
              transform: translate3d(48%, 4%, 0);
            }
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes flicker { 0%, 100% { opacity: .65 } 50% { opacity: .9 } }

          .token {
            position: absolute;
            width: 64px;
            height: 64px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            filter: drop-shadow(0 8px 18px rgba(0,0,0,.45));
            will-change: transform, filter, opacity;
          }

          .coin-up {  /* visible only before conversion */
            animation: spin 1.6s linear infinite;
            opacity: 1;
          }
          .coin-down { /* appears after passing light */
            animation: spin 1.1s linear infinite;
            opacity: 0;
          }

          /* Blend and visibility changes relative to travel progress using CSS masks */
          .coin-up { mask: linear-gradient(90deg, black 0 47%, transparent 53% 100%); }
          .coin-down { mask: linear-gradient(90deg, transparent 0 47%, black 53% 100%); }

          /* Add glow while near the light (approx 30% - 54%) */
          .coin-up, .coin-down {
            filter: drop-shadow(0 6px 16px rgba(168,85,247,.35)) drop-shadow(0 2px 8px rgba(236,72,153,.35));
          }
        `}</style>
      </div>
    </div>
  )
}

export default TokenBridge


