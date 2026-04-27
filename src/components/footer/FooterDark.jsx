import Logo from "../nav/Logo.jsx";

const COLUMNS = [
  {
    title: "Servicios",
    links: [
      "Servicios técnicos",
      "Servicios operativos",
      "Gestión y logística",
      "Propuesta integral",
    ],
  },
  {
    title: "Sectores",
    links: [
      "Corporativo",
      "Industria",
      "Salud",
      "Educación",
      "Retail",
      "Logística",
    ],
  },
  {
    title: "Empresa",
    links: ["Nosotros", "Sostenibilidad", "Novedades", "Trabaja con ACI"],
  },
];

export default function FooterDark() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-paper">
      <div
        aria-hidden
        className="aci-stripes pointer-events-none absolute -left-32 -top-24 h-[420px] w-[520px] -rotate-12 opacity-30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-red/40 to-transparent"
      />

      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-6 py-16 md:px-10 md:py-20 lg:grid-cols-[1.1fr_1.6fr_0.8fr]">
        <div>
          <div className="brightness-0 invert">
            <Logo />
          </div>
          <p className="mt-6 max-w-[34ch] text-[14px] leading-[1.7] text-paper/60">
            Facility management para edificios corporativos, industriales y
            comerciales en Buenos Aires.
          </p>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/40">
            CUIT 30-71924153-7
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper">
                <span className="inline-flex items-center gap-2.5">
                  <span aria-hidden className="block h-px w-5 bg-red" />
                  {column.title}
                </span>
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-[14px] text-paper/65 transition-colors hover:text-red">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper">
            <span className="inline-flex items-center gap-2.5">
              <span aria-hidden className="block h-px w-5 bg-red" />
              Contacto
            </span>
          </h3>
          <address className="mt-5 not-italic text-[14px] leading-[1.8] text-paper/65">
            México 463, piso 2
            <br />
            C1097, Ciudad Autónoma de Buenos Aires
            <br />
            Argentina
          </address>
          <a
            className="mt-5 inline-flex text-[14px] font-medium text-red underline decoration-red/60 underline-offset-4 transition-colors hover:decoration-red"
            href="mailto:contacto@acifm.com.ar">
            contacto@acifm.com.ar
          </a>
        </div>
      </div>

      <div className="relative border-t border-paper/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/45 md:flex-row md:items-center md:justify-between md:px-10">
          <span>© 2026 ACI Facility Management SA</span>
          <span>Buenos Aires · AR</span>
        </div>
      </div>
    </footer>
  );
}
