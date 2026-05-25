'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ================================================================
// § 1. DATA LAYER — REVISED: Groom first, Bride second
//     Updated names, degrees, parents & Maps URL
// ================================================================

const WEDDING = {
  groom: {
    fullName: 'Irfan Efendi, S.M.',
    nickname: 'Irfan',
    father: 'Bapak M. Hisab',
    mother: 'Ibu Sariti',
  },
  bride: {
    fullName: 'Syarifah Intan Maghfiroh, S.Pd.',
    nickname: 'Intan',
    father: 'Bapak Saiful Bahri',
    mother: 'Ibu Jinani',
  },
  event: {
    targetDate: new Date('2026-06-13T10:00:00+07:00'),
    dayLabel: 'Sabtu',
    dateLabel: '13 Juni 2026',
    akadTime: '08.00 WIB',
    resepsiTime: '10.00 – 14.00 WIB',
    venue: 'Gedung Serbaguna Al-Hikmah',
    address: 'Jl. Bahagia No. 13, Surabaya, Jawa Timur',
    mapsUrl: 'https://maps.app.goo.gl/FXZQ8N7pjb1uXrTeA',
  },
  gallery: [
    { src: '/images/photo1.jpg', alt: 'Prewedding Satu' },
    { src: '/images/photo2.jpg', alt: 'Prewedding Dua' },
    { src: '/images/photo3.jpg', alt: 'Prewedding Tiga' },
    { src: '/images/photo4.jpg', alt: 'Prewedding Empat' },
  ],
  profileImage: '/images/profile.jpg',
  audioSrc: '/audio/Yiruma, River Flows in You.mp3',
};

// ================================================================
// § 2. CONSTANTS
// ================================================================

const CARD_ICONS = ['💍', '👑', '🕊️', '🌹', '🍰', '🥂'];
const JUNE_2026_FIRST_DOW = 1; // Monday
const JUNE_2026_DAYS = 30;
const AUDIO_FADE_DURATION_MS = 2500;
const AUDIO_FADE_INTERVAL_MS = 50;

// ── REVISED TYPOGRAPHY TOKENS ────────────────────────────────────
// Name font: clean, straight, elegant serif — no cursive/slant
const FONT_NAME    = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const FONT_BODY    = "'Cormorant Garamond', Georgia, serif";
const FONT_SCRIPT  = "'EB Garamond', Georgia, serif";  // for decorative small text
// REVISED COLORS — high-contrast white for primary text
const COLOR_NAME   = '#ffffff';          // pure white for names
const COLOR_BODY   = 'rgba(255,255,255,0.92)'; // near-white body text
const COLOR_MUTED  = 'rgba(255,255,255,0.72)'; // muted white
const COLOR_GOLD   = '#D4AF37';          // gold accents — unchanged
const COLOR_GOLD_L = '#FFE066';          // light gold — unchanged on ornaments

// ================================================================
// § 3. CUSTOM HOOKS
// ================================================================

// ── 3a. Live countdown ─────────────────────────────────────────
function useCountdown(target) {
  const [state, setState] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setState({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      const totalSec = Math.floor(diff / 1000);
      setState({
        days: Math.floor(totalSec / 86400),
        hours: Math.floor((totalSec % 86400) / 3600),
        minutes: Math.floor((totalSec % 3600) / 60),
        seconds: totalSec % 60,
      });
    };
    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, [target]);

  return state;
}

// ── 3b. Memory match game ──────────────────────────────────────
function useMemoryGame() {
  const buildDeck = useCallback(() => {
    const doubled = [...CARD_ICONS, ...CARD_ICONS];
    for (let i = doubled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
    }
    return doubled.map((icon, idx) => ({ id: idx, icon, flipped: false, matched: false }));
  }, []);

  const [cards, setCards] = useState(() => buildDeck());
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matchCount, setMatchCount] = useState(0);
  const [won, setWon] = useState(false);
  const lockBoard = useRef(false);

  const flipCard = useCallback((id) => {
    if (lockBoard.current) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;
    if (selected.length === 1 && selected[0] === id) return;

    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));
    const newSelected = [...selected, id];

    if (newSelected.length === 2) {
      lockBoard.current = true;
      setMoves((m) => m + 1);
      const [firstId, secondId] = newSelected;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = card;

      setTimeout(() => {
        if (firstCard.icon === secondCard.icon) {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, matched: true } : c
            )
          );
          const newMatchCount = matchCount + 1;
          setMatchCount(newMatchCount);
          if (newMatchCount === CARD_ICONS.length) setWon(true);
        } else {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c
            )
          );
        }
        setSelected([]);
        lockBoard.current = false;
      }, 900);

      setSelected(newSelected);
    } else {
      setSelected(newSelected);
    }
  }, [cards, selected, matchCount]);

  const resetGame = useCallback(() => {
    lockBoard.current = false;
    setCards(buildDeck());
    setSelected([]);
    setMoves(0);
    setMatchCount(0);
    setWon(false);
  }, [buildDeck]);

  return { cards, flipCard, moves, matchCount, won, resetGame };
}

// ================================================================
// § 4. SMALL REUSABLE COMPONENTS
// ================================================================

