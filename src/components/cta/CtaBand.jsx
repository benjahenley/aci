import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import PillButton from "../ui/PillButton.jsx";

export default function CtaBand() {
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    if (!section || !cursor) return undefined;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!finePointer) return undefined;

    gsap.set(cursor, {
      autoAlpha: 0,
      scale: prefersReducedMotion ? 1 : 0.78,
      xPercent: -50,
      yPercent: -50,
    });

    const moveX = gsap.quickTo(cursor, "x", {
      duration: prefersReducedMotion ? 0 : 0.28,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(cursor, "y", {
      duration: prefersReducedMotion ? 0 : 0.28,
      ease: "power3.out",
    });

    const move = (event) => {
      const rect = section.getBoundingClientRect();
      moveX(event.clientX - rect.left);
      moveY(event.clientY - rect.top);
    };
    const show = (event) => {
      move(event);
      gsap.to(cursor, {
        autoAlpha: 1,
        scale: 1,
        duration: prefersReducedMotion ? 0 : 0.24,
        ease: "power3.out",
      });
    };
    const hide = () => {
      gsap.to(cursor, {
        autoAlpha: 0,
        scale: prefersReducedMotion ? 1 : 0.78,
        duration: prefersReducedMotion ? 0 : 0.18,
        ease: "power2.out",
      });
    };

    section.addEventListener("pointerenter", show);
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", hide);

    return () => {
      section.removeEventListener("pointerenter", show);
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", hide);
      gsap.killTweensOf(cursor);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative overflow-hidden bg-charcoal px-6 py-18 text-paper md:px-10 md:py-24">
      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 z-20 hidden size-[168px] rounded-full border-2 border-red bg-red/5 opacity-0 shadow-[0_0_58px_-18px_rgba(232,38,42,0.9)] will-change-transform lg:block"
        aria-hidden
      />
      <div className="relative z-10 mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/55">
            Propuesta operativa
          </span>
          <h2 className="mt-5 max-w-[720px] font-display text-[42px] font-[430] leading-[1.04] text-paper md:text-[58px]">
            Hablemos sobre tu edificio antes de que el problema aparezca.
          </h2>
          <p className="mt-6 max-w-[58ch] text-[16px] leading-[1.7] text-paper/62">
            Relevamos instalaciones, turnos, criticidades y proveedores actuales
            para proponer un modelo de servicio realista, medible y fácil de
            gobernar.
          </p>
        </div>

        <div className="lg:justify-self-end">
          <div className="rounded-[20px] bg-paper p-5 text-charcoal md:p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              Contacto directo
            </p>
            <div className="mt-5 space-y-3 text-[16px]">
              <a
                className="block transition-colors hover:text-red"
                href="mailto:contacto@acifm.com.ar">
                contacto@acifm.com.ar
              </a>
              <a
                className="block transition-colors hover:text-red"
                href="tel:+541143218800">
                +54 11 4321-8800
              </a>
              <a
                className="block transition-colors hover:text-red"
                href="https://wa.me/5491143218800">
                WhatsApp comercial
              </a>
            </div>
            <div className="mt-7">
              <PillButton as="a" href="mailto:contacto@acifm.com.ar">
                Solicitar propuesta
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
