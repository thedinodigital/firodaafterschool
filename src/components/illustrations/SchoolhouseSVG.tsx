interface SchoolhouseProps {
  className?: string;
}

export function SchoolhouseSVG({ className }: SchoolhouseProps) {
  return (
    <svg
      viewBox="0 0 600 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Illustration of Holy Cross National School at dusk"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ebe2d0" />
          <stop offset="60%" stopColor="#f4efe4" />
          <stop offset="100%" stopColor="#e8c4b0" />
        </linearGradient>
        <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d4a3a" />
          <stop offset="100%" stopColor="#1e3428" />
        </linearGradient>
        <radialGradient id="sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4a853" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#c67b5c" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c67b5c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="window" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fcd99c" />
          <stop offset="100%" stopColor="#d4a853" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="600" height="500" fill="url(#sky)" />

      {/* Sun glow */}
      <circle cx="450" cy="180" r="180" fill="url(#sun)" />
      <circle cx="450" cy="180" r="38" fill="#d4a853" opacity="0.85" />

      {/* Distant hill */}
      <path
        d="M0 340 Q120 290 240 320 T480 305 T600 320 L600 500 L0 500 Z"
        fill="#2d4a3a"
        opacity="0.55"
      />
      {/* Mid hill */}
      <path
        d="M0 380 Q140 340 280 365 T520 360 T600 370 L600 500 L0 500 Z"
        fill="url(#hill1)"
        opacity="0.85"
      />
      {/* Foreground */}
      <path d="M0 430 Q200 405 400 425 T600 425 L600 500 L0 500 Z" fill="#1e3428" />

      {/* Trees on left hill */}
      <g opacity="0.75">
        <ellipse cx="80" cy="335" rx="14" ry="22" fill="#1a2820" />
        <rect x="78" y="350" width="4" height="14" fill="#1a2820" />
        <ellipse cx="115" cy="345" rx="11" ry="18" fill="#1a2820" />
        <rect x="113" y="357" width="3" height="10" fill="#1a2820" />
      </g>

      {/* Schoolhouse body */}
      <g>
        {/* Main building */}
        <rect x="200" y="270" width="220" height="140" fill="#f4efe4" stroke="#1a2820" strokeWidth="2" />
        {/* Roof */}
        <polygon points="190,272 310,200 430,272" fill="#c67b5c" stroke="#1a2820" strokeWidth="2" />
        <polygon points="190,272 310,200 310,272" fill="#1a2820" opacity="0.12" />

        {/* Bell tower */}
        <rect x="290" y="160" width="40" height="50" fill="#f4efe4" stroke="#1a2820" strokeWidth="2" />
        <polygon points="285,162 310,135 335,162" fill="#2d4a3a" stroke="#1a2820" strokeWidth="2" />
        <rect x="306" y="125" width="8" height="12" fill="#1a2820" />
        <rect x="304" y="120" width="12" height="3" fill="#c67b5c" />
        {/* Bell window */}
        <rect x="302" y="178" width="16" height="20" fill="url(#window)" rx="6" />

        {/* Chimney */}
        <rect x="380" y="215" width="18" height="35" fill="#1a2820" />
        <rect x="378" y="213" width="22" height="6" fill="#1a2820" />

        {/* Door */}
        <rect x="293" y="340" width="34" height="70" fill="#2d4a3a" stroke="#1a2820" strokeWidth="2" />
        <circle cx="320" cy="376" r="2" fill="#d4a853" />
        {/* Step */}
        <rect x="285" y="408" width="50" height="6" fill="#1a2820" opacity="0.5" />

        {/* Windows */}
        {[230, 360].map((x) => (
          <g key={x}>
            <rect x={x} y="295" width="36" height="44" fill="url(#window)" stroke="#1a2820" strokeWidth="2" />
            <line x1={x + 18} y1="295" x2={x + 18} y2="339" stroke="#1a2820" strokeWidth="1.2" />
            <line x1={x} y1="317" x2={x + 36} y2="317" stroke="#1a2820" strokeWidth="1.2" />
          </g>
        ))}

        {/* Sign */}
        <rect x="265" y="245" width="90" height="18" fill="#1e3428" rx="2" />
        <text x="310" y="258" textAnchor="middle" fill="#f4efe4" fontFamily="Fraunces, serif" fontSize="11" fontStyle="italic">
          Holy Cross
        </text>
      </g>

      {/* Foreground trees */}
      <g>
        <ellipse cx="120" cy="395" rx="28" ry="40" fill="#1a2820" />
        <rect x="116" y="420" width="8" height="22" fill="#1a2820" />
        <ellipse cx="510" cy="390" rx="32" ry="44" fill="#1a2820" />
        <rect x="506" y="418" width="8" height="26" fill="#1a2820" />
      </g>

      {/* Path */}
      <path
        d="M310 410 Q300 440 280 470 L340 470 Q320 440 310 410"
        fill="#ebe2d0"
        opacity="0.7"
      />

      {/* Birds */}
      <g stroke="#1a2820" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M120 140 q6 -6 12 0 q6 -6 12 0" />
        <path d="M170 165 q5 -5 10 0 q5 -5 10 0" opacity="0.7" />
      </g>
    </svg>
  );
}

