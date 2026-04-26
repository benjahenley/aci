const VARIANTS = {
  primary:
    'bg-red text-paper hover:bg-red-hover hover:-translate-y-px shadow-[0_1px_0_0_rgba(0,0,0,0.04)]',
  ghost:
    'bg-transparent text-charcoal border border-charcoal/15 hover:border-red hover:text-red',
  light:
    'bg-paper text-charcoal border border-hairline hover:border-red hover:text-red',
  dark:
    'bg-paper text-charcoal hover:bg-red hover:text-paper',
}

export default function PillButton({
  children,
  variant = 'primary',
  as = 'button',
  className = '',
  ...rest
}) {
  const Comp = as
  return (
    <Comp
      className={[
        'group inline-flex items-center gap-3 rounded-full px-7 py-3.5',
        'font-sans text-[15px] font-medium tracking-[0.005em]',
        'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'cursor-pointer select-none whitespace-nowrap',
        VARIANTS[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="grid size-5 place-items-center transition-transform duration-300 group-hover:translate-x-0.5"
      >
        <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      </span>
    </Comp>
  )
}
