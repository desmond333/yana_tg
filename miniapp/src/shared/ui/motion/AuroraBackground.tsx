const PARTICLES = [
  { left: '7%', top: '16%', size: 3, delay: 0, duration: 9 },
  { left: '18%', top: '64%', size: 2, delay: 1.4, duration: 11 },
  { left: '34%', top: '28%', size: 2, delay: 2.8, duration: 8 },
  { left: '68%', top: '18%', size: 3, delay: 0.8, duration: 12 },
  { left: '82%', top: '52%', size: 2, delay: 3.2, duration: 10 },
  { left: '92%', top: '74%', size: 3, delay: 1.9, duration: 9 },
  { left: '58%', top: '86%', size: 2, delay: 4.1, duration: 13 },
  { left: '26%', top: '92%', size: 2, delay: 2.2, duration: 10 },
] as const

export const AuroraBackground = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_-10%,var(--aurora-1)_0%,transparent_42%),radial-gradient(circle_at_88%_-4%,var(--aurora-2)_0%,transparent_38%),radial-gradient(circle_at_50%_110%,var(--aurora-3)_0%,transparent_48%)]" />
    <div className="elite-grid absolute inset-0 opacity-30" />

    <div className="absolute -top-[20vmax] -left-[25vmax] size-[70vmax] animate-aurora-a rounded-full bg-[radial-gradient(circle,var(--aurora-1)_0%,transparent_62%)]" />
    <div className="absolute -top-[10vmax] -right-[30vmax] size-[65vmax] animate-aurora-b rounded-full bg-[radial-gradient(circle,var(--aurora-2)_0%,transparent_62%)]" />
    <div className="absolute top-[45vh] -left-[20vmax] size-[60vmax] animate-aurora-c rounded-full bg-[radial-gradient(circle,var(--aurora-3)_0%,transparent_62%)]" />

    <div className="absolute top-[6vh] left-1/2 size-[62vmax] -translate-x-1/2 rounded-full border border-accent/10" />
    <div className="absolute top-[10vh] left-1/2 size-[44vmax] -translate-x-1/2 rounded-full border border-accent/5" />
    <div className="absolute inset-x-0 top-0 h-[65vh] bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--accent)_9%,transparent)_0%,transparent_62%)]" />

    <img src="/images/brand/logo.svg" alt="" className="absolute -right-[14vmax] -bottom-[16vmax] size-[48vmax] opacity-[0.035]" />

    {PARTICLES.map((particle) => (
      <span
        key={`${particle.left}-${particle.top}`}
        className="absolute animate-float rounded-full bg-accent/40 shadow-[0_0_12px_var(--accent)]"
        style={{
          left: particle.left,
          top: particle.top,
          width: particle.size,
          height: particle.size,
          animationDelay: `${particle.delay}s`,
          animationDuration: `${particle.duration}s`,
        }}
      />
    ))}

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_30%,color-mix(in_srgb,var(--bg)_78%,transparent)_100%)]" />
    <div className="elite-grain absolute inset-0 opacity-[0.04]" />
  </div>
)