export function AfterSchoolSceneSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="A warm indoor scene: cushions, books, and evening light"
    >
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ebe2d0" />
          <stop offset="100%" stopColor="#e8c4b0" />
        </linearGradient>
        <radialGradient id="lamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fcd99c" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#d4a853" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="500" fill="url(#wall)" />
      {/* Floor */}
      <rect x="0" y="370" width="600" height="130" fill="#1e3428" opacity="0.85" />
      {/* Window */}
      <rect x="60" y="80" width="160" height="180" fill="#f4efe4" stroke="#1a2820" strokeWidth="3" />
      <line x1="140" y1="80" x2="140" y2="260" stroke="#1a2820" strokeWidth="2" />
      <line x1="60" y1="170" x2="220" y2="170" stroke="#1a2820" strokeWidth="2" />
      <rect x="60" y="80" width="160" height="180" fill="#fcd99c" opacity="0.35" />
      {/* Lamp glow */}
      <circle cx="430" cy="200" r="140" fill="url(#lamp)" />
      {/* Lamp */}
      <line x1="430" y1="60" x2="430" y2="160" stroke="#1a2820" strokeWidth="2" />
      <path d="M395 160 Q430 230 465 160 Z" fill="#c67b5c" stroke="#1a2820" strokeWidth="2" />
      {/* Bookshelf */}
      <rect x="260" y="200" width="180" height="170" fill="#2d4a3a" stroke="#1a2820" strokeWidth="2" />
      {[210, 240, 270, 300, 330].map((y) => (
        <line key={y} x1="260" y1={y} x2="440" y2={y} stroke="#1a2820" strokeWidth="1.5" />
      ))}
      {[
        ["#c67b5c", 270, 213, 12, 25],
        ["#d4a853", 285, 213, 12, 25],
        ["#e8c4b0", 300, 215, 10, 23],
        ["#1a2820", 315, 213, 14, 25],
        ["#c67b5c", 332, 218, 12, 20],
        ["#d4a853", 270, 245, 10, 22],
        ["#e8c4b0", 283, 243, 12, 24],
        ["#c67b5c", 298, 245, 10, 22],
        ["#1a2820", 312, 243, 12, 24],
      ].map(([c, x, y, w, h], i) => (
        <rect key={i} x={x as number} y={y as number} width={w as number} height={h as number} fill={c as string} />
      ))}
      {/* Cushion stack */}
      <ellipse cx="490" cy="380" rx="80" ry="20" fill="#1a2820" opacity="0.4" />
      <rect x="430" y="335" width="120" height="40" rx="14" fill="#c67b5c" stroke="#1a2820" strokeWidth="2" />
      <rect x="445" y="305" width="100" height="34" rx="12" fill="#d4a853" stroke="#1a2820" strokeWidth="2" />
      <rect x="460" y="280" width="80" height="28" rx="10" fill="#e8c4b0" stroke="#1a2820" strokeWidth="2" />
      {/* Mug with steam */}
      <path d="M150 360 Q145 405 175 410 L210 410 Q240 405 235 360 Z" fill="#f4efe4" stroke="#1a2820" strokeWidth="2" />
      <path d="M235 370 Q260 375 258 390 Q256 402 235 400" fill="none" stroke="#1a2820" strokeWidth="2" />
      <path d="M170 345 q4 -10 0 -20 q-4 -10 0 -20" stroke="#1a2820" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M195 340 q4 -10 0 -20" stroke="#1a2820" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
    </svg>
  );
}
