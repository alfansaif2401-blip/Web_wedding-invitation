"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import OrnamentDivider from "./OrnamentDivider";

type AttendStatus = "hadir" | "tidak" | "";

export default function RSVP() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [form, setForm] = useState({ name: "", message: "", pax: "1", attend: "" as AttendStatus });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.attend) return;
    const status = form.attend === "hadir" ? "🟢 Hadir" : "🔴 Mboten Saged Hadir";
    const text = encodeURIComponent(
      `✨ *RSVP Pawiwahan Brama & Sekar* ✨\n\n` +
      `👤 Nami: ${form.name}\n` +
      `📌 Karawuhan: ${status}\n` +
      `👥 Cacah: ${form.pax} tiyang\n` +
      `💬 Atur Pambagya:\n${form.message}\n\n` +
      `_Matur Sembah Nuwun_ 🙏`
    );
    window.open(`https://wa.me/6285853664685?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section
      id="rsvp"
      className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #4A0D1A 0%, #3A0A15 100%)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 60px)",
          }}
        />
      </div>

      <div className="max-w-lg mx-auto relative z-10">
        <div ref={ref} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: "rgba(201,168,76,0.6)", fontFamily: "'Cinzel Decorative', serif" }}
          >
            Karawuhan
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
            RSVP
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-3 italic"
            style={{ fontFamily: "'EB Garamond', serif", color: "rgba(245,236,215,0.5)", fontSize: "0.95rem" }}
          >
            Mugi kersa paring kabar rawuh panjenengan
          </motion.p>
        </div>

        <OrnamentDivider />

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="glass-card p-10 text-center mt-8"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl mb-5"
              >
                🙏
              </motion.div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "#F5ECD7", fontWeight: 300 }}>
                Matur Sembah Nuwun
              </h3>
              <p className="mt-3" style={{ fontFamily: "'EB Garamond', serif", color: "rgba(245,236,215,0.6)", fontStyle: "italic", lineHeight: 1.7 }}>
                Panjenengan sampun ngaturaken konfirmasi rawuh.<br />
                Kula tansah ngegungaken berkah Dalem dhumateng panjenengan.
              </p>
              <div className="h-px mt-6"
                style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="glass-card p-7 mt-8 space-y-5"
            >
              {/* Name */}
              <div>
                <label style={{ fontFamily: "'EB Garamond', serif", color: "rgba(201,168,76,0.7)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                  Asma Panjenengan
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Kersaa ngisi nami panjenengan..."
                  className="input-elegant"
                />
              </div>

              {/* Attendance */}
              <div>
                <label style={{ fontFamily: "'EB Garamond', serif", color: "rgba(201,168,76,0.7)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
                  Karawuhan
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: "hadir", label: "🟢 Hadir", sub: "Kula badhe rawuh" },
                    { val: "tidak", label: "🔴 Mboten", sub: "Kula mboten saged" },
                  ].map(({ val, label, sub }) => (
                    <button
                      key={val}
                      onClick={() => setForm({ ...form, attend: val as AttendStatus })}
                      className="p-4 text-center transition-all duration-300 relative overflow-hidden"
                      style={{
                        border: form.attend === val ? "1px solid #C9A84C" : "1px solid rgba(201,168,76,0.2)",
                        background: form.attend === val ? "rgba(201,168,76,0.12)" : "rgba(245,236,215,0.03)",
                        boxShadow: form.attend === val ? "0 0 20px rgba(201,168,76,0.15)" : "none",
                      }}
                    >
                      <div style={{ fontFamily: "'EB Garamond', serif", color: "#EAD9BB", fontSize: "0.95rem" }}>{label}</div>
                      <div style={{ fontFamily: "'EB Garamond', serif", color: "rgba(245,236,215,0.4)", fontSize: "0.75rem", marginTop: "2px" }}>{sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pax */}
              {form.attend === "hadir" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <label style={{ fontFamily: "'EB Garamond', serif", color: "rgba(201,168,76,0.7)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                    Cacah Tiyang
                  </label>
                  <div className="flex gap-2">
                    {["1", "2", "3", "4", "5+"].map((n) => (
                      <button
                        key={n}
                        onClick={() => setForm({ ...form, pax: n })}
                        className="flex-1 py-3 text-center transition-all duration-200"
                        style={{
                          border: form.pax === n ? "1px solid #C9A84C" : "1px solid rgba(201,168,76,0.2)",
                          background: form.pax === n ? "rgba(201,168,76,0.12)" : "transparent",
                          color: form.pax === n ? "#C9A84C" : "rgba(245,236,215,0.5)",
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.1rem",
                        }}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Message */}
              <div>
                <label style={{ fontFamily: "'EB Garamond', serif", color: "rgba(201,168,76,0.7)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                  Atur Pambagya (Opsional)
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Aturaken pangajeng-ajeng panjenengan..."
                  rows={3}
                  className="input-elegant"
                  style={{ resize: "none" }}
                />
              </div>

              {/* Submit */}
              <motion.button
                onClick={handleSubmit}
                disabled={!form.name || !form.attend}
                className="w-full btn-gold flex items-center justify-center gap-3 mt-2 disabled:opacity-40 disabled:cursor-not-allowed"
                whileHover={form.name && form.attend ? { scale: 1.02 } : {}}
                whileTap={form.name && form.attend ? { scale: 0.98 } : {}}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.0 1.18C0 .65.21.14.61-.06A2 2 0 013 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                </svg>
                Kirim via WhatsApp
              </motion.button>

              <p className="text-center"
                style={{ fontFamily: "'EB Garamond', serif", color: "rgba(245,236,215,0.25)", fontSize: "0.75rem", fontStyle: "italic" }}>
                Konfirmasi paling dangu 3 dinten saderengipun adicara
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
