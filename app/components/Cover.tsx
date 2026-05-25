"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Cover() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle parallax on mouse move
  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: cx * 12, y: cy * 8 });
  };

  // Build countdown
  const weddingDate = new Date("2025-08-17T08:00:00");
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();
      if (diff <= 0) return;
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      onMouseMove={handleMouse}
      className="relative h-screen min-h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* === Ken Burns Background Image === */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <motion.div
          className="absolute inset-[-5%]"
          animate={{
            scale: [1, 1.08],
            x: [mousePos.x * 0.5, mousePos.x * 0.5],
            y: [mousePos.y * 0.5, mousePos.y * 0.5],
          }}
          transition={{ scale: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }, x: { duration: 0.8, ease: "easeOut" }, y: { duration: 0.8, ease: "easeOut" } }}
        >
          <Image
            src="/assets/hero.jpg"
            alt="Brama & Sekar"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </motion.div>

      {/* === Layered Overlays === */}
      {/* Maroon gradient from bottom */}
      <div className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(to top, #4A0D1A 0%, rgba(74,13,26,0.6) 40%, rgba(74,13,26,0.2) 70%, rgba(74,13,26,0.4) 100%)" }} />
      {/* Vignette */}
      <div className="absolute inset-0 z-[2]"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(26,4,8,0.7) 100%)" }} />
      {/* Gold top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px z-[3]"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, #F0DFA0, #C9A84C, transparent)" }} />

      {/* === Rotating Corner Ornaments === */}
      {[
        { pos: "top-6 left-6", rotate: 0 },
        { pos: "top-6 right-6", rotate: 90 },
        { pos: "bottom-6 right-6", rotate: 180 },
        { pos: "bottom-6 left-6", rotate: 270 },
      ].map(({ pos, rotate }, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} z-[4] w-16 h-16`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transform: `rotate(${rotate}deg)` }}
        >
          <svg viewBox="0 0 64 64" fill="none">
            <path d="M4 4 L4 28 L8 28 L8 8 L28 8 L28 4 Z" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.7"/>
            <circle cx="4" cy="4" r="3" fill="#C9A84C" opacity="0.8"/>
            <path d="M4 32 L4 36 L8 36" stroke="#C9A84C" strokeWidth="0.5" fill="none" opacity="0.4"/>
          </svg>
        </motion.div>
      ))}

      {/* === Hero Text Content === */}
      <motion.div
        className="relative z-[5] text-center px-6 flex flex-col items-center"
        style={{ y: textY, opacity }}
      >
        {/* Surat undangan label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.8em", y: -20 }}
          animate={{ opacity: 1, letterSpacing: "0.35em", y: 0 }}
          transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
          className="text-xs uppercase mb-4 tracking-[0.35em]"
          style={{ color: "#C9A84C", fontFamily: "'Cinzel Decorative', serif" }}
        >
          Serat Ulem Pawiwahan
        </motion.p>

        {/* Names */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="text-shimmer"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.5rem, 15vw, 9rem)",
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Brama
          </motion.h1>
        </div>

        {/* Ampersand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="my-1"
        >
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.5rem, 6vw, 3.5rem)",
            color: "#C9A84C",
            fontStyle: "italic",
            fontWeight: 300,
          }}>&</span>
        </motion.div>

        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="text-shimmer"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.5rem, 15vw, 9rem)",
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Sekar
          </motion.h1>
        </div>

        {/* Divider ornament */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
          className="w-48 h-px mb-6"
          style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
        />

        {/* Date Javanese */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex flex-col items-center gap-1 mb-8"
        >
          <p style={{ fontFamily: "'EB Garamond', serif", color: "#EAD9BB", fontSize: "1.1rem", fontStyle: "italic" }}>
            Ahad Wage, 17 Agustus 2025
          </p>
          <p style={{ fontFamily: "'EB Garamond', serif", color: "rgba(201,168,76,0.7)", fontSize: "0.85rem", letterSpacing: "0.15em" }}>
            Pendopo Agung · Banyuwangi
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex gap-5 mb-10"
        >
          {[
            { val: countdown.days, label: "Dinten" },
            { val: countdown.hours, label: "Jam" },
            { val: countdown.minutes, label: "Menit" },
            { val: countdown.seconds, label: "Detik" },
          ].map(({ val, label }) => (
            <div key={label} className="flex flex-col items-center">
              <div
                className="w-14 h-14 flex items-center justify-center rounded-sm relative"
                style={{
                  background: "rgba(74,13,26,0.6)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#E2C472", fontWeight: 500 }}>
                  {String(val).padStart(2, "0")}
                </span>
              </div>
              <span style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.6rem", color: "rgba(201,168,76,0.6)", letterSpacing: "0.15em", marginTop: "6px", textTransform: "uppercase" }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA scroll */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="scroll-indicator flex flex-col items-center gap-2 cursor-pointer"
        >
          <span style={{ fontFamily: "'EB Garamond', serif", color: "rgba(201,168,76,0.6)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            Serat Salajengipun
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}
