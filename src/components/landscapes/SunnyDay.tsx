import { motion } from 'framer-motion';

export default function SunnyDay() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 390 844" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="sunGlow" cx="50%" cy="35%" r="40%">
            <stop offset="0%" stopColor="#FFE566" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FF9A3C" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F3460" />
            <stop offset="30%" stopColor="#E8535A" />
            <stop offset="60%" stopColor="#F7825A" />
            <stop offset="100%" stopColor="#FDB97D" />
          </linearGradient>
          <linearGradient id="mountain1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B3FA0" />
            <stop offset="100%" stopColor="#3D1F6B" />
          </linearGradient>
          <linearGradient id="mountain2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B5FCB" />
            <stop offset="100%" stopColor="#5A2E8A" />
          </linearGradient>
          <linearGradient id="mountain3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C070E0" />
            <stop offset="100%" stopColor="#8040B0" />
          </linearGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3D1F6B" />
            <stop offset="100%" stopColor="#1A0A30" />
          </linearGradient>
          <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8040A0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#4020607" stopOpacity="0.3" />
          </linearGradient>
          <filter id="blur4">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id="blur2">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Sky */}
        <rect width="390" height="844" fill="url(#skyDay)" />

        {/* Sun glow */}
        <ellipse cx="195" cy="290" rx="160" ry="120" fill="url(#sunGlow)" />

        {/* Sun */}
        <circle cx="195" cy="295" r="48" fill="#FFE566" opacity="0.95" />
        <circle cx="195" cy="295" r="38" fill="#FFEF99" />

        {/* Sun rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1={195 + Math.cos((angle * Math.PI) / 180) * 55}
            y1={295 + Math.sin((angle * Math.PI) / 180) * 55}
            x2={195 + Math.cos((angle * Math.PI) / 180) * 72}
            y2={295 + Math.sin((angle * Math.PI) / 180) * 72}
            stroke="#FFE566"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
          />
        ))}

        {/* Far mountain range */}
        <path d="M-20 620 L80 430 L160 520 L240 410 L320 490 L390 420 L410 620 Z" fill="url(#mountain1)" opacity="0.5" filter="url(#blur4)" />

        {/* Mid mountain range */}
        <path d="M-10 650 L50 480 L130 560 L210 450 L290 530 L360 460 L410 650 Z" fill="url(#mountain2)" opacity="0.7" />

        {/* Front mountain range */}
        <path d="M-20 680 L40 530 L100 590 L170 500 L240 560 L310 510 L380 560 L410 680 Z" fill="url(#mountain3)" />

        {/* Ground */}
        <path d="M-20 680 L410 680 L410 844 L-20 844 Z" fill="url(#ground)" />

        {/* Road/path */}
        <path d="M195 844 L155 750 L175 720 L215 720 L235 750 Z" fill="url(#road)" opacity="0.6" />
        <path d="M195 844 L168 780 L182 730 L208 730 L222 780 Z" fill="#9050B0" opacity="0.4" />

        {/* Trees silhouettes - left */}
        <g opacity="0.9">
          <rect x="65" y="628" width="4" height="55" fill="#2A1050" />
          <ellipse cx="67" cy="620" rx="18" ry="22" fill="#2A1050" />
          <rect x="95" y="640" width="3" height="45" fill="#2A1050" />
          <ellipse cx="96" cy="633" rx="14" ry="18" fill="#2A1050" />
        </g>

        {/* Trees silhouettes - right */}
        <g opacity="0.9">
          <rect x="295" y="628" width="4" height="55" fill="#2A1050" />
          <ellipse cx="297" cy="620" rx="18" ry="22" fill="#2A1050" />
          <rect x="318" y="640" width="3" height="45" fill="#2A1050" />
          <ellipse cx="320" cy="633" rx="14" ry="18" fill="#2A1050" />
        </g>

        {/* Giraffe silhouette left */}
        <g transform="translate(120,630)" opacity="0.85">
          <rect x="0" y="20" width="3" height="28" fill="#1A0A30" />
          <rect x="6" y="22" width="3" height="26" fill="#1A0A30" />
          <rect x="12" y="20" width="3" height="28" fill="#1A0A30" />
          <rect x="18" y="22" width="3" height="26" fill="#1A0A30" />
          <rect x="2" y="8" width="18" height="14" rx="2" fill="#1A0A30" />
          <rect x="8" y="-12" width="5" height="22" fill="#1A0A30" />
          <ellipse cx="11" cy="-14" rx="5" ry="5" fill="#1A0A30" />
        </g>

        {/* Giraffe silhouette right */}
        <g transform="translate(250,638)" opacity="0.85">
          <rect x="0" y="16" width="3" height="24" fill="#1A0A30" />
          <rect x="6" y="18" width="3" height="22" fill="#1A0A30" />
          <rect x="12" y="16" width="3" height="24" fill="#1A0A30" />
          <rect x="18" y="18" width="3" height="22" fill="#1A0A30" />
          <rect x="2" y="6" width="18" height="12" rx="2" fill="#1A0A30" />
          <rect x="8" y="-10" width="4" height="18" fill="#1A0A30" />
          <ellipse cx="10" cy="-12" rx="4" ry="4" fill="#1A0A30" />
        </g>

        {/* Atmospheric glow at horizon */}
        <ellipse cx="195" cy="680" rx="200" ry="30" fill="#FF9A3C" opacity="0.2" filter="url(#blur4)" />
      </svg>

      {/* Animated sun pulse */}
      <motion.div
        className="absolute"
        style={{ left: '50%', top: '35%', transform: 'translate(-50%, -50%)' }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-40 h-40 rounded-full bg-amber-400/20 blur-2xl" />
      </motion.div>
    </div>
  );
}
