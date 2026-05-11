import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sectors } from "../../data/sectors.js";
import Eyebrow from "../ui/Eyebrow.jsx";

gsap.registerPlugin(ScrollTrigger);

function SectorIcon({ id }) {
  const url = `url(/${id}.svg)`;
  return (
    <div
      aria-hidden
      data-sector-icon
      className="size-12 bg-charcoal transition-colors duration-300"
      style={{
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "left center",
        maskPosition: "left center",
      }}
    />
  );
}

function SectorCard({ sector, index, total, setCardRef }) {
  return (
    <article
      ref={(node) => setCardRef(node, index)}
      className="group relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-[14px] border border-hairline bg-paper p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-red hover:shadow-[0_28px_55px_-32px_rgba(232,38,42,0.4)]"
      style={{ opacity: index === 0 ? 1 : 0 }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-red opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="aci-stripes pointer-events-none absolute -right-12 -top-12 h-32 w-32 -rotate-12 opacity-0 transition-opacity duration-500 group-hover:opacity-60"
      />

      <div className="relative flex items-start justify-between">
        <div className="group-hover:[&_[data-sector-icon]]:bg-red">
          <SectorIcon id={sector.id} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute transition-colors duration-300 group-hover:text-red">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="relative mt-7">
        <h3 className="text-[20px] font-medium leading-tight text-charcoal transition-colors duration-300 group-hover:text-red">
          {sector.label}
        </h3>
        <p className="mt-2 text-[13px] leading-snug text-ink-mute">
          {sector.detail}
        </p>

        {/* <div className="mt-5 flex items-center justify-between border-t border-hairline pt-4 transition-colors duration-300 group-hover:border-red/30">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute transition-colors duration-300 group-hover:text-red">
            Ver sector
          </span>
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-full border border-hairline text-charcoal transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-red group-hover:bg-red group-hover:text-paper">
            <svg viewBox="0 0 16 16" fill="none" className="size-3">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </span>
        </div> */}
      </div>
    </article>
  );
}

export default function SectorsStrip() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!section || !grid || cards.length === 0) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(cards, { opacity: 1, x: 0, y: 0, rotation: 0 });
      return undefined;
    }

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 768px)", () => {
      gsap.set(cards[0], { opacity: 1, x: 0, y: 0, rotation: 0 });
      gsap.set(cards.slice(1), {
        opacity: 0,
        y: -160,
        rotation: -6,
        transformOrigin: "50% 100%",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "top 75%",
          once: true,
        },
      });

      cards.slice(1).forEach((card, cardIndex) => {
        const start = cardIndex * 0.09;

        timeline
          .to(
            card,
            {
              opacity: 1,
              y: 14,
              rotation: cardIndex % 2 === 0 ? 1.6 : -1.6,
              duration: 0.5,
              ease: "power3.in",
              autoRound: false,
            },
            start,
          )
          .to(
            card,
            {
              y: 0,
              rotation: 0,
              duration: 0.22,
              ease: "back.out(2.4)",
              autoRound: false,
            },
            start + 0.5,
          );
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    });

    matchMedia.add("(max-width: 767px)", () => {
      gsap.set(cards, { opacity: 0, y: 24 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          once: true,
        },
      });

      timeline.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "expo.out",
        stagger: 0.08,
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    });

    return () => matchMedia.revert();
  }, []);

  const setCardRef = (node, index) => {
    if (node) cardsRef.current[index] = node;
  };

  return (
    <section
      ref={sectionRef}
      id="sectores"
      className="overflow-hidden border-y border-hairline bg-paper py-18 md:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Sectores</Eyebrow>
            <h2 className="mt-5 max-w-[760px] font-display text-[36px] font-[430] leading-[1.08] text-charcoal md:text-[46px]">
              Edificios con ritmos distintos, una gestión operativa clara.
            </h2>
          </div>
          <p className="max-w-[36ch] text-[15px] leading-[1.65] text-ink-mute">
            ACI concentra servicios críticos en un equipo coordinado para
            reducir proveedores, tiempos muertos y fricción administrativa.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {sectors.map((sector, index) => (
            <SectorCard
              key={sector.id}
              sector={sector}
              index={index}
              total={sectors.length}
              setCardRef={setCardRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
