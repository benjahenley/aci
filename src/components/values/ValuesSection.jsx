import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { values } from "../../data/values.js";
import Eyebrow from "../ui/Eyebrow.jsx";
import ValuesVisual from "./ValuesVisual.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function ValuesSection() {
  const [active, setActive] = useState(values[0].id);
  const [itemsClickable, setItemsClickable] = useState(true);
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
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
    if (!section || !panel) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return undefined;

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 1024px)", () => {
      let lastIndex = 0;

      const scrollTrigger = ScrollTrigger.create({
        trigger: panel,
        start: "center center",
        end: () => `+=${Math.max(window.innerHeight * 1.1, values.length * 420)}`,
        pin: section,
        pinSpacing: true,
        scrub: 0.2,
        anticipatePin: 1,
        refreshPriority: 0,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.min(
            values.length - 1,
            Math.round(self.progress * (values.length - 1)),
          );
          if (nextIndex !== lastIndex) {
            lastIndex = nextIndex;
            setActive(values[nextIndex].id);
          }
        },
      });

      requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });

      return () => scrollTrigger.kill();
    });

    return () => matchMedia.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sostenibilidad"
      className="bg-bone px-6 py-24 md:px-10 md:py-32">
      <div
        ref={panelRef}
        className="mx-auto max-w-[1360px] rounded-[28px] bg-tint px-5 py-8 md:px-8 md:py-10 lg:p-12">
        <div className="mx-auto max-w-[860px] text-center">
          <Eyebrow className="justify-center">Método</Eyebrow>
          <p className="mt-5 font-display text-[34px] font-[430] leading-[1.08] text-charcoal md:text-[48px]">
            Hacer las cosas bien, con evidencia operativa y continuidad.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-stretch">
          <ValuesVisual />

          <div className="rounded-[22px] bg-paper p-4 shadow-[0_28px_80px_-54px_rgba(26,26,26,0.45)] md:p-7">
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
    </section>
  );
}
