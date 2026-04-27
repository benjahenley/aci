import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { values } from "../../data/values.js";
import Eyebrow from "../ui/Eyebrow.jsx";
import ValuesVisual from "./ValuesVisual.jsx";

gsap.registerPlugin(ScrollTrigger);

const LIQUID_REVEAL_DURATION = 1;
const VALUES_STEP_DURATION = 1.35;
const VALUES_SWITCH_DURATION = (values.length - 1) * VALUES_STEP_DURATION;
const BUILDINGS_REVEAL_AT = 0.16;
const PEOPLE_REVEAL_AT = LIQUID_REVEAL_DURATION + VALUES_STEP_DURATION * 0.28;
const RED_LINES_REVEAL_AT =
  LIQUID_REVEAL_DURATION + VALUES_STEP_DURATION * 1.32;
const LIQUID_REVEAL_END_PROGRESS =
  LIQUID_REVEAL_DURATION / (LIQUID_REVEAL_DURATION + VALUES_SWITCH_DURATION);
const METHOD_BLOB_SHAPES = [
  {
    borderTopLeftRadius: "24px",
    borderTopRightRadius: "42px",
    borderBottomRightRadius: "28px",
    borderBottomLeftRadius: "36px",
  },
  {
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "24px",
    borderBottomRightRadius: "38px",
    borderBottomLeftRadius: "26px",
  },
  {
    borderTopLeftRadius: "30px",
    borderTopRightRadius: "34px",
    borderBottomRightRadius: "24px",
    borderBottomLeftRadius: "44px",
  },
];

