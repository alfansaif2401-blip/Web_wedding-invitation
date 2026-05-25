"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import OrnamentDivider from "./OrnamentDivider";

function EventCard({
  icon, title, subtitle, date, time, place, address, delay, hasMap,
}: {
  icon: React.ReactNode; title: string; subtitle: string; date: string;
  time: string; place: string; address: string; delay: number; hasMap?: boolean;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=-8.193722,113.683472";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
      className="glass-card relative overflow-hidden"
    >
      {/* Top gold accent line */}
      <div className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }} />

      <div className="p-7">
        {/* Icon + Title */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-sm"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)" }}>
            {icon}
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-1"
              style={{ color: "rgba(201,168,76,0.6)", fontFamily: "'Cinzel Decorative', serif", fontSize: "0.6rem" }}>
              {subtitle}
            </p>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              color: "#F5ECD7",
              lineHeight: 1,
            }}>
              {title}
            </h3>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-5 flex-shrink-0 flex justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <p style={{ fontFamily: "'EB Garamond', serif", color: "#EAD9BB", fontSize: "1rem" }}>{date}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 flex-shrink-0 flex justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <p style={{ fontFamily: "'EB Garamond', serif", color: "#EAD9BB", fontSize: "1rem" }}>{time}</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 flex-shrink-0 flex justify-center mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: "'EB Garamond', serif", color: "#EAD9BB", fontSize: "1rem" }}>{place}</p>
              <p style={{ fontFamily: "'EB Garamond', serif", color: "rgba(245,236,215,0.45)", fontSize: "0.85rem" }}>{address}</p>
            </div>
          </div>
        </div>

        {hasMap && (
          <motion.a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 flex items-center justify-center gap-3 w-full btn-gold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>
            Panuntun Margi
          </motion.a>
        )}
      </div>

      {/* Bottom gold accent */}
      <div className="h-px w-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
    </motion.div>
  );
}

export default function Event() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="event"
      className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #3A0A15 0%, #2A0610 50%, #3A0A15 100%)" }}
    >
      {/* Decorative background shape */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Title */}
        <div ref={ref} className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: "rgba(201,168,76,0.6)", fontFamily: "'Cinzel Decorative', serif" }}
          >
            Tatacara Pawiwahan
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
            Ringgit Wiwaha
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="mt-4 italic"
            style={{ fontFamily: "'EB Garamond', serif", color: "rgba(245,236,215,0.55)", fontSize: "1rem" }}
          >
            Mugi kersa rawuh ing adicara ing ngandhap punika
          </motion.p>
        </div>

        <OrnamentDivider />

        {/* Event cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <EventCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.3">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            }
            title="Akad Nikah"
            subtitle="Ijab Qabul"
            date="Ahad Wage, 17 Agustus 2025"
            time="08.00 – 10.00 WIB"
            place="Masjid Agung Baiturrahman"
            address="Jl. S. Parman No.1, Banyuwangi"
            delay={0.1}
          />
          <EventCard
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.3">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
              </svg>
            }
            title="Resepsi"
            subtitle="Pahargyan Agung"
            date="Ahad Wage, 17 Agustus 2025"
            time="11.00 – 14.00 WIB"
            place="Pendopo Agung Banyuwangi"
            address="Jl. Diponegoro, Banyuwangi (8°11'37.4\"S 113°41'02.5\"E)"
            delay={0.25}
            hasMap
          />
        </div>

        {/* Info dress code */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="mt-10 glass-card p-6 text-center"
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "rgba(201,168,76,0.6)", fontFamily: "'Cinzel Decorative', serif", fontSize: "0.6rem" }}>
            Busana Ingkang Dipun-Suwun
          </p>
          <div className="flex justify-center gap-8 flex-wrap">
            {["Jawi Jangkep", "Kebaya Nasional", "Batik Resmi"].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span style={{ color: "#C9A84C" }}>✦</span>
                <span style={{ fontFamily: "'EB Garamond', serif", color: "#EAD9BB", fontSize: "0.95rem" }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
