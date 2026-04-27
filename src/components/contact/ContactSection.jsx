import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "../ui/Eyebrow.jsx";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_LINKS = [
  {
    label: "contacto@acifm.com.ar",
    sub: "Email comercial",
    href: "mailto:contacto@acifm.com.ar",
  },
  {
    label: "+54 11 4321-8800",
    sub: "Línea directa",
    href: "tel:+541143218800",
  },
  {
    label: "WhatsApp",
    sub: "Lun a Vie · 9 a 18 hs",
    href: "https://wa.me/5491143218800",
  },
];

const INITIAL_FORM = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
};

function Field({
  label,
  name,
  type = "text",
  required = false,
  value,
  onChange,
  textarea = false,
}) {
  const wrapperRef = useRef(null);
  const underlineRef = useRef(null);
  const [focused, setFocused] = useState(false);

  useLayoutEffect(() => {
    const underline = underlineRef.current;
    if (!underline) return undefined;
    gsap.set(underline, { scaleX: 0, transformOrigin: "left center" });
  }, []);

  useLayoutEffect(() => {
    const underline = underlineRef.current;
    if (!underline) return undefined;
    gsap.to(underline, {
      scaleX: focused || value ? 1 : 0,
      duration: 0.45,
      ease: "expo.out",
    });
  }, [focused, value]);

  const inputProps = {
    id: name,
    name,
    value,
    onChange: (event) => onChange(name, event.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    required,
    className:
      "block w-full bg-transparent pb-3 pt-5 font-sans text-[16px] text-charcoal placeholder-transparent outline-none focus:outline-none focus-visible:outline-none",
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label
        htmlFor={name}
        className={[
          "absolute left-0 origin-left font-mono uppercase tracking-[0.18em] transition-all duration-300 pointer-events-none",
          focused || value
            ? "top-0 text-[10px] text-red"
            : "top-5 text-[12px] text-ink-mute",
        ].join(" ")}>
        {label}
        {required ? <span className="ml-1 text-red">*</span> : null}
      </label>
      {textarea ? (
        <textarea rows={4} {...inputProps} />
      ) : (
        <input type={type} {...inputProps} />
      )}
      <div className="relative h-px w-full bg-hairline">
        <div ref={underlineRef} className="absolute inset-0 h-px bg-red" />
      </div>
    </div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const linksRef = useRef(null);
  const cardRef = useRef(null);
  const stripeRef = useRef(null);
  const successRef = useRef(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleConsent = (event) => {
    setForm((prev) => ({ ...prev, consent: event.target.checked }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    const subject = `Consulta de ${form.name}${form.company ? ` · ${form.company}` : ""}`;
    const lines = [
      `Nombre: ${form.name}`,
      form.company ? `Empresa: ${form.company}` : null,
      `Email: ${form.email}`,
      form.phone ? `Teléfono: ${form.phone}` : null,
      "",
      "Mensaje:",
      form.message,
      "",
      `Acepta recibir novedades: ${form.consent ? "Sí" : "No"}`,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:contacto@acifm.com.ar?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(lines)}`;

    window.location.href = mailto;
    setStatus("sent");

    const success = successRef.current;
    if (success) {
      gsap.fromTo(
        success,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "expo.out" },
      );
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setStatus("idle");
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const links = linksRef.current;
    const card = cardRef.current;
    const stripe = stripeRef.current;
    if (!section || !header || !card) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const headerNodes = header.querySelectorAll("[data-contact-rise]");
      const linkNodes = links?.querySelectorAll("[data-contact-link]") ?? [];
      const fieldNodes = card.querySelectorAll("[data-contact-field]");

      gsap.set(headerNodes, { autoAlpha: 0, y: 28 });
      gsap.set(linkNodes, { autoAlpha: 0, y: 18 });
      gsap.set(card, { autoAlpha: 0, y: 36 });
      gsap.set(fieldNodes, { autoAlpha: 0, y: 18 });
      if (stripe) {
        gsap.set(stripe, {
          autoAlpha: 0,
          scaleY: 0,
          transformOrigin: "top center",
        });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 25%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "expo.out", duration: 0.9 },
      });

      timeline
        .to(headerNodes, { autoAlpha: 1, y: 0, stagger: 0.08 }, 0)
        .to(linkNodes, { autoAlpha: 1, y: 0, stagger: 0.08 }, 0.2)
        .to(card, { autoAlpha: 1, y: 0 }, 0.18)
        .to(fieldNodes, { autoAlpha: 1, y: 0, stagger: 0.06 }, 0.32);

      if (stripe) {
        timeline.to(stripe, { autoAlpha: 1, scaleY: 1, duration: 1.1 }, 0.1);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative overflow-hidden bg-bone px-6 py-24 md:px-10 md:py-32">
      <div
        ref={stripeRef}
        aria-hidden
        className="aci-stripes pointer-events-none absolute -right-24 top-0 hidden h-full w-[800px] opacity-70 lg:block"
      />
      <div className="relative mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div ref={headerRef} className="lg:sticky lg:top-32">
          <div data-contact-rise>
            <Eyebrow>Contacto</Eyebrow>
          </div>
          <h2
            data-contact-rise
            className="mt-6 font-display text-[42px] font-[430] leading-[1.04] text-charcoal md:text-[58px]">
            Contanos qué necesita tu edificio.
            <span className="text-red"> Respondemos en menos de 24 hs.</span>
          </h2>

          <div ref={linksRef} className="mt-12 flex flex-col gap-3">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-contact-link
                className="group flex items-center justify-between gap-6 rounded-[18px] border border-hairline bg-paper px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-red hover:shadow-[0_22px_40px_-30px_rgba(232,38,42,0.4)]">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                    {link.sub}
                  </p>
                  <p className="mt-1 font-display text-[20px] font-[430] text-charcoal transition-colors duration-300 group-hover:text-red">
                    {link.label}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-hairline text-charcoal transition-all duration-300 group-hover:border-red group-hover:bg-red group-hover:text-paper">
                  <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
              </a>
            ))}
          </div>

          <div data-contact-rise className="mt-12 flex items-center gap-4">
            <span className="block h-px w-12 bg-red" />
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
              México 463 · CABA · Argentina
            </p>
          </div>
        </div>

        <div className="relative">
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-[24px] bg-paper p-7 shadow-[0_36px_90px_-58px_rgba(26,26,26,0.45)] md:p-10">
            {status === "sent" ? (
              <div ref={successRef} className="py-12 text-center">
                <div className="mx-auto grid size-16 place-items-center rounded-full bg-tint">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-7 text-red">
                    <path
                      d="M5 12.5l4.5 4.5L19 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="square"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-[28px] font-[430] text-charcoal">
                  Mensaje en camino.
                </h3>
                <p className="mx-auto mt-3 max-w-[36ch] text-[15px] leading-[1.6] text-ink-mute">
                  Acabamos de abrir tu cliente de correo con la consulta. Si no
                  se abrió, escribinos a{" "}
                  <a
                    className="font-medium text-red underline underline-offset-4"
                    href="mailto:contacto@acifm.com.ar">
                    contacto@acifm.com.ar
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal underline underline-offset-4 transition-colors hover:text-red">
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-7"
                noValidate>
                <div data-contact-field>
                  <Field
                    label="Nombre"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div data-contact-field className="grid gap-7 md:grid-cols-2">
                  <Field
                    label="Empresa"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                  />
                  <Field
                    label="Teléfono"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div data-contact-field>
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div data-contact-field>
                  <Field
                    label="Contanos qué necesitás"
                    name="message"
                    textarea
                    required
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <label
                  data-contact-field
                  className="flex cursor-pointer items-start gap-3 pt-2 text-[14px] leading-[1.55] text-ink select-none">
                  <span className="relative mt-0.5 inline-flex size-5 shrink-0">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={handleConsent}
                      className="peer absolute inset-0 cursor-pointer opacity-0"
                    />
                    <span className="grid size-5 place-items-center rounded border border-hairline bg-paper transition-all duration-200 peer-checked:border-red peer-checked:bg-red peer-focus-visible:border-red">
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="size-3 text-paper opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                        style={{ opacity: form.consent ? 1 : 0 }}>
                        <path
                          d="M3 8.5l3 3 7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </span>
                  <span>
                    Acepto recibir novedades, casos y publicaciones de ACI por
                    email. Podés darte de baja cuando quieras.
                  </span>
                </label>

                <div data-contact-field className="pt-3">
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-between gap-3 rounded-full bg-red px-7 py-4 font-sans text-[15px] font-medium text-paper transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-red-hover cursor-pointer">
                    <span>Enviar consulta</span>
                    <span
                      aria-hidden
                      className="grid size-7 place-items-center rounded-full bg-paper/15 transition-transform duration-300 group-hover:translate-x-1">
                      <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="square"
                        />
                      </svg>
                    </span>
                  </button>
                  <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                    Al enviar aceptás nuestra política de privacidad.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
