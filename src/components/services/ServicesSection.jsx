import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../../data/services.js";
import ArrowButton from "../ui/ArrowButton.jsx";
import Eyebrow from "../ui/Eyebrow.jsx";
import PillButton from "../ui/PillButton.jsx";
import ProgressBar from "../ui/ProgressBar.jsx";
import ServiceArtwork from "./ServiceArtwork.jsx";

// GSAP-style "expo.out" easing reproduced in pure CSS
const EASE = "cubic-bezier(0.16,1,0.3,1)";
const DURATION = 620;
const GAP = 24; // tailwind gap-6

gsap.registerPlugin(ScrollTrigger);

function ServiceCard({ service, isActive }) {
  return (
    <article
      className={[
        "group flex h-full flex-col overflow-hidden rounded-[18px] bg-paper",
        "ring-1 ring-hairline shadow-[0_24px_60px_-42px_rgba(26,26,26,0.45)]",
        isActive ? "opacity-100" : "opacity-70",
      ].join(" ")}
      style={{
        transition: `opacity ${DURATION}ms ${EASE}`,
      }}>
      <div className="relative aspect-4/3 shrink-0">
        <ServiceArtwork serviceId={service.id} />
        <a
          href="#contacto"
          aria-label={`Consultar por ${service.title}`}
          className="absolute -bottom-5 right-6 z-20 grid size-11 place-items-center rounded-full bg-red text-paper shadow-[0_18px_36px_-14px_rgba(232,38,42,0.7)] transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-18"
          style={{ transitionTimingFunction: EASE }}>
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
            <path
              d="M4 12 12 4M6 4h6v6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </a>
      </div>

      <div className="flex flex-1 flex-col px-7 pb-8 pt-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-red">
          {service.code}
        </p>
        <h3
          className="mt-3 font-display text-[26px] leading-[1.05] text-charcoal"
          style={{
            fontVariationSettings: '"opsz" 36, "wght" 520',
            letterSpacing: "-0.018em",
          }}>
          {service.title}
        </h3>
        <p className="mt-4 line-clamp-3 text-[14.5px] leading-[1.6] text-ink-mute">
          {service.body}
        </p>
        <ul className="mt-auto space-y-2 border-t border-hairline pt-5">
          {service.items.slice(0, 3).map((item) => (
            <li
              key={item}
              className="flex gap-3 text-[13.5px] leading-snug text-ink">
              <span className="mt-[7px] size-1 shrink-0 rounded-full bg-red" />
              <span className="line-clamp-2">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const [scrollMode, setScrollMode] = useState(false);
  const sectionRef = useRef(null);
  const trackContainerRef = useRef(null);
  const trackRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const cellRef = useRef(null);
  const maxActiveRef = useRef(0);
  const clampedActiveRef = useRef(0);
  const [cellW, setCellW] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  // Measure card cell width + how many fit in the viewport
  useLayoutEffect(() => {
    const container = trackContainerRef.current;
    const cell = cellRef.current;
    if (!container || !cell) return;
    const measure = () => {
      const cw = cell.getBoundingClientRect().width;
      setCellW(cw);
      const containerW = container.getBoundingClientRect().width;
      setVisibleCount(Math.max(1, Math.floor((containerW + GAP) / (cw + GAP))));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    ro.observe(cell);
    return () => ro.disconnect();
  }, []);

  const maxActive = Math.max(0, services.length - visibleCount);
  const clampedActive = Math.min(active, maxActive);
  const offset = -(clampedActive * (cellW + GAP));

  useLayoutEffect(() => {
    maxActiveRef.current = maxActive;
    clampedActiveRef.current = clampedActive;
  }, [maxActive, clampedActive]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = trackContainerRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 1024px)", () => {
      if (prefersReducedMotion) {
        setScrollMode(false);
        return undefined;
      }

      let horizontalDistance = 0;
      let lastStep = clampedActiveRef.current;
      const measureDistance = () => {
        horizontalDistance = Math.max(
          0,
          track.scrollWidth - viewport.clientWidth,
        );
        return horizontalDistance;
      };
      const pinDistance = () => {
        const distance = measureDistance();
        return Math.max(
          window.innerHeight * 1.15,
          distance + window.innerHeight * 0.75,
        );
      };

      setScrollMode(true);
      gsap.set(track, {
        x:
          -measureDistance() *
          (maxActiveRef.current === 0
            ? 0
            : clampedActiveRef.current / maxActiveRef.current),
      });

      const scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${pinDistance()}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.16,
        anticipatePin: 1,
        refreshPriority: 2,
        invalidateOnRefresh: true,
        onRefresh: () => {
          measureDistance();
        },
        onUpdate: (self) => {
          gsap.set(track, {
            x: -horizontalDistance * self.progress,
            force3D: true,
            autoRound: false,
          });

          const nextStep =
            maxActiveRef.current === 0
              ? 0
              : Math.round(self.progress * maxActiveRef.current);
          if (nextStep !== lastStep) {
            lastStep = nextStep;
            setActive(nextStep);
          }
        },
      });

      scrollTriggerRef.current = scrollTrigger;
      requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });

      return () => {
        scrollTrigger.kill();
        scrollTriggerRef.current = null;
        gsap.set(track, { clearProps: "transform" });
        setScrollMode(false);
      };
    });

    matchMedia.add("(max-width: 1023px)", () => {
      setScrollMode(false);
      gsap.set(track, { clearProps: "transform" });
    });

    return () => matchMedia.revert();
  }, []);

  const go = (step) => {
    if (scrollMode && scrollTriggerRef.current) {
      const next = Math.max(0, Math.min(maxActive, clampedActive + step));
      const scrollTrigger = scrollTriggerRef.current;
      const progress = maxActive === 0 ? 0 : next / maxActive;
      window.scrollTo({
        top:
          scrollTrigger.start +
          (scrollTrigger.end - scrollTrigger.start) * progress,
        behavior: "smooth",
      });
      return;
    }

    setActive((c) => Math.max(0, Math.min(maxActive, c + step)));
  };

  const progress = maxActive === 0 ? 1 : (clampedActive + 1) / (maxActive + 1);
  const counter = `${String(clampedActive + 1).padStart(2, "0")} / ${String(services.length).padStart(2, "0")}`;

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="overflow-hidden bg-bone py-24 md:py-32">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        {/* LEFT — text column */}
        <div className="lg:col-span-4">
          <Eyebrow>Servicios</Eyebrow>
          <h2
            className="mt-8 font-display text-charcoal"
            style={{
              fontVariationSettings: '"opsz" 60, "wght" 460',
              letterSpacing: "-0.022em",
              lineHeight: 1.04,
              fontSize: "clamp(36px, 4vw, 52px)",
            }}>
            Experiencia local.
            <br />
            Capacidad integral.
          </h2>
          <p className="mt-7 max-w-[34ch] text-[16px] leading-[1.65] text-ink-mute">
            Servicios técnicos y operativos auto-prestados en CABA y AMBA, con
            estándares consistentes que sostienen la productividad y resiliencia
            de tu operación día a día.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <PillButton as="a" href="#contacto">
              Hablemos
            </PillButton>
            <div className="flex items-center gap-2 lg:hidden">
              <ArrowButton
                direction="left"
                onClick={() => go(-1)}
                disabled={clampedActive === 0}
              />
              <ArrowButton
                direction="right"
                filled
                onClick={() => go(1)}
                disabled={clampedActive >= maxActive}
              />
            </div>
          </div>
        </div>

        {/* RIGHT — sliding track */}
        <div
          ref={trackContainerRef}
          className="min-w-0 overflow-hidden lg:col-span-8">
          <div
            ref={trackRef}
            className="flex items-stretch gap-6 will-change-transform"
            style={{
              transform: scrollMode
                ? undefined
                : `translate3d(${offset}px, 0, 0)`,
              transition: scrollMode
                ? "none"
                : `transform ${DURATION}ms ${EASE}`,
              minHeight: 540,
              backfaceVisibility: "hidden",
            }}>
            {services.map((service, index) => (
              <div
                key={service.id}
                ref={index === 0 ? cellRef : null}
                className="w-[300px] shrink-0 sm:w-[340px] md:w-[360px] xl:w-[400px]">
                <ServiceCard
                  service={service}
                  isActive={
                    index >= clampedActive &&
                    index < clampedActive + visibleCount
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
