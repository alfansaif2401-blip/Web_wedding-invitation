"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import OrnamentDivider from "./OrnamentDivider";

function CopyCard({
  bank, account, name, delay,
}: {
  bank: string; account: string; name: string; delay: number;
}) {
  const [copied, setCopied] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(account);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      className="glass-card relative overflow-hidden"
    >
      {/* Top shimmer */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
        animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <div className="p-7">
        {/* Bank logo area */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded flex items-center justify-center font-bold text-lg"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #A07830)",
              color: "#4A0D1A",
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "0.75rem",
              letterSpacing: "0.05em",
            }}>
            {bank}
          </div>
          <div>
            <p style={{ fontFamily: "'EB Garamond', serif", color: "rgba(245,236,215,0.5)", fontSize: "0.8rem" }}>
              Nomer Rekening
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5ECD7", fontSize: "1.8rem", fontWeight: 400, lineHeight: 1.1 }}>
              {account}
            </p>
          </div>
        </div>

        <div className="h-px w-full mb-4"
          style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.2), transparent)" }} />

        <p style={{ fontFamily: "'EB Garamond', serif", color: "rgba(245,236,215,0.6)", fontSize: "0.9rem", marginBottom: "20px" }}>
          a/n <span style={{ color: "#EAD9BB" }}>{name}</span>
        </p>

        <motion.button
          onClick={handleCopy}
          className="w-full relative overflow-hidden btn-gold flex items-center justify-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Sampun Disalin!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2"/>
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
                Salin Nomer Rekening
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Gift() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="gift"
      className="relative section-padding overflow-hidden batik-overlay"
      style={{ background: "linear-gradient(180deg, #2A0610 0%, #4A0D1A 100%)" }}
    >
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Title */}
        <div ref={ref} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: "rgba(201,168,76,0.6)", fontFamily: "'Cinzel Decorative', serif" }}
          >
            Pisungsung Sih
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 7vw, 3.5rem)",
              fontWeight: 300,
              color: "#F5ECD7",
            }}
          >
            Amplop Digital
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="mt-4 italic max-w-sm mx-auto"
            style={{ fontFamily: "'EB Garamond', serif", color: "rgba(245,236,215,0.55)", fontSize: "1rem", lineHeight: 1.7 }}
          >
            Menawi panjenengan kersa paring pisungsung sih, 
            saged katur lumantar rekening ing ngandhap punika
          </motion.p>
        </div>

        <OrnamentDivider />

        {/* Copy cards */}
        <div className="space-y-5 mt-10">
          <CopyCard
            bank="BCA"
            account="+62 858-5366-4685"
            name="Brama Adi Nugroho"
            delay={0.1}
          />
        </div>

        {/* Or physical gift note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-8 text-center"
        >
          <p style={{ fontFamily: "'EB Garamond', serif", color: "rgba(245,236,215,0.35)", fontSize: "0.85rem", fontStyle: "italic" }}>
            Menawi kersa paring amplop langsung, saged katur ing acara resepsi.
            <br />Matur sembah nuwun sanget.
          </p>
        </motion.div>

        {/* Decorative envelope SVG */}
        <motion.div
          className="flex justify-center mt-10"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="80" height="60" viewBox="0 0 80 60" fill="none" opacity="0.25">
            <rect x="2" y="8" width="76" height="46" rx="3" stroke="#C9A84C" strokeWidth="1"/>
            <path d="M2 12 L40 36 L78 12" stroke="#C9A84C" strokeWidth="1"/>
            <path d="M2 54 L28 34M78 54 L52 34" stroke="#C9A84C" strokeWidth="0.7"/>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
