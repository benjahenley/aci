// Stylized cross-section of a corporate building, line-art.
// Annotates the systems ACI maintains. Red accent dots pulse at service points.
// Pure SVG — scales infinitely, no stock imagery.

const SYSTEMS = [
  { id: 'elec',   x: 358, y: 92,  label: 'Eléctrica' },
  { id: 'hvac',   x: 358, y: 168, label: 'Climatización' },
  { id: 'limp',   x: 358, y: 244, label: 'Limpieza' },
  { id: 'seg',    x: 358, y: 320, label: 'Seguridad' },
  { id: 'jardin', x: 358, y: 396, label: 'Jardinería' },
]

export default function BuildingDiagram({ className = '' }) {
  return (
    <svg
      viewBox="0 0 460 460"
      className={className}
      role="img"
      aria-label="Diagrama de servicios integrales sobre edificio corporativo"
    >
      <defs>
        <pattern id="aci-floor" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 6 L6 0" stroke="#1A1A1A" strokeWidth="0.4" opacity="0.18" />
        </pattern>
        <pattern id="aci-vent" width="14" height="6" patternUnits="userSpaceOnUse">
          <rect width="10" height="2" x="2" y="2" fill="#1A1A1A" opacity="0.55" />
        </pattern>
        <linearGradient id="aci-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8262A" stopOpacity="0.0" />
          <stop offset="100%" stopColor="#E8262A" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* Sky / atmospheric red glow */}
      <rect width="460" height="460" fill="url(#aci-glow)" />

      {/* Ground line */}
      <line x1="20" y1="430" x2="340" y2="430" stroke="#1A1A1A" strokeWidth="1.2" />
      <g stroke="#1A1A1A" strokeWidth="0.6" opacity="0.6">
        {Array.from({ length: 28 }).map((_, i) => (
          <line key={i} x1={20 + i * 11.5} y1={430} x2={14 + i * 11.5} y2={444} />
        ))}
      </g>

      {/* Building shell — main tower */}
      <g>
        <rect x="80" y="58" width="200" height="372" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.4" />
        {/* Floor lines */}
        {[110, 162, 214, 266, 318, 370].map((y) => (
          <line key={y} x1="80" y1={y} x2="280" y2={y} stroke="#1A1A1A" strokeWidth="0.8" opacity="0.55" />
        ))}
        {/* Floor hatch — base */}
        <rect x="80" y="370" width="200" height="60" fill="url(#aci-floor)" />

        {/* Window grid */}
        <g fill="#1A1A1A" opacity="0.85">
          {[68, 116, 168, 220, 272, 324].map((y, fi) =>
            [98, 122, 146, 170, 194, 218, 242, 256].map((x, ci) => {
              if ((fi + ci) % 3 === 0) return null
              return <rect key={`${y}-${x}`} x={x} y={y + 4} width="14" height="22" rx="0.5" />
            }),
          )}
        </g>

        {/* Highlighted windows — red tint, the "active" floor under maintenance tonight */}
        <g fill="#E8262A" opacity="0.85">
          {[98, 122, 146, 170, 194].map((x) => (
            <rect key={x} x={x} y={224} width="14" height="22" />
          ))}
        </g>

        {/* Rooftop equipment — HVAC plant */}
        <g>
          <rect x="120" y="36" width="50" height="22" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.2" />
          <rect x="124" y="40" width="42" height="14" fill="url(#aci-vent)" />
          <rect x="190" y="42" width="32" height="16" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.2" />
          <line x1="194" y1="48" x2="218" y2="48" stroke="#1A1A1A" strokeWidth="0.8" />
          <line x1="194" y1="52" x2="218" y2="52" stroke="#1A1A1A" strokeWidth="0.8" />
          {/* Dish */}
          <circle cx="240" cy="52" r="6" fill="none" stroke="#1A1A1A" strokeWidth="1.2" />
          <line x1="240" y1="46" x2="240" y2="58" stroke="#1A1A1A" strokeWidth="1.2" />
        </g>

        {/* Entrance */}
        <rect x="160" y="394" width="40" height="36" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.4" />
        <line x1="180" y1="394" x2="180" y2="430" stroke="#1A1A1A" strokeWidth="0.8" />
      </g>

      {/* Side annex — lower volume */}
      <g>
        <rect x="280" y="240" width="60" height="190" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.4" />
        {[270, 300, 330, 360, 390].map((y) => (
          <line key={y} x1="280" y1={y} x2="340" y2={y} stroke="#1A1A1A" strokeWidth="0.7" opacity="0.5" />
        ))}
      </g>

      {/* Trees — jardinería */}
      <g>
        <circle cx="38" cy="416" r="14" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.2" />
        <circle cx="38" cy="416" r="7" fill="none" stroke="#1A1A1A" strokeWidth="0.7" />
        <line x1="38" y1="424" x2="38" y2="432" stroke="#1A1A1A" strokeWidth="1.2" />
        <circle cx="58" cy="422" r="9" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.2" />
      </g>

      {/* Service annotation lines — go from points on building to labels on right */}
      <g stroke="#1A1A1A" strokeWidth="0.8" fill="none" opacity="0.7">
        {SYSTEMS.map((s, i) => {
          const anchorY = [78, 154, 230, 306, 416][i]
          const anchorX = [220, 230, 218, 264, 60][i]
          return (
            <g key={s.id}>
              <line x1={anchorX} y1={anchorY} x2={s.x - 16} y2={anchorY} />
              <line x1={s.x - 16} y1={anchorY} x2={s.x - 16} y2={s.y} />
              <line x1={s.x - 16} y1={s.y} x2={s.x - 6} y2={s.y} />
            </g>
          )
        })}
      </g>

      {/* Service points — pulsing red dots on the building */}
      <g>
        {[
          { x: 220, y: 78 },
          { x: 230, y: 154 },
          { x: 218, y: 230 },
          { x: 264, y: 306 },
          { x: 60,  y: 416 },
        ].map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="4"
              fill="#E8262A"
              opacity="0.55"
              style={{
                transformOrigin: `${p.x}px ${p.y}px`,
                animation: `aci-pulse 2.6s ${i * 0.35}s ease-out infinite`,
              }}
            />
            <circle cx={p.x} cy={p.y} r="2.4" fill="#E8262A" />
          </g>
        ))}
      </g>

      {/* Right-side labels */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="9.5" fill="#1A1A1A" letterSpacing="0.08em">
        {SYSTEMS.map((s, i) => (
          <g key={s.id}>
            <circle cx={s.x - 3} cy={s.y} r="2" fill="#E8262A" />
            <text x={s.x + 4} y={s.y - 4} fontWeight="500">
              {String(i + 1).padStart(2, '0')}
            </text>
            <text x={s.x + 4} y={s.y + 7} opacity="0.65">
              {s.label.toUpperCase()}
            </text>
          </g>
        ))}
      </g>

      {/* Subtle tick marks at top-left — coordinate frame */}
      <g stroke="#1A1A1A" strokeWidth="0.6" opacity="0.4">
        <line x1="20" y1="20" x2="56" y2="20" />
        <line x1="20" y1="20" x2="20" y2="56" />
        <line x1="20" y1="34" x2="26" y2="34" />
        <line x1="20" y1="48" x2="26" y2="48" />
        <line x1="34" y1="20" x2="34" y2="26" />
        <line x1="48" y1="20" x2="48" y2="26" />
      </g>
      <text
        x="20"
        y="14"
        fontFamily="JetBrains Mono, monospace"
        fontSize="8"
        fill="#1A1A1A"
        opacity="0.55"
        letterSpacing="0.16em"
      >
        ACI · DIAG-001
      </text>
    </svg>
  )
}
