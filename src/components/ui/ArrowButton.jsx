export default function ArrowButton({
  direction = 'right',
  filled = false,
  disabled = false,
  onClick,
  ariaLabel,
  size = 44,
}) {
  const base = filled
    ? 'bg-red text-paper border-red hover:bg-red-hover'
    : 'bg-transparent text-red border-red hover:bg-red hover:text-paper'

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || (direction === 'left' ? 'Anterior' : 'Siguiente')}
      style={{ width: size, height: size }}
      className={[
        'group grid place-items-center rounded-full border transition-all',
        'duration-200 ease-out cursor-pointer',
        'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-red',
        base,
      ].join(' ')}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={[
          'size-4 transition-transform duration-200 ease-out',
          direction === 'left'
            ? 'rotate-180 group-hover:-translate-x-px'
            : 'group-hover:translate-x-px',
        ].join(' ')}
      >
        <path
          d="M5 12h14M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </button>
  )
}