// ── 4a. Ornamental SVG divider ────────────────────────────────
function OrnamentalDivider({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 w-full max-w-xs mx-auto my-5 ${className}`}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
      <span style={{ color: COLOR_GOLD, fontSize: 14, lineHeight: 1 }}>✦</span>
      <span style={{ color: COLOR_GOLD, fontSize: 9, lineHeight: 1 }}>✦</span>
      <span style={{ color: COLOR_GOLD, fontSize: 14, lineHeight: 1 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
    </div>
  );
}

// ── 4b. Section header ────────────────────────────────────────
function SectionHeader({ eyebrow, title }) {
  return (
    <div className="text-center">
      <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 11, letterSpacing: 5, opacity: 0.78, textTransform: 'uppercase' }}>
        {eyebrow}
      </p>
      {title && (
        /* REVISED: section sub-titles use clean serif, not Pinyon Script */
        <h2 style={{ fontFamily: FONT_NAME, color: COLOR_GOLD_L, fontSize: 34, lineHeight: 1.15, marginTop: 6, fontWeight: 600, fontStyle: 'normal', letterSpacing: 1 }}>
          {title}
        </h2>
      )}
      <OrnamentalDivider />
    </div>
  );
}

// ── 4c. Doily lace border overlay ────────────────────────────
function DoilyLaceBorder() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}
      viewBox="0 0 300 380" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="doilyPattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
          <circle cx="7.5" cy="7.5" r="2.5" fill="none" stroke="#D4AF37" strokeWidth="0.4" opacity="0.5" />
          <circle cx="7.5" cy="7.5" r="0.8" fill="#D4AF37" opacity="0.35" />
          <line x1="0" y1="7.5" x2="15" y2="7.5" stroke="#D4AF37" strokeWidth="0.25" opacity="0.25" />
          <line x1="7.5" y1="0" x2="7.5" y2="15" stroke="#D4AF37" strokeWidth="0.25" opacity="0.25" />
        </pattern>
      </defs>
      {/* Top-left corner */}
      <g opacity="0.9">
        <path d="M0,0 L55,0 L55,4 L4,4 L4,55 L0,55 Z" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
        <circle cx="4" cy="4" r="3.5" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
        <circle cx="28" cy="4" r="1.5" fill="#D4AF37" opacity="0.55" />
        <circle cx="4" cy="28" r="1.5" fill="#D4AF37" opacity="0.55" />
        {[12, 20, 36, 44].map((x) => (<circle key={`tl-h-${x}`} cx={x} cy={4} r={1} fill="#D4AF37" opacity="0.4" />))}
        {[12, 20, 36, 44].map((y) => (<circle key={`tl-v-${y}`} cx={4} cy={y} r={1} fill="#D4AF37" opacity="0.4" />))}
      </g>
      {/* Top-right corner */}
      <g opacity="0.9" transform="translate(300,0) scale(-1,1)">
        <path d="M0,0 L55,0 L55,4 L4,4 L4,55 L0,55 Z" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
        <circle cx="4" cy="4" r="3.5" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
        <circle cx="28" cy="4" r="1.5" fill="#D4AF37" opacity="0.55" />
        <circle cx="4" cy="28" r="1.5" fill="#D4AF37" opacity="0.55" />
      </g>
      {/* Bottom-left corner */}
      <g opacity="0.9" transform="translate(0,380) scale(1,-1)">
        <path d="M0,0 L55,0 L55,4 L4,4 L4,55 L0,55 Z" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
        <circle cx="4" cy="4" r="3.5" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
        <circle cx="28" cy="4" r="1.5" fill="#D4AF37" opacity="0.55" />
        <circle cx="4" cy="28" r="1.5" fill="#D4AF37" opacity="0.55" />
      </g>
      {/* Bottom-right corner */}
      <g opacity="0.9" transform="translate(300,380) scale(-1,-1)">
        <path d="M0,0 L55,0 L55,4 L4,4 L4,55 L0,55 Z" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
        <circle cx="4" cy="4" r="3.5" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
        <circle cx="28" cy="4" r="1.5" fill="#D4AF37" opacity="0.55" />
        <circle cx="4" cy="28" r="1.5" fill="#D4AF37" opacity="0.55" />
      </g>
      <rect x="2" y="2" width="296" height="376" fill="none" stroke="#D4AF37" strokeWidth="0.4" opacity="0.28" />
    </svg>
  );
}

// ── 4d. Scrapbook corner tabs ─────────────────────────────────
function ScrapbookCorners() {
  return (
    <>
      <div className="absolute top-1.5 left-1.5 w-5 h-5" style={{ background: 'rgba(212,175,55,0.65)', clipPath: 'polygon(0 0, 100% 0, 0 100%)', zIndex: 11 }} />
      <div className="absolute top-1.5 right-1.5 w-5 h-5" style={{ background: 'rgba(212,175,55,0.65)', clipPath: 'polygon(0 0, 100% 0, 100% 100%)', zIndex: 11 }} />
      <div className="absolute bottom-1.5 left-1.5 w-5 h-5" style={{ background: 'rgba(212,175,55,0.65)', clipPath: 'polygon(0 0, 0 100%, 100% 100%)', zIndex: 11 }} />
      <div className="absolute bottom-1.5 right-1.5 w-5 h-5" style={{ background: 'rgba(212,175,55,0.65)', clipPath: 'polygon(100% 0, 0 100%, 100% 100%)', zIndex: 11 }} />
    </>
  );
}

// ── 4e. Ambient floating particles ───────────────────────────
function AmbientParticles({ count = 24 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.8,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 3,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
            background: p.id % 3 === 0 ? '#D4AF37' : p.id % 3 === 1 ? '#C8102E' : '#FFE066' }}
          animate={{ opacity: [0, 0.9, 0], y: [0, -45, -90], scale: [0, 1, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// ================================================================
// § 5. WAX SEAL COMPONENT — PRESERVED INTACT
// ================================================================

function WaxSeal({ onOpen, phase }) {
  const isSeal = phase === 'seal';
  const isDisappearing = phase === 'envelope';
  return (
    <motion.button onClick={onOpen}
      className="relative flex flex-col items-center gap-5 cursor-pointer select-none bg-transparent border-0 outline-none focus:outline-none"
      initial={{ scale: 1, opacity: 1 }}
      animate={
        isDisappearing
          ? { scale: 0, opacity: 0, transition: { duration: 0.28, ease: 'backIn' } }
          : isSeal
          ? { scale: [1, 1.04, 0.97, 1.06, 0.96, 1], rotate: [0, -1.5, 1.5, -0.8, 0.8, 0],
              transition: { duration: 2.2, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' } }
          : {}
      }
    >
      {/* Outer glow ring */}
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{ width: 210, height: 210,
          background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(139,0,0,0.1) 50%, transparent 70%)' }}
        animate={{ scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {/* Secondary pulse ring */}
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{ width: 170, height: 170, border: '1px solid rgba(212,175,55,0.3)' }}
        animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />
      {/* Wax seal SVG */}
      <svg width="148" height="148" viewBox="0 0 148 148" xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }}>
        <defs>
          <radialGradient id="waxBody" cx="38%" cy="32%">
            <stop offset="0%" stopColor="#E01030" />
            <stop offset="45%" stopColor="#9B0010" />
            <stop offset="80%" stopColor="#6B0010" />
            <stop offset="100%" stopColor="#3A0008" />
          </radialGradient>
          <radialGradient id="waxGold" cx="40%" cy="30%">
            <stop offset="0%" stopColor="#FFF0A0" />
            <stop offset="40%" stopColor="#E8C84A" />
            <stop offset="75%" stopColor="#C4A020" />
            <stop offset="100%" stopColor="#8C720A" />
          </radialGradient>
          <radialGradient id="waxHighlight" cx="30%" cy="25%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id="waxShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity="0.55" />
          </filter>
        </defs>
        {/* Scalloped outer edge — 28 lobes */}
        {Array.from({ length: 28 }).map((_, i) => {
          const angle = (i * 360) / 28;
          const rad = (angle * Math.PI) / 180;
          const cx = 74 + Math.cos(rad) * 66;
          const cy = 74 + Math.sin(rad) * 66;
          return <circle key={`lobe-${i}`} cx={cx} cy={cy} r={6.8} fill="url(#waxBody)" filter="url(#waxShadow)" />;
        })}
        <circle cx="74" cy="74" r="58" fill="url(#waxBody)" filter="url(#waxShadow)" />
        <circle cx="74" cy="74" r="58" fill="url(#waxHighlight)" />
        <circle cx="74" cy="74" r="51" fill="none" stroke="url(#waxGold)" strokeWidth="1.4" opacity="0.85" />
        <circle cx="74" cy="74" r="45" fill="none" stroke="url(#waxGold)" strokeWidth="0.7" opacity="0.5" />
        <text x="48" y="80" textAnchor="middle" fontSize="11" fill="url(#waxGold)" opacity="0.8">✦</text>
        <text x="100" y="80" textAnchor="middle" fontSize="11" fill="url(#waxGold)" opacity="0.8">✦</text>
        <text x="74" y="66" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="15" fontWeight="700" letterSpacing="2" fill="url(#waxGold)">I</text>
        <text x="74" y="80" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="12" fill="url(#waxGold)" opacity="0.9">&amp;</text>
        <text x="74" y="95" textAnchor="middle" fontFamily="Cormorant Garamond, Georgia, serif"
          fontSize="15" fontWeight="700" letterSpacing="2" fill="url(#waxGold)">I</text>
      </svg>
      {/* Click prompt */}
      <motion.div className="flex flex-col items-center gap-1"
        animate={{ opacity: [0.7, 1, 0.7], y: [0, -5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity }}>
        <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 13, letterSpacing: 4, textTransform: 'uppercase' }}>
          Buka Undangan
        </p>
        <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 10, letterSpacing: 3, opacity: 0.65 }}>
          ✦ sentuh meterai ✦
        </p>
      </motion.div>
    </motion.button>
  );
}

// ================================================================
// § 6. ENVELOPE ANIMATION — PRESERVED INTACT
// ================================================================

function EnvelopeScene({ phase, onBlastComplete }) {
  const showEnvelope = phase === 'envelope' || phase === 'rising' || phase === 'blast';
  const flapOpen    = phase === 'rising' || phase === 'blast';
  const sheetRising = phase === 'rising' || phase === 'blast';
  const blasting    = phase === 'blast';

  return (
    <div style={{ perspective: '1200px', transformStyle: 'preserve-3d', width: 340, height: 240,
      position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* Envelope body */}
      <motion.div style={{ width: 340, height: 230, position: 'absolute',
        background: 'linear-gradient(155deg, #FAF0D0 0%, #EDD99A 40%, #D4B878 100%)',
        borderRadius: 10, border: '2px solid rgba(212,175,55,0.55)',
        boxShadow: '0 24px 70px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.25)',
        transformStyle: 'preserve-3d', overflow: 'visible' }}
        initial={{ scale: 0.75, opacity: 0, rotateX: 8 }}
        animate={showEnvelope ? { scale: 1, opacity: 1, rotateX: 5 } : { scale: 0.75, opacity: 0, rotateX: 8 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 230" preserveAspectRatio="none"
          style={{ borderRadius: 10, overflow: 'hidden' }}>
          <line x1="0" y1="0" x2="170" y2="115" stroke="rgba(160,120,60,0.25)" strokeWidth="1" />
          <line x1="340" y1="0" x2="170" y2="115" stroke="rgba(160,120,60,0.25)" strokeWidth="1" />
          <line x1="0" y1="230" x2="170" y2="115" stroke="rgba(160,120,60,0.2)" strokeWidth="1" />
          <line x1="340" y1="230" x2="170" y2="115" stroke="rgba(160,120,60,0.2)" strokeWidth="1" />
          <line x1="80" y1="155" x2="260" y2="155" stroke="rgba(160,120,60,0.3)" strokeWidth="0.8" />
          <line x1="100" y1="168" x2="240" y2="168" stroke="rgba(160,120,60,0.2)" strokeWidth="0.8" />
          <line x1="120" y1="181" x2="220" y2="181" stroke="rgba(160,120,60,0.15)" strokeWidth="0.8" />
        </svg>

        {/* Envelope flap */}
        <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '52%',
          transformOrigin: 'top center', transformStyle: 'preserve-3d', zIndex: 8 }}
          initial={{ rotateX: 0 }}
          animate={flapOpen ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.72, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <svg width="340" height="120" viewBox="0 0 340 120"
            style={{ position: 'absolute', top: 0, left: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
            <defs>
              <linearGradient id="flapFront" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EDD99A" />
                <stop offset="100%" stopColor="#C8A060" />
              </linearGradient>
            </defs>
            <polygon points="0,0 170,100 340,0" fill="url(#flapFront)" stroke="rgba(212,175,55,0.4)" strokeWidth="1.2" />
          </svg>
          <svg width="340" height="120" viewBox="0 0 340 120"
            style={{ position: 'absolute', top: 0, left: 0, backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <polygon points="0,0 170,100 340,0" fill="#C4983A" stroke="rgba(212,175,55,0.3)" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Rising invite sheet */}
        <motion.div style={{ position: 'absolute', left: 22, right: 22, bottom: 12, height: 190,
          background: 'linear-gradient(160deg, #FFFDF5 0%, #FDF5E0 50%, #F5E8C0 100%)',
          borderRadius: 6, border: '1px solid rgba(212,175,55,0.45)',
          boxShadow: '0 -6px 24px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.6)',
          zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          initial={{ y: 0, scale: 1, opacity: 0 }}
          animate={
            phase === 'envelope' ? { y: 0, scale: 1, opacity: 0.7 }
            : phase === 'rising'  ? { y: -148, scale: 1.06, opacity: 1 }
            : phase === 'blast'   ? { y: -148, scale: 1.06, opacity: 0 }
            : { y: 0, scale: 1, opacity: 0 }
          }
          transition={
            phase === 'rising' ? { duration: 0.82, delay: 0.52, ease: [0.22, 1, 0.36, 1] }
            : phase === 'blast' ? { duration: 0.28 } : {}
          }>
          <div style={{ width: 30, height: 1, background: '#D4AF37', opacity: 0.6 }} />
          <p style={{ fontFamily: FONT_BODY, color: '#8B0000', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase' }}>
            Undangan Pernikahan
          </p>
          {/* REVISED: clean serif name on rising card */}
          <p style={{ fontFamily: FONT_NAME, color: '#4A0000', fontSize: 20, lineHeight: 1.1, fontWeight: 700, fontStyle: 'normal' }}>
            Irfan &amp; Intan
          </p>
          <p style={{ fontFamily: FONT_BODY, color: '#8B0000', fontSize: 9, letterSpacing: 2, opacity: 0.8 }}>
            13 JUNI 2026
          </p>
          <div style={{ width: 30, height: 1, background: '#D4AF37', opacity: 0.6 }} />
        </motion.div>
      </motion.div>

      {/* Blast reveal overlay */}
      <motion.div className="absolute rounded-full"
        style={{ background: 'radial-gradient(circle, #FAF0D0 0%, #D4AF37 40%, #FFE066 60%, transparent 80%)',
          width: 340, height: 230, zIndex: 20 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={blasting ? { scale: [0, 2.2, 5], opacity: [0, 1, 0] } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.62, delay: 0.15, ease: 'easeOut' }}
        onAnimationComplete={() => { if (blasting) onBlastComplete(); }}
      />
    </div>
  );
}

// ================================================================
// § 7. VINYL CONTROLLER — PRESERVED INTACT
// ================================================================

function VinylController({ playing, onToggle }) {
  return (
    <motion.button onClick={onToggle}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center"
      style={{ width: 64, height: 64, background: 'transparent', border: 'none', outline: 'none', cursor: 'pointer' }}
      whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }}
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }} title={playing ? 'Pause musik' : 'Putar musik'}>
      <motion.div style={{ position: 'relative', width: 64, height: 64 }}
        animate={playing ? { rotate: 360 } : { rotate: 0 }}
        transition={playing ? { duration: 3.2, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}>
        <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="vinylDisc" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#1c1c1c" />
              <stop offset="28%" stopColor="#111111" />
              <stop offset="48%" stopColor="#2a1800" />
              <stop offset="68%" stopColor="#111111" />
              <stop offset="100%" stopColor="#1a1a1a" />
            </radialGradient>
            <filter id="vinylGlow">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#D4AF37" floodOpacity="0.5" />
            </filter>
          </defs>
          <circle cx="32" cy="32" r="31" fill="url(#vinylDisc)" stroke="#D4AF37" strokeWidth="0.8" filter="url(#vinylGlow)" />
          {[26, 22, 18, 14, 10].map((r) => (
            <circle key={r} cx="32" cy="32" r={r} fill="none" stroke="#2a2a2a" strokeWidth="0.6" />
          ))}
          <circle cx="32" cy="32" r="8" fill="#8B0000" />
          <circle cx="32" cy="32" r="5" fill="#6B0000" />
          <circle cx="32" cy="32" r="2.2" fill="#D4AF37" />
        </svg>
      </motion.div>
      {/* Tone arm */}
      <motion.div style={{ position: 'absolute', right: 0, top: 0, width: 3, height: 26,
        background: 'linear-gradient(#FFE066, #9B7B1B)', borderRadius: 1.5, transformOrigin: 'top right',
        transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
        transform: playing ? 'rotate(28deg) translateX(-6px) translateY(2px)' : 'rotate(8deg) translateX(-2px) translateY(1px)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.5)' }}
      />
      {!playing && (
        <motion.div className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <span style={{ color: COLOR_GOLD, fontSize: 13, fontWeight: 'bold', textShadow: '0 0 8px rgba(0,0,0,0.8)' }}>▶</span>
        </motion.div>
      )}
    </motion.button>
  );
}

// ================================================================
// § 8. CHRONO-MATRIX — PRESERVED INTACT
// ================================================================

function ChronoMatrix() {
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const cells = Array(JUNE_2026_FIRST_DOW).fill(null);
  for (let d = 1; d <= JUNE_2026_DAYS; d++) cells.push(d);
  const isSundayCol = (idx) => idx % 7 === 0;

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-3">
        <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 18, letterSpacing: 5, fontWeight: 600 }}>
          JUNI 2026
        </p>
      </div>
      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {dayNames.map((d, i) => (
          <div key={d} className="flex items-center justify-center" style={{ height: 28 }}>
            <span style={{ fontFamily: FONT_BODY, color: i === 0 ? '#C8102E' : COLOR_GOLD, fontSize: 11, opacity: 0.75, letterSpacing: 0.5 }}>{d}</span>
          </div>
        ))}
      </div>
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => (
          <div key={i} className="flex items-center justify-center" style={{ height: 38 }}>
            {day !== null && (
              day === 13 ? (
                <motion.div className="relative flex items-center justify-center"
                  style={{ width: 34, height: 34, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #9B0010 0%, #C8102E 60%, #9B0010 100%)',
                    border: '1.5px solid #D4AF37' }}
                  animate={{ boxShadow: [
                    '0 0 6px 2px rgba(212,175,55,0.5), 0 0 14px 4px rgba(139,0,0,0.35)',
                    '0 0 14px 6px rgba(212,175,55,0.9), 0 0 28px 10px rgba(139,0,0,0.6)',
                    '0 0 6px 2px rgba(212,175,55,0.5), 0 0 14px 4px rgba(139,0,0,0.35)',
                  ] }}
                  transition={{ duration: 2.2, repeat: Infinity }}>
                  <span style={{ fontFamily: FONT_BODY, color: '#FFE066', fontSize: 13, fontWeight: 700 }}>{day}</span>
                  <motion.span className="absolute" style={{ top: -6, right: -5, color: '#FFE066', fontSize: 9 }}
                    animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}>✦</motion.span>
                </motion.div>
              ) : (
                <span style={{ fontFamily: FONT_BODY, color: isSundayCol(i) ? '#C8102E' : COLOR_BODY, fontSize: 12, opacity: 0.85 }}>
                  {day}
                </span>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// § 9. LIVE COUNTDOWN — PRESERVED INTACT
// ================================================================

function LiveCountdown() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING.event.targetDate);

  function CountUnit({ value, label }) {
    return (
      <div className="flex flex-col items-center gap-2">
        <motion.div key={value}
          initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative flex items-center justify-center"
          style={{ width: 70, height: 70,
            background: 'linear-gradient(145deg, rgba(139,0,0,0.28) 0%, rgba(212,175,55,0.08) 100%)',
            border: '1px solid rgba(212,175,55,0.4)', borderRadius: 10,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.35)' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)',
            borderRadius: '10px 10px 0 0', pointerEvents: 'none' }} />
          <span style={{ fontFamily: FONT_BODY, color: '#FFE066', fontSize: 28, fontWeight: 700, lineHeight: 1, letterSpacing: 1 }}>
            {String(value).padStart(2, '0')}
          </span>
        </motion.div>
        <span style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', opacity: 0.8 }}>
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <CountUnit value={days} label="Hari" />
      <span style={{ color: COLOR_GOLD, fontSize: 22, fontWeight: 300, paddingBottom: 24, opacity: 0.7 }}>:</span>
      <CountUnit value={hours} label="Jam" />
      <span style={{ color: COLOR_GOLD, fontSize: 22, fontWeight: 300, paddingBottom: 24, opacity: 0.7 }}>:</span>
      <CountUnit value={minutes} label="Menit" />
      <span style={{ color: COLOR_GOLD, fontSize: 22, fontWeight: 300, paddingBottom: 24, opacity: 0.7 }}>:</span>
      <CountUnit value={seconds} label="Detik" />
    </div>
  );
}

// ================================================================
// § 10. MEMORY MATCH GAME — PRESERVED INTACT
// ================================================================

function MemoryMatchGame() {
  const { cards, flipCard, moves, matchCount, won, resetGame } = useMemoryGame();

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Score bar */}
      <div className="flex items-center justify-between w-full max-w-xs">
        <span style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 13 }}>
          Langkah: <span style={{ color: '#FFE066', fontWeight: 700 }}>{moves}</span>
        </span>
        <span style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 13 }}>
          Cocok: <span style={{ color: '#FFE066', fontWeight: 700 }}>{matchCount}/{CARD_ICONS.length}</span>
        </span>
        <motion.button onClick={resetGame} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
          style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 11, border: '1px solid rgba(212,175,55,0.5)',
            padding: '3px 12px', borderRadius: 4, background: 'rgba(212,175,55,0.06)', cursor: 'pointer',
            letterSpacing: 1.5, textTransform: 'uppercase' }}>
          Ulang
        </motion.button>
      </div>

      {/* Win banner */}
      <AnimatePresence>
        {won && (
          <motion.div initial={{ opacity: 0, scale: 0.7, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="text-center py-3 px-7 rounded-xl"
            style={{ background: 'linear-gradient(135deg, rgba(139,0,0,0.4) 0%, rgba(212,175,55,0.18) 100%)',
              border: '1px solid rgba(212,175,55,0.55)', boxShadow: '0 0 24px rgba(212,175,55,0.25)' }}>
            <p style={{ fontFamily: FONT_NAME, color: '#FFE066', fontSize: 22, fontWeight: 700, fontStyle: 'normal' }}>🎉 Selamat!</p>
            <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 12 }}>Selesai dalam {moves} langkah</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3×4 card grid */}
      <div className="grid grid-cols-4 gap-2.5" style={{ perspective: '700px' }}>
        {cards.map((card) => (
          <motion.div key={card.id} className="relative cursor-pointer"
            style={{ width: 60, height: 76, transformStyle: 'preserve-3d' }}
            animate={{ rotateY: card.flipped || card.matched ? 180 : 0, scale: card.matched ? [1, 1.08, 1] : 1 }}
            transition={{ rotateY: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
              scale: card.matched ? { duration: 0.35, times: [0, 0.5, 1] } : { duration: 0.1 } }}
            onClick={() => flipCard(card.id)}
            whileHover={!card.flipped && !card.matched ? { scale: 1.05, y: -2 } : {}}>
            {/* Card Back */}
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
              background: 'linear-gradient(145deg, #5A0010 0%, #8B0000 50%, #4A0008 100%)',
              border: '1.5px solid rgba(212,175,55,0.6)', borderRadius: 8, display: 'flex',
              alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
              <svg width="100%" height="100%" viewBox="0 0 60 76" style={{ position: 'absolute', inset: 0 }}>
                <defs>
                  <pattern id={`cardPat-${card.id}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="5" cy="5" r="1.5" fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="0.4" />
                  </pattern>
                </defs>
                <rect width="60" height="76" fill={`url(#cardPat-${card.id})`} rx="8" />
              </svg>
              <span style={{ color: COLOR_GOLD, fontSize: 20, position: 'relative', zIndex: 1 }}>✦</span>
            </div>
            {/* Card Front */}
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: card.matched
                ? 'linear-gradient(145deg, rgba(212,175,55,0.22) 0%, rgba(139,0,0,0.18) 100%)'
                : 'linear-gradient(145deg, #1E0D00 0%, #2D1800 100%)',
              border: card.matched ? '1.5px solid rgba(212,175,55,0.75)' : '1.5px solid rgba(212,175,55,0.32)',
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: card.matched ? '0 0 14px rgba(212,175,55,0.35), inset 0 0 10px rgba(212,175,55,0.08)' : '0 4px 12px rgba(0,0,0,0.4)' }}>
              <span style={{ fontSize: 26 }}>{card.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ================================================================
// § 11. GALLERY PHOTO — PRESERVED INTACT (lace border, scrapbook)
// ================================================================

function GalleryPhoto({ src, alt, index }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div className="relative overflow-hidden"
      style={{ aspectRatio: '4 / 5', background: 'linear-gradient(145deg, #1E0D00, #2D1800)',
        border: '1px solid rgba(212,175,55,0.28)', borderRadius: 6, boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.025, boxShadow: '0 14px 40px rgba(0,0,0,0.6), 0 0 20px rgba(212,175,55,0.15)', transition: { duration: 0.28 } }}>

      <DoilyLaceBorder />
      <ScrapbookCorners />

      {!imgError ? (
        <img src={src} alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover',
            filter: 'sepia(18%) contrast(1.04) brightness(0.93) saturate(1.1)', display: 'block' }}
          onError={() => setImgError(true)} />
      ) : (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 8, background: 'linear-gradient(145deg, #1a0a00, #2d1500)' }}>
          <span style={{ fontSize: 40, opacity: 0.35 }}>🌹</span>
          <p style={{ fontFamily: FONT_BODY, color: 'rgba(212,175,55,0.45)', fontSize: 10, letterSpacing: 2, textAlign: 'center' }}>{alt}</p>
        </div>
      )}

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(10,5,0,0.65) 100%)', pointerEvents: 'none', zIndex: 5 }} />

      {/* REVISED: photo label uses clean serif */}
      <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, textAlign: 'center', zIndex: 12 }}>
        <p style={{ fontFamily: FONT_BODY, color: 'rgba(212,175,55,0.85)', fontSize: 12, letterSpacing: 2 }}>{alt}</p>
      </div>
    </motion.div>
  );
}

