import { sectors } from './sectors.js'

// Mega-dropdown content keyed by nav label.
// `feature` = the tall left card. `columns` = right-side arrow-link groups.

export const navPanels = {
  Servicios: {
    feature: {
      eyebrow: 'Servicios Integrales',
      title: 'Hard, soft y back-office bajo un mismo paraguas.',
      body: 'Una factura, un interlocutor, un nivel de servicio para cada edificio que gestionás.',
      art: 'building',
      ctaHref: '#servicios',
      ctaLabel: 'Servicios',
    },
    columns: [
      {
        heading: 'Servicios Técnicos',
        items: [
          { label: 'Instalaciones eléctricas', href: '#servicios' },
          { label: 'Climatización y electromecánica', href: '#servicios' },
          { label: 'Tableros, automatización y BMS', href: '#servicios' },
          { label: 'Mantenimiento preventivo', href: '#servicios' },
        ],
      },
      {
        heading: 'Servicios Operativos',
        items: [
          { label: 'Limpieza técnica de edificios', href: '#servicios' },
          { label: 'Jardinería y espacios verdes', href: '#servicios' },
          { label: 'Control de plagas', href: '#servicios' },
          { label: 'Vigilancia y seguridad', href: '#servicios' },
        ],
      },
      {
        heading: 'Gestión y Back-office',
        items: [
          { label: 'Administración de oficinas', href: '#servicios' },
          { label: 'Logística de mercaderías', href: '#servicios' },
          { label: 'Asesoramiento empresarial', href: '#servicios' },
        ],
      },
    ],
  },

  Sectores: {
    feature: {
      eyebrow: 'Verticales que servimos',
      title: 'Edificios con ritmos distintos, una gestión clara.',
      body: 'Seis verticales bajo protocolos auto-prestados, con cobertura en CABA y AMBA.',
      art: 'sectors',
      ctaHref: '#sectores',
      ctaLabel: 'Sectores',
    },
    columns: [
      {
        heading: 'Sectores',
        items: sectors.map((s) => ({
          label: s.label,
          href: '#sectores',
          detail: s.detail,
          icon: s.id,
        })),
      },
    ],
  },

  Nosotros: {
    feature: {
      eyebrow: 'Sobre ACI',
      title: 'Hacer las cosas bien, con evidencia.',
      body: 'Personal propio, supervisión 24/7 y un único interlocutor para tu edificio.',
      art: 'mark',
      ctaHref: '#nosotros',
      ctaLabel: 'Nosotros',
    },
    columns: [
      {
        heading: 'Compañía',
        items: [
          { label: 'Quiénes somos', href: '#nosotros' },
          { label: 'Método ACI', href: '#metodo' },
          { label: 'Compromiso y valores', href: '#valores' },
        ],
      },
      {
        heading: 'Operaciones',
        items: [
          { label: 'Equipo y capacidad', href: '#equipo' },
          { label: 'Cobertura CABA · AMBA', href: '#cobertura' },
          { label: 'Casos y certificaciones', href: '#casos' },
        ],
      },
    ],
  },
}
