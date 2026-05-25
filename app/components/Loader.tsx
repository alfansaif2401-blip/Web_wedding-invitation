"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 2800);
    const t4 = setTimeout(() => onDone(), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(160deg, #4A0D1A 0%, #2A0610 50%, #1A0408 100%)" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Rotating ornament ring */}
          <motion.div
            className="absolute"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <svg width="280" height="280" viewBox="0 0 280 280" fill="none">
              <circle cx="140" cy="140" r="130" stroke="url(#goldGrad)" strokeWidth="0.5" strokeDasharray="4 8" />
              <circle cx="140" cy="140" r="110" stroke="url(#goldGrad)" strokeWidth="0.3" strokeDasharray="2 12" />
              {[0,45,90,135,180,225,270,315].map((angle) => (
                <g key={angle} transform={`rotate(${angle} 140 140)`}>
                  <circle cx="140" cy="12" r="3" fill="#C9A84C" opacity="0.7"/>
                </g>
              ))}
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="280" y2="280">
                  <stop offset="0%" stopColor="#A07830" />
                  <stop offset="50%" stopColor="#E2C472" />
                  <stop offset="100%" stopColor="#A07830" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Counter-rotating inner ring */}
          <motion.div
            className="absolute"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
              <circle cx="90" cy="90" r="82" stroke="#C9A84C" strokeWidth="0.4" strokeDasharray="1 6" opacity="0.5"/>
            </svg>
          </motion.div>

          {/* Center logo */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={phase >= 1 ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="mb-4"
            >
              {/* Kembang ornament SVG */}
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <path d="M32 4 L35 28 L58 24 L38 36 L52 56 L32 42 L12 56 L26 36 L6 24 L29 28 Z" 
                  fill="url(#starGold)" opacity="0.9"/>
                <circle cx="32" cy="32" r="8" fill="#C9A84C"/>
                <circle cx="32" cy="32" r="4" fill="#F0DFA0"/>
                <defs>
                  <linearGradient id="starGold" x1="0" y1="0" x2="64" y2="64">
                    <stop offset="0%" stopColor="#E2C472"/>
                    <stop offset="100%" stopColor="#A07830"/>
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            <motion.p
              className="loader-text tracking-[0.5em] text-xs uppercase mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Pawiwahan Suci
            </motion.p>

            <motion.h1
              className="text-shimmer text-5xl font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Brama & Sekar
            </motion.h1>

            <motion.div
              className="mt-6 h-px w-32"
              style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
              initial={{ scaleX: 0 }}
              animate={phase >= 2 ? { scaleX: 1 } : {}}
              transition={{ delay: 0.2, duration: 1 }}
            />

            <motion.p
              className="mt-4 text-xs tracking-[0.3em] uppercase opacity-60"
              style={{ fontFamily: "'EB Garamond', serif", color: "#E2C472" }}
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 0.6 } : {}}
              transition={{ delay: 0.5, duration: 1 }}
            >
              17 · Agustus · 2025
            </motion.p>
          </div>

          {/* Bottom progress bar */}
          <motion.div
            className="absolute bottom-12 left-8 right-8 h-px"
            style={{ background: "rgba(201,168,76,0.15)" }}
          >
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(90deg, #A07830, #E2C472)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
