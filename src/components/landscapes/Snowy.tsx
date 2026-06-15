import { motion } from 'framer-motion';
import { useMemo } from 'react';

function Flake({ x, delay, duration, size }: { x: number; delay: number; duration: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{ left: `${x}%`, top: '-2%', width: size, height: size, opacity: 0.7 }}
      animate={{ y: '105vh', x: [0, 8, -8, 5, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

export default function Snowy() {
  const flakes = useMemo(() => Array.from({ length: 40 }, () => ({
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 5,
    size: 2 + Math.random() * 3,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="snowSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7090B8" />
            <stop offset="50%" stopColor="#8AA8C8" />
            <stop offset="100%" stopColor="#9BBAD8" />
          </linearGradient>
          <linearGradient id="snowMtn1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C8D8E8" />
            <stop offset="50%" stopColor="#8098B8" />
            <stop offset="100%" stopColor="#5070A0" />
          </linearGradient>
          <linearGradient id="snowMtn2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8E8F5" />
            <stop offset="40%" stopColor="#A0B8D0" />
            <stop offset="100%" stopColor="#6888A8" />
          </linearGradient>
          <linearGradient id="snowGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D0E0F0" />
            <stop offset="100%" stopColor="#B0C4DA" />
          </linearGradient>
          <filter id="snowBlur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <rect width="390" height="844" fill="url(#snowSky)" />

        {/* Mist / fog */}
        <rect x="-20" y="100" width="430" height="120" fill="white" opacity="0.06" filter="url(#snowBlur)" />

        {/* Far mountains (snow-capped) */}
        <path d="M-20 630 L70 400 L150 510 L230 370 L310 490 L390 410 L410 630 Z" fill="url(#snowMtn1)" opacity="0.7" />
        {/* Snow caps */}
        <path d="M70 400 L50 445 L90 445 Z" fill="white" opacity="0.8" />
        <path d="M230 370 L210 415 L250 415 Z" fill="white" opacity="0.8" />
        <path d="M390 410 L375 450 L410 450 Z" fill="white" opacity="0.6" />

        {/* Mid mountains */}
        <path d="M-20 680 L60 490 L140 590 L220 450 L300 550 L370 490 L410 680 Z" fill="url(#snowMtn2)" />
        {/* Snow caps */}
        <path d="M60 490 L38 535 L82 535 Z" fill="white" opacity="0.85" />
        <path d="M220 450 L200 500 L240 500 Z" fill="white" opacity="0.9" />

        {/* Snow-covered ground */}
        <path d="M-20 680 L410 680 L410 844 L-20 844 Z" fill="url(#snowGround)" />
        <path d="M-20 680 Q100 670 195 675 Q290 680 410 672 L410 690 Q290 700 195 695 Q100 690 -20 698 Z" fill="white" opacity="0.5" />

        {/* Pine trees */}
        {[15, 45, 335, 360, 55, 348].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${638 + (i % 2) * 15})`}>
            <rect x="4.5" y="22" width="3" height="40" fill="#3A5570" />
            <polygon points="6,-5 -12,26 24,26" fill="#3A5570" />
            <polygon points="6,4 -9,28 21,28" fill="#4A6580" />
            {/* Snow on branches */}
            <line x1="-12" y1="26" x2="6" y2="26" stroke="white" strokeWidth="2.5" opacity="0.7" />
            <line x1="-9" y1="28" x2="6" y2="28" stroke="white" strokeWidth="2" opacity="0.6" />
          </g>
        ))}
      </svg>

      {/* Snowflakes */}
      {flakes.map((f, i) => <Flake key={i} {...f} />)}

      {/* Snow mist at ground */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-40"
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="w-full h-full bg-white/10 blur-xl" />
      </motion.div>
    </div>
  );
}
