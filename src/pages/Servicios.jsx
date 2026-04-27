import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocation } from 'react-router-dom'
import CtaBand from '../components/cta/CtaBand.jsx'
import Footer from '../components/footer/Footer.jsx'
import ServiceArtwork from '../components/services/ServiceArtwork.jsx'
import Eyebrow from '../components/ui/Eyebrow.jsx'
import PillButton from '../components/ui/PillButton.jsx'
import { services } from '../data/services.js'

gsap.registerPlugin(ScrollTrigger)

const DETAILS = {
  tecnicos: {
    scope: [
      'Instalaciones eléctricas de baja y media tensión',
      'Tableros, automatización y BMS',
      'Climatización (VRF, splits, chillers, fan-coils)',
      'Electromecánica e instalaciones electrónicas',
      'Mantenimiento predictivo y preventivo programado',
      'Obras menores y reformas técnicas',
    ],
    deliverables: [
      'Plan anual de mantenimiento preventivo',
      'Reportes mensuales con KPIs e historial de intervenciones',
      'Guardia técnica 24/7 con SLA ≤ 12 minutos',
      'Stock crítico y repuestos in-situ',
    ],
  },
  operativos: {
    scope: [
      'Limpieza general y técnica de edificios corporativos',
      'Limpieza de obra y post-construcción',
      'Jardinería, paisajismo y mantenimiento de espacios verdes',
      'Desinfección y control integral de plagas (MIP)',
      'Vigilancia y seguridad operativa',
      'Personal en planta con uniforme y EPP propios',
    ],
    deliverables: [
      'Equipos auto-prestados, sin tercerización',
      'Auditorías cruzadas mensuales con checklist firmado',
      'Capacitación continua en higiene y seguridad',
      'Productos certificados y trazabilidad de insumos',
    ],
  },
  gestion: {
    scope: [
      'Administración integral de oficinas y servicios',
      'Logística para transporte de mercaderías y mudanzas internas',
      'Gestión de compras, proveedores y conciliación',
      'Asesoramiento en dirección y gestión empresarial',
      'Onboarding de proveedores y control documental',
      'Control presupuestario y forecasting operativo',
    ],
    deliverables: [
      'Un único interlocutor por contrato',
      'Una sola factura mensual consolidada',
      'Tablero de control con KPIs por servicio y sector',
      'Revisiones trimestrales de mejora continua',
    ],
  },
}

const PROCESS = [
  {
    code: '01',
    title: 'Relevamiento',
    body:
      'Visitamos tus instalaciones, mapeamos turnos, criticidades y proveedores actuales. Sin compromiso.',
  },
  {
    code: '02',
    title: 'Propuesta',
    body:
      'Diseñamos un modelo de servicio realista, con SLAs, KPIs y un esquema de precios claro y medible.',
  },
  {
    code: '03',
    title: 'Implementación',
    body:
      'Onboarding del personal propio, equipamiento y stock crítico. Transición ordenada en 30 días.',
  },
  {
    code: '04',
    title: 'Operación',
    body:
      'Reportes mensuales, auditorías cruzadas y revisión trimestral de mejora continua con tu equipo.',
  },
]

const FAQ = [
  {
    q: '¿Trabajan con personal propio o tercerizado?',
    a: 'Toda la operación es auto-prestada con personal en relación de dependencia, uniforme y EPP propios. Es nuestro principal diferencial.',
  },
  {
    q: '¿En qué zonas operan?',
    a: 'CABA y AMBA con cobertura completa. Para proyectos puntuales evaluamos otras regiones del país.',
  },
  {
    q: '¿Qué SLA garantizan?',
    a: 'Tiempo medio de respuesta de 12 minutos para guardia técnica y resolución según criticidad pactada en contrato.',
  },
  {
    q: '¿Pueden tomar contratos de servicios separados?',
    a: 'Sí. Aunque la propuesta integral es nuestra fortaleza, también prestamos servicios individuales según necesidad.',
  },
]

