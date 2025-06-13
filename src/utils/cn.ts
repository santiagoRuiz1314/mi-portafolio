import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utilidad para combinar clases de Tailwind CSS de manera inteligente
 * Combina clsx y tailwind-merge para manejar conflictos de clases
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}