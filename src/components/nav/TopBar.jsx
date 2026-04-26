function Dot() {
  return <span aria-hidden className="size-1 rounded-full bg-ink-mute/50" />;
}

export default function TopBar() {
  return (
    <div className="border-b border-hairline/70 bg-bone">
      <div className="mx-auto flex h-9 w-full max-w-[1440px] items-center justify-between gap-6 px-6 text-[11.5px] tracking-[0.04em] text-ink-mute md:px-10">
        <div className="flex items-center gap-4">
          <a
            href="tel:+541143218800"
            className="hidden items-center gap-2 transition-colors hover:text-red sm:inline-flex">
            <svg viewBox="0 0 16 16" className="size-3" fill="none" aria-hidden>
              <path
                d="M3 3.5C3 3.224 3.224 3 3.5 3h2.13c.227 0 .425.153.483.372l.84 3.131c.06.226-.05.464-.262.566l-1.43.687a8.5 8.5 0 0 0 4.083 4.083l.687-1.43c.102-.213.34-.323.566-.262l3.131.84c.219.058.372.256.372.483v2.13c0 .276-.224.5-.5.5H12C7.029 14.1 1.9 8.971 1.9 4 1.9 3.4 1.95 3.5 3 3.5z"
                stroke="currentColor"
                strokeWidth="1.1"
              />
            </svg>
            +54 11 4321-8800
          </a>
          <Dot />
          <a
            href="mailto:contacto@acifm.com.ar"
            className="inline-flex items-center gap-2 transition-colors hover:text-red">
            <svg viewBox="0 0 16 16" className="size-3" fill="none" aria-hidden>
              <rect
                x="1.5"
                y="3.5"
                width="13"
                height="9"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              <path
                d="M1.5 3.5 8 9l6.5-5.5"
                stroke="currentColor"
                strokeWidth="1.1"
              />
            </svg>
            contacto@acifm.com.ar
          </a>
          <Dot />
          <a
            href="https://wa.me/5491143218800"
            className="hidden items-center gap-2 transition-colors hover:text-red md:inline-flex">
            WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 font-mono text-[10.5px] tracking-[0.08em] text-ink-mute/80 sm:inline-flex">
            Buenos Aires
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-faint">
            ES / AR
          </span>
        </div>
      </div>
    </div>
  );
}
