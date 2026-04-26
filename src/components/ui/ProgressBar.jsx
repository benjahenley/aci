// GSAP "expo.out" easing → cubic-bezier(0.16, 1, 0.3, 1)
const EASING = 'cubic-bezier(0.16,1,0.3,1)'
const DURATION = 620

export default function ProgressBar({ value = 0, className = '' }) {
  const pct = Math.min(100, Math.max(0, value * 100))
  return (
    <div
      className={[
        'relative h-[3px] w-full overflow-hidden rounded-full bg-red-soft',
        className,
      ].join(' ')}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Animate transform (GPU) instead of width (layout). The fill is
          a 100%-wide bar that scales from the left edge. */}
      <div
        className="absolute inset-0 origin-left rounded-full bg-red will-change-transform"
        style={{
          transform: `scaleX(${pct / 100})`,
          transition: `transform ${DURATION}ms ${EASING}`,
        }}
      />
    </div>
  )
}
