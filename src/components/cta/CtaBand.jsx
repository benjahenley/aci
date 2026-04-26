import PillButton from '../ui/PillButton.jsx'

export default function CtaBand() {
  return (
    <section id="contacto" className="bg-charcoal px-6 py-18 text-paper md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
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
              <a className="block transition-colors hover:text-red" href="mailto:contacto@acifm.com.ar">
                contacto@acifm.com.ar
              </a>
              <a className="block transition-colors hover:text-red" href="tel:+541143218800">
                +54 11 4321-8800
              </a>
              <a className="block transition-colors hover:text-red" href="https://wa.me/5491143218800">
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
  )
}
