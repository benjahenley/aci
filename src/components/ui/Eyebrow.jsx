export default function Eyebrow({ children, className = '', tone = 'default' }) {
  const tones = {
    default: 'text-ink-mute',
    red: 'text-red',
    light: 'text-paper/70',
  }
  return (
    <span
      className={[
        'inline-flex items-center gap-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em]',
        tones[tone],
        className,
      ].join(' ')}
    >
      <span aria-hidden className="block h-px w-6 bg-current opacity-50" />
      {children}
    </span>
  )
}
