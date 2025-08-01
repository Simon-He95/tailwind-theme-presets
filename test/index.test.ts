import { describe, expect, it } from 'vitest'
import { generateColors, processTheme } from '../src'

describe('should', () => {
  const baseTheme = {
    btn: {
      primary: {
        DEFAULT: '240 5.9% 10%',
        dark: '0 0% 98%',
        hover: {
          DEFAULT: 'var(--btn-primary) / 90%', // bg-btn-primary/90
          dark: '0 0% 98%',
        },
        foreground: {
          DEFAULT: '0 0% 98%',
          dark: '240 5.9% 10%',
        },
      },
      background: {
        DEFAULT: '0 0% 100%',
        dark: '240 10% 3.9%',
      },
      accent: {
        DEFAULT: '240 4.8% 95.9%',
        dark: '240 3.7% 15.9%',
        foreground: {
          DEFAULT: '240 5.9% 10%',
          dark: '0 0% 98%',
        },
      },
      input: {
        DEFAULT: '240 5.9% 90%',
        dark: '240 3.7% 15.9%',
      },
      secondary: {
        DEFAULT: '240 4.8% 95.9%',
        dark: '240 3.7% 15.9%',
        hover: {
          DEFAULT: 'var(--btn-secondary) / 80%', // bg-btn-secondary/80
          dark: '240 3.7% 15.9%',
        },
        foreground: {
          DEFAULT: '240 5.9% 10%',
          dark: '0 0% 98%',
        },
      },
      destructive: {
        DEFAULT: '0 84.2% 60.2%',
        dark: '0 62.8% 30.6%',
        hover: {
          DEFAULT: 'var(--btn-destructive) / 90%',
          dark: '0 62.8% 20.6%',
        },
        foreground: {
          DEFAULT: '0 0% 98%',
          dark: '0 0% 98%',
        },
      },
      ring: {
        DEFAULT: '240 5.9% 10%',
        dark: '240 4.9% 83.9%',
      },
    },
    badge: {
      accent: {
        DEFAULT: '240 4.8% 95.9%',
        dark: '240 3.7% 15.9%',
        foreground: {
          DEFAULT: '240 5.9% 10%',
          dark: '0 0% 98%',
        },
      },
      foreground: {
        DEFAULT: '240 5.9% 10%',
        dark: '0 0% 98%',
      },
      primary: {
        DEFAULT: '240 5.9% 10%',
        dark: '0 0% 98%',
        hover: {
          DEFAULT: 'var(--badge-primary) / 90%',
          dark: '0 0% 98%',
        },
        foreground: {
          DEFAULT: '0 0% 98%',
          dark: '240 5.9% 10%',
        },
      },
      secondary: {
        DEFAULT: '240 4.8% 95.9%',
        dark: '240 3.7% 15.9%',
        hover: {
          DEFAULT: 'var(--badge-secondary) / 90%',
          dark: '240 3.7% 15.9%',
        },
        foreground: {
          DEFAULT: '240 5.9% 10%',
          dark: '0 0% 98%',
        },
      },
      destructive: {
        DEFAULT: '0 84.2% 60.2%',
        dark: '0 62.8% 30.6%',
        hover: {
          DEFAULT: 'var(--badge-destructive) / 90%',
          dark: '0 62.8% 20.6%',
        },
        foreground: {
          DEFAULT: '0 0% 98%',
          dark: '0 0% 98%',
        },
      },
      'ring-destructive': {
        DEFAULT: '0 84.2% 60.2%',
        dark: '0 62.8% 30.6%',
      },
    },
    input: {
      input: {
        DEFAULT: '240 5.9% 90%',
        dark: '240 3.7% 15.9%',
        ring: {
          DEFAULT: '240 5.9% 90%',
          dark: '240 3.7% 15.9%',
        },
      },
    },
    card: {
      card: {
        DEFAULT: '0 0% 100%',
        dark: '240 10% 3.9%',
        foreground: {
          DEFAULT: '240 5.9% 10%',
          dark: '0 0% 98%',
        },
      },
    },
    checkbox: {
      checkbox: {
        primary: {
          DEFAULT: '240 5.9% 10%',
          dark: '0 0% 98%',
          foreground: {
            DEFAULT: '0 0% 98%',
            dark: '240 5.9% 10%',
          },
          ring: {
            DEFAULT: '240 5.9% 10%',
            dark: '240 4.9% 83.9%',
          },
        },
      },
    },
  }
  it('generateColors', () => {
    expect(generateColors(baseTheme)).toMatchInlineSnapshot(`
      {
        "badge-accent": {
          "DEFAULT": "hsl(var(--badge-accent, 240 4.8% 95.9%))",
          "dark": "240 3.7% 15.9%",
          "foreground": {
            "DEFAULT": "hsl(var(--badge-accent-foreground, 240 5.9% 10%))",
            "dark": "0 0% 98%",
          },
        },
        "badge-destructive": {
          "DEFAULT": "hsl(var(--badge-destructive, 0 84.2% 60.2%))",
          "dark": "0 62.8% 30.6%",
          "foreground": {
            "DEFAULT": "hsl(var(--badge-destructive-foreground, 0 0% 98%))",
            "dark": "0 0% 98%",
          },
          "hover": {
            "DEFAULT": "hsl(var(--badge-destructive-hover, var(--badge-destructive) / 90%))",
            "dark": "0 62.8% 20.6%",
          },
        },
        "badge-foreground": {
          "DEFAULT": "hsl(var(--badge-foreground, 240 5.9% 10%))",
          "dark": "0 0% 98%",
        },
        "badge-primary": {
          "DEFAULT": "hsl(var(--badge-primary, 240 5.9% 10%))",
          "dark": "0 0% 98%",
          "foreground": {
            "DEFAULT": "hsl(var(--badge-primary-foreground, 0 0% 98%))",
            "dark": "240 5.9% 10%",
          },
          "hover": {
            "DEFAULT": "hsl(var(--badge-primary-hover, var(--badge-primary) / 90%))",
            "dark": "0 0% 98%",
          },
        },
        "badge-ring-destructive": {
          "DEFAULT": "hsl(var(--badge-ring-destructive, 0 84.2% 60.2%))",
          "dark": "0 62.8% 30.6%",
        },
        "badge-secondary": {
          "DEFAULT": "hsl(var(--badge-secondary, 240 4.8% 95.9%))",
          "dark": "240 3.7% 15.9%",
          "foreground": {
            "DEFAULT": "hsl(var(--badge-secondary-foreground, 240 5.9% 10%))",
            "dark": "0 0% 98%",
          },
          "hover": {
            "DEFAULT": "hsl(var(--badge-secondary-hover, var(--badge-secondary) / 90%))",
            "dark": "240 3.7% 15.9%",
          },
        },
        "btn-accent": {
          "DEFAULT": "hsl(var(--btn-accent, 240 4.8% 95.9%))",
          "dark": "240 3.7% 15.9%",
          "foreground": {
            "DEFAULT": "hsl(var(--btn-accent-foreground, 240 5.9% 10%))",
            "dark": "0 0% 98%",
          },
        },
        "btn-background": {
          "DEFAULT": "hsl(var(--btn-background, 0 0% 100%))",
          "dark": "240 10% 3.9%",
        },
        "btn-destructive": {
          "DEFAULT": "hsl(var(--btn-destructive, 0 84.2% 60.2%))",
          "dark": "0 62.8% 30.6%",
          "foreground": {
            "DEFAULT": "hsl(var(--btn-destructive-foreground, 0 0% 98%))",
            "dark": "0 0% 98%",
          },
          "hover": {
            "DEFAULT": "hsl(var(--btn-destructive-hover, var(--btn-destructive) / 90%))",
            "dark": "0 62.8% 20.6%",
          },
        },
        "btn-input": {
          "DEFAULT": "hsl(var(--btn-input, 240 5.9% 90%))",
          "dark": "240 3.7% 15.9%",
        },
        "btn-primary": {
          "DEFAULT": "hsl(var(--btn-primary, 240 5.9% 10%))",
          "dark": "0 0% 98%",
          "foreground": {
            "DEFAULT": "hsl(var(--btn-primary-foreground, 0 0% 98%))",
            "dark": "240 5.9% 10%",
          },
          "hover": {
            "DEFAULT": "hsl(var(--btn-primary-hover, var(--btn-primary) / 90%))",
            "dark": "0 0% 98%",
          },
        },
        "btn-ring": {
          "DEFAULT": "hsl(var(--btn-ring, 240 5.9% 10%))",
          "dark": "240 4.9% 83.9%",
        },
        "btn-secondary": {
          "DEFAULT": "hsl(var(--btn-secondary, 240 4.8% 95.9%))",
          "dark": "240 3.7% 15.9%",
          "foreground": {
            "DEFAULT": "hsl(var(--btn-secondary-foreground, 240 5.9% 10%))",
            "dark": "0 0% 98%",
          },
          "hover": {
            "DEFAULT": "hsl(var(--btn-secondary-hover, var(--btn-secondary) / 80%))",
            "dark": "240 3.7% 15.9%",
          },
        },
        "card-card": {
          "DEFAULT": "hsl(var(--card-card, 0 0% 100%))",
          "dark": "240 10% 3.9%",
          "foreground": {
            "DEFAULT": "hsl(var(--card-card-foreground, 240 5.9% 10%))",
            "dark": "0 0% 98%",
          },
        },
        "checkbox-checkbox": {
          "primary": {
            "DEFAULT": "hsl(var(--checkbox-checkbox-primary, 240 5.9% 10%))",
            "dark": "0 0% 98%",
            "foreground": {
              "DEFAULT": "hsl(var(--checkbox-checkbox-primary-foreground, 0 0% 98%))",
              "dark": "240 5.9% 10%",
            },
            "ring": {
              "DEFAULT": "hsl(var(--checkbox-checkbox-primary-ring, 240 5.9% 10%))",
              "dark": "240 4.9% 83.9%",
            },
          },
        },
        "input-input": {
          "DEFAULT": "hsl(var(--input-input, 240 5.9% 90%))",
          "dark": "240 3.7% 15.9%",
          "ring": {
            "DEFAULT": "hsl(var(--input-input-ring, 240 5.9% 90%))",
            "dark": "240 3.7% 15.9%",
          },
        },
      }
    `)
  })
  it('processTheme', () => {
    expect(processTheme(baseTheme)).toMatchInlineSnapshot(`
      {
        ".dark": {
          "--badge-accent": "240 3.7% 15.9%",
          "--badge-accent-foreground": "0 0% 98%",
          "--badge-destructive": "0 62.8% 30.6%",
          "--badge-destructive-foreground": "0 0% 98%",
          "--badge-destructive-hover": "0 62.8% 20.6%",
          "--badge-foreground": "0 0% 98%",
          "--badge-primary": "0 0% 98%",
          "--badge-primary-foreground": "240 5.9% 10%",
          "--badge-primary-hover": "0 0% 98%",
          "--badge-ring-destructive": "0 62.8% 30.6%",
          "--badge-secondary": "240 3.7% 15.9%",
          "--badge-secondary-foreground": "0 0% 98%",
          "--badge-secondary-hover": "240 3.7% 15.9%",
          "--btn-accent": "240 3.7% 15.9%",
          "--btn-accent-foreground": "0 0% 98%",
          "--btn-background": "240 10% 3.9%",
          "--btn-destructive": "0 62.8% 30.6%",
          "--btn-destructive-foreground": "0 0% 98%",
          "--btn-destructive-hover": "0 62.8% 20.6%",
          "--btn-input": "240 3.7% 15.9%",
          "--btn-primary": "0 0% 98%",
          "--btn-primary-foreground": "240 5.9% 10%",
          "--btn-primary-hover": "0 0% 98%",
          "--btn-ring": "240 4.9% 83.9%",
          "--btn-secondary": "240 3.7% 15.9%",
          "--btn-secondary-foreground": "0 0% 98%",
          "--btn-secondary-hover": "240 3.7% 15.9%",
          "--card-card": "240 10% 3.9%",
          "--card-card-foreground": "0 0% 98%",
          "--checkbox-checkbox-primary": "0 0% 98%",
          "--checkbox-checkbox-primary-foreground": "240 5.9% 10%",
          "--checkbox-checkbox-primary-ring": "240 4.9% 83.9%",
          "--input-input": "240 3.7% 15.9%",
          "--input-input-ring": "240 3.7% 15.9%",
        },
        ":root": {
          "--badge-accent": "240 4.8% 95.9%",
          "--badge-accent-foreground": "240 5.9% 10%",
          "--badge-destructive": "0 84.2% 60.2%",
          "--badge-destructive-foreground": "0 0% 98%",
          "--badge-destructive-hover": "var(--badge-destructive) / 90%",
          "--badge-foreground": "240 5.9% 10%",
          "--badge-primary": "240 5.9% 10%",
          "--badge-primary-foreground": "0 0% 98%",
          "--badge-primary-hover": "var(--badge-primary) / 90%",
          "--badge-ring-destructive": "0 84.2% 60.2%",
          "--badge-secondary": "240 4.8% 95.9%",
          "--badge-secondary-foreground": "240 5.9% 10%",
          "--badge-secondary-hover": "var(--badge-secondary) / 90%",
          "--btn-accent": "240 4.8% 95.9%",
          "--btn-accent-foreground": "240 5.9% 10%",
          "--btn-background": "0 0% 100%",
          "--btn-destructive": "0 84.2% 60.2%",
          "--btn-destructive-foreground": "0 0% 98%",
          "--btn-destructive-hover": "var(--btn-destructive) / 90%",
          "--btn-input": "240 5.9% 90%",
          "--btn-primary": "240 5.9% 10%",
          "--btn-primary-foreground": "0 0% 98%",
          "--btn-primary-hover": "var(--btn-primary) / 90%",
          "--btn-ring": "240 5.9% 10%",
          "--btn-secondary": "240 4.8% 95.9%",
          "--btn-secondary-foreground": "240 5.9% 10%",
          "--btn-secondary-hover": "var(--btn-secondary) / 80%",
          "--card-card": "0 0% 100%",
          "--card-card-foreground": "240 5.9% 10%",
          "--checkbox-checkbox-primary": "240 5.9% 10%",
          "--checkbox-checkbox-primary-foreground": "0 0% 98%",
          "--checkbox-checkbox-primary-ring": "240 5.9% 10%",
          "--input-input": "240 5.9% 90%",
          "--input-input-ring": "240 5.9% 90%",
        },
      }
    `)
  })
})
