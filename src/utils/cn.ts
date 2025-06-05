import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utilidad para combinar clases de Tailwind CSS de manera inteligente
 * Combina clsx y tailwind-merge para manejar conflictos de clases
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Variantes de clases CSS para componentes
 */
export interface VariantConfig<T extends Record<string, any>> {
  variants: T;
  defaultVariants?: {
    [K in keyof T]?: keyof T[K];
  };
}

/**
 * Crea una función de variantes de clases CSS
 */
export function createVariants<T extends Record<string, any>>(
  base: string,
  config: VariantConfig<T>
) {
  return function(
    props?: {
      [K in keyof T]?: keyof T[K];
    } & { className?: string }
  ) {
    const { className, ...variantProps } = props || {};
    
    const variantClasses = Object.entries(variantProps).map(([key, value]) => {
      const variantKey = key as keyof T;
      const variantValue = value as keyof T[typeof variantKey];
      return config.variants[variantKey]?.[variantValue] || '';
    });

    // Aplicar variantes por defecto si no se especifican
    const defaultClasses = Object.entries(config.defaultVariants || {}).map(([key, value]) => {
      if (!(key in (variantProps || {}))) {
        const variantKey = key as keyof T;
        const variantValue = value as keyof T[typeof variantKey];
        return config.variants[variantKey]?.[variantValue] || '';
      }
      return '';
    });

    return cn(base, ...defaultClasses, ...variantClasses, className);
  };
}

/**
 * Funciones de utilidad para casos comunes
 */

// Combina clases con condiciones
export function conditionalClass(
  condition: boolean,
  trueClass: string,
  falseClass?: string
): string {
  return condition ? trueClass : falseClass || '';
}

// Aplica clases basadas en el estado
export function stateClass<T extends string | number>(
  state: T,
  classes: Record<T, string>,
  defaultClass?: string
): string {
  return classes[state] || defaultClass || '';
}

// Maneja clases de tamaño responsive
export function responsiveClass(classes: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string {
  return cn(
    classes.base,
    classes.sm && `sm:${classes.sm}`,
    classes.md && `md:${classes.md}`,
    classes.lg && `lg:${classes.lg}`,
    classes.xl && `xl:${classes.xl}`,
    classes['2xl'] && `2xl:${classes['2xl']}`
  );
}

// Maneja clases de tema (claro/oscuro)
export function themeClass(lightClass: string, darkClass?: string): string {
  return cn(lightClass, darkClass && `dark:${darkClass}`);
}

// Aplica clases de estado hover/focus/active
export function interactiveClass(classes: {
  base?: string;
  hover?: string;
  focus?: string;
  active?: string;
  disabled?: string;
}): string {
  return cn(
    classes.base,
    classes.hover && `hover:${classes.hover}`,
    classes.focus && `focus:${classes.focus}`,
    classes.active && `active:${classes.active}`,
    classes.disabled && `disabled:${classes.disabled}`
  );
}

/**
 * Ejemplos de uso de variantes predefinidas
 */

// Variantes de botones
export const buttonVariants = createVariants('btn', {
  variants: {
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      outline: 'border border-current bg-transparent hover:bg-current hover:text-white',
      ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800',
      link: 'underline-offset-4 hover:underline text-primary-600 dark:text-primary-400',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    rounded: 'md',
  },
});

// Variantes de tarjetas
export const cardVariants = createVariants('card', {
  variants: {
    variant: {
      default: 'bg-white dark:bg-gray-800',
      ghost: 'bg-transparent',
      outline: 'border-2 bg-transparent',
    },
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    shadow: 'md',
    padding: 'md',
  },
});

// Variantes de texto
export const textVariants = createVariants('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    },
    weight: {
      thin: 'font-thin',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    color: {
      default: 'text-gray-900 dark:text-white',
      muted: 'text-gray-600 dark:text-gray-400',
      subtle: 'text-gray-500 dark:text-gray-500',
      primary: 'text-primary-600 dark:text-primary-400',
      secondary: 'text-secondary-600 dark:text-secondary-400',
      accent: 'text-accent-600 dark:text-accent-400',
      success: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      error: 'text-red-600 dark:text-red-400',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
    color: 'default',
  },
});

// Variantes de spacing
export const spacingVariants = createVariants('', {
  variants: {
    margin: {
      none: 'm-0',
      xs: 'm-1',
      sm: 'm-2',
      md: 'm-4',
      lg: 'm-6',
      xl: 'm-8',
    },
    padding: {
      none: 'p-0',
      xs: 'p-1',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
  },
});