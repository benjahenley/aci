import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { values } from "../../data/values.js";
import Eyebrow from "../ui/Eyebrow.jsx";
import ValuesVisual from "./ValuesVisual.jsx";

gsap.registerPlugin(ScrollTrigger);

const LIQUID_REVEAL_DURATION = 1;
const VALUES_STEP_DURATION = 1.35;
const LIQUID_REVEAL_END_PROGRESS =
  LIQUID_REVEAL_DURATION /
  (LIQUID_REVEAL_DURATION + (values.length - 1) * VALUES_STEP_DURATION);

export default function ValuesSection() {
  const [active, setActive] = useState(values[0].id);
  const [itemsClickable, setItemsClickable] = useState(true);
  const [methodDark, setMethodDark] = useState(false);
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const panelSurfaceRef = useRef(null);
  const liquidRef = useRef(null);
  const visualOriginRef = useRef(null);
  const methodDarkRef = useRef(false);
  const activeIndex = values.findIndex((value) => value.id === active);

  useLayoutEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setItemsClickable(!media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const panelSurface = panelSurfaceRef.current;
    const liquid = liquidRef.current;
    const visualOrigin = visualOriginRef.current;
    if (!section || !panel || !panelSurface || !liquid || !visualOrigin) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return undefined;

    const matchMedia = gsap.matchMedia();
    const setMethodTone = (nextDark) => {
      if (methodDarkRef.current === nextDark) return;
      methodDarkRef.current = nextDark;
      setMethodDark(nextDark);
    };

    matchMedia.add("(min-width: 1024px)", () => {
      let lastIndex = 0;

      const getLiquidOrigin = () => {
        const sectionRect = section.getBoundingClientRect();
        const visualRect = visualOrigin.getBoundingClientRect();

        return {
          x: visualRect.left - sectionRect.left,
          y: visualRect.top - sectionRect.top,
          width: visualRect.width,
          height: visualRect.height,
        };
      };

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: panel,
          start: "center center",
          end: () =>
            `+=${Math.max(window.innerHeight * 1.1, values.length * 420)}`,
          pin: section,
          pinSpacing: true,
          scrub: 0.2,
          anticipatePin: 1,
          refreshPriority: 0,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setMethodTone(self.progress > 0.28);

            if (self.progress < LIQUID_REVEAL_END_PROGRESS) {
              if (lastIndex !== 0) {
                lastIndex = 0;
                setActive(values[0].id);
              }
              return;
            }

            const valuesProgress =
              (self.progress - LIQUID_REVEAL_END_PROGRESS) /
              (1 - LIQUID_REVEAL_END_PROGRESS);
            const nextIndex = Math.min(
              values.length - 1,
              Math.round(valuesProgress * (values.length - 1)),
            );
            if (nextIndex !== lastIndex) {
              lastIndex = nextIndex;
              setActive(values[nextIndex].id);
            }
          },
        },
      });

      timeline
        .fromTo(
          liquid,
          {
            autoAlpha: 1,
            x: () => getLiquidOrigin().x,
            y: () => getLiquidOrigin().y,
            width: () => getLiquidOrigin().width,
            height: () => getLiquidOrigin().height,
            borderTopLeftRadius: "22px",
            borderTopRightRadius: "22px",
            borderBottomRightRadius: "22px",
            borderBottomLeftRadius: "22px",
          },
          {
            x: () => section.offsetWidth * -0.06,
            y: () => section.offsetHeight * -0.06,
            width: () => section.offsetWidth * 1.12,
            height: () => section.offsetHeight * 1.12,
            borderTopLeftRadius: "38%",
            borderTopRightRadius: "22%",
            borderBottomRightRadius: "34%",
            borderBottomLeftRadius: "28%",
            duration: 0.72,
            ease: "power1.inOut",
          },
          0,
        )
        .to(
          liquid,
          {
            x: 0,
            y: 0,
            width: () => section.offsetWidth,
            height: () => section.offsetHeight,
            borderRadius: "0px",
            duration: 0.28,
            ease: "power1.out",
          },
          0.72,
        )
        .to(panelSurface, { opacity: 0, duration: 0.24 }, 0.08)
        .to({}, { duration: (values.length - 1) * VALUES_STEP_DURATION });

      requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        gsap.set([liquid, panelSurface], { clearProps: "all" });
        setMethodTone(false);
      };
    });

    return () => matchMedia.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sostenibilidad"
      className="relative isolate overflow-hidden bg-bone px-6 py-24 md:px-10 md:py-32">
      <div
        ref={liquidRef}
        className="pointer-events-none absolute left-0 top-0 z-0 hidden bg-card-dark opacity-0 will-change-[border-radius,height,transform,width] lg:block"
        aria-hidden
      />
      <div
        ref={panelRef}
        className="relative z-10 mx-auto max-w-[1360px] overflow-hidden rounded-[28px] px-5 py-8 md:px-8 md:py-10 lg:p-12">
        <div
          ref={panelSurfaceRef}
          className="absolute inset-0 z-0 bg-tint"
          aria-hidden
        />
        <div className="relative z-10">
          <div className="mx-auto max-w-[860px] text-center">
            <Eyebrow
              className={[
                "justify-center transition-colors duration-300",
                methodDark ? "!text-paper/70" : "!text-ink-mute",
              ].join(" ")}>
              Método
            </Eyebrow>
            <p
              className={[
                "mt-5 font-display text-[34px] font-[430] leading-[1.08] transition-colors duration-300 md:text-[48px]",
                methodDark ? "text-paper" : "text-charcoal",
              ].join(" ")}>
              Hacer las cosas bien, con evidencia operativa y continuidad.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-stretch">
            <div ref={visualOriginRef} className="relative z-20">
              <ValuesVisual />
            </div>

            <div className="relative z-30 rounded-[22px] bg-paper p-4 shadow-[0_28px_80px_-54px_rgba(26,26,26,0.45)] md:p-7">
              <div className="mb-5 flex items-center justify-between border-b border-hairline pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  Enfoque {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(values.length).padStart(2, "0")}
                </span>
              </div>

              <div className="space-y-2">
                {values.map((value) => {
                  const isActive = value.id === active;
                  return (
                    <button
                      key={value.id}
                      type="button"
                      onClick={() => {
                        if (itemsClickable) setActive(value.id);
                      }}
                      tabIndex={itemsClickable ? undefined : -1}
                      className={[
                        "w-full px-5 py-5 text-left transition-colors lg:cursor-default",
                        isActive
                          ? " bg-bone text-charcoal"
                          : [
                              "border-transparent text-ink-mute",
                              itemsClickable
                                ? "hover:border-red-soft hover:bg-bone/55"
                                : "",
                            ].join(" "),
                      ].join(" ")}
                      aria-expanded={isActive}>
                      <span className="block text-[22px] font-medium leading-tight">
                        {value.title}
                      </span>
                      <span
                        className={[
                          "block overflow-hidden text-[15px] leading-[1.65] transition-all duration-300",
                          isActive ? "" : "mt-0 max-h-0 opacity-0",
                        ].join(" ")}>
                        {value.body}
                      </span>
                      {isActive && (
                        <span className="mt-5 inline-flex text-[14px] font-medium text-red underline decoration-red underline-offset-4">
                          Saber más
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
