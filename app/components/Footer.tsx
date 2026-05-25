"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <footer
      className="relative overflow-hidden py-16 px-6"
      style={{ background: "#1A0408" }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />

      <div ref={ref} className="max-w-lg mx-auto text-center">
        {/* Ornament */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="35" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5"/>
            <circle cx="40" cy="40" r="28" stroke="rgba(201,168,76,0.15)" strokeWidth="0.5" strokeDasharray="3 6"/>
            <path d="M40 8 L43 34 L68 32 L46 42 L60 66 L40 52 L20 66 L34 42 L12 32 L37 34 Z"
              fill="rgba(201,168,76,0.12)" stroke="#C9A84C" strokeWidth="0.5" opacity="0.8"/>
            <circle cx="40" cy="40" r="6" fill="rgba(201,168,76,0.15)" stroke="#C9A84C" strokeWidth="0.8"/>
            <circle cx="40" cy="40" r="2.5" fill="#C9A84C" opacity="0.7"/>
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-shimmer"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 8vw, 3rem)",
            fontWeight: 300,
          }}
        >
          Brama & Sekar
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-px w-24 mx-auto my-4"
          style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="italic leading-relaxed"
          style={{
            fontFamily: "'EB Garamond', serif",
            color: "rgba(245,236,215,0.5)",
            fontSize: "0.95rem",
            lineHeight: 1.8,
          }}
        >
          Mugi Gusti Ingkang Maha Kuwaos tansah mberkahi<br />
          paripurnaning gesang kula kekalih.<br />
          Matur sembah nuwun sanget <span style={{ color: "#C9A84C" }}>✦</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.3 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 text-xs tracking-widest uppercase"
          style={{ fontFamily: "'EB Garamond', serif", color: "rgba(245,236,215,0.3)" }}
        >
          17 · 08 · 2025 · Banyuwangi
        </motion.p>

        {/* Back to top */}
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="inline-flex flex-col items-center gap-2 mt-8 cursor-pointer"
          style={{ color: "rgba(201,168,76,0.4)" }}
          whileHover={{ color: "#C9A84C" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
          <span style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
            Wangsul Nginggil
          </span>
        </motion.a>
      </div>
    </footer>
  );
}
