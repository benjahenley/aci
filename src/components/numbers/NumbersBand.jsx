import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NUMBERS = [
  {
    value: '12/25',
    count: {
      from: [0, 0],
      to: [12, 25],
      formatter: ([month, year]) =>
        `${String(month).padStart(2, '0')}/${String(year).padStart(2, '0')}`,
    },
    label: 'Alta registrada',
    note: 'Contrato social y actividad formal desde diciembre de 2025.',
  },
  {
    value: '8',
    count: {
      from: 0,
      to: 8,
      formatter: (value) => String(value),
    },
    label: 'Actividades ARCA',
    note: 'Técnicas, operativas, logísticas y administrativas bajo una misma sociedad.',
  },
  {
    value: '3',
    count: {
      from: 0,
      to: 3,
      formatter: (value) => String(value),
    },
    label: 'Familias de servicio',
    note: 'Hard FM, Soft FM y gestión integral para simplificar proveedores.',
  },
  {
    value: 'AMBA',
    label: 'Cobertura inicial',
    note: 'Base operativa en Ciudad Autónoma de Buenos Aires.',
  },
]

export default function NumbersBand() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const copyRef = useRef(null)
  const gridRef = useRef(null)
  const itemRefs = useRef([])
  const valueRefs = useRef([])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      valueRefs.current.forEach((node, index) => {
        if (node) node.textContent = NUMBERS[index].value
      })
      return undefined
    }

    const setCountText = (node, index, progress) => {
      const count = NUMBERS[index].count
      if (!node || !count) return

      if (Array.isArray(count.from) && Array.isArray(count.to)) {
        const values = count.to.map((target, partIndex) =>
          Math.round(
            count.from[partIndex] +
              (target - count.from[partIndex]) * progress,
          ),
        )
        node.textContent = count.formatter(values)
        return
      }

      node.textContent = count.formatter(
        Math.round(count.from + (count.to - count.from) * progress),
      )
    }

    const context = gsap.context(() => {
      const introNodes = [
        eyebrowRef.current,
        titleRef.current,
        copyRef.current,
      ].filter(Boolean)
      const cardNodes = itemRefs.current.filter(Boolean)

      gsap.set(introNodes, { autoAlpha: 0, y: 24 })
      gsap.set(gridRef.current, {
        autoAlpha: 0,
        y: 24,
        clipPath: 'inset(0% 0% 16% 0% round 18px)',
      })
      gsap.set(cardNodes, {
        autoAlpha: 0,
        y: 42,
        scale: 0.975,
        filter: 'blur(10px)',
        transformOrigin: '50% 100%',
      })
      valueRefs.current.forEach((node, index) => {
        setCountText(node, index, 0)
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 58%',
          once: true,
        },
      })

      timeline
        .to(eyebrowRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        })
        .to(
          titleRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power4.out',
          },
          0.08,
        )
        .to(
          copyRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: 'power3.out',
          },
          0.2,
        )
        .to(
          gridRef.current,
          {
            autoAlpha: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0% round 18px)',
            duration: 0.78,
            ease: 'power3.out',
          },
          0.42,
        )
        .to(
          cardNodes,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.95,
            ease: 'power4.out',
            stagger: 0.1,
          },
          0.5,
        )

      valueRefs.current.forEach((node, index) => {
        const count = NUMBERS[index].count
        if (!node || !count) return
        const state = { progress: 0 }

        timeline.to(
          state,
          {
            progress: 1,
            duration: 1.35,
            ease: 'power3.out',
            onUpdate: () => setCountText(node, index, state.progress),
            onComplete: () => {
              node.textContent = NUMBERS[index].value
            },
          },
          0.76 + index * 0.08,
        )
      })
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="nosotros"
      className="bg-charcoal py-20 text-paper md:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span
              ref={eyebrowRef}
              className="inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-paper/55">
              ARCA / Constancia de inscripción
            </span>
            <h2
              ref={titleRef}
              className="mt-5 max-w-[580px] font-display text-[38px] font-[430] leading-[1.05] text-paper md:text-[52px]">
              Una empresa nueva, armada sobre servicios concretos.
            </h2>
          </div>
          <p
            ref={copyRef}
            className="max-w-[52ch] text-[16px] leading-[1.7] text-paper/62 lg:justify-self-end">
            La comunicación se apoya en lo verificable: ACI Facility Management
            SA, CUIT 30-71924153-7, forma jurídica sociedad anónima y domicilio
            fiscal en México 463, CABA.
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-14 grid gap-px overflow-hidden rounded-[18px] border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {NUMBERS.map((item, index) => (
            <article
              key={item.label}
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              className="relative overflow-hidden bg-charcoal p-6 md:p-8">
              <span
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red/70 to-transparent"
                aria-hidden
              />
              <p
                ref={(node) => {
                  valueRefs.current[index] = node
                }}
                className="font-display text-[54px] font-[500] leading-none text-red tabular-nums md:text-[66px]">
                {item.value}
              </p>
              <h3 className="mt-6 text-[19px] font-medium text-paper">
                {item.label}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-paper/55">
                {item.note}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
