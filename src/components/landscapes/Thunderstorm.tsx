import { motion } from 'framer-motion';
import { useMemo } from 'react';

function RainDrop({ x, delay, duration }: { x: number; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ left: `${x}%`, top: '-2%', background: 'rgba(150,180,220,0.35)', width: 1.5, height: 22 }}
      animate={{ y: '105vh' }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

export default function Thunderstorm() {
  const drops = useMemo(() => Array.from({ length: 70 }, () => ({
    x: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: 0.6 + Math.random() * 0.4,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="stormSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D1020" />
            <stop offset="100%" stopColor="#18202E" />
          </linearGradient>
          <linearGradient id="stormMtn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#181E28" />
            <stop offset="100%" stopColor="#080C12" />
          </linearGradient>
          <filter id="lightningBlur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        <rect width="390" height="844" fill="url(#stormSky)" />

        {/* Dark cloud mass */}
        <ellipse cx="195" cy="80" rx="250" ry="100" fill="#101520" opacity="0.95" />
        <ellipse cx="80" cy="120" rx="160" ry="70" fill="#141820" opacity="0.9" />
        <ellipse cx="320" cy="110" rx="170" ry="75" fill="#141820" opacity="0.9" />
        <ellipse cx="195" cy="160" rx="220" ry="65" fill="#18202A" opacity="0.85" />

        {/* Mountains */}
        <path d="M-20 660 L70 450 L160 560 L240 430 L320 530 L410 450 L410 660 Z" fill="url(#stormMtn)" opacity="0.7" />
        <path d="M-20 700 L50 510 L140 610 L220 480 L310 580 L380 510 L410 700 Z" fill="url(#stormMtn)" />

        {/* Ground */}
        <rect x="-20" y="700" width="430" height="145" fill="#0A0E14" />

        {/* Trees dark silhouettes */}
        {[15, 50, 340, 365, 38, 355].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${660 + (i % 2) * 12})`}>
            <rect x="4" y="20" width="3.5" height="42" fill="#060A0F" />
            <polygon points="5.5,-5 -11,24 22,24" fill="#060A0F" />
          </g>
        ))}
      </svg>

      {/* Rain */}
      {drops.map((d, i) => <RainDrop key={i} {...d} />)}

      {/* Lightning bolts */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 390 844"
        animate={{ opacity: [0, 0, 0, 0, 0, 0, 1, 0.5, 0, 0, 0, 1, 0] }}
        transition={{ duration: 9, repeat: Infinity, repeatDelay: 5, times: [0, 0.3, 0.4, 0.5, 0.6, 0.65, 0.66, 0.67, 0.68, 0.8, 0.88, 0.89, 0.9] }}
      >
        <polyline points="220,120 200,250 215,250 190,400" stroke="#FFE566" strokeWidth="2.5" fill="none" filter="url(#lightningBlur)" />
        <polyline points="220,120 200,250 215,250 190,400" stroke="white" strokeWidth="1" fill="none" />
      </motion.svg>

      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 390 844"
        animate={{ opacity: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0] }}
        transition={{ duration: 14, repeat: Infinity, repeatDelay: 3 }}
      >
        <polyline points="130,100 112,220 128,220 105,360" stroke="#FFE566" strokeWidth="2" fill="none" filter="url(#lightningBlur)" />
        <polyline points="130,100 112,220 128,220 105,360" stroke="white" strokeWidth="0.8" fill="none" />
      </motion.svg>

      {/* Flash */}
      <motion.div
        className="absolute inset-0 bg-white/10"
        animate={{ opacity: [0, 0, 0, 0, 0, 0, 0.25, 0, 0, 0.1, 0] }}
        transition={{ duration: 9, repeat: Infinity, repeatDelay: 5 }}
      />
    </div>
  );
}
