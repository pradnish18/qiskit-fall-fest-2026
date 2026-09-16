import React from 'react';

interface LogoProps {
  isDarkTheme?: boolean;
  className?: string;
}

/**
 * 1. SRM University-AP Official Logo
 * Faithfully matches user uploaded Image 1 (reverse/white) and Image 2 (positive/dark).
 * Features the signature Kalpavriksha tree medallion with radiating rays, 
 * "SRM" high-contrast serif logotype, "UNIVERSITY AP", and "Andhra Pradesh".
 */
export const SrmApLogo: React.FC<LogoProps> = ({ isDarkTheme = false, className = 'h-12' }) => {
  const textColor = isDarkTheme ? '#F5F3F0' : '#2A2E1A';
  const subTextColor = isDarkTheme ? '#D6D5CF' : '#3E4424';
  const sealGold = '#9E7A2A';
  const sealOlive = '#485223';
  const innerBg = isDarkTheme ? '#1E2018' : '#F7F6F0';

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Medallion Seal */}
      <svg
        viewBox="0 0 120 120"
        className="h-full aspect-square shrink-0 drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="SRM University AP Seal"
      >
        {/* Outer perimeter rim */}
        <circle cx="60" cy="60" r="58" fill={sealOlive} />
        <circle cx="60" cy="60" r="56" fill="none" stroke="#FAF8F5" strokeWidth="0.8" opacity="0.4" />

        {/* Concentric sunburst / radiating ray rim */}
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i * 360) / 48;
          const rad = (angle * Math.PI) / 180;
          const x1 = 60 + Math.cos(rad) * 49;
          const y1 = 60 + Math.sin(rad) * 49;
          const x2 = 60 + Math.cos(rad) * 55;
          const y2 = 60 + Math.sin(rad) * 55;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#D4AF37"
              strokeWidth="0.75"
              opacity="0.65"
            />
          );
        })}

        {/* Inner ring for text path */}
        <circle cx="60" cy="60" r="49" fill={sealOlive} />
        <circle cx="60" cy="60" r="48" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeDasharray="1.5 1" opacity="0.5" />

        {/* Top Arc Text: SRM UNIVERSITY */}
        <path id="srm-top-arc" d="M 22 60 A 38 38 0 0 1 98 60" fill="none" />
        <text
          fill="#FAF8F5"
          fontSize="7.8"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          letterSpacing="0.14em"
        >
          <textPath href="#srm-top-arc" startOffset="50%" textAnchor="middle">
            SRM UNIVERSITY
          </textPath>
        </text>

        {/* Bottom Arc Text: AP */}
        <path id="srm-bottom-arc" d="M 94 60 A 34 34 0 0 1 26 60" fill="none" />
        <text
          fill="#FAF8F5"
          fontSize="7.5"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          letterSpacing="0.22em"
        >
          <textPath href="#srm-bottom-arc" startOffset="50%" textAnchor="middle">
            AP
          </textPath>
        </text>

        {/* Inner Ivory Core containing Kalpavriksha Tree */}
        <circle cx="60" cy="60" r="33" fill={innerBg} stroke={sealOlive} strokeWidth="1" />

        {/* Kalpavriksha Tree of Wisdom */}
        <g id="srm-tree">
          {/* Trunk & Main Stem */}
          <path
            d="M57.5 76 L62.5 76 C62 67 65 60 67 56 C61 56 61 63 60 67 C59 63 59 56 53 56 C55 60 58 67 57.5 76 Z"
            fill={sealOlive}
          />
          {/* Main Branches */}
          <path
            d="M60 64 C56 59 47 57 41 53 C46 51 54 53 58 58 Z"
            fill={sealOlive}
          />
          <path
            d="M60 64 C64 59 73 57 79 53 C74 51 66 53 62 58 Z"
            fill={sealOlive}
          />
          <path
            d="M60 56 C57 50 51 45 46 41 C51 40 57 43 60 48 Z"
            fill={sealOlive}
          />
          <path
            d="M60 56 C63 50 69 45 74 41 C69 40 63 43 60 48 Z"
            fill={sealOlive}
          />
          <path
            d="M59.5 50 C59.5 44 59 38 60 34 C61 38 60.5 44 60.5 50 Z"
            fill={sealOlive}
          />

          {/* Foliage Canopy Leaves (Combination of Olive & Gold Leaves) */}
          {/* Left clusters */}
          <ellipse cx="43" cy="51" rx="2.5" ry="4" transform="rotate(-40 43 51)" fill={sealOlive} />
          <ellipse cx="38" cy="46" rx="2.4" ry="3.8" transform="rotate(-30 38 46)" fill={sealGold} />
          <ellipse cx="45" cy="45" rx="2.4" ry="4" transform="rotate(-15 45 45)" fill={sealOlive} />
          <ellipse cx="41" cy="40" rx="2.2" ry="3.6" transform="rotate(-25 41 40)" fill={sealOlive} />
          <ellipse cx="48" cy="38" rx="2.4" ry="3.8" transform="rotate(-10 48 38)" fill={sealGold} />
          <ellipse cx="36" cy="53" rx="2" ry="3.2" transform="rotate(-65 36 53)" fill={sealOlive} />

          {/* Center clusters */}
          <ellipse cx="53" cy="34" rx="2.3" ry="3.8" transform="rotate(-5 53 34)" fill={sealOlive} />
          <ellipse cx="60" cy="31" rx="2.5" ry="4" fill={sealOlive} />
          <ellipse cx="60" cy="37" rx="2.2" ry="3.6" fill={sealGold} />
          <ellipse cx="55" cy="42" rx="2.4" ry="3.8" transform="rotate(10 55 42)" fill={sealOlive} />
          <ellipse cx="65" cy="42" rx="2.4" ry="3.8" transform="rotate(-10 65 42)" fill={sealOlive} />
          <ellipse cx="67" cy="34" rx="2.3" ry="3.8" transform="rotate(5 67 34)" fill={sealOlive} />

          {/* Right clusters */}
          <ellipse cx="72" cy="38" rx="2.4" ry="3.8" transform="rotate(10 72 38)" fill={sealGold} />
          <ellipse cx="79" cy="40" rx="2.2" ry="3.6" transform="rotate(25 79 40)" fill={sealOlive} />
          <ellipse cx="75" cy="45" rx="2.4" ry="4" transform="rotate(15 75 45)" fill={sealOlive} />
          <ellipse cx="82" cy="46" rx="2.4" ry="3.8" transform="rotate(30 82 46)" fill={sealGold} />
          <ellipse cx="77" cy="51" rx="2.5" ry="4" transform="rotate(40 77 51)" fill={sealOlive} />
          <ellipse cx="84" cy="53" rx="2" ry="3.2" transform="rotate(65 84 53)" fill={sealOlive} />

          {/* Ground root anchor */}
          <line x1="53" y1="76" x2="67" y2="76" stroke={sealOlive} strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </svg>

      {/* SRM UNIVERSITY AP Typography Logotype matching user reference */}
      <div className="flex flex-col justify-center select-none text-left">
        <div
          className="font-serif leading-[0.88] tracking-tight text-3xl sm:text-4xl font-extrabold"
          style={{ color: textColor, fontFamily: '"Playfair Display", "Times New Roman", Times, Georgia, serif' }}
        >
          SRM
        </div>
        <div
          className="font-serif text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-semibold mt-1"
          style={{ color: subTextColor, fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          UNIVERSITY <span className="italic font-normal tracking-[0.16em]">AP</span>
        </div>
        <div
          className="w-full h-[0.75px] my-1"
          style={{ backgroundColor: isDarkTheme ? '#8A1B27' : '#3E4424' }}
        />
        <div
          className="font-serif text-[9px] sm:text-[10px] tracking-[0.06em] font-medium text-right"
          style={{ color: subTextColor, fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Andhra Pradesh
        </div>
      </div>
    </div>
  );
};

/**
 * 2. IBM Quantum Official Logotype
 * Matches user uploaded Image 4, 5, and 6 (IBM_Quantum_logotype_pos_RGB / rev_RGB).
 * Features the signature IBM Quantum branding with the bespoke curved 'Q'.
 */
export const IbmQuantumLogo: React.FC<LogoProps> = ({ isDarkTheme = false, className = 'h-10' }) => {
  const fillColor = isDarkTheme ? '#FFFFFF' : '#161616';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 460 110"
        className="h-full w-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="IBM Quantum Logo"
      >
        <g fill={fillColor}>
          {/* IBM */}
          {/* 'I' */}
          <rect x="20" y="32" width="10" height="52" />

          {/* 'B' */}
          <path d="M46 32 h28 c10 0 16 4 16 12 c0 5 -3 9 -8 11 c7 2 10 7 10 13 c0 9 -7 14 -18 14 h-28 v-50 z M56 41 v11 h18 c5 0 8 -2 8 -6 c0 -3 -3 -5 -8 -5 h-18 z M56 60 v15 h19 c5 0 9 -3 9 -7 c0 -5 -4 -8 -9 -8 h-19 z" />

          {/* 'M' */}
          <path d="M99 32 h11 l15 28 l15 -28 h11 v52 h-10 v-36 l-14 26 h-5 l-14 -26 v36 h-9 v-52 z" />

          {/* QUANTUM (Bold with signature curved Q) */}
          {/* Custom IBM Quantum 'Q' */}
          <path d="M200 32 c-17 0 -29 11 -29 27 c0 16 12 27 29 27 c7 0 14 -3 19 -8 l3 14 h10 l-4 -16 c7 -5 10 -11 10 -17 c0 -16 -12 -27 -29 -27 z M200 42 c11 0 18 8 18 17 c0 9 -7 17 -18 17 c-11 0 -18 -8 -18 -17 c0 -9 7 -17 18 -17 z" />

          {/* 'u' */}
          <path d="M243 47 h11 v22 c0 4 3 6 7 6 c5 0 8 -3 8 -8 v-20 h11 v37 h-10 v-5 c-3 4 -7 6 -11 6 c-9 0 -15 -5 -15 -14 v-24 z" />

          {/* 'a' */}
          <path d="M305 46 c9 0 15 5 15 13 v25 h-10 v-5 c-3 4 -7 6 -12 6 c-7 0 -13 -4 -13 -11 c0 -8 7 -12 18 -12 h7 v-1 c0 -4 -3 -6 -8 -6 c-4 0 -7 2 -9 4 l-4 -7 c4 -4 9 -6 16 -6 z M310 63 h-6 c-4 0 -7 2 -7 5 c0 3 2 5 6 5 c4 0 7 -3 7 -6 v-4 z" />

          {/* 'n' */}
          <path d="M331 47 h10 v5 c3 -4 7 -6 12 -6 c9 0 14 6 14 14 v24 h-11 v-22 c0 -4 -3 -6 -7 -6 c-5 0 -8 3 -8 8 v20 h-10 v-37 z" />

          {/* 't' */}
          <path d="M380 37 h10 v10 h8 v8 h-8 v18 c0 3 1 4 4 4 c1 0 3 0 4 -1 l2 8 c-3 1 -6 2 -9 2 c-7 0 -11 -4 -11 -11 v-20 h-6 v-8 h6 v-10 z" />

          {/* 'u' */}
          <path d="M407 47 h11 v22 c0 4 3 6 7 6 c5 0 8 -3 8 -8 v-20 h11 v37 h-10 v-5 c-3 4 -7 6 -11 6 c-9 0 -15 -5 -15 -14 v-24 z" />

          {/* 'm' */}
          <path d="M455 47 h10 v5 c3 -4 7 -6 11 -6 c6 0 10 3 12 8 c3 -5 7 -8 13 -8 c9 0 14 6 14 14 v24 h-11 v-22 c0 -4 -2 -6 -6 -6 c-4 0 -7 3 -7 8 v20 h-11 v-22 c0 -4 -2 -6 -6 -6 c-4 0 -7 3 -7 8 v20 h-10 v-37 z" />
        </g>
      </svg>
    </div>
  );
};

/**
 * 3. Qiskit Official Logo & Wordmark
 * Matches user uploaded `qiskit_black.svg` (official Qiskit Bloch sphere & brand lockup).
 */
export const QiskitLogo: React.FC<LogoProps> = ({ isDarkTheme = false, className = 'h-10' }) => {
  const brandColor = isDarkTheme ? '#FFFFFF' : '#161616';

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Official Qiskit Bloch Sphere SVG from Qiskit Foundation */}
      <svg
        viewBox="0 0 140.23 139.99"
        className="h-full aspect-square shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Qiskit Icon"
      >
        <defs>
          <radialGradient
            id={`qiskit-rad-1-${isDarkTheme ? 'dark' : 'light'}`}
            cx="74.23"
            cy="70.77"
            r="64.97"
            gradientTransform="matrix(0.96, 0.21, -0.14, 0.63, 32.16, 11.47)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.16" stopColor={brandColor} stopOpacity="0" />
            <stop offset="1" stopColor={brandColor} />
          </radialGradient>
          <radialGradient
            id={`qiskit-rad-2-${isDarkTheme ? 'dark' : 'light'}`}
            cx="50.72"
            cy="161.72"
            r="35.02"
            gradientTransform="translate(20.74 16.4) scale(0.98 0.6)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={brandColor} stopOpacity="0" />
            <stop offset="1" stopColor={brandColor} />
          </radialGradient>
          <radialGradient
            id={`qiskit-rad-3-${isDarkTheme ? 'dark' : 'light'}`}
            cx="51.17"
            cy="29.48"
            r="60.28"
            gradientTransform="matrix(0.98, 0, 0, 0.75, 20.63, 9.47)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.2" stopColor={brandColor} stopOpacity="0" />
            <stop offset="1" stopColor={brandColor} />
          </radialGradient>
          <radialGradient
            id={`qiskit-rad-4-${isDarkTheme ? 'dark' : 'light'}`}
            cx="13.77"
            cy="-0.79"
            r="40.68"
            gradientTransform="matrix(0.4, 0.89, -1.26, 0.57, 27.65, -10.03)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.36" stopColor={brandColor} stopOpacity="0" />
            <stop offset="1" stopColor={brandColor} />
          </radialGradient>
          <radialGradient
            id={`qiskit-rad-5-${isDarkTheme ? 'dark' : 'light'}`}
            cx="-401.66"
            cy="-1203.76"
            r="1068.94"
            gradientTransform="translate(20.74 2.56) scale(0.98)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor={brandColor} stopOpacity="0" />
            <stop offset="0.37" stopColor={brandColor} />
          </radialGradient>
        </defs>

        {/* Lower elliptical ring */}
        <path
          fill={`url(#qiskit-rad-1-${isDarkTheme ? 'dark' : 'light'})`}
          d="M130.6,102.79v0h0c-.12-12.91-30.52-20.22-59.14-20.54-30.35,0-61.75,7.68-61.85,20.54h0s0,0,0,0,0,0,0,0h0c.12,12.92,30.52,20.22,59.14,20.54,30.35,0,61.75-7.68,61.85-20.54h0ZM68.75,118.64c-32-.36-54.33-8.63-54.41-15.85.08-7.49,24.49-15.85,57.12-15.85,32,.36,54.33,8.63,54.41,15.85C125.79,110.28,101.38,118.64,68.75,118.64Z"
        />
        {/* Outer Circular Boundary Rim */}
        <path
          fill={brandColor}
          d="M70.24,140A70,70,0,1,1,131.75,37h0A69.95,69.95,0,0,1,70.24,140ZM70,4.81a65.21,65.21,0,1,0,57.59,34.38h0A65.29,65.29,0,0,0,70,4.81Z"
        />
        {/* South pole ring */}
        <path
          fill={`url(#qiskit-rad-2-${isDarkTheme ? 'dark' : 'light'})`}
          d="M88.16,130.58v0h0c-.07-5.35-7.8-9.39-18-9.39s-18,4-18,9.39h0v.07h0c.06,5.35,7.8,9.39,18,9.39s18-4,18-9.39h0Zm-18,5c-8.08,0-13.25-2.92-13.3-5s5.22-5,13.3-5,13.25,2.93,13.3,5S78.2,135.54,70.12,135.54Z"
        />
        {/* Equatorial ring */}
        <path
          fill={`url(#qiskit-rad-3-${isDarkTheme ? 'dark' : 'light'})`}
          d="M140.09,70.06v0h0c-.19-13.85-35.32-21.75-68.35-22.09C36.69,47.92.36,56.22.16,70h0s0,0,0,.06a.43.43,0,0,0,0,.05h0C.35,84,35.48,91.87,68.51,92.21c35,0,71.37-8.3,71.57-22.09h0ZM68.54,87.48C31.12,87.09,5,78,4.89,70.07,5,61.84,33.56,52.65,71.71,52.65c37.42.39,63.52,9.48,63.64,17.41C135.23,78.29,106.68,87.48,68.54,87.48Z"
        />
        {/* Upper elliptical ring */}
        <path
          fill={`url(#qiskit-rad-4-${isDarkTheme ? 'dark' : 'light'})`}
          d="M71.51,16.53c-30.36,0-61.77,7.71-61.77,20.59s30.39,20.28,59,20.6c30.35,0,61.76-7.71,61.76-20.6S100.12,16.85,71.51,16.53ZM68.77,53c-32-.36-54.29-8.65-54.29-15.87,0-7.48,24.39-15.86,57-15.86,32,.35,54.3,8.65,54.3,15.86C125.78,44.61,101.39,53,68.77,53Z"
        />
        {/* North pole ring */}
        <path
          fill={brandColor}
          d="M69.89,0C64.8,0,53,.79,53,7.91S64.8,15.8,69.89,15.8,86.81,15,86.81,7.91,75,0,69.89,0Zm0,4.79C77,4.81,82,6.45,82,7.91S77,11,69.89,11,57.76,9.37,57.76,7.91,62.74,4.81,69.89,4.81Z"
        />
        {/* Tilted Polar Axis */}
        <path
          fill={`url(#qiskit-rad-5-${isDarkTheme ? 'dark' : 'light'})`}
          d="M99.44,112.46a6,6,0,0,0-.86.07h0L72.3,67.1h0L48.35,25.71A6,6,0,1,0,43.81,28a6.82,6.82,0,0,0,.79-.08L68.55,69.27h0L79.36,88h0l15.44,26.67a6,6,0,1,0,4.63-2.19Z"
        />
      </svg>

      {/* Official Qiskit Wordmark */}
      <span
        className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight"
        style={{ color: brandColor, letterSpacing: '-0.03em' }}
      >
        Qiskit
      </span>
    </div>
  );
};
