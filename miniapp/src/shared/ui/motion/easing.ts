export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export const SPRING_SOFT = { type: 'spring', stiffness: 260, damping: 24 } as const

export const SPRING_SNAPPY = { type: 'spring', stiffness: 420, damping: 30 } as const

export const SPRING_GLIDE = { type: 'spring', stiffness: 300, damping: 34, mass: 0.9 } as const
