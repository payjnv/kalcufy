// SOLO COPIA ESTA FUNCIÓN AL INICIO DE TU Header.tsx (después de los imports)

function KalcufyLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kalcufyBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.95"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#kalcufyBg)"/>
      <rect x="0.5" y="0.5" width="63" height="63" rx="15.5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <circle cx="18" cy="18" r="6" fill="#22d3ee"/>
      <circle cx="32" cy="18" r="6" fill="rgba(255,255,255,0.95)"/>
      <circle cx="46" cy="18" r="6" fill="#22d3ee"/>
      <circle cx="18" cy="32" r="6" fill="#22d3ee"/>
      <circle cx="32" cy="32" r="6" fill="#22d3ee"/>
      <circle cx="46" cy="32" r="6" fill="rgba(255,255,255,0.95)"/>
      <circle cx="18" cy="46" r="6" fill="#22d3ee"/>
      <circle cx="32" cy="46" r="6" fill="rgba(255,255,255,0.95)"/>
      <circle cx="46" cy="46" r="6" fill="rgba(255,255,255,0.95)"/>
    </svg>
  );
}
