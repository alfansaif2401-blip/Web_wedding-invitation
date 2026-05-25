"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioController() {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/assets/gamelan.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.45;
    // Try autoplay
    audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    return () => { audioRef.current?.pause(); };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-5 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <motion.button
        onClick={toggle}
        className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #4A0D1A, #6B1226)",
          border: "1px solid rgba(201,168,76,0.4)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,168,76,0.2)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={playing ? { boxShadow: ["0 4px 24px rgba(0,0,0,0.5)", "0 4px 32px rgba(201,168,76,0.3)", "0 4px 24px rgba(0,0,0,0.5)"] } : {}}
        transition={playing ? { duration: 2, repeat: Infinity } : {}}
      >
        {/* Ripple when playing */}
        {playing && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full border border-gold-DEFAULT"
              style={{ borderColor: "rgba(201,168,76,0.3)" }}
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: "rgba(201,168,76,0.2)" }}
              animate={{ scale: [1, 2], opacity: [0.3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
            />
          </>
        )}
        <AnimatePresence mode="wait">
          {playing ? (
            <motion.span
              key="mute"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.25 }}
            >
              {/* Music note icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="unmute"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.25 }}
            >
              {/* Muted icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                <line x1="1" y1="1" x2="23" y2="23"/>
                <path d="M9 9v9M9 18V5l12-2v8"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Label tooltip */}
      <motion.div
        className="absolute right-16 bottom-3 text-right"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-xs tracking-widest uppercase whitespace-nowrap"
          style={{ color: "rgba(201,168,76,0.6)", fontFamily: "'EB Garamond', serif" }}>
          {playing ? "Gamelan" : "Suwanten"}
        </span>
      </motion.div>
    </motion.div>
  );
}
