import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import PillButton from "../ui/PillButton.jsx";

const CURSOR_SIZE = 168;
const CURSOR_RADIUS = CURSOR_SIZE / 2;
const CURSOR_TONES = {
  red: {
    borderColor: "#E8262A",
    backgroundColor: "rgba(232, 38, 42, 0.05)",
    boxShadow: "0 0 58px -18px rgba(232, 38, 42, 0.9)",
  },
  dark: {
    borderColor: "#1A1A1A",
    backgroundColor: "rgba(26, 26, 26, 0.08)",
    boxShadow: "0 0 58px -18px rgba(26, 26, 26, 0.55)",
  },
};

const CONTACT_LINKS = [
  { label: "contacto@acifm.com.ar", href: "mailto:contacto@acifm.com.ar" },
  { label: "+54 11 4321-8800", href: "tel:+541143218800" },
  { label: "WhatsApp comercial", href: "https://wa.me/5491143218800" },
];

function ContactCardContent({ inverted = false }) {
  return (
    <>
      <p
        className={[
          "font-mono text-[10px] uppercase tracking-[0.18em]",
          inverted ? "text-paper/58" : "text-ink-mute",
        ].join(" ")}>
        Contacto directo
      </p>
      <div className="mt-5 space-y-3 text-[16px]">
        {CONTACT_LINKS.map((link) =>
          inverted ? (
            <span key={link.label} className="block text-paper">
              {link.label}
            </span>
          ) : (
            <a
              key={link.label}
              className="block transition-colors hover:text-red"
              href={link.href}>
              {link.label}
            </a>
          ),
        )}
      </div>
      <div className="mt-7">
        {inverted ? (
          <span className="group inline-flex select-none items-center gap-3 whitespace-nowrap rounded-full border border-red/30 bg-card-dark px-7 py-3.5 font-sans text-[15px] font-medium tracking-[0.005em] text-red shadow-[inset_0_0_0_1px_rgba(232,38,42,0.18)]">
            <span>Solicitar propuesta</span>
            <span
              aria-hidden
              className="grid size-5 place-items-center text-red">
              <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </span>
          </span>
        ) : (
          <PillButton as="a" href="mailto:contacto@acifm.com.ar">
            Solicitar propuesta
          </PillButton>
        )}
      </div>
    </>
  );
}

export default function CtaBand() {
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);
  const contactCardRef = useRef(null);
  const cardRevealRef = useRef(null);
  const cursorToneRef = useRef("red");
  const cardRevealVisibleRef = useRef(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    const contactCard = contactCardRef.current;
    const cardReveal = cardRevealRef.current;
    if (!section || !cursor || !contactCard || !cardReveal) return undefined;

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
      ...CURSOR_TONES.red,
    });
    gsap.set(cardReveal, {
      autoAlpha: 0,
      clipPath: `circle(${CURSOR_RADIUS}px at 50% 50%)`,
    });

    const moveX = gsap.quickTo(cursor, "x", {
      duration: prefersReducedMotion ? 0 : 0.28,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(cursor, "y", {
      duration: prefersReducedMotion ? 0 : 0.28,
      ease: "power3.out",
    });

    const setCursorTone = (tone) => {
      if (cursorToneRef.current === tone) return;
      cursorToneRef.current = tone;
      gsap.to(cursor, {
        ...CURSOR_TONES[tone],
        duration: prefersReducedMotion ? 0 : 0.16,
        ease: "power2.out",
      });
    };
    const setCardReveal = (visible) => {
      if (cardRevealVisibleRef.current === visible) return;
      cardRevealVisibleRef.current = visible;
      gsap.to(cardReveal, {
        autoAlpha: visible ? 1 : 0,
        duration: prefersReducedMotion ? 0 : 0.16,
        ease: "power2.out",
      });
    };
    const updateCardReveal = (event) => {
      const rect = contactCard.getBoundingClientRect();
      const cardX = event.clientX - rect.left;
      const cardY = event.clientY - rect.top;
      const insideCard =
        cardX >= 0 && cardX <= rect.width && cardY >= 0 && cardY <= rect.height;

      if (insideCard) {
        cardReveal.style.clipPath = `circle(${CURSOR_RADIUS}px at ${cardX}px ${cardY}px)`;
      }

      setCursorTone(insideCard ? "dark" : "red");
      setCardReveal(insideCard);
    };
    const move = (event) => {
      const rect = section.getBoundingClientRect();
      moveX(event.clientX - rect.left);
      moveY(event.clientY - rect.top);
      updateCardReveal(event);
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
      setCursorTone("red");
      setCardReveal(false);
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
      gsap.killTweensOf([cursor, cardReveal]);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-charcoal px-6 py-18 text-paper md:px-10 md:py-24">
      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 z-30 hidden size-[168px] rounded-full border-2 opacity-0 will-change-transform lg:block"
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
          <div
            ref={contactCardRef}
            className="relative overflow-hidden rounded-[20px] bg-paper p-5 text-charcoal md:p-7">
            <div className="relative z-10">
              <ContactCardContent />
            </div>
            <div
              ref={cardRevealRef}
              className="pointer-events-none absolute inset-0 z-20 bg-card-dark p-5 opacity-0 md:p-7"
              aria-hidden>
              <ContactCardContent inverted />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
