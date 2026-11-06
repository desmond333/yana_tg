import { useId } from 'react'
import { cn } from '../../lib'

export type OrbitDecorationProps = {
  className?: string
}

export const OrbitDecoration = ({ className }: OrbitDecorationProps) => {
  const uid = useId().replace(/:/g, '')
  const outerGradient = `orbit-outer-${uid}`
  const innerGradient = `orbit-inner-${uid}`
  const glowGradient = `orbit-glow-${uid}`

  return (
    <svg aria-hidden viewBox="0 0 400 400" preserveAspectRatio="none" className={cn('overflow-visible', className)}>
      <defs>
        <linearGradient id={outerGradient} x1="48" y1="72" x2="352" y2="328" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent)" stopOpacity="0" />
          <stop offset=".5" stopColor="var(--accent)" stopOpacity=".55" />
          <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={innerGradient} x1="96" y1="128" x2="304" y2="272" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--accent-2)" stopOpacity="0" />
          <stop offset=".55" stopColor="var(--accent)" stopOpacity=".45" />
          <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={glowGradient} cx=".5" cy=".5" r=".5">
          <stop stopColor="var(--accent)" stopOpacity=".16" />
          <stop offset=".6" stopColor="var(--accent)" stopOpacity=".05" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="200" r="198" fill={`url(#${glowGradient})`} />
      <circle cx="200" cy="200" r="190" fill="none" stroke="var(--accent)" strokeOpacity=".08" />
      <circle cx="200" cy="200" r="148" fill="none" stroke="var(--accent)" strokeOpacity=".12" />
      <circle cx="200" cy="200" r="106" fill="none" stroke="var(--accent)" strokeOpacity=".14" />
      <circle cx="200" cy="200" r="64" fill="none" stroke="var(--accent)" strokeOpacity=".1" />

      <g className="animate-spin-slow" style={{ transformBox: 'view-box', transformOrigin: '200px 200px' }}>
        <circle
          cx="200"
          cy="200"
          r="190"
          fill="none"
          stroke={`url(#${outerGradient})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="238 956"
          transform="rotate(-128 200 200)"
        />
        <circle cx="200" cy="10" r="4" fill="var(--accent-2)" opacity=".35" />
        <circle cx="200" cy="10" r="1.8" fill="var(--accent-2)" />
      </g>

      <g
        className="animate-spin-slow"
        style={{
          transformBox: 'view-box',
          transformOrigin: '200px 200px',
          animationDuration: '26s',
          animationDirection: 'reverse',
        }}
      >
        <circle
          cx="200"
          cy="200"
          r="148"
          fill="none"
          stroke={`url(#${innerGradient})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="164 766"
          transform="rotate(58 200 200)"
        />
        <circle cx="200" cy="52" r="2.6" fill="var(--accent)" opacity=".75" />
      </g>

      <g
        className="animate-spin-slow"
        style={{
          transformBox: 'view-box',
          transformOrigin: '200px 200px',
          animationDuration: '42s',
          animationDirection: 'reverse',
        }}
      >
        <circle
          cx="200"
          cy="200"
          r="106"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity=".2"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="88 578"
          transform="rotate(-20 200 200)"
        />
        <circle cx="200" cy="94" r="2" fill="var(--accent-2)" opacity=".8" />
      </g>

      <path
        d="M326 74l2.2 5.8 5.8 2.2-5.8 2.2-2.2 5.8-2.2-5.8-5.8-2.2 5.8-2.2z"
        fill="var(--accent)"
        opacity=".35"
        className="animate-pulse"
      />
      <path
        d="M78 292l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6z"
        fill="var(--accent-2)"
        opacity=".3"
        className="animate-pulse"
        style={{ animationDelay: '1.4s' }}
      />
    </svg>
  )
}
