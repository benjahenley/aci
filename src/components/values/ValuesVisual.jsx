export default function ValuesVisual() {
  return (
    <div className="relative min-h-[440px] overflow-hidden rounded-[22px] bg-charcoal text-paper">
      <div className="absolute inset-0 aci-stripes opacity-35" aria-hidden />
      <svg
        viewBox="0 0 560 520"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Equipo ACI revisando sistemas de edificio">
        <rect width="560" height="520" fill="#1A1A1A" />
        <g stroke="#F7F4EE" strokeWidth="1.4" fill="none" opacity="0.76">
          <path d="M78 396h385" />
          <path d="M96 396V122h170v274" />
          <path d="M304 396V174h140v222" />

          <path d="M118 96h126l22 26H96l22-26z" />
          <path d="M346 150h74l24 24H304l22-24z" />
        </g>

        <g fill="#F7F4EE">
          <circle cx="180" cy="278" r="20" />
          <path d="M150 382c5-48 19-74 30-74s26 26 30 74z" />
          <circle cx="374" cy="290" r="18" />
          <path d="M348 382c4-42 16-64 26-64s22 22 26 64z" />
        </g>
        <g stroke="#E8262A" strokeWidth="3" fill="none">
          <path d="M218 278h86l30 26" />
          <path d="M218 300 l30 26 h86" />
          <circle cx="334" cy="304" r="7" fill="#E8262A" />
          <circle cx="224" cy="304" r="7" fill="#E8262A" />
        </g>

        <g
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          fill="#F7F4EE"
          opacity="0.72">
          <text x="76" y="446" letterSpacing="0.14em">
            ACI / OPERACION CONTROLADA
          </text>
          <text x="76" y="468" letterSpacing="0.14em">
            KPIS · HSE · SLA · PERSONAL PROPIO
          </text>
        </g>
      </svg>
    </div>
  );
}