export default function ValuesSection() {
  const [active, setActive] = useState(values[0].id);
  const [hovered, setHovered] = useState(null);
  const [itemsClickable, setItemsClickable] = useState(true);
  const [methodDark, setMethodDark] = useState(false);
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const panelSurfaceRef = useRef(null);
  const liquidRef = useRef(null);
  const visualOriginRef = useRef(null);
  const methodListRef = useRef(null);
  const methodBlobRef = useRef(null);
  const methodItemRefs = useRef(new Map());
  const methodDarkRef = useRef(false);
  const highlighted = hovered ?? active;
  const expanded = hovered ?? active;
  const activeIndex = values.findIndex((value) => value.id === active);
  const highlightedIndex = Math.max(
    0,
    values.findIndex((value) => value.id === highlighted),
  );

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
      const buildingLines = gsap.utils.toArray(
        visualOrigin.querySelectorAll('[data-values-visual="building-line"]'),
      );
      const people = gsap.utils.toArray(
        visualOrigin.querySelectorAll('[data-values-visual="people"] > *'),
      );
      const redLines = gsap.utils.toArray(
        visualOrigin.querySelectorAll('[data-values-visual="red-line"]'),
      );
      const redNodes = gsap.utils.toArray(
        visualOrigin.querySelectorAll('[data-values-visual="red-node"]'),
      );
      const caption = visualOrigin.querySelector(
        '[data-values-visual="caption"]',
      );
      const drawnLines = [...buildingLines, ...redLines];
      const visualNodes = [
        ...drawnLines,
        ...people,
        ...redNodes,
        caption,
      ].filter(Boolean);

      drawnLines.forEach((line) => {
        const length = line.getTotalLength();
        gsap.set(line, {
          autoAlpha: 1,
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });
      gsap.set(people, {
        autoAlpha: 0,
        scale: 0.94,
        transformOrigin: "50% 80%",
        y: 18,
      });
      gsap.set(redNodes, {
        autoAlpha: 0,
        scale: 0,
        transformOrigin: "50% 50%",
      });
      if (caption) {
        gsap.set(caption, { autoAlpha: 0, y: 8 });
      }

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
            x: () => section.offsetWidth * -0.1,
            y: () => section.offsetHeight * -0.1,
            width: () => section.offsetWidth * 1.2,
            height: () => section.offsetHeight * 1.2,
            borderTopLeftRadius: "38%",
            borderTopRightRadius: "22%",
            borderBottomRightRadius: "34%",
            borderBottomLeftRadius: "28%",
            duration: 0.76,
            ease: "power1.inOut",
          },
          0,
        )
        .to(
          liquid,
          {
            borderRadius: "0px",
            duration: 0.24,
            ease: "power1.out",
          },
          0.76,
        )
        .to(panelSurface, { opacity: 0, duration: 0.24 }, 0.08)
        .to({}, { duration: VALUES_SWITCH_DURATION }, LIQUID_REVEAL_DURATION)
        .to(
          buildingLines,
          {
            strokeDashoffset: 0,
            duration: 0.54,
            ease: "power1.out",
            stagger: 0.04,
          },
          BUILDINGS_REVEAL_AT,
        )
        .to(
          people,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.66,
            ease: "power3.out",
            stagger: 0.12,
          },
          PEOPLE_REVEAL_AT,
        )
        .to(
          redLines,
          {
            strokeDashoffset: 0,
            duration: 0.58,
            ease: "power1.inOut",
            stagger: 0.1,
          },
          RED_LINES_REVEAL_AT,
        )
        .to(
          redNodes,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.8)",
            stagger: 0.05,
          },
          RED_LINES_REVEAL_AT + 0.42,
        );

      if (caption) {
        timeline.to(
          caption,
          {
            autoAlpha: 0.72,
            y: 0,
            duration: 0.28,
            ease: "power2.out",
          },
          RED_LINES_REVEAL_AT + 0.58,
        );
      }

      requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        gsap.set([liquid, panelSurface], { clearProps: "all" });
        gsap.set(visualNodes, { clearProps: "all" });
        setMethodTone(false);
      };
    });

    return () => matchMedia.revert();
  }, []);

  useLayoutEffect(() => {
    const list = methodListRef.current;
    const blob = methodBlobRef.current;
    if (!list || !blob) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let isFirstUpdate = true;

    const measureTarget = () => {
      const item = methodItemRefs.current.get(highlighted);
      if (!item) return null;
      const listRect = list.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const shape = METHOD_BLOB_SHAPES[highlightedIndex];
      return {
        x: itemRect.left - listRect.left,
        y: itemRect.top - listRect.top,
        width: itemRect.width,
        height: itemRect.height,
        autoAlpha: 1,
        ...shape,
      };
    };

    const updateBlob = () => {
      const target = measureTarget();
      if (!target) return;

      if (prefersReducedMotion) {
        gsap.set(blob, target);
        return;
      }

      if (isFirstUpdate) {
        isFirstUpdate = false;
        gsap.killTweensOf(blob);
        const timeline = gsap.timeline();
        timeline
          .to(blob, {
            ...target,
            duration: 0.7,
            ease: "elastic.out(1, 0.72)",
          })
          .fromTo(
            blob,
            {
              scaleX: highlightedIndex % 2 === 0 ? 0.985 : 1.015,
              scaleY: highlightedIndex % 2 === 0 ? 1.035 : 0.975,
              transformOrigin: "50% 50%",
            },
            {
              scaleX: 1,
              scaleY: 1,
              duration: 0.78,
              ease: "elastic.out(1, 0.48)",
            },
            0,
          );
      } else {
        gsap.to(blob, {
          ...target,
          duration: 0.32,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    updateBlob();

    const resizeObserver = new ResizeObserver(updateBlob);
    methodItemRefs.current.forEach((node) => resizeObserver.observe(node));

    return () => {
      resizeObserver.disconnect();
      gsap.killTweensOf(blob);
    };
  }, [highlighted, highlightedIndex]);

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

              <div
                ref={methodListRef}
                className="relative space-y-2 overflow-hidden rounded-[20px]"
                onMouseLeave={() => setHovered(null)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setHovered(null);
                  }
                }}>
                <div
                  ref={methodBlobRef}
                  className="pointer-events-none absolute left-0 top-0 z-0 bg-card-dark opacity-0 shadow-[0_22px_58px_-30px_rgba(26,26,26,0.9)] will-change-[border-radius,height,transform,width]"
                  aria-hidden
                />
                {values.map((value) => {
                  const isActive = value.id === active;
                  const isHighlighted = value.id === highlighted;
                  const isExpanded = value.id === expanded;
                  return (
                    <button
                      key={value.id}
                      ref={(node) => {
                        if (node) methodItemRefs.current.set(value.id, node);
                        else methodItemRefs.current.delete(value.id);
                      }}
                      type="button"
                      onMouseEnter={() => setHovered(value.id)}
                      onFocus={() => setHovered(value.id)}
                      onClick={() => {
                        if (itemsClickable) {
                          setActive(value.id);
                          setHovered(value.id);
                        }
                      }}
                      tabIndex={itemsClickable ? undefined : -1}
                      className={[
                        "relative z-10 block w-full rounded-[18px] px-5 py-5 text-left transition-colors duration-300 lg:cursor-default",
                        isHighlighted
                          ? "text-paper"
                          : isActive
                            ? "text-charcoal"
                            : "text-ink-mute",
                      ].join(" ")}
                      aria-expanded={isExpanded}>
                      <span className="block text-[22px] font-medium leading-tight transition-colors duration-300">
                        {value.title}
                      </span>
                      <span
                        className={[
                          "block overflow-hidden text-[15px] leading-[1.65] transition-all duration-300",
                          isExpanded ? "mt-3 max-h-40" : "mt-0 max-h-0",
                          isHighlighted
                            ? "text-paper/80 opacity-100"
                            : "text-ink-mute opacity-90",
                        ].join(" ")}>
                        {value.body}
                      </span>
                      <span
                        className={[
                          "inline-flex hover:text-red hover:decoration-red justify-end w-full overflow-hidden text-[14px] font-medium underline underline-offset-4 transition-all duration-300",
                          isExpanded
                            ? "mt-5 max-h-8 opacity-100"
                            : "mt-0 max-h-0 opacity-0",
                          isHighlighted
                            ? "text-paper decoration-paper/60"
                            : "text-red decoration-red",
                        ].join(" ")}
                        aria-hidden={!isExpanded}>
                        Saber más
                      </span>
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
