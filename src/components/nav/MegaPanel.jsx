// OCS-style mega dropdown — feature card on the left, arrow-link columns on the right.
// Pure CSS hover/transition, no GSAP needed.

function ArrowGlyph({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={className}
      fill="none"
      aria-hidden
    >
      <path
        d="M2 8h18M14 2l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

function ArrowLink({ href, label, detail, icon }) {
  return (
    <a
      href={href}
      className="group/link flex items-start gap-3 rounded-md py-2 pr-3 transition-colors"
    >
      {icon ? (
        <span
          aria-hidden
          className="mt-0.5 size-5 shrink-0 bg-charcoal/80 transition-colors group-hover/link:bg-red"
          style={{
            WebkitMaskImage: `url(/${icon}.svg)`,
            maskImage: `url(/${icon}.svg)`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      ) : (
        <span className="mt-1 block text-charcoal/60 transition-all duration-300 ease-out-snap group-hover/link:translate-x-1 group-hover/link:text-red">
          <ArrowGlyph className="h-3.5 w-5" />
        </span>
      )}
      <span className="flex-1">
        <span className="block text-[14.5px] font-medium leading-snug text-charcoal transition-colors group-hover/link:text-red">
          {label}
        </span>
        {detail && (
          <span className="mt-0.5 block text-[12px] leading-snug text-ink-mute">
            {detail}
          </span>
        )}
      </span>
    </a>
  );
}

function FeatureArt({ id }) {
  if (id === "building") {
    return (
      <svg
        viewBox="0 0 200 220"
        className="absolute inset-0 size-full"
        fill="none"
        aria-hidden
      >
        <rect x="58" y="32" width="84" height="170" stroke="#1A1A1A" strokeWidth="1.2" fill="#FFFFFF" />
        {[64, 92, 120, 148, 176].map((y) => (
          <line key={y} x1="58" y1={y} x2="142" y2={y} stroke="#1A1A1A" strokeWidth="0.6" opacity="0.55" />
        ))}
        {[40, 68, 96, 124, 152].map((y, i) =>
          [68, 86, 104, 122].map((x, j) => {
            if ((i + j) % 4 === 0) return null;
            return (
              <rect key={`${x}-${y}`} x={x} y={y + 4} width="10" height="18" fill="#1A1A1A" opacity="0.7" />
            );
          })
        )}
        {/* highlighted floor — red */}
        <g fill="#E8262A">
          <rect x="68" y="100" width="10" height="18" />
          <rect x="86" y="100" width="10" height="18" />
          <rect x="104" y="100" width="10" height="18" />
        </g>
        {/* rooftop equipment */}
        <rect x="76" y="20" width="32" height="12" stroke="#1A1A1A" strokeWidth="1.1" fill="#FFFFFF" />
        <rect x="116" y="22" width="20" height="10" stroke="#1A1A1A" strokeWidth="1.1" fill="#FFFFFF" />
        {/* ground */}
        <line x1="20" y1="202" x2="180" y2="202" stroke="#1A1A1A" strokeWidth="1" />
        {/* tree */}
        <circle cx="32" cy="194" r="8" stroke="#1A1A1A" strokeWidth="1" fill="#FFFFFF" />
        {/* red service dots */}
        <circle cx="58" cy="78" r="3" fill="#E8262A" />
        <circle cx="142" cy="156" r="3" fill="#E8262A" />
      </svg>
    );
  }

  if (id === "sectors") {
    const ids = ["corporativo", "industria", "salud", "educacion", "retail", "logistica"];
    return (
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-2 p-5">
        {ids.map((sid) => (
          <div
            key={sid}
            className="grid place-items-center rounded-md border border-charcoal/15 bg-paper/70"
          >
            <div
              aria-hidden
              className="size-7 bg-charcoal"
              style={{
                WebkitMaskImage: `url(/${sid}.svg)`,
                maskImage: `url(/${sid}.svg)`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  // 'mark' — ACI logo
  return (
    <div className="absolute inset-0 grid place-items-center p-6">
      <img
        src="/logo.png"
        alt=""
        aria-hidden
        className="max-h-[80%] max-w-[55%] object-contain"
      />
    </div>
  );
}

function FeatureCard({ feature }) {
  return (
    <a
      href={feature.ctaHref}
      className="group/feature relative flex h-full flex-col overflow-hidden rounded-[16px] bg-paper ring-1 ring-hairline/70"
    >
      {/* Image — short, fills only the top of the card */}
      <div className="relative aspect-5/3 w-full overflow-hidden bg-paper">
        <div className="aci-stripes absolute inset-0 opacity-55" aria-hidden />
        <FeatureArt id={feature.art} />
      </div>

      {/* Text card — pulled up so it overlaps the image, rounded top corners
          create the "card sitting on the photo" feel from the OCS reference. */}
      <div className="relative -mt-5 flex flex-1 flex-col rounded-t-[16px] bg-tint p-5">
        <div className="flex items-start justify-between gap-3">
          <h4
            className="flex-1 font-display text-charcoal"
            style={{
              fontVariationSettings: '"opsz" 24, "wght" 520',
              fontSize: 20,
              lineHeight: 1.15,
              letterSpacing: "-0.012em",
            }}
          >
            {feature.ctaLabel}
          </h4>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-red text-paper transition-all duration-300 ease-out-snap group-hover/feature:-translate-y-0.5 group-hover/feature:rotate-12">
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
              <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </span>
        </div>
        <p className="mt-2.5 text-[13px] leading-normal text-ink-mute">
          {feature.body}
        </p>
      </div>
    </a>
  );
}

export default function MegaPanel({ panel, isOpen, onPointerEnter, onPointerLeave }) {
  return (
    <div
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={[
        "absolute inset-x-0 top-full z-50",
        "transition-[opacity,transform] duration-300 ease-out-snap",
        isOpen
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0",
      ].join(" ")}
      aria-hidden={!isOpen}
    >
      {panel && (
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-6 pt-2 md:px-10">
          <div className="overflow-hidden rounded-[20px] bg-paper ring-1 ring-hairline shadow-[0_30px_80px_-50px_rgba(26,26,26,0.4)]">
            <div className="grid gap-6 p-5 md:grid-cols-12 md:gap-8 md:p-8">
              {/* LEFT — feature card */}
              <div className="md:col-span-4">
                <FeatureCard feature={panel.feature} />
              </div>

              {/* RIGHT — link columns */}
              <div className="md:col-span-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  {panel.columns.map((col) => (
                    <div key={col.heading}>
                      <h5 className="border-b border-hairline pb-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-mute">
                        {col.heading}
                      </h5>
                      <ul className="mt-2 flex flex-col">
                        {col.items.map((it) => (
                          <li key={it.label}>
                            <ArrowLink {...it} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
