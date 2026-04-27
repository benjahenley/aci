const ARTWORK = {
  tecnicos: {
    label: 'Hard FM',
    paths: [
      'M74 46h92v104H74z',
      'M92 68h18v18H92z M130 68h18v18h-18z M92 106h18v18H92z M130 106h18v18h-18z',
      'M46 150h148 M52 162h134',
      'M106 46V24h34v22',
      'M140 24c18 0 28 8 28 22',
    ],
  },
  operativos: {
    label: 'Soft FM',
    paths: [
      'M54 70h132v78H54z',
      'M54 96h132 M88 70v78 M122 70v78 M156 70v78',
      'M66 162c22-16 44-16 66 0s44 16 66 0',
      'M72 48c18-14 36-14 54 0s36 14 54 0',
    ],
  },
  gestion: {
    label: 'Back office',
    paths: [
      'M58 58h56v44H58z M128 58h56v44h-56z M58 118h56v44H58z M128 118h56v44h-56z',
      'M114 80h14 M114 140h14 M86 102v16 M156 102v16',
      'M42 180h158',
      'M52 38h138',
    ],
  },
}

export default function ServiceArtwork({ serviceId, showLabel = true }) {
  const artwork = ARTWORK[serviceId] || ARTWORK.tecnicos

  return (
    <div className="relative h-full min-h-[210px] overflow-hidden rounded-t-[16px] bg-charcoal">
      <div className="absolute inset-0 aci-stripes opacity-60" aria-hidden />
      <svg
        viewBox="0 0 240 220"
        className="relative z-10 h-full w-full"
        role="img"
        aria-label={`Ilustracion tecnica ${artwork.label}`}
      >
        <rect width="240" height="220" fill="#1A1A1A" />
        <g stroke="#F7F4EE" strokeWidth="1.4" fill="none" opacity="0.86">
          {artwork.paths.map((path) => (
            <path key={path} d={path} />
          ))}
        </g>
        <g fill="#E8262A">
          <circle cx="54" cy="70" r="4" />
          <circle cx="186" cy="148" r="4" />
        </g>
        <g stroke="#F7F4EE" strokeWidth="0.7" opacity="0.24">
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={i} x1={24 + i * 18} y1="24" x2={24 + i * 18} y2="196" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1="24" y1={36 + i * 20} x2="216" y2={36 + i * 20} />
          ))}
        </g>
      </svg>
      {showLabel && (
        <span className="absolute left-5 top-5 z-20 rounded-full border border-paper/20 bg-paper/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper">
          {artwork.label}
        </span>
      )}
    </div>
  )
}
