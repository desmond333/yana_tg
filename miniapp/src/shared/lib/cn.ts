import { clsx, type ClassValue as ClsxClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type ClassValue = ClsxClassValue

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))
