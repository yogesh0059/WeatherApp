import { motion } from 'framer-motion';
import { useMemo } from 'react';

function RainDrop({ x, delay, duration }: { x: number; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute w-px rounded-full"
      style={{ left: `${x}%`, top: '-2%', background: 'rgba(180,210,255,0.4)', height: 18 }}
      animate={{ y: ['0vh', '105vh'] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

export default function Rainy() {
  const drops = useMemo(() => Array.from({ length: 60 }, (_) => ({
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 0.7 + Math.random() * 0.5,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="rainSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A2535" />
            <stop offset="60%" stopColor="#243347" />
            <stop offset="100%" stopColor="#1E2D3D" />
          </linearGradient>
          <linearGradient id="rainMtn1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E2E40" />
            <stop offset="100%" stopColor="#0C161F" />
          </linearGradient>
          <linearGradient id="rainMtn2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#253545" />
            <stop offset="100%" stopColor="#101820" />
          </linearGradient>
          <linearGradient id="puddle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E2D3D" />
            <stop offset="100%" stopColor="#0A1520" />
          </linearGradient>
          <filter id="rainBlur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <rect width="390" height="844" fill="url(#rainSky)" />

        {/* Dark cloud mass */}
        <ellipse cx="195" cy="100" rx="220" ry="80" fill="#1A2535" opacity="0.9" />
        <ellipse cx="100" cy="130" rx="150" ry="60" fill="#1E2840" opacity="0.8" />
        <ellipse cx="300" cy="120" rx="160" ry="65" fill="#1E2840" opacity="0.8" />
        <ellipse cx="195" cy="150" rx="200" ry="55" fill="#222E42" opacity="0.7" />

        {/* Far mountains */}
        <path d="M-20 650 L70 450 L160 550 L240 420 L320 510 L410 440 L410 650 Z" fill="url(#rainMtn1)" opacity="0.5" />

        {/* Mid mountains */}
        <path d="M-20 690 L60 500 L140 590 L220 470 L300 560 L370 500 L410 690 Z" fill="url(#rainMtn2)" />

        {/* Ground / puddle */}
        <rect x="-20" y="690" width="430" height="155" fill="url(#puddle)" />

        {/* Mist */}
        <rect x="-20" y="660" width="430" height="50" fill="#1A2535" opacity="0.4" filter="url(#rainBlur)" />

        {/* Trees */}
        {[20, 50, 340, 360, 38, 358].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${652 + (i % 3) * 10})`}>
            <rect x="4" y="20" width="3" height="40" fill="#0A1420" />
            <polygon points="5.5,-2 -9,22 20,22" fill="#0A1420" />
          </g>
        ))}
      </svg>

      {/* Rain drops */}
      {drops.map((d, i) => <RainDrop key={i} {...d} />)}

      {/* Lightning flash */}
      <motion.div
        className="absolute inset-0 bg-blue-100/5"
        animate={{ opacity: [0, 0, 0, 0, 0, 0.3, 0, 0.1, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatDelay: 6 }}
      />
    </div>
  );
}
