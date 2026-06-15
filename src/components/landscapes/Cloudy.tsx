import { motion } from 'framer-motion';

export default function Cloudy() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="cloudySky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A3F5F" />
            <stop offset="50%" stopColor="#3D5A80" />
            <stop offset="100%" stopColor="#4A6885" />
          </linearGradient>
          <linearGradient id="cloudyMtn1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2E4A6A" />
            <stop offset="100%" stopColor="#162535" />
          </linearGradient>
          <linearGradient id="cloudyMtn2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A5575" />
            <stop offset="100%" stopColor="#1E3348" />
          </linearGradient>
          <linearGradient id="cloudyGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1C3040" />
            <stop offset="100%" stopColor="#0C1820" />
          </linearGradient>
          <filter id="blur5">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="blur8">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <rect width="390" height="844" fill="url(#cloudySky)" />

        {/* Cloud layers */}
        <ellipse cx="80" cy="180" rx="90" ry="35" fill="white" opacity="0.07" filter="url(#blur5)" />
        <ellipse cx="80" cy="175" rx="70" ry="28" fill="white" opacity="0.1" />
        <ellipse cx="50" cy="162" rx="45" ry="22" fill="white" opacity="0.08" />
        <ellipse cx="115" cy="165" rx="50" ry="22" fill="white" opacity="0.08" />

        <ellipse cx="300" cy="140" rx="100" ry="38" fill="white" opacity="0.07" filter="url(#blur5)" />
        <ellipse cx="300" cy="135" rx="80" ry="30" fill="white" opacity="0.09" />
        <ellipse cx="265" cy="122" rx="55" ry="25" fill="white" opacity="0.07" />
        <ellipse cx="335" cy="125" rx="55" ry="25" fill="white" opacity="0.07" />

        <ellipse cx="190" cy="220" rx="120" ry="40" fill="white" opacity="0.05" filter="url(#blur8)" />
        <ellipse cx="190" cy="215" rx="95" ry="32" fill="white" opacity="0.07" />
        <ellipse cx="150" cy="200" rx="60" ry="26" fill="white" opacity="0.06" />
        <ellipse cx="230" cy="202" rx="65" ry="27" fill="white" opacity="0.06" />

        {/* Far mountain */}
        <path d="M-20 640 L70 440 L160 540 L240 400 L320 500 L410 430 L410 640 Z" fill="url(#cloudyMtn1)" opacity="0.6" />

        {/* Mid mountain */}
        <path d="M-20 680 L60 490 L140 580 L220 460 L300 550 L370 490 L410 680 Z" fill="url(#cloudyMtn2)" />

        {/* Ground */}
        <rect x="-20" y="680" width="430" height="165" fill="url(#cloudyGround)" />

        {/* Trees */}
        {[10, 40, 70, 95, 335, 360, 340, 310].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${645 + (i % 2) * 12})`}>
            <rect x="5" y="22" width="4" height="35" fill="#0E1E2E" />
            <polygon points="7,0 -10,24 24,24" fill="#0E1E2E" />
            <polygon points="7,8 -8,28 22,28" fill="#122030" />
          </g>
        ))}

        {/* Mist at base */}
        <rect x="-20" y="655" width="430" height="40" fill="white" opacity="0.04" filter="url(#blur8)" />
      </svg>

      {/* Animated cloud overlays */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute top-24 left-[-10%] w-[60%] h-28 bg-slate-400/8 rounded-full blur-3xl" />
        <div className="absolute top-16 right-[-5%] w-[55%] h-24 bg-slate-300/8 rounded-full blur-3xl" />
      </motion.div>
    </div>
  );
}
