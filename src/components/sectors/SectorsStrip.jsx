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
      className="size-12 bg-charcoal"
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

function SectorCard({ sector, index, setCardRef }) {
  return (
    <article
      ref={(node) => setCardRef(node, index)}
      className="min-h-[220px] rounded-[12px] border border-hairline bg-paper p-6"
      style={{ opacity: index === 0 ? 1 : 0 }}>
      <div className="h-full">
        <SectorIcon id={sector.id} />
        <div className="mt-7">
          <h3 className="text-[20px] font-medium leading-tight text-charcoal">
            {sector.label}
          </h3>
          <p className="mt-2 text-[13px] leading-snug text-ink-mute">
            {sector.detail}
          </p>
        </div>
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
        x: () => window.innerWidth * 0.72,
        y: -260,
        rotation: -7,
        transformOrigin: "50% 100%",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "center center",
          end: () =>
            `+=${Math.max(window.innerHeight * 1.25, (cards.length - 1) * 520 + 560)}`,
          pin: section,
          pinSpacing: true,
          scrub: 0.28,
          anticipatePin: 1,
          refreshPriority: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.slice(1).forEach((card, cardIndex) => {
        const start = cardIndex * 0.92;

        timeline
          .to(
            card,
            {
              opacity: 1,
              x: 0,
              y: 18,
              rotation: cardIndex % 2 === 0 ? 1.6 : -1.6,
              duration: 0.62,
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
              duration: 0.18,
              ease: "back.out(2.6)",
              autoRound: false,
            },
            start + 0.62,
          );
      });

      requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    });

    matchMedia.add("(max-width: 767px)", () => {
      gsap.set(cards, { opacity: 1, x: 0, y: 0, rotation: 0 });
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

        <div ref={gridRef} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {sectors.map((sector, index) => (
            <SectorCard
              key={sector.id}
              sector={sector}
              index={index}
              setCardRef={setCardRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
