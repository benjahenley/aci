import PillButton from "../ui/PillButton.jsx";
import BuildingDiagram from "./BuildingDiagram.jsx";
import HeroClock from "./HeroClock.jsx";

const MARQUEE_ITEMS = [
  "Instalaciones eléctricas",
  "Climatización",
  "Limpieza técnica",
  "Jardinería",
  "Control de plagas",
  "Seguridad operativa",
  "Logística interna",
  "Gestión administrativa",
  "Asesoramiento empresarial",
];

function CornerTicks() {
  return (
    <svg
      viewBox="0 0 80 80"
      className="absolute size-16 text-charcoal/40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden>
      <path d="M0 18 L0 0 L18 0" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="aci-grain relative isolate overflow-hidden bg-bone">
      {/* DIAGONAL STRIPE FIELD — the OCS move, in red, on the right */}
      <div
        data-stripe
        style={{ "--delay": "120ms" }}
        className="aci-stripes-strong pointer-events-none absolute -right-[18%] -top-[12%] z-0 h-[140%] w-[68%] origin-top-right"
        aria-hidden
      />
      {/* Corner ticks */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
        <div className="absolute left-6 top-[110px]">
          <CornerTicks />
        </div>
        <div className="absolute right-6 top-[110px] rotate-90">
          <CornerTicks />
        </div>
        <div className="absolute bottom-[120px] left-6 -rotate-90">
          <CornerTicks />
        </div>
        <div className="absolute bottom-[120px] right-6 rotate-180">
          <CornerTicks />
        </div>
      </div>

      <div className="relative z-20 mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-6 pb-24 pt-10 md:px-10 lg:grid-cols-12 lg:gap-12 lg:pb-32 lg:pt-14">
        {/* LEFT: type column */}
        <div className="relative lg:col-span-7 lg:pt-6">
          {/* Geo / clock strip */}
          <div
            data-rise
            style={{ "--delay": "120ms" }}
            className="mb-10 hidden md:flex flex-wrap items-center gap-x-8 gap-y-3 ">
            <HeroClock />
            <span className="hidden h-3 w-px bg-charcoal/20 sm:inline-block" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-charcoal/55">
              Edición 2026 / N.º 001
            </span>
          </div>

          <h1 className="font-display text-charcoal pt-10 md:pt-0">
            <img
              data-rise
              style={{ "--delay": "260ms" }}
              src="/worded-logo.png"
              alt="ACI Facility Management"
              className="block w-full max-w-[560px] xl:max-w-[680px]"
            />
            <span
              data-rise
              style={{
                "--delay": "420ms",
                fontVariationSettings: '"opsz" 60, "wght" 320',
                letterSpacing: "-0.018em",
                lineHeight: 1.08,
              }}
              className="mt-7 md:mt-9 block text-[26px] sm:text-[30px] md:text-[36px] xl:text-[44px] text-charcoal/75">
              Todo lo que tu edificio necesita,
              <br className="hidden md:block" /> bajo un mismo paraguas.
            </span>
          </h1>

          {/* Sub */}
          <p
            data-rise
            style={{ "--delay": "600ms" }}
            className="mt-9 max-w-[42ch] text-[17px] leading-[1.6] text-ink">
            Mantenimiento técnico, limpieza, jardinería, seguridad y gestión
            integral — auto-prestados desde Buenos Aires, para empresas que no
            pueden parar.
          </p>

          {/* Actions */}
          <div
            data-rise
            style={{ "--delay": "760ms" }}
            className="mt-10 flex flex-wrap items-center gap-4">
            <PillButton as="a" href="#servicios">
              Conocé nuestros servicios
            </PillButton>
            <a
              href="#contacto"
              className="group inline-flex items-center gap-2 px-2 py-3 text-[14px] font-medium text-charcoal underline decoration-red decoration-2 underline-offset-[6px] transition-all hover:underline-offset-[8px]">
              o solicitá una propuesta a medida
              <svg
                viewBox="0 0 16 16"
                className="size-3 transition-transform group-hover:translate-x-0.5"
                fill="none"
                aria-hidden>
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* RIGHT: diagram + tag card */}
        <div className="relative lg:col-span-5 lg:pt-2">
          {/* Floating tag card — top-left of the diagram block, classic OCS move */}

          {/* Diagram frame */}
          <div
            data-fade
            style={{ "--delay": "480ms" }}
            className="relative mt-24 rounded-[28px] border border-hairline bg-paper/90 p-6 shadow-[0_40px_120px_-60px_rgba(26,26,26,0.45)] backdrop-blur-sm lg:mt-12">
            {/* Spec strip */}
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute"></div>

            <BuildingDiagram className="aspect-square w-full" />
          </div>
        </div>
      </div>

      {/* MARQUEE STRIP — bottom punctuation, all-caps mono */}
      <div
        data-fade
        style={{ "--delay": "1300ms" }}
        className="relative z-20 border-y border-hairline bg-bone py-4"
        aria-hidden>
        <div className="aci-marquee flex w-max gap-12 whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.22em] text-charcoal/80">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-12">
              <span>{item}</span>
              <svg
                viewBox="0 0 24 24"
                className="size-3 text-red"
                fill="currentColor">
                <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
