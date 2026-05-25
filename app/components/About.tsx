"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import OrnamentDivider from "./OrnamentDivider";

function ProfileCard({
  name, javanese, role, parent, delay,
}: {
  name: string; javanese: string; role: string; parent: string; delay: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const cy = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x: cx, y: cy });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="glass-card p-8 flex flex-col items-center text-center relative overflow-hidden cursor-default"
        style={{
          rotateX: tilt.y,
          rotateY: tilt.x,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.y, rotateY: tilt.x }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />

        {/* Ornament crown */}
        <div className="mb-5" style={{ transform: "translateZ(20px)" }}>
          <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
            <path d="M0 28 L12 4 L20 16 L30 2 L40 16 L48 4 L60 28 Z" stroke="#C9A84C" strokeWidth="0.8" fill="none" opacity="0.6"/>
            <circle cx="30" cy="2" r="2" fill="#C9A84C" opacity="0.8"/>
            <circle cx="12" cy="4" r="1.5" fill="#C9A84C" opacity="0.6"/>
            <circle cx="48" cy="4" r="1.5" fill="#C9A84C" opacity="0.6"/>
          </svg>
        </div>

        {/* Photo placeholder circle */}
        <div className="relative w-28 h-28 rounded-full mb-5 overflow-hidden"
          style={{
            border: "2px solid rgba(201,168,76,0.4)",
            boxShadow: "0 0 30px rgba(201,168,76,0.15), inset 0 0 20px rgba(74,13,26,0.5)",
            transform: "translateZ(30px)",
          }}>
          <div className="w-full h-full"
            style={{ background: "linear-gradient(135deg, #6B1226, #4A0D1A)" }}>
            <div className="w-full h-full flex items-center justify-center">
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", color: "#C9A84C", fontStyle: "italic" }}>
                {name.charAt(0)}
              </span>
            </div>
          </div>
          {/* Shimmer overlay */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, transparent 40%, rgba(201,168,76,0.1) 50%, transparent 60%)" }} />
        </div>

        <p className="text-xs tracking-[0.25em] uppercase mb-1"
          style={{ color: "rgba(201,168,76,0.6)", fontFamily: "'Cinzel Decorative', serif", transform: "translateZ(15px)" }}>
          {role}
        </p>

        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
          fontWeight: 400,
          color: "#F5ECD7",
          letterSpacing: "-0.01em",
          transform: "translateZ(25px)",
        }}>
          {name}
        </h3>

        <p style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: "1rem",
          fontStyle: "italic",
          color: "#C9A84C",
          marginTop: "4px",
          transform: "translateZ(15px)",
        }}>
          {javanese}
        </p>

        <div className="w-12 h-px my-4"
          style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)", transform: "translateZ(10px)" }} />

        <p style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: "0.9rem",
          color: "rgba(245,236,215,0.55)",
          lineHeight: 1.6,
          transform: "translateZ(10px)",
        }}>
          {parent}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative section-padding batik-overlay overflow-hidden"
      style={{ background: "linear-gradient(180deg, #4A0D1A 0%, #3A0A15 50%, #4A0D1A 100%)" }}
    >
      {/* Ambient background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)",
          y: bgY,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section heading */}
        <div ref={titleRef} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: "rgba(201,168,76,0.6)", fontFamily: "'Cinzel Decorative', serif" }}
          >
            Ingkang Dipun Katuraken
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 1 }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 7vw, 3.5rem)",
              fontWeight: 300,
              color: "#F5ECD7",
              lineHeight: 1.2,
            }}
          >
            Matur Sembah Nuwun
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="mt-5 max-w-xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
              fontStyle: "italic",
              color: "rgba(245,236,215,0.65)",
              lineHeight: 1.8,
            }}
          >
            &ldquo;Kanthi rahayuning Gusti Ingkang Maha Kuwaos, kula kekalih 
            ngaturaken pangajeng-ajeng saha kawilujengan dhumateng para tamu 
            ingkang kinurmatan, mugi kersa rawuh ing adicara pawiwahan suci kula.&rdquo;
          </motion.p>
        </div>

        <OrnamentDivider />

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <ProfileCard
            name="Brama Adi Nugroho"
            javanese="Putra Mahkota"
            role="Temanten Kakung"
            parent="Putra saking Bapak Hendra Nugroho & Ibu Sri Wahyuni"
            delay={0.1}
          />
          <ProfileCard
            name="Sekar Ayu Lestari"
            javanese="Kusuma Widayati"
            role="Temanten Putri"
            parent="Putri saking Bapak Agus Lestari & Ibu Retno Wulandari"
            delay={0.3}
          />
        </div>

        {/* Bismillah / Opening Verse */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="mt-14 text-center px-4"
        >
          <div className="glass-card p-8 relative overflow-hidden">
            <div className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)" }} />
            <p style={{
              fontFamily: "'Noto Serif', serif",
              fontSize: "clamp(1rem, 3vw, 1.2rem)",
              color: "rgba(240,223,160,0.85)",
              lineHeight: 2,
              fontStyle: "italic",
            }}>
              &#8220;Lan ing antawisipun pratanda-pratanda kadarman Gusti inggih 
              punika Panjenenganipun nitahaken garwa saking antaraning diri 
              panjenengan piyambak-piyambak, supados panjenengan saged tentrem 
              wonten ing sisihe garwa, saha katadahaken raos welas asih ing 
              antawising panjenengan kekalih.&#8221;
            </p>
            <p className="mt-4 text-xs tracking-widest uppercase"
              style={{ color: "rgba(201,168,76,0.5)", fontFamily: "'EB Garamond', serif" }}>
              — QS. Ar-Rum : 21 —
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
