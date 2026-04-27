interface SchoolhouseProps {
  className?: string;
}

// Palette (kept in sync with index.css crest-led tokens)
const INK = "#0f1f1f";
const PAPER = "#f4efe4";
const PAPER_WARM = "#ebe2d0";
const TEAL_DEEP = "#13494b";
const TEAL_RICH = "#1b6065";
const TEAL_SOFT = "#7da9aa";
const GOLD = "#c89545";
const GOLD_SOFT = "#e0c896";
const GOLD_BRIGHT = "#fcd99c";

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
          <stop offset="0%" stopColor={PAPER_WARM} />
          <stop offset="60%" stopColor={PAPER} />
          <stop offset="100%" stopColor={GOLD_SOFT} />
        </linearGradient>
        <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={TEAL_RICH} />
          <stop offset="100%" stopColor={TEAL_DEEP} />
        </linearGradient>
        <radialGradient id="sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.9" />
          <stop offset="60%" stopColor={GOLD_SOFT} stopOpacity="0.55" />
          <stop offset="100%" stopColor={GOLD_SOFT} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="window" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GOLD_BRIGHT} />
          <stop offset="100%" stopColor={GOLD} />
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="600" height="500" fill="url(#sky)" />

      {/* Sun glow */}
      <circle cx="450" cy="180" r="180" fill="url(#sun)" />
      <circle cx="450" cy="180" r="38" fill={GOLD} opacity="0.85" />

      {/* Distant hill */}
      <path
        d="M0 340 Q120 290 240 320 T480 305 T600 320 L600 500 L0 500 Z"
        fill={TEAL_SOFT}
        opacity="0.6"
      />
      {/* Mid hill */}
      <path
        d="M0 380 Q140 340 280 365 T520 360 T600 370 L600 500 L0 500 Z"
        fill="url(#hill1)"
        opacity="0.9"
      />
      {/* Foreground */}
      <path d="M0 430 Q200 405 400 425 T600 425 L600 500 L0 500 Z" fill={TEAL_DEEP} />

      {/* Trees on left hill */}
      <g opacity="0.75">
        <ellipse cx="80" cy="335" rx="14" ry="22" fill={INK} />
        <rect x="78" y="350" width="4" height="14" fill={INK} />
        <ellipse cx="115" cy="345" rx="11" ry="18" fill={INK} />
        <rect x="113" y="357" width="3" height="10" fill={INK} />
      </g>

      {/* Schoolhouse body */}
      <g>
        {/* Main building */}
        <rect x="200" y="270" width="220" height="140" fill={PAPER} stroke={INK} strokeWidth="2" />
        {/* Roof — antique gold */}
        <polygon points="190,272 310,200 430,272" fill={GOLD} stroke={INK} strokeWidth="2" />
        <polygon points="190,272 310,200 310,272" fill={INK} opacity="0.12" />

        {/* Bell tower */}
        <rect x="290" y="160" width="40" height="50" fill={PAPER} stroke={INK} strokeWidth="2" />
        <polygon points="285,162 310,135 335,162" fill={TEAL_DEEP} stroke={INK} strokeWidth="2" />
        <rect x="306" y="125" width="8" height="12" fill={INK} />
        <rect x="304" y="120" width="12" height="3" fill={GOLD} />
        {/* Bell window */}
        <rect x="302" y="178" width="16" height="20" fill="url(#window)" rx="6" />

        {/* Chimney */}
        <rect x="380" y="215" width="18" height="35" fill={INK} />
        <rect x="378" y="213" width="22" height="6" fill={INK} />

        {/* Door */}
        <rect x="293" y="340" width="34" height="70" fill={TEAL_DEEP} stroke={INK} strokeWidth="2" />
        <circle cx="320" cy="376" r="2" fill={GOLD} />
        {/* Step */}
        <rect x="285" y="408" width="50" height="6" fill={INK} opacity="0.5" />

        {/* Windows */}
        {[230, 360].map((x) => (
          <g key={x}>
            <rect x={x} y="295" width="36" height="44" fill="url(#window)" stroke={INK} strokeWidth="2" />
            <line x1={x + 18} y1="295" x2={x + 18} y2="339" stroke={INK} strokeWidth="1.2" />
            <line x1={x} y1="317" x2={x + 36} y2="317" stroke={INK} strokeWidth="1.2" />
          </g>
        ))}

        {/* Crest above the door — replaces the old "Holy Cross" sign */}
        <image
          href="/firoda-crest.png"
          x="292"
          y="232"
          width="36"
          height="36"
          preserveAspectRatio="xMidYMid meet"
        />
      </g>

      {/* Foreground trees */}
      <g>
        <ellipse cx="120" cy="395" rx="28" ry="40" fill={INK} />
        <rect x="116" y="420" width="8" height="22" fill={INK} />
        <ellipse cx="510" cy="390" rx="32" ry="44" fill={INK} />
        <rect x="506" y="418" width="8" height="26" fill={INK} />
      </g>

      {/* Path */}
      <path
        d="M310 410 Q300 440 280 470 L340 470 Q320 440 310 410"
        fill={PAPER_WARM}
        opacity="0.7"
      />

      {/* Birds */}
      <g stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round">
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
          <stop offset="0%" stopColor={PAPER_WARM} />
          <stop offset="100%" stopColor={GOLD_SOFT} />
        </linearGradient>
        <radialGradient id="lamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GOLD_BRIGHT} stopOpacity="0.95" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="500" fill="url(#wall)" />
      {/* Floor */}
      <rect x="0" y="370" width="600" height="130" fill={TEAL_DEEP} opacity="0.9" />
      {/* Window */}
      <rect x="60" y="80" width="160" height="180" fill={PAPER} stroke={INK} strokeWidth="3" />
      <line x1="140" y1="80" x2="140" y2="260" stroke={INK} strokeWidth="2" />
      <line x1="60" y1="170" x2="220" y2="170" stroke={INK} strokeWidth="2" />
      <rect x="60" y="80" width="160" height="180" fill={GOLD_BRIGHT} opacity="0.35" />
      {/* Lamp glow */}
      <circle cx="430" cy="200" r="140" fill="url(#lamp)" />
      {/* Lamp */}
      <line x1="430" y1="60" x2="430" y2="160" stroke={INK} strokeWidth="2" />
      <path d="M395 160 Q430 230 465 160 Z" fill={GOLD} stroke={INK} strokeWidth="2" />
      {/* Bookshelf */}
      <rect x="260" y="200" width="180" height="170" fill={TEAL_DEEP} stroke={INK} strokeWidth="2" />
      {[210, 240, 270, 300, 330].map((y) => (
        <line key={y} x1="260" y1={y} x2="440" y2={y} stroke={INK} strokeWidth="1.5" />
      ))}
      {[
        [GOLD, 270, 213, 12, 25],
        [GOLD_BRIGHT, 285, 213, 12, 25],
        [GOLD_SOFT, 300, 215, 10, 23],
        [INK, 315, 213, 14, 25],
        [GOLD, 332, 218, 12, 20],
        [GOLD_BRIGHT, 270, 245, 10, 22],
        [GOLD_SOFT, 283, 243, 12, 24],
        [GOLD, 298, 245, 10, 22],
        [INK, 312, 243, 12, 24],
      ].map(([c, x, y, w, h], i) => (
        <rect key={i} x={x as number} y={y as number} width={w as number} height={h as number} fill={c as string} />
      ))}
      {/* Cushion stack */}
      <ellipse cx="490" cy="380" rx="80" ry="20" fill={INK} opacity="0.4" />
      <rect x="430" y="335" width="120" height="40" rx="14" fill={GOLD} stroke={INK} strokeWidth="2" />
      <rect x="445" y="305" width="100" height="34" rx="12" fill={GOLD_BRIGHT} stroke={INK} strokeWidth="2" />
      <rect x="460" y="280" width="80" height="28" rx="10" fill={GOLD_SOFT} stroke={INK} strokeWidth="2" />
      {/* Mug with steam */}
      <path d="M150 360 Q145 405 175 410 L210 410 Q240 405 235 360 Z" fill={PAPER} stroke={INK} strokeWidth="2" />
      <path d="M235 370 Q260 375 258 390 Q256 402 235 400" fill="none" stroke={INK} strokeWidth="2" />
      <path d="M170 345 q4 -10 0 -20 q-4 -10 0 -20" stroke={INK} strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M195 340 q4 -10 0 -20" stroke={INK} strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
    </svg>
  );
}
