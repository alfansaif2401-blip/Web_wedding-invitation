"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function OrnamentDivider({ light = false }: { light?: boolean }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const color = light ? "rgba(245,236,215,0.3)" : "rgba(201,168,76,0.5)";
  const centerColor = light ? "#F5ECD7" : "#C9A84C";

  return (
    <div ref={ref} className="flex items-center justify-center w-full my-8 px-6">
      <motion.div
        className="h-px flex-1"
        style={{ background: `linear-gradient(90deg, transparent, ${color})` }}
        initial={{ scaleX: 0, originX: "right" }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <motion.div
        className="mx-4"
        initial={{ opacity: 0, rotate: -180, scale: 0 }}
        animate={inView ? { opacity: 1, rotate: 0, scale: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d="M20 2 L22 16 L36 14 L24 20 L32 34 L20 26 L8 34 L16 20 L4 14 L18 16 Z"
            fill={centerColor}
            opacity="0.8"
          />
          <circle cx="20" cy="20" r="4" fill={centerColor} />
          <circle cx="20" cy="20" r="2" fill={light ? "#4A0D1A" : "#4A0D1A"} />
        </svg>
      </motion.div>
      <motion.div
        className="h-px flex-1"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        initial={{ scaleX: 0, originX: "left" }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}
