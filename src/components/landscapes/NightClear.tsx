import { motion } from 'framer-motion';
import { useMemo } from 'react';

function ShootingStar({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute h-px rounded-full"
      style={{ background: 'linear-gradient(90deg, transparent, white, transparent)', width: 80, top: `${10 + Math.random() * 25}%`, left: '-5%' }}
      initial={{ x: '-5%', y: 0, opacity: 0, rotate: 15 }}
      animate={{ x: '110%', y: '30%', opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.2, delay, repeat: Infinity, repeatDelay: 8 + delay * 3, ease: 'easeIn' }}
    />
  );
}

export default function NightClear() {
  const stars = useMemo(() =>
    Array.from({ length: 60 }, (_) => ({
      x: Math.random() * 100,
      y: Math.random() * 55,
      r: Math.random() * 1.8 + 0.5,
      delay: Math.random() * 4,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#050A1A" />
            <stop offset="40%" stopColor="#0D1B3E" />
            <stop offset="75%" stopColor="#1A2F5A" />
            <stop offset="100%" stopColor="#0F1E35" />
          </linearGradient>
          <radialGradient id="moonGlow" cx="70%" cy="22%" r="20%">
            <stop offset="0%" stopColor="#B0C8FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#B0C8FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="mtnNight1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D2044" />
            <stop offset="100%" stopColor="#060F22" />
          </linearGradient>
          <linearGradient id="mtnNight2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#152842" />
            <stop offset="100%" stopColor="#080F1E" />
          </linearGradient>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D1830" />
            <stop offset="100%" stopColor="#050C18" />
          </linearGradient>
          <linearGradient id="moonReflect" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8DAFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C8DAFF" stopOpacity="0" />
          </linearGradient>
          <filter id="blur3">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Night sky */}
        <rect width="390" height="844" fill="url(#nightSky)" />

        {/* Moon glow */}
        <circle cx="275" cy="185" r="80" fill="url(#moonGlow)" filter="url(#blur3)" />

        {/* Moon */}
        <circle cx="275" cy="185" r="36" fill="#D8E8FF" opacity="0.95" />
        <circle cx="263" cy="178" r="28" fill="#B8CBEE" />
        {/* Moon craters */}
        <circle cx="278" cy="178" r="5" fill="#C0D0E8" opacity="0.5" />
        <circle cx="266" cy="192" r="3" fill="#C0D0E8" opacity="0.4" />
        <circle cx="284" cy="192" r="4" fill="#C0D0E8" opacity="0.3" />

        {/* Stars */}
        {stars.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white" opacity={0.5 + Math.random() * 0.5} />
        ))}

        {/* Far mountain range */}
        <path d="M-20 610 L60 420 L140 510 L220 390 L300 480 L380 410 L410 610 Z" fill="url(#mtnNight1)" opacity="0.7" />

        {/* Mid mountain range */}
        <path d="M-20 650 L50 470 L130 560 L210 440 L280 520 L360 460 L410 650 Z" fill="url(#mtnNight2)" />

        {/* Tree line */}
        {[0, 30, 55, 80, 110, 140, 165, 195, 225, 255, 280, 310, 340, 365].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${620 + (i % 3) * 8})`}>
            <rect x="4" y="20" width="3" height="28" fill="#06101E" />
            <polygon points="5.5,0 -8,22 19,22" fill="#06101E" />
            <polygon points="5.5,8 -6,26 17,26" fill="#08141F" />
          </g>
        ))}

        {/* Water/lake reflection */}
        <rect x="-20" y="690" width="430" height="155" fill="url(#water)" />

        {/* Moon water reflection */}
        <ellipse cx="195" cy="730" rx="18" ry="60" fill="url(#moonReflect)" opacity="0.6" />

        {/* Water shimmer lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1="70" y1={700 + i * 16} x2="320" y2={700 + i * 16} stroke="white" strokeWidth="0.5" opacity={0.04 + i * 0.01} />
        ))}

        {/* Horizon atmospheric glow */}
        <ellipse cx="195" cy="690" rx="250" ry="15" fill="#1A3060" opacity="0.6" filter="url(#blur3)" />
      </svg>

      {/* Shooting stars */}
      <ShootingStar delay={2} />
      <ShootingStar delay={7} />
      <ShootingStar delay={14} />

      {/* Moon ambient */}
      <motion.div
        className="absolute"
        style={{ right: '20%', top: '20%', transform: 'translate(50%, -50%)' }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-32 h-32 rounded-full bg-blue-200/20 blur-3xl" />
      </motion.div>
    </div>
  );
}
