// Three pillars mapped from the ACI ARCA constancia (CUIT 30-71924153-7).
// 432190 (principal) → técnico. Soft-FM activities → operativo.
// Back-office activities (821100 / 523090 / 702099) → gestión.

export const services = [
  {
    id: 'tecnicos',
    code: '01 / Hard FM',
    arca: '432190',
    title: 'Servicios Técnicos',
    body:
      'Instalación, ejecución y mantenimiento de instalaciones eléctricas, electromecánicas y electrónicas. Plan preventivo, correctivo y obras menores con personal certificado.',
    items: [
      'Instalaciones eléctricas de baja y media tensión',
      'Climatización y electromecánica',
      'Tableros, automatización y BMS',
      'Mantenimiento predictivo y preventivo',
    ],
  },
  {
    id: 'operativos',
    code: '02 / Soft FM',
    arca: '812010 · 813000 · 812020 · 801090',
    title: 'Servicios Operativos',
    body:
      'Limpieza general, jardinería, control de plagas y seguridad — auto-prestados con personal propio capacitado, equipamiento certificado y supervisión 24/7.',
    items: [
      'Limpieza general y técnica de edificios',
      'Jardinería y espacios verdes',
      'Desinfección y control de plagas',
      'Vigilancia y seguridad operativa',
    ],
  },
  {
    id: 'gestion',
    code: '03 / Back-office',
    arca: '821100 · 523090 · 702099',
    title: 'Gestión y Logística',
    body:
      'Gestión administrativa de oficinas, logística para el transporte de mercaderías y asesoramiento en dirección y gestión empresarial. Una factura, un interlocutor.',
    items: [
      'Administración integral de oficinas',
      'Logística de mercaderías y mudanzas internas',
      'Compras, proveedores y conciliación',
      'Asesoramiento en dirección y gestión',
    ],
  },
]
