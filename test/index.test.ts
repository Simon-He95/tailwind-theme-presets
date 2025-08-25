import { describe, expect, it } from 'vitest'
import { generateColors, processTheme } from '../src'

describe('tailwind-theme-presets', () => {
  const baseTheme = {
    boxShadow: {
      xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      '2xs': '0 1px var(--tw-shadow-color, rgb(0 0 0 / 0.05));',
      sm: '0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));',
      md: '0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));',
      lg: '0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));',
      xl: '0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1));',
      '2xl': '0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25));',
    },
    background: {
      DEFAULT: 'hsl(0 0% 100%)',
      dark: 'hsl(240 10% 3.9%)',
    },
    foreground: {
      DEFAULT: 'hsl(240 10% 3.9%)',
      dark: 'hsl(0 0% 98%)',
    },
    primary: {
      DEFAULT: '240 5.9% 10%', // --primary: '240 5.9% 10%'
      dark: '0 0% 98%', // --primary-dark: '0 0% 98%'
      foreground: {
        DEFAULT: '0 0% 98%',
        dark: '240 5.9% 10%',
      },
    },
    secondary: {
      DEFAULT: '240 4.8% 95.9%',
      dark: '240 3.7% 15.9%',
      foreground: {
        DEFAULT: '240 5.9% 10%',
        dark: '0 0% 98%',
      },
    },
    destructive: {
      DEFAULT: '0 84.2% 60.2%',
      dark: '0 62.8% 30.6%',
      foreground: {
        DEFAULT: '0 0% 98%',
        dark: '0 0% 98%',
      },
    },
    ring: {
      DEFAULT: '240 5.9% 10%',
      dark: '240 4.9% 83.9%',
    },
    input: {
      DEFAULT: '240 5.9% 90%',
      dark: '240 3.7% 15.9%',
      input: {
        DEFAULT: 'hsl(var(--input))',
        dark: 'hsl(var(--input))',
        ring: {
          DEFAULT: 'hsl(var(--ring))',
          dark: 'hsl(var(--ring))',
        },
      },
    },
    accent: {
      DEFAULT: '240 4.8% 95.9%',
      dark: '240 3.7% 15.9%',
      foreground: {
        DEFAULT: '240 5.9% 10%',
        dark: '0 0% 98%',
      },
    },
    btn: {
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        dark: 'hsl(var(--primary))',
        hover: {
          DEFAULT: 'hsl(var(--btn-primary) / 90%)', // bg-btn-primary/90
          dark: 'hsl(var(--btn-primary) / 90%)',
        },
        foreground: {
          DEFAULT: 'hsl(var(--primary-foreground))',
          dark: 'hsl(var(--primary-foreground))',
        },
      },
      background: {
        DEFAULT: 'hsl(var(--background))',
        dark: 'hsl(var(--background))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        dark: 'hsl(var(--accent))',
        foreground: {
          DEFAULT: 'hsl(var(--accent-foreground))',
          dark: 'hsl(var(--accent-foreground))',
        },
      },
      input: {
        DEFAULT: 'hsl(var(--input))',
        dark: 'hsl(var(--input))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        dark: 'hsl(var(--secondary))',
        hover: {
          DEFAULT: 'hsl(var(--btn-secondary) / 80%)', // bg-btn-secondary/80
          dark: 'hsl(var(--btn-secondary) / 80%)',
        },
        foreground: {
          DEFAULT: 'hsl(var(--secondary-foreground))',
          dark: 'hsl(var(--secondary-foreground))',
        },
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        dark: 'hsl(var(--destructive))',
        hover: {
          DEFAULT: 'hsl(var(--btn-destructive) / 90%)',
          dark: 'hsl(var(--btn-destructive) / 90%)',
        },
        foreground: {
          DEFAULT: 'hsl(var(--destructive-foreground))',
          dark: 'hsl(var(--destructive-foreground))',
        },
      },
      ring: {
        DEFAULT: 'hsl(var(--ring))',
        dark: 'hsl(var(--ring))',
      },
    },
    badge: {
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        dark: 'hsl(var(--accent))',
        foreground: {
          DEFAULT: 'hsl(var(--accent-foreground))',
          dark: 'hsl(var(--accent-foreground))',
        },
      },
      foreground: {
        DEFAULT: 'hsl(var(--foreground))',
        dark: 'hsl(var(--foreground))',
      },
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        dark: 'hsl(var(--primary))',
        hover: {
          DEFAULT: 'hsl(var(--badge-primary) / 90%)',
          dark: 'hsl(var(--badge-primary) / 90%)',
        },
        foreground: {
          DEFAULT: 'hsl(var(--primary-foreground))',
          dark: 'hsl(var(--primary-foreground))',
        },
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        dark: 'hsl(var(--secondary))',
        hover: {
          DEFAULT: 'hsl(var(--badge-secondary) / 90%)',
          dark: 'hsl(var(--badge-secondary) / 90%)',
        },
        foreground: {
          DEFAULT: 'hsl(var(--secondary-foreground))',
          dark: 'hsl(var(--secondary-foreground))',
        },
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        dark: 'hsl(var(--destructive))',
        hover: {
          DEFAULT: 'hsl(var(--badge-destructive) / 90%)',
          dark: 'hsl(var(--badge-destructive) / 90%)',
        },
        foreground: {
          DEFAULT: 'hsl(var(--destructive-foreground))',
          dark: 'hsl(var(--destructive-foreground))',
        },
      },
      'ring-destructive': {
        DEFAULT: 'hsl(var(--destructive))',
        dark: 'hsl(var(--destructive))',
      },
    },
    card: {
      DEFAULT: '0 0% 100%',
      dark: '240 10% 3.9%',
      card: {
        DEFAULT: 'hsl(var(--card))',
        dark: 'hsl(var(--card))',
        foreground: {
          DEFAULT: 'hsl(var(--foreground))',
          dark: 'hsl(var(--foreground))',
        },
      },
    },
    checkbox: {
      checkbox: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          dark: 'hsl(var(--primary))',
          foreground: {
            DEFAULT: 'hsl(var(--foreground))',
            dark: 'hsl(var(--foreground))',
          },
          ring: {
            DEFAULT: 'hsl(var(--ring))',
            dark: 'hsl(var(--ring))',
          },
        },
      },
    },
    breadcrumb: {
      foreground: {
        DEFAULT: 'hsl(var(--foreground))',
        dark: 'hsl(var(--foreground))',
      },
      'muted-foreground': {
        DEFAULT: 'hsl(var(--muted-foreground))',
        dark: 'hsl(var(--muted-foreground))',
      },
    },
    radio: {
      DEFAULT: 'hsl(var(--radio))',
      dark: 'hsl(var(--radio))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        dark: 'hsl(var(--primary))',
      },
    },
    switch: {
      background: {
        DEFAULT: 'hsl(var(--background))',
        dark: 'hsl(var(--background))',
      },
      checked: {
        DEFAULT: 'hsl(var(--primary))',
        dark: 'hsl(var(--primary))',
      },
      unchecked: {
        DEFAULT: 'hsl(var(--input))', // hsl(240 3.7% 15.9%)
        dark: 'hsl(var(--input))',
      },
    },
  }
  it('generateColors', () => {
    expect(generateColors(baseTheme)).toMatchInlineSnapshot(`
      {
        "accent": {
          "DEFAULT": "var(--accent, 240 4.8% 95.9%)",
          "dark": {
            "DEFAULT": "240 3.7% 15.9%",
          },
        },
        "accent-foreground": {
          "DEFAULT": "hsl(var(--accent-foreground, 240 5.9% 10%))",
          "dark": "hsl(var(--accent-foreground-dark, 0 0% 98%))",
        },
        "background": {
          "DEFAULT": "var(--background, hsl(0 0% 100%))",
          "dark": {
            "DEFAULT": "hsl(240 10% 3.9%)",
          },
        },
        "badge-accent": {
          "DEFAULT": "var(--badge-accent, hsl(var(--accent)))",
          "dark": "var(--badge-accent-dark, hsl(var(--accent)))",
          "foreground": {
            "DEFAULT": "var(--badge-accent-foreground, hsl(var(--accent-foreground)))",
            "dark": "var(--badge-accent-foreground-dark, hsl(var(--accent-foreground)))",
          },
        },
        "badge-destructive": {
          "DEFAULT": "var(--badge-destructive, hsl(var(--destructive)))",
          "dark": "var(--badge-destructive-dark, hsl(var(--destructive)))",
          "foreground": {
            "DEFAULT": "var(--badge-destructive-foreground, hsl(var(--destructive-foreground)))",
            "dark": "var(--badge-destructive-foreground-dark, hsl(var(--destructive-foreground)))",
          },
          "hover": {
            "DEFAULT": "var(--badge-destructive-hover, hsl(var(--destructive) / 90%)/* --badge-destructive -> --destructive */)",
            "dark": "var(--badge-destructive-hover-dark, hsl(var(--destructive) / 90%)/* --badge-destructive -> --destructive */)",
          },
        },
        "badge-foreground": {
          "DEFAULT": "var(--badge-foreground, var(--foreground)/* --foreground */)",
          "dark": "var(--badge-foreground-dark, var(--foreground)/* --foreground */)",
        },
        "badge-primary": {
          "DEFAULT": "var(--badge-primary, hsl(var(--primary)))",
          "dark": "var(--badge-primary-dark, hsl(var(--primary)))",
          "foreground": {
            "DEFAULT": "var(--badge-primary-foreground, hsl(var(--primary-foreground)))",
            "dark": "var(--badge-primary-foreground-dark, hsl(var(--primary-foreground)))",
          },
          "hover": {
            "DEFAULT": "var(--badge-primary-hover, hsl(var(--primary) / 90%)/* --badge-primary -> --primary */)",
            "dark": "var(--badge-primary-hover-dark, hsl(var(--primary) / 90%)/* --badge-primary -> --primary */)",
          },
        },
        "badge-ring-destructive": {
          "DEFAULT": "var(--badge-ring-destructive, hsl(var(--destructive)))",
          "dark": "var(--badge-ring-destructive-dark, hsl(var(--destructive)))",
        },
        "badge-secondary": {
          "DEFAULT": "var(--badge-secondary, hsl(var(--secondary)))",
          "dark": "var(--badge-secondary-dark, hsl(var(--secondary)))",
          "foreground": {
            "DEFAULT": "var(--badge-secondary-foreground, hsl(var(--secondary-foreground)))",
            "dark": "var(--badge-secondary-foreground-dark, hsl(var(--secondary-foreground)))",
          },
          "hover": {
            "DEFAULT": "var(--badge-secondary-hover, hsl(var(--secondary) / 90%)/* --badge-secondary -> --secondary */)",
            "dark": "var(--badge-secondary-hover-dark, hsl(var(--secondary) / 90%)/* --badge-secondary -> --secondary */)",
          },
        },
        "boxShadow": {
          "2xl": {
            "DEFAULT": "0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25));",
          },
          "2xs": {
            "DEFAULT": "0 1px var(--tw-shadow-color, rgb(0 0 0 / 0.05));",
          },
          "lg": {
            "DEFAULT": "0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, 0 0 0 / 0.1);",
          },
          "md": {
            "DEFAULT": "0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, 0 0 0 / 0.1);",
          },
          "sm": {
            "DEFAULT": "0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, 0 0 0 / 0.1);",
          },
          "xl": {
            "DEFAULT": "0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, 0 0 0 / 0.1);",
          },
          "xs": {
            "DEFAULT": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          },
        },
        "breadcrumb-foreground": {
          "DEFAULT": "var(--breadcrumb-foreground, var(--foreground)/* --foreground */)",
          "dark": "var(--breadcrumb-foreground-dark, var(--foreground)/* --foreground */)",
        },
        "breadcrumb-muted-foreground": {
          "DEFAULT": "var(--breadcrumb-muted-foreground, hsl(var(--muted-foreground)))",
          "dark": "var(--breadcrumb-muted-foreground-dark, hsl(var(--muted-foreground)))",
        },
        "btn-accent": {
          "DEFAULT": "var(--btn-accent, hsl(var(--accent)))",
          "dark": "var(--btn-accent-dark, hsl(var(--accent)))",
          "foreground": {
            "DEFAULT": "var(--btn-accent-foreground, hsl(var(--accent-foreground)))",
            "dark": "var(--btn-accent-foreground-dark, hsl(var(--accent-foreground)))",
          },
        },
        "btn-background": {
          "DEFAULT": "var(--btn-background, var(--background)/* --background */)",
          "dark": "var(--btn-background-dark, var(--background)/* --background */)",
        },
        "btn-destructive": {
          "DEFAULT": "var(--btn-destructive, hsl(var(--destructive)))",
          "dark": "var(--btn-destructive-dark, hsl(var(--destructive)))",
          "foreground": {
            "DEFAULT": "var(--btn-destructive-foreground, hsl(var(--destructive-foreground)))",
            "dark": "var(--btn-destructive-foreground-dark, hsl(var(--destructive-foreground)))",
          },
          "hover": {
            "DEFAULT": "var(--btn-destructive-hover, hsl(var(--destructive) / 90%)/* --btn-destructive -> --destructive */)",
            "dark": "var(--btn-destructive-hover-dark, hsl(var(--destructive) / 90%)/* --btn-destructive -> --destructive */)",
          },
        },
        "btn-input": {
          "DEFAULT": "var(--btn-input, hsl(var(--input)))",
          "dark": "var(--btn-input-dark, hsl(var(--input)))",
        },
        "btn-primary": {
          "DEFAULT": "var(--btn-primary, hsl(var(--primary)))",
          "dark": "var(--btn-primary-dark, hsl(var(--primary)))",
          "foreground": {
            "DEFAULT": "var(--btn-primary-foreground, hsl(var(--primary-foreground)))",
            "dark": "var(--btn-primary-foreground-dark, hsl(var(--primary-foreground)))",
          },
          "hover": {
            "DEFAULT": "var(--btn-primary-hover, hsl(var(--primary) / 90%)/* --btn-primary -> --primary */)",
            "dark": "var(--btn-primary-hover-dark, hsl(var(--primary) / 90%)/* --btn-primary -> --primary */)",
          },
        },
        "btn-ring": {
          "DEFAULT": "var(--btn-ring, hsl(var(--ring)))",
          "dark": "var(--btn-ring-dark, hsl(var(--ring)))",
        },
        "btn-secondary": {
          "DEFAULT": "var(--btn-secondary, hsl(var(--secondary)))",
          "dark": "var(--btn-secondary-dark, hsl(var(--secondary)))",
          "foreground": {
            "DEFAULT": "var(--btn-secondary-foreground, hsl(var(--secondary-foreground)))",
            "dark": "var(--btn-secondary-foreground-dark, hsl(var(--secondary-foreground)))",
          },
          "hover": {
            "DEFAULT": "var(--btn-secondary-hover, hsl(var(--secondary) / 80%)/* --btn-secondary -> --secondary */)",
            "dark": "var(--btn-secondary-hover-dark, hsl(var(--secondary) / 80%)/* --btn-secondary -> --secondary */)",
          },
        },
        "card": {
          "DEFAULT": "var(--card, 0 0% 100%)",
          "dark": {
            "DEFAULT": "240 10% 3.9%",
          },
        },
        "card-card": {
          "DEFAULT": "var(--card-card, hsl(var(--card)))",
          "dark": "var(--card-card-dark, hsl(var(--card)))",
          "foreground": {
            "DEFAULT": "var(--card-card-foreground, var(--foreground)/* --foreground */)",
            "dark": "var(--card-card-foreground-dark, var(--foreground)/* --foreground */)",
          },
        },
        "checkbox-checkbox": {
          "primary": {
            "DEFAULT": "var(--checkbox-checkbox-primary, hsl(var(--primary)))",
            "dark": "var(--checkbox-checkbox-primary-dark, hsl(var(--primary)))",
            "foreground": {
              "DEFAULT": "var(--checkbox-checkbox-primary-foreground, var(--foreground)/* --foreground */)",
              "dark": "var(--checkbox-checkbox-primary-foreground-dark, var(--foreground)/* --foreground */)",
            },
            "ring": {
              "DEFAULT": "var(--checkbox-checkbox-primary-ring, hsl(var(--ring)))",
              "dark": "var(--checkbox-checkbox-primary-ring-dark, hsl(var(--ring)))",
            },
          },
        },
        "destructive": {
          "DEFAULT": "var(--destructive, 0 84.2% 60.2%)",
          "dark": {
            "DEFAULT": "0 62.8% 30.6%",
          },
        },
        "destructive-foreground": {
          "DEFAULT": "hsl(var(--destructive-foreground, 0 0% 98%))",
          "dark": "hsl(var(--destructive-foreground-dark, 0 0% 98%))",
        },
        "foreground": {
          "DEFAULT": "var(--foreground, hsl(240 10% 3.9%))",
          "dark": {
            "DEFAULT": "hsl(0 0% 98%)",
          },
        },
        "input": {
          "DEFAULT": "var(--input, 240 5.9% 90%)",
          "dark": {
            "DEFAULT": "240 3.7% 15.9%",
          },
        },
        "input-input": {
          "DEFAULT": "var(--input-input, hsl(var(--input)))",
          "dark": "var(--input-input-dark, hsl(var(--input)))",
          "ring": {
            "DEFAULT": "var(--input-input-ring, hsl(var(--ring)))",
            "dark": "var(--input-input-ring-dark, hsl(var(--ring)))",
          },
        },
        "primary": {
          "DEFAULT": "var(--primary, 240 5.9% 10%)",
          "dark": {
            "DEFAULT": "0 0% 98%",
          },
        },
        "primary-foreground": {
          "DEFAULT": "hsl(var(--primary-foreground, 0 0% 98%))",
          "dark": "hsl(var(--primary-foreground-dark, 240 5.9% 10%))",
        },
        "radio": {
          "DEFAULT": "var(--radio, var(--radio)/* --radio */)",
          "dark": {
            "DEFAULT": "var(--radio)/* --radio */",
          },
        },
        "radio-primary": {
          "DEFAULT": "var(--radio-primary, hsl(var(--primary)))",
          "dark": "var(--radio-primary-dark, hsl(var(--primary)))",
        },
        "ring": {
          "DEFAULT": "var(--ring, 240 5.9% 10%)",
          "dark": {
            "DEFAULT": "240 4.9% 83.9%",
          },
        },
        "secondary": {
          "DEFAULT": "var(--secondary, 240 4.8% 95.9%)",
          "dark": {
            "DEFAULT": "240 3.7% 15.9%",
          },
        },
        "secondary-foreground": {
          "DEFAULT": "hsl(var(--secondary-foreground, 240 5.9% 10%))",
          "dark": "hsl(var(--secondary-foreground-dark, 0 0% 98%))",
        },
        "switch-background": {
          "DEFAULT": "var(--switch-background, var(--background)/* --background */)",
          "dark": "var(--switch-background-dark, var(--background)/* --background */)",
        },
        "switch-checked": {
          "DEFAULT": "var(--switch-checked, hsl(var(--primary)))",
          "dark": "var(--switch-checked-dark, hsl(var(--primary)))",
        },
        "switch-unchecked": {
          "DEFAULT": "var(--switch-unchecked, hsl(var(--input)))",
          "dark": "var(--switch-unchecked-dark, hsl(var(--input)))",
        },
      }
    `)
  })
  it('processTheme', () => {
    expect(processTheme(baseTheme)).toMatchInlineSnapshot(`
      {
        ".2xl": {
          "--boxShadow": "0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25));",
        },
        ".2xs": {
          "--boxShadow": "0 1px var(--tw-shadow-color, rgb(0 0 0 / 0.05));",
        },
        ".dark": {
          "--accent": "240 3.7% 15.9%",
          "--accent-foreground": "0 0% 98%",
          "--background": "hsl(240 10% 3.9%)",
          "--badge-accent": "hsl(var(--accent))",
          "--badge-accent-foreground": "hsl(var(--accent-foreground))",
          "--badge-destructive": "hsl(var(--destructive))",
          "--badge-destructive-foreground": "hsl(var(--destructive-foreground))",
          "--badge-destructive-hover": "hsl(var(--destructive) / 90%)/* --badge-destructive -> --destructive */",
          "--badge-foreground": "var(--foreground)/* --foreground */",
          "--badge-primary": "hsl(var(--primary))",
          "--badge-primary-foreground": "hsl(var(--primary-foreground))",
          "--badge-primary-hover": "hsl(var(--primary) / 90%)/* --badge-primary -> --primary */",
          "--badge-ring-destructive": "hsl(var(--destructive))",
          "--badge-secondary": "hsl(var(--secondary))",
          "--badge-secondary-foreground": "hsl(var(--secondary-foreground))",
          "--badge-secondary-hover": "hsl(var(--secondary) / 90%)/* --badge-secondary -> --secondary */",
          "--breadcrumb-foreground": "var(--foreground)/* --foreground */",
          "--breadcrumb-muted-foreground": "hsl(var(--muted-foreground))",
          "--btn-accent": "hsl(var(--accent))",
          "--btn-accent-foreground": "hsl(var(--accent-foreground))",
          "--btn-background": "var(--background)/* --background */",
          "--btn-destructive": "hsl(var(--destructive))",
          "--btn-destructive-foreground": "hsl(var(--destructive-foreground))",
          "--btn-destructive-hover": "hsl(var(--destructive) / 90%)/* --btn-destructive -> --destructive */",
          "--btn-input": "hsl(var(--input))",
          "--btn-primary": "hsl(var(--primary))",
          "--btn-primary-foreground": "hsl(var(--primary-foreground))",
          "--btn-primary-hover": "hsl(var(--primary) / 90%)/* --btn-primary -> --primary */",
          "--btn-ring": "hsl(var(--ring))",
          "--btn-secondary": "hsl(var(--secondary))",
          "--btn-secondary-foreground": "hsl(var(--secondary-foreground))",
          "--btn-secondary-hover": "hsl(var(--secondary) / 80%)/* --btn-secondary -> --secondary */",
          "--card": "240 10% 3.9%",
          "--card-card": "hsl(var(--card))",
          "--card-card-foreground": "var(--foreground)/* --foreground */",
          "--checkbox-checkbox-primary": "hsl(var(--primary))",
          "--checkbox-checkbox-primary-foreground": "var(--foreground)/* --foreground */",
          "--checkbox-checkbox-primary-ring": "hsl(var(--ring))",
          "--destructive": "0 62.8% 30.6%",
          "--destructive-foreground": "0 0% 98%",
          "--foreground": "hsl(0 0% 98%)",
          "--input": "240 3.7% 15.9%",
          "--input-input": "hsl(var(--input))",
          "--input-input-ring": "hsl(var(--ring))",
          "--primary": "0 0% 98%",
          "--primary-foreground": "240 5.9% 10%",
          "--radio": "var(--radio)/* --radio */",
          "--radio-primary": "hsl(var(--primary))",
          "--ring": "240 4.9% 83.9%",
          "--secondary": "240 3.7% 15.9%",
          "--secondary-foreground": "0 0% 98%",
          "--switch-background": "var(--background)/* --background */",
          "--switch-checked": "hsl(var(--primary))",
          "--switch-unchecked": "hsl(var(--input))",
        },
        ".lg": {
          "--boxShadow": "0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));",
        },
        ".md": {
          "--boxShadow": "0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, rgb(0 0 0 / 0.1));",
        },
        ".sm": {
          "--boxShadow": "0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));",
        },
        ".xl": {
          "--boxShadow": "0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1));",
        },
        ".xs": {
          "--boxShadow": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        },
        ":root": {
          "--accent": "240 4.8% 95.9%",
          "--accent-foreground": "240 5.9% 10%",
          "--background": "hsl(0 0% 100%)",
          "--badge-accent": "hsl(var(--accent))",
          "--badge-accent-foreground": "hsl(var(--accent-foreground))",
          "--badge-destructive": "hsl(var(--destructive))",
          "--badge-destructive-foreground": "hsl(var(--destructive-foreground))",
          "--badge-destructive-hover": "hsl(var(--destructive) / 90%)/* --badge-destructive -> --destructive */",
          "--badge-foreground": "var(--foreground)/* --foreground */",
          "--badge-primary": "hsl(var(--primary))",
          "--badge-primary-foreground": "hsl(var(--primary-foreground))",
          "--badge-primary-hover": "hsl(var(--primary) / 90%)/* --badge-primary -> --primary */",
          "--badge-ring-destructive": "hsl(var(--destructive))",
          "--badge-secondary": "hsl(var(--secondary))",
          "--badge-secondary-foreground": "hsl(var(--secondary-foreground))",
          "--badge-secondary-hover": "hsl(var(--secondary) / 90%)/* --badge-secondary -> --secondary */",
          "--breadcrumb-foreground": "var(--foreground)/* --foreground */",
          "--breadcrumb-muted-foreground": "hsl(var(--muted-foreground))",
          "--btn-accent": "hsl(var(--accent))",
          "--btn-accent-foreground": "hsl(var(--accent-foreground))",
          "--btn-background": "var(--background)/* --background */",
          "--btn-destructive": "hsl(var(--destructive))",
          "--btn-destructive-foreground": "hsl(var(--destructive-foreground))",
          "--btn-destructive-hover": "hsl(var(--destructive) / 90%)/* --btn-destructive -> --destructive */",
          "--btn-input": "hsl(var(--input))",
          "--btn-primary": "hsl(var(--primary))",
          "--btn-primary-foreground": "hsl(var(--primary-foreground))",
          "--btn-primary-hover": "hsl(var(--primary) / 90%)/* --btn-primary -> --primary */",
          "--btn-ring": "hsl(var(--ring))",
          "--btn-secondary": "hsl(var(--secondary))",
          "--btn-secondary-foreground": "hsl(var(--secondary-foreground))",
          "--btn-secondary-hover": "hsl(var(--secondary) / 80%)/* --btn-secondary -> --secondary */",
          "--card": "0 0% 100%",
          "--card-card": "hsl(var(--card))",
          "--card-card-foreground": "var(--foreground)/* --foreground */",
          "--checkbox-checkbox-primary": "hsl(var(--primary))",
          "--checkbox-checkbox-primary-foreground": "var(--foreground)/* --foreground */",
          "--checkbox-checkbox-primary-ring": "hsl(var(--ring))",
          "--destructive": "0 84.2% 60.2%",
          "--destructive-foreground": "0 0% 98%",
          "--foreground": "hsl(240 10% 3.9%)",
          "--input": "240 5.9% 90%",
          "--input-input": "hsl(var(--input))",
          "--input-input-ring": "hsl(var(--ring))",
          "--primary": "240 5.9% 10%",
          "--primary-foreground": "0 0% 98%",
          "--radio": "var(--radio)/* --radio */",
          "--radio-primary": "hsl(var(--primary))",
          "--ring": "240 5.9% 10%",
          "--secondary": "240 4.8% 95.9%",
          "--secondary-foreground": "240 5.9% 10%",
          "--switch-background": "var(--background)/* --background */",
          "--switch-checked": "hsl(var(--primary))",
          "--switch-unchecked": "hsl(var(--input))",
        },
      }
    `)
  })

  it('generateColors with rgb', () => {
    expect(
      generateColors(baseTheme, {
        colorRule: 'rgb',
      }),
    ).toMatchInlineSnapshot(`
      {
        "accent": {
          "DEFAULT": "var(--accent, 240 4.8% 95.9%)",
          "dark": {
            "DEFAULT": "240 3.7% 15.9%",
          },
        },
        "accent-foreground": {
          "DEFAULT": "rgb(var(--accent-foreground, 240 5.9% 10%))",
          "dark": "rgb(var(--accent-foreground-dark, 0 0% 98%))",
        },
        "background": {
          "DEFAULT": "var(--background, hsl(0 0% 100%))",
          "dark": {
            "DEFAULT": "hsl(240 10% 3.9%)",
          },
        },
        "badge-accent": {
          "DEFAULT": "var(--badge-accent, hsl(var(--accent)))",
          "dark": "var(--badge-accent-dark, hsl(var(--accent)))",
          "foreground": {
            "DEFAULT": "var(--badge-accent-foreground, hsl(var(--accent-foreground)))",
            "dark": "var(--badge-accent-foreground-dark, hsl(var(--accent-foreground)))",
          },
        },
        "badge-destructive": {
          "DEFAULT": "var(--badge-destructive, hsl(var(--destructive)))",
          "dark": "var(--badge-destructive-dark, hsl(var(--destructive)))",
          "foreground": {
            "DEFAULT": "var(--badge-destructive-foreground, hsl(var(--destructive-foreground)))",
            "dark": "var(--badge-destructive-foreground-dark, hsl(var(--destructive-foreground)))",
          },
          "hover": {
            "DEFAULT": "var(--badge-destructive-hover, hsl(var(--destructive) / 90%)/* --badge-destructive -> --destructive */)",
            "dark": "var(--badge-destructive-hover-dark, hsl(var(--destructive) / 90%)/* --badge-destructive -> --destructive */)",
          },
        },
        "badge-foreground": {
          "DEFAULT": "var(--badge-foreground, var(--foreground)/* --foreground */)",
          "dark": "var(--badge-foreground-dark, var(--foreground)/* --foreground */)",
        },
        "badge-primary": {
          "DEFAULT": "var(--badge-primary, hsl(var(--primary)))",
          "dark": "var(--badge-primary-dark, hsl(var(--primary)))",
          "foreground": {
            "DEFAULT": "var(--badge-primary-foreground, hsl(var(--primary-foreground)))",
            "dark": "var(--badge-primary-foreground-dark, hsl(var(--primary-foreground)))",
          },
          "hover": {
            "DEFAULT": "var(--badge-primary-hover, hsl(var(--primary) / 90%)/* --badge-primary -> --primary */)",
            "dark": "var(--badge-primary-hover-dark, hsl(var(--primary) / 90%)/* --badge-primary -> --primary */)",
          },
        },
        "badge-ring-destructive": {
          "DEFAULT": "var(--badge-ring-destructive, hsl(var(--destructive)))",
          "dark": "var(--badge-ring-destructive-dark, hsl(var(--destructive)))",
        },
        "badge-secondary": {
          "DEFAULT": "var(--badge-secondary, hsl(var(--secondary)))",
          "dark": "var(--badge-secondary-dark, hsl(var(--secondary)))",
          "foreground": {
            "DEFAULT": "var(--badge-secondary-foreground, hsl(var(--secondary-foreground)))",
            "dark": "var(--badge-secondary-foreground-dark, hsl(var(--secondary-foreground)))",
          },
          "hover": {
            "DEFAULT": "var(--badge-secondary-hover, hsl(var(--secondary) / 90%)/* --badge-secondary -> --secondary */)",
            "dark": "var(--badge-secondary-hover-dark, hsl(var(--secondary) / 90%)/* --badge-secondary -> --secondary */)",
          },
        },
        "boxShadow": {
          "2xl": {
            "DEFAULT": "0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25));",
          },
          "2xs": {
            "DEFAULT": "0 1px var(--tw-shadow-color, rgb(0 0 0 / 0.05));",
          },
          "lg": {
            "DEFAULT": "0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, 0 0 0 / 0.1);",
          },
          "md": {
            "DEFAULT": "0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px var(--tw-shadow-color, 0 0 0 / 0.1);",
          },
          "sm": {
            "DEFAULT": "0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, 0 0 0 / 0.1);",
          },
          "xl": {
            "DEFAULT": "0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, 0 0 0 / 0.1);",
          },
          "xs": {
            "DEFAULT": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          },
        },
        "breadcrumb-foreground": {
          "DEFAULT": "var(--breadcrumb-foreground, var(--foreground)/* --foreground */)",
          "dark": "var(--breadcrumb-foreground-dark, var(--foreground)/* --foreground */)",
        },
        "breadcrumb-muted-foreground": {
          "DEFAULT": "var(--breadcrumb-muted-foreground, hsl(var(--muted-foreground)))",
          "dark": "var(--breadcrumb-muted-foreground-dark, hsl(var(--muted-foreground)))",
        },
        "btn-accent": {
          "DEFAULT": "var(--btn-accent, hsl(var(--accent)))",
          "dark": "var(--btn-accent-dark, hsl(var(--accent)))",
          "foreground": {
            "DEFAULT": "var(--btn-accent-foreground, hsl(var(--accent-foreground)))",
            "dark": "var(--btn-accent-foreground-dark, hsl(var(--accent-foreground)))",
          },
        },
        "btn-background": {
          "DEFAULT": "var(--btn-background, var(--background)/* --background */)",
          "dark": "var(--btn-background-dark, var(--background)/* --background */)",
        },
        "btn-destructive": {
          "DEFAULT": "var(--btn-destructive, hsl(var(--destructive)))",
          "dark": "var(--btn-destructive-dark, hsl(var(--destructive)))",
          "foreground": {
            "DEFAULT": "var(--btn-destructive-foreground, hsl(var(--destructive-foreground)))",
            "dark": "var(--btn-destructive-foreground-dark, hsl(var(--destructive-foreground)))",
          },
          "hover": {
            "DEFAULT": "var(--btn-destructive-hover, hsl(var(--destructive) / 90%)/* --btn-destructive -> --destructive */)",
            "dark": "var(--btn-destructive-hover-dark, hsl(var(--destructive) / 90%)/* --btn-destructive -> --destructive */)",
          },
        },
        "btn-input": {
          "DEFAULT": "var(--btn-input, hsl(var(--input)))",
          "dark": "var(--btn-input-dark, hsl(var(--input)))",
        },
        "btn-primary": {
          "DEFAULT": "var(--btn-primary, hsl(var(--primary)))",
          "dark": "var(--btn-primary-dark, hsl(var(--primary)))",
          "foreground": {
            "DEFAULT": "var(--btn-primary-foreground, hsl(var(--primary-foreground)))",
            "dark": "var(--btn-primary-foreground-dark, hsl(var(--primary-foreground)))",
          },
          "hover": {
            "DEFAULT": "var(--btn-primary-hover, hsl(var(--primary) / 90%)/* --btn-primary -> --primary */)",
            "dark": "var(--btn-primary-hover-dark, hsl(var(--primary) / 90%)/* --btn-primary -> --primary */)",
          },
        },
        "btn-ring": {
          "DEFAULT": "var(--btn-ring, hsl(var(--ring)))",
          "dark": "var(--btn-ring-dark, hsl(var(--ring)))",
        },
        "btn-secondary": {
          "DEFAULT": "var(--btn-secondary, hsl(var(--secondary)))",
          "dark": "var(--btn-secondary-dark, hsl(var(--secondary)))",
          "foreground": {
            "DEFAULT": "var(--btn-secondary-foreground, hsl(var(--secondary-foreground)))",
            "dark": "var(--btn-secondary-foreground-dark, hsl(var(--secondary-foreground)))",
          },
          "hover": {
            "DEFAULT": "var(--btn-secondary-hover, hsl(var(--secondary) / 80%)/* --btn-secondary -> --secondary */)",
            "dark": "var(--btn-secondary-hover-dark, hsl(var(--secondary) / 80%)/* --btn-secondary -> --secondary */)",
          },
        },
        "card": {
          "DEFAULT": "var(--card, 0 0% 100%)",
          "dark": {
            "DEFAULT": "240 10% 3.9%",
          },
        },
        "card-card": {
          "DEFAULT": "var(--card-card, hsl(var(--card)))",
          "dark": "var(--card-card-dark, hsl(var(--card)))",
          "foreground": {
            "DEFAULT": "var(--card-card-foreground, var(--foreground)/* --foreground */)",
            "dark": "var(--card-card-foreground-dark, var(--foreground)/* --foreground */)",
          },
        },
        "checkbox-checkbox": {
          "primary": {
            "DEFAULT": "var(--checkbox-checkbox-primary, hsl(var(--primary)))",
            "dark": "var(--checkbox-checkbox-primary-dark, hsl(var(--primary)))",
            "foreground": {
              "DEFAULT": "var(--checkbox-checkbox-primary-foreground, var(--foreground)/* --foreground */)",
              "dark": "var(--checkbox-checkbox-primary-foreground-dark, var(--foreground)/* --foreground */)",
            },
            "ring": {
              "DEFAULT": "var(--checkbox-checkbox-primary-ring, hsl(var(--ring)))",
              "dark": "var(--checkbox-checkbox-primary-ring-dark, hsl(var(--ring)))",
            },
          },
        },
        "destructive": {
          "DEFAULT": "var(--destructive, 0 84.2% 60.2%)",
          "dark": {
            "DEFAULT": "0 62.8% 30.6%",
          },
        },
        "destructive-foreground": {
          "DEFAULT": "rgb(var(--destructive-foreground, 0 0% 98%))",
          "dark": "rgb(var(--destructive-foreground-dark, 0 0% 98%))",
        },
        "foreground": {
          "DEFAULT": "var(--foreground, hsl(240 10% 3.9%))",
          "dark": {
            "DEFAULT": "hsl(0 0% 98%)",
          },
        },
        "input": {
          "DEFAULT": "var(--input, 240 5.9% 90%)",
          "dark": {
            "DEFAULT": "240 3.7% 15.9%",
          },
        },
        "input-input": {
          "DEFAULT": "var(--input-input, hsl(var(--input)))",
          "dark": "var(--input-input-dark, hsl(var(--input)))",
          "ring": {
            "DEFAULT": "var(--input-input-ring, hsl(var(--ring)))",
            "dark": "var(--input-input-ring-dark, hsl(var(--ring)))",
          },
        },
        "primary": {
          "DEFAULT": "var(--primary, 240 5.9% 10%)",
          "dark": {
            "DEFAULT": "0 0% 98%",
          },
        },
        "primary-foreground": {
          "DEFAULT": "rgb(var(--primary-foreground, 0 0% 98%))",
          "dark": "rgb(var(--primary-foreground-dark, 240 5.9% 10%))",
        },
        "radio": {
          "DEFAULT": "var(--radio, var(--radio)/* --radio */)",
          "dark": {
            "DEFAULT": "var(--radio)/* --radio */",
          },
        },
        "radio-primary": {
          "DEFAULT": "var(--radio-primary, hsl(var(--primary)))",
          "dark": "var(--radio-primary-dark, hsl(var(--primary)))",
        },
        "ring": {
          "DEFAULT": "var(--ring, 240 5.9% 10%)",
          "dark": {
            "DEFAULT": "240 4.9% 83.9%",
          },
        },
        "secondary": {
          "DEFAULT": "var(--secondary, 240 4.8% 95.9%)",
          "dark": {
            "DEFAULT": "240 3.7% 15.9%",
          },
        },
        "secondary-foreground": {
          "DEFAULT": "rgb(var(--secondary-foreground, 240 5.9% 10%))",
          "dark": "rgb(var(--secondary-foreground-dark, 0 0% 98%))",
        },
        "switch-background": {
          "DEFAULT": "var(--switch-background, var(--background)/* --background */)",
          "dark": "var(--switch-background-dark, var(--background)/* --background */)",
        },
        "switch-checked": {
          "DEFAULT": "var(--switch-checked, hsl(var(--primary)))",
          "dark": "var(--switch-checked-dark, hsl(var(--primary)))",
        },
        "switch-unchecked": {
          "DEFAULT": "var(--switch-unchecked, hsl(var(--input)))",
          "dark": "var(--switch-unchecked-dark, hsl(var(--input)))",
        },
      }
    `)
  })

  it('advanced color format handling', () => {
    // 测试所有高级颜色格式：rgb, hsl, undefined, 自定义函数
    const advancedTheme = {
      test: {
        // 1. 强制使用 RGB 格式
        rgbColor: {
          DEFAULT: ['255 0 0', 'rgb'] as [string, 'rgb'],
        },

        // 2. 强制使用 HSL 格式
        hslColor: {
          DEFAULT: ['240 50% 60%', 'hsl'] as [string, 'hsl'],
        },

        // 3. 使用 undefined 表示不包裹任何函数
        rawColor: {
          DEFAULT: ['240 50% 60%', undefined] as [string, undefined],
        },

        // 3.1. 单元素数组，默认为 undefined
        singleArrayColor: {
          DEFAULT: ['180 30% 70%'] as [string],
        },

        // 4. 使用自定义函数处理
        customColor: {
          DEFAULT: [
            '240 50 60',
            (prefixKey: string, value: string) => {
              return `oklch(var(${prefixKey}, ${value}))`
            },
          ] as [string, (prefixKey: string, value: string) => string],
        },

        // 5. 混合使用不同格式
        mixedColors: {
          DEFAULT: '0 0% 100%', // 使用全局默认 hsl
          accent: {
            DEFAULT: ['255 128 64', 'rgb'] as [string, 'rgb'], // RGB
          },
          raw: {
            DEFAULT: ['120 80% 50%'] as [string], // 原始值
          },
          hover: {
            DEFAULT: [
              '120 80% 50%',
              (prefixKey: string, value: string) => {
                return `color-mix(in srgb, var(${prefixKey}, ${value}), transparent 20%)`
              },
            ] as [string, (prefixKey: string, value: string) => string], // 自定义函数
          },
        },

        // 6. css 变量格式
        cssColor: {
          DEFAULT: 'var(--test-cssColor, 240 50% 60%)',
          dark: 'var(--test-cssColor-dark, 240 3.7% 15.9%)',
        },
      },
    }

    const result = generateColors(advancedTheme, { colorRule: 'hsl' })

    // 验证 RGB 强制格式
    expect(result['test-rgbColor'].DEFAULT).toBe(
      'rgb(var(--test-rgbColor, 255 0 0))',
    )

    // 验证 HSL 强制格式
    expect(result['test-hslColor'].DEFAULT).toBe(
      'hsl(var(--test-hslColor, 240 50% 60%))',
    )

    // 验证 undefined（原始值不包裹）
    expect(result['test-rawColor'].DEFAULT).toBe(
      'var(--test-rawColor, 240 50% 60%)',
    )

    // 验证单元素数组（默认为 undefined）
    expect(result['test-singleArrayColor'].DEFAULT).toBe(
      'var(--test-singleArrayColor, 180 30% 70%)',
    )

    // 验证自定义函数
    expect(result['test-customColor'].DEFAULT).toBe(
      'oklch(var(--test-customColor, 240 50 60))',
    )
    // 验证混合使用场景
    expect(result['test-mixedColors'].DEFAULT).toBe(
      'hsl(var(--test-mixedColors, 0 0% 100%))',
    )
    expect((result['test-mixedColors'].accent as any).DEFAULT).toBe(
      'rgb(var(--test-mixedColors-accent, 255 128 64))',
    )
    expect((result['test-mixedColors'].raw as any).DEFAULT).toBe(
      'var(--test-mixedColors-raw, 120 80% 50%)',
    )
    expect((result['test-mixedColors'].hover as any).DEFAULT).toBe(
      'color-mix(in srgb, var(--test-mixedColors-hover, 120 80% 50%), transparent 20%)',
    )
    expect(result['test-cssColor'].DEFAULT).toBe(
      'var(--test-cssColor, var(--test-cssColor, 240 50% 60%))',
    )
    expect(result['test-cssColor'].dark).toBe(
      'var(--test-cssColor-dark, var(--test-cssColor-dark, 240 3.7% 15.9%))',
    )
    expect(processTheme(advancedTheme)).toMatchInlineSnapshot(`
      {
        ".dark": {
          "--test-cssColor": "var(--test-cssColor-dark, 240 3.7% 15.9%)",
        },
        ":root": {
          "--test-cssColor": "var(--test-cssColor, 240 50% 60%)",
          "--test-customColor": "240 50 60",
          "--test-hslColor": "240 50% 60%",
          "--test-mixedColors": "0 0% 100%",
          "--test-mixedColors-accent": "255 128 64",
          "--test-mixedColors-hover": "120 80% 50%",
          "--test-mixedColors-raw": "120 80% 50%",
          "--test-rawColor": "240 50% 60%",
          "--test-rgbColor": "255 0 0",
          "--test-singleArrayColor": "180 30% 70%",
        },
      }
    `)
  })

  it('processTheme with advanced color formats', () => {
    const theme = {
      primary: {
        DEFAULT: '240 5.9% 10%', // --primary: '240 5.9% 10%'
        dark: '0 0% 98%', // --primary-dark: '0 0% 98%'
        light: 'var(--primary-foreground)', // --primary-light: '240 5.9% 90%'
        foreground: {
          DEFAULT: '0 0% 98%',
          dark: '240 5.9% 10%',
        },
      },
      background: {
        DEFAULT: '0 0% 100%',
        dark: '240 10% 3.9%',
      },
      btn: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          dark: 'hsl(var(--primary))',
          hover: {
            DEFAULT: 'hsl(var(--btn-primary) / 90%)', // bg-btn-primary/90
            dark: 'hsl(var(--btn-primary) / 90%)',
          },
          foreground: {
            DEFAULT: 'hsl(var(--primary-foreground))',
            dark: 'hsl(var(--primary-foreground))',
          },
        },
        background: {
          DEFAULT: 'hsl(var(--background))',
          dark: 'hsl(var(--background))',
        },
      },
      mixedColors: {
        DEFAULT: '0 0% 100%', // 使用全局默认 hsl
        accent: ['255 128 64', 'rgb'] as [string, 'rgb'], // RGB
        raw: ['120 80% 50%'] as [string], // 原始值
        hover: [
          '120 80% 50%',
          (prefixKey: string, value: string) => {
            return `color-mix(in srgb, var(${prefixKey}, ${value}), transparent 20%)`
          },
        ] as [string, (prefixKey: string, value: string) => string], // 自定义函数
      },
    }

    expect(processTheme(theme)).toMatchInlineSnapshot(`
      {
        ".dark": {
          "--background": "240 10% 3.9%",
          "--btn-background": "hsl(var(--background))",
          "--btn-primary": "hsl(var(--primary))",
          "--btn-primary-foreground": "hsl(var(--primary-foreground))",
          "--btn-primary-hover": "hsl(var(--primary) / 90%)/* --btn-primary -> --primary */",
          "--primary": "0 0% 98%",
          "--primary-foreground": "240 5.9% 10%",
        },
        ".light": {
          "--primary": "var(--primary-foreground)",
        },
        ":root": {
          "--background": "0 0% 100%",
          "--btn-background": "hsl(var(--background))",
          "--btn-primary": "hsl(var(--primary))",
          "--btn-primary-foreground": "hsl(var(--primary-foreground))",
          "--btn-primary-hover": "hsl(var(--primary) / 90%)/* --btn-primary -> --primary */",
          "--mixedColors": "0 0% 100%",
          "--mixedColors-accent": "255 128 64",
          "--mixedColors-hover": "120 80% 50%",
          "--mixedColors-raw": "120 80% 50%",
          "--primary": "240 5.9% 10%",
          "--primary-foreground": "0 0% 98%",
        },
      }
    `)

    expect(generateColors(theme)).toMatchInlineSnapshot(`
      {
        "background": {
          "DEFAULT": "var(--background, 0 0% 100%)",
          "dark": {
            "DEFAULT": "240 10% 3.9%",
          },
        },
        "btn-background": {
          "DEFAULT": "var(--btn-background, hsl(var(--background)))",
          "dark": "var(--btn-background-dark, hsl(var(--background)))",
        },
        "btn-primary": {
          "DEFAULT": "var(--btn-primary, hsl(var(--primary)))",
          "dark": "var(--btn-primary-dark, hsl(var(--primary)))",
          "foreground": {
            "DEFAULT": "var(--btn-primary-foreground, hsl(var(--primary-foreground)))",
            "dark": "var(--btn-primary-foreground-dark, hsl(var(--primary-foreground)))",
          },
          "hover": {
            "DEFAULT": "var(--btn-primary-hover, hsl(var(--primary) / 90%)/* --btn-primary -> --primary */)",
            "dark": "var(--btn-primary-hover-dark, hsl(var(--primary) / 90%)/* --btn-primary -> --primary */)",
          },
        },
        "mixedColors": {
          "DEFAULT": "var(--mixedColors, 0 0% 100%)",
          "accent": "rgb(var(--mixedColors-accent, 255 128 64))",
          "hover": "color-mix(in srgb, var(--mixedColors-hover, 120 80% 50%), transparent 20%)",
          "raw": "var(--mixedColors-raw, 120 80% 50%)",
        },
        "primary": {
          "DEFAULT": "var(--primary, 240 5.9% 10%)",
          "dark": {
            "DEFAULT": "0 0% 98%",
          },
          "light": {
            "DEFAULT": "var(--primary-foreground)",
          },
        },
        "primary-foreground": {
          "DEFAULT": "hsl(var(--primary-foreground, 0 0% 98%))",
          "dark": "hsl(var(--primary-foreground-dark, 240 5.9% 10%))",
        },
      }
    `)
  })

  it('custom test', () => {
    const theme = {
      secondary: {
        DEFAULT: '240 4.8% 95.9%',
        dark: '240 3.7% 15.9%',
        foreground: {
          DEFAULT: '240 5.9% 10%',
          dark: '0 0% 98%',
        },
      },
      btn: {
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          dark: 'hsl(var(--secondary))',
          hover: {
            DEFAULT: 'hsl(var(--btn-secondary) / 80%)', // bg-btn-secondary/80
            dark: 'hsl(var(--btn-secondary) / 80%)',
          },
          foreground: {
            DEFAULT: 'hsl(var(--secondary-foreground))',
            dark: 'hsl(var(--secondary-foreground))',
          },
        },
      },
      background: {
        DEFAULT: 'hsl(0 0% 100%)',
        dark: 'hsl(240 10% 3.9%)',
      },
      switch: {
        background: {
          DEFAULT: 'hsl(var(--background) / 10%)',
          dark: 'hsl(var(--background))',
        },
        checked: {
          DEFAULT: 'hsl(var(--primary))',
          dark: 'hsl(var(--primary))',
        },
        unchecked: {
          DEFAULT: 'hsl(var(--input))', // hsl(240 3.7% 15.9%)
          dark: 'hsl(var(--input))',
        },
      },
    }

    expect(processTheme(theme)).toMatchInlineSnapshot(`
      {
        ".dark": {
          "--background": "hsl(240 10% 3.9%)",
          "--btn-secondary": "hsl(var(--secondary))",
          "--btn-secondary-foreground": "hsl(var(--secondary-foreground))",
          "--btn-secondary-hover": "hsl(var(--secondary) / 80%)/* --btn-secondary -> --secondary */",
          "--secondary": "240 3.7% 15.9%",
          "--secondary-foreground": "0 0% 98%",
          "--switch-background": "var(--background)/* --background */",
          "--switch-checked": "hsl(var(--primary))",
          "--switch-unchecked": "hsl(var(--input))",
        },
        ":root": {
          "--background": "hsl(0 0% 100%)",
          "--btn-secondary": "hsl(var(--secondary))",
          "--btn-secondary-foreground": "hsl(var(--secondary-foreground))",
          "--btn-secondary-hover": "hsl(var(--secondary) / 80%)/* --btn-secondary -> --secondary */",
          "--secondary": "240 4.8% 95.9%",
          "--secondary-foreground": "240 5.9% 10%",
          "--switch-background": "var(--background) / 10%/* --background */",
          "--switch-checked": "hsl(var(--primary))",
          "--switch-unchecked": "hsl(var(--input))",
        },
      }
    `)

    expect(generateColors(theme)).toMatchInlineSnapshot(`
      {
        "background": {
          "DEFAULT": "var(--background, hsl(0 0% 100%))",
          "dark": {
            "DEFAULT": "hsl(240 10% 3.9%)",
          },
        },
        "btn-secondary": {
          "DEFAULT": "var(--btn-secondary, hsl(var(--secondary)))",
          "dark": "var(--btn-secondary-dark, hsl(var(--secondary)))",
          "foreground": {
            "DEFAULT": "var(--btn-secondary-foreground, hsl(var(--secondary-foreground)))",
            "dark": "var(--btn-secondary-foreground-dark, hsl(var(--secondary-foreground)))",
          },
          "hover": {
            "DEFAULT": "var(--btn-secondary-hover, hsl(var(--secondary) / 80%)/* --btn-secondary -> --secondary */)",
            "dark": "var(--btn-secondary-hover-dark, hsl(var(--secondary) / 80%)/* --btn-secondary -> --secondary */)",
          },
        },
        "secondary": {
          "DEFAULT": "var(--secondary, 240 4.8% 95.9%)",
          "dark": {
            "DEFAULT": "240 3.7% 15.9%",
          },
        },
        "secondary-foreground": {
          "DEFAULT": "hsl(var(--secondary-foreground, 240 5.9% 10%))",
          "dark": "hsl(var(--secondary-foreground-dark, 0 0% 98%))",
        },
        "switch-background": {
          "DEFAULT": "var(--switch-background, var(--background) / 10%/* --background */)",
          "dark": "var(--switch-background-dark, var(--background)/* --background */)",
        },
        "switch-checked": {
          "DEFAULT": "var(--switch-checked, hsl(var(--primary)))",
          "dark": "var(--switch-checked-dark, hsl(var(--primary)))",
        },
        "switch-unchecked": {
          "DEFAULT": "var(--switch-unchecked, hsl(var(--input)))",
          "dark": "var(--switch-unchecked-dark, hsl(var(--input)))",
        },
      }
    `)
  })
})
