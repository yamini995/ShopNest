import React from 'react';

interface ProductVisualProps {
  type: string;
  themeColor?: string;
  className?: string;
  aspectRatio?: 'square' | 'wide' | 'auto';
  altText?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  type,
  className = 'w-full h-full',
}) => {
  const renderGraphic = () => {
    switch (type) {
      case 'headphones':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            <defs>
              <linearGradient id="bandGrad" x1="40" y1="30" x2="200" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#334155" />
                <stop offset="0.5" stopColor="#0f172a" />
                <stop offset="1" stopColor="#334155" />
              </linearGradient>
              <radialGradient id="cupGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(60 120) scale(40)">
                <stop stopColor="#475569" />
                <stop offset="0.7" stopColor="#1e293b" />
                <stop offset="1" stopColor="#0f172a" />
              </radialGradient>
              <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#e2e8f0" />
                <stop offset="0.5" stopColor="#94a3b8" />
                <stop offset="1" stopColor="#475569" />
              </linearGradient>
            </defs>
            {/* Cushion headband */}
            <path d="M50 115 C 45 45, 195 45, 190 115" stroke="url(#bandGrad)" strokeWidth="18" strokeLinecap="round" />
            <path d="M70 100 C 65 55, 175 55, 170 100" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
            {/* Metal extension stems */}
            <rect x="42" y="105" width="8" height="28" rx="3" fill="url(#metal)" />
            <rect x="190" y="105" width="8" height="28" rx="3" fill="url(#metal)" />
            {/* Left Ear cup */}
            <g transform="translate(18, 105)">
              <ellipse cx="30" cy="35" rx="22" ry="32" fill="#090d16" />
              <ellipse cx="30" cy="35" rx="17" ry="26" fill="url(#cupGrad)" stroke="#334155" strokeWidth="2" />
              <circle cx="30" cy="35" r="7" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
            </g>
            {/* Right Ear cup */}
            <g transform="translate(162, 105)">
              <ellipse cx="30" cy="35" rx="22" ry="32" fill="#090d16" />
              <ellipse cx="30" cy="35" rx="17" ry="26" fill="url(#cupGrad)" stroke="#334155" strokeWidth="2" />
              <circle cx="30" cy="35" r="7" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
            </g>
            {/* Subtle glow / shadow */}
            <ellipse cx="120" cy="184" rx="75" ry="8" fill="#cbd5e1" opacity="0.35" />
          </svg>
        );

      case 'smartwatch':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            <defs>
              <linearGradient id="watchStrap" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#334155" />
                <stop offset="0.5" stopColor="#1e293b" />
                <stop offset="1" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="titaniumBezel" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#cbd5e1" />
                <stop offset="0.3" stopColor="#64748b" />
                <stop offset="0.7" stopColor="#94a3b8" />
                <stop offset="1" stopColor="#334155" />
              </linearGradient>
            </defs>
            {/* Straps */}
            <path d="M96 15 L144 15 L140 68 L100 68 Z" fill="url(#watchStrap)" rx="4" />
            <path d="M100 132 L140 132 L144 185 L96 185 Z" fill="url(#watchStrap)" rx="4" />
            {/* Titanium Body */}
            <circle cx="120" cy="100" r="48" fill="url(#titaniumBezel)" />
            {/* Bezel Ring */}
            <circle cx="120" cy="100" r="43" fill="#090d16" stroke="#475569" strokeWidth="1.5" />
            {/* Screen UI */}
            <circle cx="120" cy="100" r="38" fill="#020617" />
            {/* Watch Face Telemetry */}
            <circle cx="120" cy="100" r="32" stroke="#10b981" strokeWidth="2.5" strokeDasharray="140 50" strokeLinecap="round" />
            <circle cx="120" cy="100" r="26" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="100 40" strokeLinecap="round" />
            <text x="120" y="96" fill="#ffffff" fontSize="15" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">10:42</text>
            <text x="120" y="112" fill="#10b981" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">138 BPM · 8.4 KM</text>
            {/* Titanium Crown button */}
            <rect x="166" y="93" width="6" height="14" rx="2" fill="#94a3b8" stroke="#334155" strokeWidth="1" />
            {/* Base shadow */}
            <ellipse cx="120" cy="186" rx="60" ry="7" fill="#cbd5e1" opacity="0.3" />
          </svg>
        );

      case 'keyboard':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            <defs>
              <linearGradient id="kbBody" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#334155" />
                <stop offset="1" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            {/* Chassis base */}
            <rect x="25" y="60" width="190" height="96" rx="8" fill="url(#kbBody)" stroke="#475569" strokeWidth="2" />
            {/* Top row */}
            <g fill="#1e293b" stroke="#334155" strokeWidth="1">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                <rect key={`r1-${i}`} x={34 + i * 14.2} y={70} width="11" height="10" rx="2" />
              ))}
            </g>
            {/* Alpha rows */}
            <g fill="#0f172a" stroke="#475569" strokeWidth="1">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                <rect key={`r2-${i}`} x={34 + i * 14.2} y={84} width="11" height="11" rx="2" />
              ))}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                <rect key={`r3-${i}`} x={34 + i * 14.2} y={99} width="11" height="11" rx="2" fill={i === 0 || i === 11 ? '#047857' : '#0f172a'} />
              ))}
            </g>
            {/* Spacebar row */}
            <g fill="#1e293b" stroke="#475569" strokeWidth="1">
              <rect x="34" y="114" width="22" height="12" rx="2" fill="#047857" />
              <rect x="60" y="114" width="16" height="12" rx="2" />
              <rect x="80" y="114" width="70" height="12" rx="3" fill="#f8fafc" stroke="#94a3b8" />
              <rect x="154" y="114" width="18" height="12" rx="2" fill="#047857" />
              <rect x="176" y="114" width="14" height="12" rx="2" />
              <rect x="194" y="114" width="14" height="12" rx="2" />
            </g>
            {/* Ambient desk back glow */}
            <line x1="30" y1="158" x2="210" y2="158" stroke="#10b981" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
            <ellipse cx="120" cy="175" rx="85" ry="8" fill="#cbd5e1" opacity="0.35" />
          </svg>
        );

      case 'projector':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            {/* Projector chassis */}
            <rect x="35" y="70" width="170" height="70" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            {/* Laser projection recess */}
            <rect x="50" y="75" width="60" height="24" rx="4" fill="#020617" />
            <circle cx="80" cy="87" r="9" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="80" cy="87" r="4" fill="#ffffff" />
            {/* Speaker mesh grille */}
            <g fill="#334155">
              {[0, 1, 2, 3, 4, 5].map((c) => (
                <rect key={c} x={125 + c * 11} y={76} width="6" height="58" rx="2" />
              ))}
            </g>
            {/* Laser beam cone */}
            <polygon points="80,78 10,25 150,25" fill="#38bdf8" opacity="0.12" />
            <ellipse cx="120" cy="165" rx="75" ry="8" fill="#cbd5e1" opacity="0.35" />
          </svg>
        );

      case 'bottle':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            <defs>
              <linearGradient id="bottleBody" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#3f6212" />
                <stop offset="0.3" stopColor="#65a30d" />
                <stop offset="0.7" stopColor="#4d7c0f" />
                <stop offset="1" stopColor="#365314" />
              </linearGradient>
              <linearGradient id="capWood" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#92400e" />
                <stop offset="0.5" stopColor="#b45309" />
                <stop offset="1" stopColor="#78350f" />
              </linearGradient>
            </defs>
            {/* Steel loop */}
            <path d="M110 32 C 110 18, 130 18, 130 32" stroke="#94a3b8" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Wooden Cap */}
            <rect x="105" y="32" width="30" height="18" rx="3" fill="url(#capWood)" stroke="#5f2d07" strokeWidth="1" />
            {/* Steel neck collar */}
            <rect x="108" y="50" width="24" height="6" fill="#cbd5e1" />
            {/* Main Flask Body */}
            <path d="M108 56 L96 74 C 94 77, 92 84, 92 90 L92 162 C 92 168, 96 172, 102 172 L138 172 C 144 172, 148 168, 148 162 L148 90 C 148 84, 146 77, 144 74 L132 56 Z" fill="url(#bottleBody)" stroke="#365314" strokeWidth="1.5" />
            {/* Grip line / logo */}
            <line x1="102" y1="120" x2="138" y2="120" stroke="#bef264" strokeWidth="1.5" opacity="0.6" strokeDasharray="4 3" />
            <ellipse cx="120" cy="182" rx="35" ry="6" fill="#cbd5e1" opacity="0.4" />
          </svg>
        );

      case 'mouse':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            <defs>
              <linearGradient id="mouseBody" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#334155" />
                <stop offset="0.6" stopColor="#1e293b" />
                <stop offset="1" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            {/* Ergonomic thumb wing */}
            <path d="M78 120 C 70 125, 66 142, 85 152 C 95 155, 110 155, 120 155" fill="#1e293b" />
            {/* Contoured Mouse Body */}
            <path d="M90 60 C 90 35, 150 35, 150 60 L155 125 C 155 152, 85 152, 85 125 Z" fill="url(#mouseBody)" stroke="#475569" strokeWidth="1.5" />
            {/* Button divider seam */}
            <line x1="120" y1="40" x2="120" y2="88" stroke="#090d16" strokeWidth="2" />
            {/* MagSpeed Metal Scroll Wheel */}
            <rect x="115" y="52" width="10" height="24" rx="4" fill="#94a3b8" stroke="#334155" strokeWidth="1" />
            <line x1="115" y1="60" x2="125" y2="60" stroke="#475569" />
            <line x1="115" y1="66" x2="125" y2="66" stroke="#475569" />
            <line x1="115" y1="72" x2="125" y2="72" stroke="#475569" />
            {/* Thumb scroll */}
            <rect x="76" y="98" width="6" height="16" rx="2" fill="#94a3b8" />
            <ellipse cx="120" cy="172" rx="50" ry="7" fill="#cbd5e1" opacity="0.35" />
          </svg>
        );

      case 'speaker':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            <defs>
              <linearGradient id="spkBody" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#1e293b" />
                <stop offset="0.5" stopColor="#334155" />
                <stop offset="1" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            {/* Cylinder acoustic shell */}
            <path d="M85 60 C 85 45, 155 45, 155 60 L155 150 C 155 165, 85 165, 85 150 Z" fill="url(#spkBody)" stroke="#475569" strokeWidth="2" />
            {/* Top touch circle */}
            <ellipse cx="120" cy="60" rx="35" ry="12" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
            {/* LED Status Ring */}
            <ellipse cx="120" cy="60" rx="28" ry="9" stroke="#38bdf8" strokeWidth="2" strokeDasharray="25 8" />
            {/* Fabric texture lines */}
            <line x1="90" y1="80" x2="150" y2="80" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="88" y1="100" x2="152" y2="100" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="88" y1="120" x2="152" y2="120" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="90" y1="140" x2="150" y2="140" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            <ellipse cx="120" cy="172" rx="45" ry="6" fill="#cbd5e1" opacity="0.35" />
          </svg>
        );

      case 'charger':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            <rect x="75" y="45" width="90" height="105" rx="10" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
            {/* Port indicators */}
            <g fill="#27272a" stroke="#52525b" strokeWidth="1">
              <rect x="90" y="60" width="60" height="12" rx="3" />
              <rect x="90" y="78" width="60" height="12" rx="3" />
              <rect x="90" y="96" width="60" height="12" rx="3" />
              <rect x="90" y="116" width="60" height="14" rx="2" fill="#09090b" stroke="#ea580c" />
            </g>
            <circle cx="140" cy="123" r="2.5" fill="#ea580c" />
            <text x="120" y="142" fill="#a1a1aa" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="monospace">140W GaN</text>
            <ellipse cx="120" cy="168" rx="55" ry="6" fill="#cbd5e1" opacity="0.35" />
          </svg>
        );

      case 'fitness-band':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            <path d="M106 20 C 106 15, 134 15, 134 20 L134 180 C 134 185, 106 185, 106 180 Z" fill="#1e293b" />
            <rect x="102" y="55" width="36" height="85" rx="18" fill="#020617" stroke="#334155" strokeWidth="2" />
            <rect x="106" y="65" width="28" height="65" rx="8" fill="#090d16" />
            <text x="120" y="85" fill="#ffffff" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">08:24</text>
            <path d="M110 102 L114 102 L117 96 L121 108 L124 100 L130 100" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="120" y="120" fill="#10b981" fontSize="8" fontWeight="600" textAnchor="middle">74 bpm</text>
            <ellipse cx="120" cy="186" rx="40" ry="5" fill="#cbd5e1" opacity="0.35" />
          </svg>
        );

      case 'diffuser':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            {/* Gentle steam plume */}
            <path d="M120 45 C 115 35, 125 25, 120 15" stroke="#94a3b8" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
            <path d="M124 45 C 130 38, 122 28, 126 20" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
            {/* Ceramic tapered cone */}
            <path d="M116 50 L124 50 L158 145 C 160 152, 155 158, 146 158 L94 158 C 85 158, 80 152, 82 145 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            {/* Warm light halo ring */}
            <rect x="90" y="152" width="60" height="4" rx="2" fill="#fbbf24" opacity="0.8" />
            {/* Natural wood base */}
            <rect x="88" y="156" width="64" height="12" rx="3" fill="#78350f" stroke="#451a03" strokeWidth="1" />
            <ellipse cx="120" cy="178" rx="48" ry="6" fill="#cbd5e1" opacity="0.35" />
          </svg>
        );

      case 'monitor':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            {/* Screen Panel */}
            <rect x="25" y="30" width="190" height="115" rx="4" fill="#090d16" stroke="#475569" strokeWidth="2" />
            {/* Studio screen wallpaper */}
            <rect x="29" y="34" width="182" height="107" rx="2" fill="#0f172a" />
            <path d="M30 110 C 80 80, 140 130, 210 90 L210 140 L30 140 Z" fill="#0284c7" opacity="0.7" />
            <path d="M30 120 C 90 95, 150 140, 210 105 L210 140 L30 140 Z" fill="#38bdf8" opacity="0.5" />
            {/* Metallic Aluminum stand */}
            <rect x="114" y="145" width="12" height="24" fill="#cbd5e1" />
            <ellipse cx="120" cy="172" rx="42" ry="6" fill="#94a3b8" stroke="#64748b" strokeWidth="1" />
          </svg>
        );

      case 'lamp':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            {/* Shade */}
            <path d="M95 45 L145 45 L160 85 L80 85 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            {/* Warm glow */}
            <polygon points="80,85 160,85 185,155 55,155" fill="#fef08a" opacity="0.15" />
            {/* Brass stem */}
            <line x1="120" y1="85" x2="120" y2="155" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
            {/* Wireless charge base */}
            <ellipse cx="120" cy="160" rx="42" ry="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="120" cy="160" r="14" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 3" />
            <ellipse cx="120" cy="176" rx="48" ry="6" fill="#cbd5e1" opacity="0.35" />
          </svg>
        );

      case 'backpack':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            {/* Top handle */}
            <path d="M105 40 C 105 28, 135 28, 135 40" stroke="#0f172a" strokeWidth="5" fill="none" />
            {/* Pack Body */}
            <path d="M85 45 C 85 40, 155 40, 155 45 L162 160 C 162 168, 155 174, 145 174 L95 174 C 85 174, 78 168, 78 160 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            {/* Front Organizer Pocket */}
            <rect x="90" y="85" width="60" height="75" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            {/* AquaGuard Zip seam */}
            <line x1="90" y1="102" x2="150" y2="102" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />
            {/* Compression buckle straps */}
            <rect x="74" y="90" width="8" height="16" rx="2" fill="#475569" />
            <rect x="158" y="90" width="8" height="16" rx="2" fill="#475569" />
            <ellipse cx="120" cy="180" rx="55" ry="6" fill="#cbd5e1" opacity="0.35" />
          </svg>
        );

      case 'earbuds':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            {/* Capsule Case Open */}
            <rect x="65" y="70" width="110" height="80" rx="28" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
            {/* Left earbud in cradle */}
            <circle cx="95" cy="100" r="16" fill="#27272a" stroke="#0284c7" strokeWidth="2" />
            <circle cx="95" cy="100" r="8" fill="#09090b" />
            {/* Right earbud in cradle */}
            <circle cx="145" cy="100" r="16" fill="#27272a" stroke="#0284c7" strokeWidth="2" />
            <circle cx="145" cy="100" r="8" fill="#09090b" />
            {/* Status LED */}
            <circle cx="120" cy="135" r="2.5" fill="#10b981" />
            <ellipse cx="120" cy="165" rx="65" ry="6" fill="#cbd5e1" opacity="0.35" />
          </svg>
        );

      case 'webcam':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            {/* Horizontal Camera Bar */}
            <rect x="45" y="75" width="150" height="42" rx="21" fill="#18181b" stroke="#334155" strokeWidth="2" />
            {/* Sony Glass Optical Lens */}
            <circle cx="120" cy="96" r="18" fill="#020617" stroke="#475569" strokeWidth="2" />
            <circle cx="120" cy="96" r="12" fill="#0369a1" />
            <circle cx="122" cy="94" r="4" fill="#ffffff" opacity="0.8" />
            {/* Dual Mics */}
            <circle cx="65" cy="96" r="2.5" fill="#475569" />
            <circle cx="175" cy="96" r="2.5" fill="#475569" />
            {/* Universal clamp mount */}
            <rect x="114" y="117" width="12" height="24" fill="#334155" />
            <path d="M95 141 L145 141 L150 162 L90 162 Z" fill="#1e293b" />
            <ellipse cx="120" cy="172" rx="45" ry="6" fill="#cbd5e1" opacity="0.35" />
          </svg>
        );

      case 'glasses':
        return (
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-h-56 drop-shadow-md">
            {/* Titanium bridge */}
            <path d="M106 90 Q 120 84 134 90" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />
            <path d="M104 82 L 136 82" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Left Teardrop Lens */}
            <path d="M52 86 C 52 74, 98 74, 102 86 C 104 105, 96 130, 78 130 C 58 130, 52 108, 52 86 Z" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
            {/* Right Teardrop Lens */}
            <path d="M138 86 C 142 74, 188 74, 188 86 C 188 108, 182 130, 162 130 C 144 130, 136 105, 138 86 Z" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
            {/* Temples */}
            <line x1="52" y1="86" x2="30" y2="76" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <line x1="188" y1="86" x2="210" y2="76" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="120" cy="155" rx="70" ry="7" fill="#cbd5e1" opacity="0.35" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-400">
            <svg viewBox="0 0 24 24" className="w-16 h-16 stroke-current fill-none stroke-1">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-slate-50/80 transition-transform duration-200 group-hover:scale-[1.02] ${className}`}>
      {renderGraphic()}
    </div>
  );
};
