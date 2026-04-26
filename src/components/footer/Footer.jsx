import Logo from '../nav/Logo.jsx'

const COLUMNS = [
  {
    title: 'Servicios',
    links: ['Servicios técnicos', 'Servicios operativos', 'Gestión y logística', 'Propuesta integral'],
  },
  {
    title: 'Sectores',
    links: ['Corporativo', 'Industria', 'Salud', 'Educación', 'Retail', 'Logística'],
  },
  {
    title: 'Empresa',
    links: ['Nosotros', 'Sostenibilidad', 'Novedades', 'Trabaja con ACI'],
  },
]

export default function Footer() {
  return (
    <footer className="bg-bone">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-14 md:px-10 lg:grid-cols-[1.1fr_1.6fr_0.8fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-[34ch] text-[14px] leading-[1.7] text-ink-mute">
            Facility management para edificios corporativos, industriales y
            comerciales en Buenos Aires.
          </p>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
            CUIT 30-71924153-7
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#top" className="text-[14px] text-ink-mute transition-colors hover:text-red">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-charcoal">
            Contacto
          </h3>
          <address className="mt-4 not-italic text-[14px] leading-[1.8] text-ink-mute">
            México 463, piso 2
            <br />
            C1097, Ciudad Autónoma de Buenos Aires
            <br />
            Argentina
          </address>
          <a className="mt-5 inline-flex text-[14px] font-medium text-red underline underline-offset-4" href="mailto:contacto@acifm.com.ar">
            contacto@acifm.com.ar
          </a>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute md:flex-row md:items-center md:justify-between md:px-10">
          <span>© 2026 ACI Facility Management SA</span>
          <span>Buenos Aires · AR</span>
        </div>
      </div>
    </footer>
  )
}
