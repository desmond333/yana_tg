import type { ReactNode } from 'react'
import { cn } from '../lib'
import { Reveal } from './motion/Reveal'

export type CtaBannerProps = {
  title: string
  subtitle?: ReactNode
  eyebrow?: string
  action: ReactNode
  className?: string
}

export const CtaBanner = ({ title, subtitle, eyebrow, action, className }: CtaBannerProps) => (
  <Reveal
    className={cn('bg-accent-gradient relative isolate overflow-hidden rounded-xl p-6 text-accent-text shadow-glow md:p-12', className)}
  >
    <div className="absolute -top-16 -right-16 -z-10 size-48 animate-aurora-b rounded-full bg-white/20 blur-2xl" aria-hidden />
    <div className="absolute -bottom-20 -left-10 -z-10 size-56 animate-aurora-a rounded-full bg-black/10 blur-2xl" aria-hidden />
    <div
      className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/18%)_1px,transparent_1px)] bg-size-[14px_14px] opacity-50"
      aria-hidden
    />
    <div className="flex flex-col gap-3 md:max-w-2xl">
      {eyebrow && <span className="text-[11px] font-semibold tracking-[0.14em] uppercase opacity-85">{eyebrow}</span>}
      <h2 className="font-display text-[1.7rem] leading-tight font-bold tracking-tight text-balance md:text-5xl">{title}</h2>
      {subtitle && <div className="text-body leading-relaxed opacity-90 text-pretty md:text-lg">{subtitle}</div>}
      <div className="pt-2 md:w-fit">{action}</div>
    </div>
  </Reveal>
)
