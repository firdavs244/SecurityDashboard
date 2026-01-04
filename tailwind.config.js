/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* teal-700/20 */
        input: 'var(--color-input)', /* charcoal-800 */
        ring: 'var(--color-ring)', /* teal-700 */
        background: 'var(--color-background)', /* charcoal-900 */
        foreground: 'var(--color-foreground)', /* gray-50 */
        primary: {
          DEFAULT: 'var(--color-primary)', /* teal-700 */
          foreground: 'var(--color-primary-foreground)', /* white */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* indigo-600 */
          foreground: 'var(--color-secondary-foreground)', /* white */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* gold-custom */
          foreground: 'var(--color-accent-foreground)', /* charcoal-900 */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-600 */
          foreground: 'var(--color-destructive-foreground)', /* white */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* green-600 */
          foreground: 'var(--color-success-foreground)', /* white */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* yellow-600 */
          foreground: 'var(--color-warning-foreground)', /* charcoal-900 */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-600 */
          foreground: 'var(--color-error-foreground)', /* white */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* charcoal-700 */
          foreground: 'var(--color-muted-foreground)', /* gray-400 */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* charcoal-800 */
          foreground: 'var(--color-card-foreground)', /* gray-200 */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* charcoal-800 */
          foreground: 'var(--color-popover-foreground)', /* gray-200 */
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)', /* 6px */
        DEFAULT: 'var(--radius)', /* 12px */
        md: 'var(--radius-md)', /* 12px */
        lg: 'var(--radius-lg)', /* 18px */
        xl: 'var(--radius-xl)', /* 24px */
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['IBM Plex Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '6': '0.375rem', /* 6px */
        '12': '0.75rem', /* 12px */
        '18': '1.125rem', /* 18px */
        '24': '1.5rem', /* 24px */
        '36': '2.25rem', /* 36px */
        '48': '3rem', /* 48px */
        '72': '4.5rem', /* 72px */
        '96': '6rem', /* 96px */
        '144': '9rem', /* 144px */
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        'smooth': '280ms',
      },
      boxShadow: {
        'teal-sm': '0 2px 4px rgba(44, 122, 123, 0.15)',
        'teal': '0 4px 8px rgba(44, 122, 123, 0.15)',
        'teal-md': '0 8px 16px rgba(44, 122, 123, 0.15)',
        'teal-lg': '0 16px 32px rgba(44, 122, 123, 0.15)',
        'teal-xl': '0 32px 64px -16px rgba(44, 122, 123, 0.15)',
      },
      zIndex: {
        'base': '0',
        'card': '10',
        'dropdown': '100',
        'element-3d': '200',
        'navigation': '300',
        'modal': '400',
        'particle': '500',
        'toast': '600',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}