function CategoryBlock({ service, index }) {
  const detail = DETAILS[service.id]
  const reversed = index % 2 === 1
  return (
    <article
      id={service.id}
      data-service-block
      className="grid grid-cols-1 gap-10 border-t border-hairline pt-16 lg:grid-cols-12 lg:gap-14 lg:pt-24"
    >
      <div
        className={[
          'lg:col-span-6',
          reversed ? 'lg:order-2' : '',
        ].join(' ')}
      >
        <div
          data-service-art
          className="overflow-hidden rounded-[20px] bg-charcoal ring-1 ring-hairline shadow-[0_32px_80px_-54px_rgba(26,26,26,0.55)]"
        >
          <div data-service-art-inner className="aspect-[4/3.65] lg:aspect-[4/4.25]">
            <ServiceArtwork serviceId={service.id} showLabel={false} />
          </div>
        </div>
      </div>

      <div
        data-service-copy
        className={['lg:col-span-6', reversed ? 'lg:order-1' : ''].join(' ')}
      >
        <p
          data-service-copy-item
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-red">
          {service.code}
        </p>
        <h2
          data-service-copy-item
          className="mt-4 font-display text-charcoal"
          style={{
            fontVariationSettings: '"opsz" 60, "wght" 480',
            letterSpacing: '-0.02em',
            lineHeight: 1.04,
            fontSize: 'clamp(34px, 3.6vw, 46px)',
          }}
        >
          {service.title}
        </h2>
        <p
          data-service-copy-item
          className="mt-6 max-w-[58ch] text-[16.5px] leading-[1.65] text-ink">
          {service.body}
        </p>

        <div
          data-service-lists
          className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div data-service-list>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
              Alcance
            </p>
            <ul className="mt-4 space-y-3">
              {detail.scope.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[14.5px] leading-snug text-ink"
                >
                  <span className="mt-[7px] size-1 shrink-0 rounded-full bg-red" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-service-list>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
              Qué entregamos
            </p>
            <ul className="mt-4 space-y-3">
              {detail.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[14.5px] leading-snug text-ink"
                >
                  <span className="mt-[7px] size-1 shrink-0 rounded-full bg-red" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-service-cta className="mt-12">
          <PillButton
            as="a"
            href="#contacto"
            variant="ghost"
            aria-label={`Pedir propuesta de ${service.title}`}
            className="!text-[17px] md:!text-[18px]"
          >
            Pedir propuesta
          </PillButton>
        </div>
      </div>
    </article>
  )
}

export default function Servicios() {
  const { hash } = useLocation()
  const pageRef = useRef(null)

  useLayoutEffect(() => {
    const page = pageRef.current
    if (!page) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return undefined

    const context = gsap.context(() => {
      const hero = page.querySelector('[data-servicios-hero]')
      const heroItems = gsap.utils.toArray('[data-servicios-hero-item]')
      const heroStripe = page.querySelector('[data-servicios-hero-stripe]')

      if (hero) {
        gsap.set(heroItems, {
          autoAlpha: 0,
          y: 34,
          filter: 'blur(10px)',
        })
        gsap.set(heroStripe, {
          autoAlpha: 0,
          xPercent: 10,
          scale: 1.06,
        })

        gsap
          .timeline({ defaults: { ease: 'power4.out' } })
          .to(heroStripe, {
            autoAlpha: 1,
            xPercent: 0,
            scale: 1,
            duration: 1.15,
          })
          .to(
            heroItems,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.95,
              stagger: 0.1,
            },
            0.08,
          )
      }

      gsap.utils.toArray('[data-service-block]').forEach((block) => {
        const art = block.querySelector('[data-service-art]')
        const artInner = block.querySelector('[data-service-art-inner]')
        const copyItems = gsap.utils.toArray(
          '[data-service-copy-item]',
          block,
        )
        const lists = gsap.utils.toArray('[data-service-list]', block)
        const cta = block.querySelector('[data-service-cta]')

        gsap.set(art, {
          autoAlpha: 0,
          y: 48,
          scale: 0.965,
          filter: 'blur(12px)',
          clipPath: 'inset(10% 0% 0% 0% round 20px)',
        })
        gsap.set(artInner, { scale: 1.08 })
        gsap.set(copyItems, {
          autoAlpha: 0,
          y: 26,
          filter: 'blur(8px)',
        })
        gsap.set(lists, {
          autoAlpha: 0,
          y: 28,
          filter: 'blur(8px)',
        })
        gsap.set(cta, {
          autoAlpha: 0,
          y: 18,
          scale: 0.98,
        })

        gsap
          .timeline({
            defaults: { ease: 'power4.out' },
            scrollTrigger: {
              trigger: block,
              start: 'top 64%',
              once: true,
            },
          })
          .to(art, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            clipPath: 'inset(0% 0% 0% 0% round 20px)',
            duration: 1,
          })
          .to(
            artInner,
            {
              scale: 1,
              duration: 1.15,
            },
            0,
          )
          .to(
            copyItems,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.78,
              stagger: 0.08,
            },
            0.18,
          )
          .to(
            lists,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.72,
              stagger: 0.1,
            },
            0.52,
          )
          .to(
            cta,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              ease: 'power3.out',
            },
            0.82,
          )
      })

      gsap.utils.toArray('[data-page-reveal]').forEach((section) => {
        const intro = gsap.utils.toArray('[data-reveal-intro]', section)
        const items = gsap.utils.toArray('[data-reveal-item]', section)

        gsap.set(intro, {
          autoAlpha: 0,
          y: 30,
          filter: 'blur(10px)',
        })
        gsap.set(items, {
          autoAlpha: 0,
          y: 34,
          scale: 0.985,
          filter: 'blur(8px)',
        })

        gsap
          .timeline({
            defaults: { ease: 'power4.out' },
            scrollTrigger: {
              trigger: section,
              start: 'top 66%',
              once: true,
            },
          })
          .to(intro, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.82,
            stagger: 0.08,
          })
          .to(
            items,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.78,
              stagger: 0.08,
            },
            0.24,
          )
      })
    }, page)

    return () => context.revert()
  }, [])

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [hash])

  return (
    <div ref={pageRef}>
      <section
        data-servicios-hero
        className="aci-grain relative isolate overflow-hidden bg-bone pb-16 pt-12 md:pb-20 md:pt-16">
        <div
          data-servicios-hero-stripe
          aria-hidden
          className="aci-stripes-strong pointer-events-none absolute -right-[20%] -top-[18%] z-0 h-[120%] w-[55%] origin-top-right"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10">
          <div data-servicios-hero-item>
            <Eyebrow>Servicios · ACI Facility Management</Eyebrow>
          </div>
          <h1
            data-servicios-hero-item
            className="mt-8 max-w-[18ch] font-display text-charcoal"
            style={{
              fontVariationSettings: '"opsz" 96, "wght" 480',
              letterSpacing: '-0.026em',
              lineHeight: 1.0,
              fontSize: 'clamp(48px, 6vw, 88px)',
            }}
          >
            Tres pilares.
            <br />
            <span style={{ fontVariationSettings: '"opsz" 96, "wght" 620' }}>
              Una sola operación
            </span>
            <span className="text-red">.</span>
          </h1>
          <p
            data-servicios-hero-item
            className="mt-8 max-w-[60ch] text-[17px] leading-[1.6] text-ink">
            Hard FM, Soft FM y back-office bajo un mismo paraguas. Personal
            propio, una factura mensual y un único interlocutor para todo lo que
            tu edificio necesita.
          </p>
          <div data-servicios-hero-item className="mt-10 flex flex-wrap gap-3">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-paper/60 px-4 py-2 text-[13px] font-medium text-charcoal transition-colors hover:border-red hover:text-red"
              >
                <span className="font-mono text-[10px] tracking-[0.18em] text-red">
                  {s.code.split(' / ')[0]}
                </span>
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bone pb-24 md:pb-32">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-20 px-6 md:px-10 lg:gap-28">
          {services.map((service, i) => (
            <CategoryBlock key={service.id} service={service} index={i} />
          ))}
        </div>
      </section>

      <section data-page-reveal className="bg-tint py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div data-reveal-intro>
                <Eyebrow>Cómo trabajamos</Eyebrow>
              </div>
              <h2
                data-reveal-intro
                className="mt-8 font-display text-charcoal"
                style={{
                  fontVariationSettings: '"opsz" 60, "wght" 460',
                  letterSpacing: '-0.022em',
                  lineHeight: 1.04,
                  fontSize: 'clamp(34px, 3.6vw, 48px)',
                }}
              >
                De la primera visita
                <br />
                a la operación diaria.
              </h2>
              <p
                data-reveal-intro
                className="mt-6 max-w-[36ch] text-[16px] leading-[1.65] text-ink-mute">
                Un proceso claro de cuatro etapas para que el cambio de
                proveedor no interrumpa tu operación.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-[20px] bg-hairline ring-1 ring-hairline md:grid-cols-2">
                {PROCESS.map((step) => (
                  <li
                    key={step.code}
                    data-reveal-item
                    className="flex flex-col gap-4 bg-paper p-8"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-red">
                      {step.code}
                    </span>
                    <h3
                      className="font-display text-[24px] leading-[1.1] text-charcoal"
                      style={{ fontVariationSettings: '"opsz" 36, "wght" 540' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[14.5px] leading-[1.6] text-ink-mute">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section data-page-reveal className="bg-bone py-24 md:py-32">
        <div className="mx-auto w-full max-w-[1100px] px-6 md:px-10">
          <div data-reveal-intro>
            <Eyebrow>Preguntas frecuentes</Eyebrow>
          </div>
          <h2
            data-reveal-intro
            className="mt-8 font-display text-charcoal"
            style={{
              fontVariationSettings: '"opsz" 60, "wght" 460',
              letterSpacing: '-0.02em',
              lineHeight: 1.04,
              fontSize: 'clamp(32px, 3.4vw, 44px)',
            }}
          >
            Lo que más nos preguntan.
          </h2>
          <div className="mt-12 divide-y divide-hairline border-y border-hairline">
            {FAQ.map((item) => (
              <details
                key={item.q}
                data-reveal-item
                className="group py-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-6 text-[17px] font-medium text-charcoal">
                  {item.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-charcoal/15 text-charcoal transition-all group-open:rotate-45 group-open:border-red group-open:text-red">
                    <svg viewBox="0 0 16 16" className="size-3" fill="none">
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.65] text-ink-mute">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div data-page-reveal>
        <div data-reveal-item>
          <CtaBand />
        </div>
      </div>
      <Footer />
    </div>
  )
}
