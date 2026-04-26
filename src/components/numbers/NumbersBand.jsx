const NUMBERS = [
  {
    value: '12/25',
    label: 'Alta registrada',
    note: 'Contrato social y actividad formal desde diciembre de 2025.',
  },
  {
    value: '8',
    label: 'Actividades ARCA',
    note: 'Técnicas, operativas, logísticas y administrativas bajo una misma sociedad.',
  },
  {
    value: '3',
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
  return (
    <section id="nosotros" className="bg-charcoal py-20 text-paper md:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/55">
              ARCA / Constancia de inscripción
            </span>
            <h2 className="mt-5 max-w-[580px] font-display text-[38px] font-[430] leading-[1.05] text-paper md:text-[52px]">
              Una empresa nueva, armada sobre servicios concretos.
            </h2>
          </div>
          <p className="max-w-[52ch] text-[16px] leading-[1.7] text-paper/62 lg:justify-self-end">
            La comunicación se apoya en lo verificable: ACI Facility Management
            SA, CUIT 30-71924153-7, forma jurídica sociedad anónima y domicilio
            fiscal en México 463, CABA.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[18px] border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {NUMBERS.map((item) => (
            <article key={item.label} className="bg-charcoal p-6 md:p-8">
              <p className="font-display text-[54px] font-[500] leading-none text-red md:text-[66px]">
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