// ================================================================
// § 12. PROFILE PHOTO — PRESERVED INTACT
// ================================================================

function ProfileHero() {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div className="relative mx-auto" style={{ width: 268, height: 340 }}
      initial={{ scale: 0.78, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
      {/* Outer ornate frame */}
      <div style={{ position: 'absolute', inset: -10, borderRadius: 18,
        border: '1px solid rgba(212,175,55,0.2)',
        background: 'linear-gradient(135deg, rgba(212,175,55,0.06), transparent)', pointerEvents: 'none' }} />
      {/* Main image container */}
      <div style={{ width: '100%', height: '100%', borderRadius: 12, overflow: 'hidden',
        border: '2px solid rgba(212,175,55,0.5)',
        boxShadow: '0 0 0 1px rgba(212,175,55,0.12), 0 24px 70px rgba(0,0,0,0.75), inset 0 0 32px rgba(212,175,55,0.04)',
        position: 'relative' }}>
        {!imgError ? (
          <img src={WEDDING.profileImage} alt={`${WEDDING.groom.nickname} & ${WEDDING.bride.nickname}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover',
              filter: 'sepia(12%) contrast(1.06) brightness(0.94)', display: 'block' }}
            onError={() => setImgError(true)} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(160deg, #2d1500, #1a0800, #0d0400)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <span style={{ fontSize: 72, opacity: 0.25 }}>💑</span>
            <p style={{ fontFamily: FONT_BODY, color: 'rgba(212,175,55,0.4)', fontSize: 12, letterSpacing: 3 }}>Foto Bersama</p>
          </div>
        )}
        <div style={{ position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(10,5,0,0.7) 100%)', pointerEvents: 'none' }} />
      </div>

      <DoilyLaceBorder />

      {[{ style: { top: -4, left: -4 } }, { style: { top: -4, right: -4 } },
        { style: { bottom: -4, left: -4 } }, { style: { bottom: -4, right: -4 } }
      ].map(({ style }, i) => (
        <motion.span key={i} style={{ position: 'absolute', color: COLOR_GOLD, fontSize: 18, lineHeight: 1, zIndex: 15, ...style }}
          animate={{ rotate: [0, 20, -20, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.8 }}>✦</motion.span>
      ))}
    </motion.div>
  );
}

// ================================================================
// § 13. INTRO SCREEN — 3D animation PRESERVED, title text revised
// ================================================================

function IntroScreen({ phase, onOpen, onBlastComplete }) {
  return (
    <motion.div key="intro"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 40% 60%, #1a0800 0%, #0a0500 60%, #050200 100%)' }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}>

      <AmbientParticles count={28} />

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(to right, transparent, #D4AF37, #FFE066, #D4AF37, transparent)' }} />

      {/* REVISED: Intro header text — clean serif for names */}
      <motion.div className="text-center mb-10 relative z-10 px-6"
        initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8 }}>
        <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 11, letterSpacing: 7, textTransform: 'uppercase', opacity: 0.7 }}>
          ✦ Undangan Pernikahan ✦
        </p>
        {/* REVISED: names use clean straight serif */}
        <motion.h1
          style={{ fontFamily: FONT_NAME, fontSize: 'clamp(30px, 7vw, 46px)', lineHeight: 1.1, margin: '10px 0 4px',
            fontWeight: 700, fontStyle: 'normal', letterSpacing: 2 }}
          animate={{ color: ['#ffffff', '#FFE066', '#ffffff'],
            textShadow: [
              '0 0 30px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.1)',
              '0 0 50px rgba(212,175,55,0.7), 0 0 100px rgba(212,175,55,0.25)',
              '0 0 30px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.1)',
            ] }}
          transition={{ duration: 4, repeat: Infinity }}>
          Irfan &amp; Intan
        </motion.h1>
        <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 12, letterSpacing: 5, opacity: 0.6 }}>
          13 JUNI 2026
        </p>
      </motion.div>

      {/* Seal or envelope — ANIMATION PRESERVED INTACT */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {phase === 'seal' && (
            <motion.div key="seal" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.35 }}>
              <WaxSeal onOpen={onOpen} phase={phase} />
            </motion.div>
          )}
          {(phase === 'envelope' || phase === 'rising' || phase === 'blast') && (
            <motion.div key="envelope" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
              <EnvelopeScene phase={phase} onBlastComplete={onBlastComplete} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(to right, transparent, #D4AF37, #FFE066, #D4AF37, transparent)' }} />
    </motion.div>
  );
}

// ================================================================
// § 14. MAIN CONTENT — REVISED: Groom first, Bride second;
//       clean serif names; white body text
// ================================================================

function MainContent() {
  return (
    <motion.main key="main" className="relative max-w-2xl mx-auto px-4 pb-28"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}>

      {/* ──────────── HERO SECTION ──────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen py-20 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
            width: 480, height: 480, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,0,0,0.12) 0%, rgba(212,175,55,0.04) 50%, transparent 70%)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 6, repeat: Infinity }} />
        </div>

        <motion.div className="relative z-10 w-full"
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}>

          <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 11, letterSpacing: 4, opacity: 0.78, textTransform: 'uppercase', marginBottom: 4 }}>
            Bismillahirrahmanirrahim
          </p>
          <OrnamentalDivider />

          <ProfileHero />

          {/* ── GROOM (First mention) ── */}
          <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}>
            {/* REVISED: clean straight serif, pure white, no cursive */}
            <h1 style={{ fontFamily: FONT_NAME, color: COLOR_NAME, fontSize: 'clamp(28px, 6vw, 42px)',
              lineHeight: 1.15, margin: 0, fontWeight: 700, fontStyle: 'normal', letterSpacing: 1.5,
              textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
              {WEDDING.groom.fullName}
            </h1>
            <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 10, letterSpacing: 5, marginTop: 8, opacity: 0.75, textTransform: 'uppercase' }}>
              ✦ Putra Dari ✦
            </p>
            <p style={{ fontFamily: FONT_BODY, color: COLOR_BODY, fontSize: 14, lineHeight: 1.6, marginTop: 2 }}>
              {WEDDING.groom.father} &amp; {WEDDING.groom.mother}
            </p>
          </motion.div>

          {/* Ampersand divider — REVISED to match clean style */}
          <motion.div className="my-7 flex items-center justify-center gap-5"
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6, type: 'spring', stiffness: 180 }}>
            <div style={{ width: 90, height: 1, background: 'linear-gradient(to right, transparent, #D4AF37)' }} />
            <motion.span style={{ fontFamily: FONT_NAME, color: COLOR_GOLD, fontSize: 36, lineHeight: 1, fontWeight: 300 }}
              animate={{ scale: [1, 1.1, 1], textShadow: ['0 0 12px rgba(212,175,55,0.3)', '0 0 28px rgba(212,175,55,0.8)', '0 0 12px rgba(212,175,55,0.3)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}>
              &amp;
            </motion.span>
            <div style={{ width: 90, height: 1, background: 'linear-gradient(to left, transparent, #D4AF37)' }} />
          </motion.div>

          {/* ── BRIDE (Second mention) ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.7 }}>
            {/* REVISED: clean straight serif, pure white, no cursive */}
            <h1 style={{ fontFamily: FONT_NAME, color: COLOR_NAME, fontSize: 'clamp(28px, 6vw, 42px)',
              lineHeight: 1.15, margin: 0, fontWeight: 700, fontStyle: 'normal', letterSpacing: 1.5,
              textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
              {WEDDING.bride.fullName}
            </h1>
            <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 10, letterSpacing: 5, marginTop: 8, opacity: 0.75, textTransform: 'uppercase' }}>
              ✦ Putri Dari ✦
            </p>
            <p style={{ fontFamily: FONT_BODY, color: COLOR_BODY, fontSize: 14, lineHeight: 1.6, marginTop: 2 }}>
              {WEDDING.bride.father} &amp; {WEDDING.bride.mother}
            </p>
          </motion.div>

          <OrnamentalDivider className="mt-8" />
          <motion.div animate={{ opacity: [0.4, 1, 0.4], y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
            <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 10, letterSpacing: 4, opacity: 0.6 }}>↓ gulir ke bawah ↓</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ──────────── OPENING BLESSING ──────────── */}
      <motion.section className="section-card p-8 mb-8 text-center"
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.75 }}>
        <SectionHeader eyebrow="Dengan Rahmat Allah SWT" />
        <p style={{ fontFamily: FONT_SCRIPT, color: COLOR_BODY, fontSize: 15, lineHeight: 1.9, fontStyle: 'italic' }}>
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri
          supaya kamu cenderung dan merasa tenteram kepadanya.&rdquo;
        </p>
        <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 11, letterSpacing: 3, marginTop: 10, opacity: 0.75 }}>
          — QS. Ar-Ruum : 21 —
        </p>
        <OrnamentalDivider />
        <p style={{ fontFamily: FONT_BODY, color: COLOR_BODY, fontSize: 13, lineHeight: 1.85, opacity: 0.88 }}>
          Dengan memohon Rahmat dan Ridha Allah SWT, kami bermaksud menyelenggarakan walimatul ursy putra-putri kami.
          Kami mengundang Bapak / Ibu / Saudara/i untuk hadir memberikan doa restu kepada kedua mempelai.
        </p>
      </motion.section>

      {/* ──────────── EVENT DETAILS ──────────── */}
      <motion.section className="section-card p-8 mb-8 text-center"
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.75 }}>
        <SectionHeader eyebrow="Detail Acara" title="Waktu & Tempat" />

        <motion.div className="mb-6 py-4 px-6 rounded-xl"
          style={{ background: 'linear-gradient(135deg, rgba(139,0,0,0.25) 0%, rgba(212,175,55,0.1) 100%)',
            border: '1px solid rgba(212,175,55,0.35)', boxShadow: '0 0 20px rgba(212,175,55,0.08)' }}
          whileInView={{ boxShadow: ['0 0 10px rgba(212,175,55,0.08)', '0 0 22px rgba(212,175,55,0.2)', '0 0 10px rgba(212,175,55,0.08)'] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}>
          <p style={{ fontFamily: FONT_BODY, color: '#FFE066', fontSize: 20, fontWeight: 700, letterSpacing: 3 }}>
            {WEDDING.event.dayLabel}, {WEDDING.event.dateLabel}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-5 mb-6">
          {[{ title: 'Akad Nikah', time: WEDDING.event.akadTime, icon: '💍' },
            { title: 'Resepsi', time: WEDDING.event.resepsiTime, icon: '🥂' }
          ].map(({ title, time, icon }) => (
            <div key={title} className="text-center p-4 rounded-lg"
              style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.18)' }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 13, letterSpacing: 2, fontWeight: 700, marginTop: 6, textTransform: 'uppercase' }}>
                {title}
              </p>
              <div style={{ width: 32, height: 1, background: '#D4AF37', margin: '6px auto', opacity: 0.5 }} />
              <p style={{ fontFamily: FONT_BODY, color: COLOR_BODY, fontSize: 13, lineHeight: 1.5 }}>{time}</p>
            </div>
          ))}
        </div>

        <div className="p-5 rounded-xl" style={{ background: 'linear-gradient(145deg, rgba(26,10,0,0.8), rgba(10,5,0,0.95))', border: '1px solid rgba(212,175,55,0.22)' }}>
          <span style={{ fontSize: 20 }}>📍</span>
          <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 16, fontWeight: 700, letterSpacing: 1, marginTop: 6 }}>
            {WEDDING.event.venue}
          </p>
          <p style={{ fontFamily: FONT_BODY, color: COLOR_BODY, fontSize: 13, opacity: 0.8, marginTop: 4, lineHeight: 1.6 }}>
            {WEDDING.event.address}
          </p>
          <motion.a href={WEDDING.event.mapsUrl} target="_blank" rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2 rounded-lg"
            style={{ fontFamily: FONT_BODY, color: '#1a0800', background: 'linear-gradient(135deg, #D4AF37, #FFE066)',
              fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none',
              fontWeight: 700, boxShadow: '0 4px 14px rgba(212,175,55,0.35)' }}
            whileHover={{ scale: 1.04, boxShadow: '0 6px 20px rgba(212,175,55,0.5)' }}
            whileTap={{ scale: 0.97 }}>
            Buka di Maps
          </motion.a>
        </div>
      </motion.section>

      {/* ──────────── CHRONO-MATRIX ──────────── */}
      <motion.section className="section-card p-8 mb-8"
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.75 }}>
        <SectionHeader eyebrow="Chrono-Matrix" title="Kalender" />
        <ChronoMatrix />
      </motion.section>

      {/* ──────────── LIVE COUNTDOWN ──────────── */}
      <motion.section className="section-card p-8 mb-8 text-center"
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.75 }}>
        <SectionHeader eyebrow="Menghitung Hari" />
        <div className="flex justify-center"><LiveCountdown /></div>
        <p style={{ fontFamily: FONT_BODY, color: COLOR_MUTED, fontSize: 11, letterSpacing: 3, marginTop: 16 }}>
          menuju hari bahagia kami ✦
        </p>
      </motion.section>

      {/* ──────────── GALLERY ──────────── */}
      <motion.section className="section-card p-8 mb-8"
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.75 }}>
        <SectionHeader eyebrow="Galeri Kenangan" title="Momen Kami" />
        <div className="grid grid-cols-2 gap-4">
          {WEDDING.gallery.map((photo, i) => (
            <GalleryPhoto key={i} src={photo.src} alt={photo.alt} index={i} />
          ))}
        </div>
      </motion.section>

      {/* ──────────── MEMORY GAME ──────────── */}
      <motion.section className="section-card p-8 mb-8 text-center"
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.75 }}>
        <SectionHeader eyebrow="Permainan Kenangan" title="Memory Match" />
        <p style={{ fontFamily: FONT_BODY, color: COLOR_MUTED, fontSize: 13, marginBottom: 20, lineHeight: 1.7 }}>
          Temukan semua pasangan kartu — seperti dua jiwa yang berjodoh satu sama lain ✦
        </p>
        <div className="flex justify-center"><MemoryMatchGame /></div>
      </motion.section>

      {/* ──────────── UCAPAN & DOA ──────────── */}
      <motion.section className="section-card p-8 mb-8 text-center"
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.75 }}>
        <SectionHeader eyebrow="Ucapan & Doa" title="Pesan Hangat" />
        <div className="p-5 rounded-xl" style={{ background: 'linear-gradient(145deg, rgba(26,10,0,0.7), rgba(10,5,0,0.9))', border: '1px solid rgba(212,175,55,0.18)' }}>
          <p style={{ fontFamily: FONT_SCRIPT, color: COLOR_BODY, fontSize: 14, lineHeight: 1.9, fontStyle: 'italic', opacity: 0.9 }}>
            &ldquo;Semoga Allah memberkati kalian berdua, memberkahi kalian melalui satu sama lain,
            dan menyatukan kalian dalam kebaikan.&rdquo;
          </p>
          <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 11, letterSpacing: 3, marginTop: 10, opacity: 0.7 }}>
            — HR. Abu Dawud —
          </p>
        </div>
      </motion.section>

      {/* ──────────── CLOSING ──────────── */}
      <motion.section className="text-center py-16 relative"
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.75 }}>
        <div style={{ position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(139,0,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 11, letterSpacing: 5, textTransform: 'uppercase', opacity: 0.7 }}>
          ✦ Jazakumullahu Khairan ✦
        </p>
        <OrnamentalDivider />

        {/* REVISED: closing names — clean serif, white, no cursive */}
        <motion.h2
          style={{ fontFamily: FONT_NAME, color: COLOR_NAME, fontSize: 'clamp(26px, 6vw, 40px)',
            lineHeight: 1.2, margin: '8px 0', fontWeight: 700, fontStyle: 'normal', letterSpacing: 2 }}
          animate={{ textShadow: ['0 0 20px rgba(255,255,255,0.1)', '0 0 40px rgba(255,255,255,0.25)', '0 0 20px rgba(255,255,255,0.1)'] }}
          transition={{ duration: 4, repeat: Infinity }}>
          Irfan &amp; Intan
        </motion.h2>

        <OrnamentalDivider />

        <p style={{ fontFamily: FONT_BODY, color: COLOR_BODY, fontSize: 13, lineHeight: 1.9, opacity: 0.8, maxWidth: 340, margin: '0 auto' }}>
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak / Ibu / Saudara/i
          berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
        </p>

        <div className="mt-8">
          <p style={{ fontFamily: FONT_BODY, color: COLOR_GOLD, fontSize: 11, letterSpacing: 3, opacity: 0.45 }}>
            Dibuat dengan ❤️ &nbsp;·&nbsp; {new Date().getFullYear()}
          </p>
        </div>
      </motion.section>
    </motion.main>
  );
}

// ================================================================
// § 15. ROOT PAGE — Audio system PRESERVED INTACT
// ================================================================

export default function WeddingInvitationPage() {
  const [phase, setPhase] = useState('seal');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const volumeTimerRef = useRef(null);
  const fallbackListenersAttached = useRef(false);

  useEffect(() => {
    const audio = new Audio(WEDDING.audioSrc);
    audio.loop = true;
    audio.preload = 'metadata';
    audio.volume = 0;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
      if (volumeTimerRef.current) clearInterval(volumeTimerRef.current);
    };
  }, []);

  // Audio fade-in: 0.0 → 1.0 over 2500ms
  const startFadeIn = useCallback(() => {
    if (!audioRef.current) return;
    if (volumeTimerRef.current) clearInterval(volumeTimerRef.current);
    audioRef.current.volume = 0;
    const steps = AUDIO_FADE_DURATION_MS / AUDIO_FADE_INTERVAL_MS;
    const increment = 1.0 / steps;
    volumeTimerRef.current = setInterval(() => {
      const audio = audioRef.current;
      if (!audio) return;
      const nextVol = Math.min(audio.volume + increment, 1.0);
      audio.volume = nextVol;
      if (nextVol >= 1.0) {
        if (volumeTimerRef.current) { clearInterval(volumeTimerRef.current); volumeTimerRef.current = null; }
      }
    }, AUDIO_FADE_INTERVAL_MS);
  }, []);

  // Fallback listeners for autoplay bypass
  const attachFallbackListeners = useCallback(() => {
    if (fallbackListenersAttached.current) return;
    fallbackListenersAttached.current = true;
    const handler = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.play().then(() => { setIsPlaying(true); startFadeIn(); }).catch(() => {});
      window.removeEventListener('touchstart', handler);
      window.removeEventListener('scroll', handler);
      window.removeEventListener('click', handler);
    };
    window.addEventListener('touchstart', handler, { once: true, passive: true });
    window.addEventListener('scroll', handler, { once: true, passive: true });
    window.addEventListener('click', handler, { once: true });
  }, [startFadeIn]);

  // CRITICAL: play() is the first call inside the user-gesture handler
  const handleOpenInvitation = useCallback(() => {
    try {
      const audio = audioRef.current;
      if (audio) {
        audio.play()
          .then(() => { setIsPlaying(true); startFadeIn(); })
          .catch((err) => {
            if (err instanceof DOMException) attachFallbackListeners();
          });
      }
    } catch (err) {
      attachFallbackListeners();
    }

    // 3D animation phase timeline — PRESERVED INTACT
    setPhase('envelope');
    setTimeout(() => setPhase('rising'), 300);
    setTimeout(() => setPhase('blast'), 1600);
    setTimeout(() => setPhase('content'), 2400);
  }, [startFadeIn, attachFallbackListeners]);

  const handleBlastComplete = useCallback(() => {
    setPhase('content');
  }, []);

  const handleToggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  return (
    <div className="luxury-bg min-h-screen">
      {/* Global gold top/bottom border */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(to right, transparent, #D4AF37, #FFE066, #D4AF37, transparent)',
        zIndex: 100, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(to right, transparent, #D4AF37, #FFE066, #D4AF37, transparent)',
        zIndex: 100, pointerEvents: 'none' }} />

      <AnimatePresence>
        {phase !== 'content' && (
          <IntroScreen phase={phase} onOpen={handleOpenInvitation} onBlastComplete={handleBlastComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'content' && <MainContent />}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'content' && (
          <VinylController playing={isPlaying} onToggle={handleToggleAudio} />
        )}
      </AnimatePresence>
    </div>
  );
}
