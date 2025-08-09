import { describe, expect, it } from 'vitest'
import { generateColors, processTheme } from '../src'

describe('tailwind-theme-presets', () => {
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
      'accent': {
        DEFAULT: '240 4.8% 95.9%',
        dark: '240 3.7% 15.9%',
        foreground: {
          DEFAULT: '240 5.9% 10%',
          dark: '0 0% 98%',
        },
      },
      'foreground': {
        DEFAULT: '240 5.9% 10%',
        dark: '0 0% 98%',
      },
      'primary': {
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
      'secondary': {
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
      'destructive': {
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
          "dark": "hsl(var(--badge-accent-dark, 240 3.7% 15.9%))",
          "foreground": {
            "DEFAULT": "hsl(var(--badge-accent-foreground, 240 5.9% 10%))",
            "dark": "hsl(var(--badge-accent-foreground-dark, 0 0% 98%))",
          },
        },
        "badge-destructive": {
          "DEFAULT": "hsl(var(--badge-destructive, 0 84.2% 60.2%))",
          "dark": "hsl(var(--badge-destructive-dark, 0 62.8% 30.6%))",
          "foreground": {
            "DEFAULT": "hsl(var(--badge-destructive-foreground, 0 0% 98%))",
            "dark": "hsl(var(--badge-destructive-foreground-dark, 0 0% 98%))",
          },
          "hover": {
            "DEFAULT": "var(--badge-destructive-hover, var(--badge-destructive) / 90%)",
            "dark": "hsl(var(--badge-destructive-hover-dark, 0 62.8% 20.6%))",
          },
        },
        "badge-foreground": {
          "DEFAULT": "hsl(var(--badge-foreground, 240 5.9% 10%))",
          "dark": "hsl(var(--badge-foreground-dark, 0 0% 98%))",
        },
        "badge-primary": {
          "DEFAULT": "hsl(var(--badge-primary, 240 5.9% 10%))",
          "dark": "hsl(var(--badge-primary-dark, 0 0% 98%))",
          "foreground": {
            "DEFAULT": "hsl(var(--badge-primary-foreground, 0 0% 98%))",
            "dark": "hsl(var(--badge-primary-foreground-dark, 240 5.9% 10%))",
          },
          "hover": {
            "DEFAULT": "var(--badge-primary-hover, var(--badge-primary) / 90%)",
            "dark": "hsl(var(--badge-primary-hover-dark, 0 0% 98%))",
          },
        },
        "badge-ring-destructive": {
          "DEFAULT": "hsl(var(--badge-ring-destructive, 0 84.2% 60.2%))",
          "dark": "hsl(var(--badge-ring-destructive-dark, 0 62.8% 30.6%))",
        },
        "badge-secondary": {
          "DEFAULT": "hsl(var(--badge-secondary, 240 4.8% 95.9%))",
          "dark": "hsl(var(--badge-secondary-dark, 240 3.7% 15.9%))",
          "foreground": {
            "DEFAULT": "hsl(var(--badge-secondary-foreground, 240 5.9% 10%))",
            "dark": "hsl(var(--badge-secondary-foreground-dark, 0 0% 98%))",
          },
          "hover": {
            "DEFAULT": "var(--badge-secondary-hover, var(--badge-secondary) / 90%)",
            "dark": "hsl(var(--badge-secondary-hover-dark, 240 3.7% 15.9%))",
          },
        },
        "btn-accent": {
          "DEFAULT": "hsl(var(--btn-accent, 240 4.8% 95.9%))",
          "dark": "hsl(var(--btn-accent-dark, 240 3.7% 15.9%))",
          "foreground": {
            "DEFAULT": "hsl(var(--btn-accent-foreground, 240 5.9% 10%))",
            "dark": "hsl(var(--btn-accent-foreground-dark, 0 0% 98%))",
          },
        },
        "btn-background": {
          "DEFAULT": "hsl(var(--btn-background, 0 0% 100%))",
          "dark": "hsl(var(--btn-background-dark, 240 10% 3.9%))",
        },
        "btn-destructive": {
          "DEFAULT": "hsl(var(--btn-destructive, 0 84.2% 60.2%))",
          "dark": "hsl(var(--btn-destructive-dark, 0 62.8% 30.6%))",
          "foreground": {
            "DEFAULT": "hsl(var(--btn-destructive-foreground, 0 0% 98%))",
            "dark": "hsl(var(--btn-destructive-foreground-dark, 0 0% 98%))",
          },
          "hover": {
            "DEFAULT": "var(--btn-destructive-hover, var(--btn-destructive) / 90%)",
            "dark": "hsl(var(--btn-destructive-hover-dark, 0 62.8% 20.6%))",
          },
        },
        "btn-input": {
          "DEFAULT": "hsl(var(--btn-input, 240 5.9% 90%))",
          "dark": "hsl(var(--btn-input-dark, 240 3.7% 15.9%))",
        },
        "btn-primary": {
          "DEFAULT": "hsl(var(--btn-primary, 240 5.9% 10%))",
          "dark": "hsl(var(--btn-primary-dark, 0 0% 98%))",
          "foreground": {
            "DEFAULT": "hsl(var(--btn-primary-foreground, 0 0% 98%))",
            "dark": "hsl(var(--btn-primary-foreground-dark, 240 5.9% 10%))",
          },
          "hover": {
            "DEFAULT": "var(--btn-primary-hover, var(--btn-primary) / 90%)",
            "dark": "hsl(var(--btn-primary-hover-dark, 0 0% 98%))",
          },
        },
        "btn-ring": {
          "DEFAULT": "hsl(var(--btn-ring, 240 5.9% 10%))",
          "dark": "hsl(var(--btn-ring-dark, 240 4.9% 83.9%))",
        },
        "btn-secondary": {
          "DEFAULT": "hsl(var(--btn-secondary, 240 4.8% 95.9%))",
          "dark": "hsl(var(--btn-secondary-dark, 240 3.7% 15.9%))",
          "foreground": {
            "DEFAULT": "hsl(var(--btn-secondary-foreground, 240 5.9% 10%))",
            "dark": "hsl(var(--btn-secondary-foreground-dark, 0 0% 98%))",
          },
          "hover": {
            "DEFAULT": "var(--btn-secondary-hover, var(--btn-secondary) / 80%)",
            "dark": "hsl(var(--btn-secondary-hover-dark, 240 3.7% 15.9%))",
          },
        },
        "card-card": {
          "DEFAULT": "hsl(var(--card-card, 0 0% 100%))",
          "dark": "hsl(var(--card-card-dark, 240 10% 3.9%))",
          "foreground": {
            "DEFAULT": "hsl(var(--card-card-foreground, 240 5.9% 10%))",
            "dark": "hsl(var(--card-card-foreground-dark, 0 0% 98%))",
          },
        },
        "checkbox-checkbox": {
          "primary": {
            "DEFAULT": "hsl(var(--checkbox-checkbox-primary, 240 5.9% 10%))",
            "dark": "hsl(var(--checkbox-checkbox-primary-dark, 0 0% 98%))",
            "foreground": {
              "DEFAULT": "hsl(var(--checkbox-checkbox-primary-foreground, 0 0% 98%))",
              "dark": "hsl(var(--checkbox-checkbox-primary-foreground-dark, 240 5.9% 10%))",
            },
            "ring": {
              "DEFAULT": "hsl(var(--checkbox-checkbox-primary-ring, 240 5.9% 10%))",
              "dark": "hsl(var(--checkbox-checkbox-primary-ring-dark, 240 4.9% 83.9%))",
            },
          },
        },
        "input-input": {
          "DEFAULT": "hsl(var(--input-input, 240 5.9% 90%))",
          "dark": "hsl(var(--input-input-dark, 240 3.7% 15.9%))",
          "ring": {
            "DEFAULT": "hsl(var(--input-input-ring, 240 5.9% 90%))",
            "dark": "hsl(var(--input-input-ring-dark, 240 3.7% 15.9%))",
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

  it('generateColors with rgb', () => {
    expect(generateColors(baseTheme, {
      colorRule: 'rgb',
    })).toMatchInlineSnapshot(`
      {
        "badge-accent": {
          "DEFAULT": "rgb(var(--badge-accent, 240 4.8% 95.9%))",
          "dark": "rgb(var(--badge-accent-dark, 240 3.7% 15.9%))",
          "foreground": {
            "DEFAULT": "rgb(var(--badge-accent-foreground, 240 5.9% 10%))",
            "dark": "rgb(var(--badge-accent-foreground-dark, 0 0% 98%))",
          },
        },
        "badge-destructive": {
          "DEFAULT": "rgb(var(--badge-destructive, 0 84.2% 60.2%))",
          "dark": "rgb(var(--badge-destructive-dark, 0 62.8% 30.6%))",
          "foreground": {
            "DEFAULT": "rgb(var(--badge-destructive-foreground, 0 0% 98%))",
            "dark": "rgb(var(--badge-destructive-foreground-dark, 0 0% 98%))",
          },
          "hover": {
            "DEFAULT": "var(--badge-destructive-hover, var(--badge-destructive) / 90%)",
            "dark": "rgb(var(--badge-destructive-hover-dark, 0 62.8% 20.6%))",
          },
        },
        "badge-foreground": {
          "DEFAULT": "rgb(var(--badge-foreground, 240 5.9% 10%))",
          "dark": "rgb(var(--badge-foreground-dark, 0 0% 98%))",
        },
        "badge-primary": {
          "DEFAULT": "rgb(var(--badge-primary, 240 5.9% 10%))",
          "dark": "rgb(var(--badge-primary-dark, 0 0% 98%))",
          "foreground": {
            "DEFAULT": "rgb(var(--badge-primary-foreground, 0 0% 98%))",
            "dark": "rgb(var(--badge-primary-foreground-dark, 240 5.9% 10%))",
          },
          "hover": {
            "DEFAULT": "var(--badge-primary-hover, var(--badge-primary) / 90%)",
            "dark": "rgb(var(--badge-primary-hover-dark, 0 0% 98%))",
          },
        },
        "badge-ring-destructive": {
          "DEFAULT": "rgb(var(--badge-ring-destructive, 0 84.2% 60.2%))",
          "dark": "rgb(var(--badge-ring-destructive-dark, 0 62.8% 30.6%))",
        },
        "badge-secondary": {
          "DEFAULT": "rgb(var(--badge-secondary, 240 4.8% 95.9%))",
          "dark": "rgb(var(--badge-secondary-dark, 240 3.7% 15.9%))",
          "foreground": {
            "DEFAULT": "rgb(var(--badge-secondary-foreground, 240 5.9% 10%))",
            "dark": "rgb(var(--badge-secondary-foreground-dark, 0 0% 98%))",
          },
          "hover": {
            "DEFAULT": "var(--badge-secondary-hover, var(--badge-secondary) / 90%)",
            "dark": "rgb(var(--badge-secondary-hover-dark, 240 3.7% 15.9%))",
          },
        },
        "btn-accent": {
          "DEFAULT": "rgb(var(--btn-accent, 240 4.8% 95.9%))",
          "dark": "rgb(var(--btn-accent-dark, 240 3.7% 15.9%))",
          "foreground": {
            "DEFAULT": "rgb(var(--btn-accent-foreground, 240 5.9% 10%))",
            "dark": "rgb(var(--btn-accent-foreground-dark, 0 0% 98%))",
          },
        },
        "btn-background": {
          "DEFAULT": "rgb(var(--btn-background, 0 0% 100%))",
          "dark": "rgb(var(--btn-background-dark, 240 10% 3.9%))",
        },
        "btn-destructive": {
          "DEFAULT": "rgb(var(--btn-destructive, 0 84.2% 60.2%))",
          "dark": "rgb(var(--btn-destructive-dark, 0 62.8% 30.6%))",
          "foreground": {
            "DEFAULT": "rgb(var(--btn-destructive-foreground, 0 0% 98%))",
            "dark": "rgb(var(--btn-destructive-foreground-dark, 0 0% 98%))",
          },
          "hover": {
            "DEFAULT": "var(--btn-destructive-hover, var(--btn-destructive) / 90%)",
            "dark": "rgb(var(--btn-destructive-hover-dark, 0 62.8% 20.6%))",
          },
        },
        "btn-input": {
          "DEFAULT": "rgb(var(--btn-input, 240 5.9% 90%))",
          "dark": "rgb(var(--btn-input-dark, 240 3.7% 15.9%))",
        },
        "btn-primary": {
          "DEFAULT": "rgb(var(--btn-primary, 240 5.9% 10%))",
          "dark": "rgb(var(--btn-primary-dark, 0 0% 98%))",
          "foreground": {
            "DEFAULT": "rgb(var(--btn-primary-foreground, 0 0% 98%))",
            "dark": "rgb(var(--btn-primary-foreground-dark, 240 5.9% 10%))",
          },
          "hover": {
            "DEFAULT": "var(--btn-primary-hover, var(--btn-primary) / 90%)",
            "dark": "rgb(var(--btn-primary-hover-dark, 0 0% 98%))",
          },
        },
        "btn-ring": {
          "DEFAULT": "rgb(var(--btn-ring, 240 5.9% 10%))",
          "dark": "rgb(var(--btn-ring-dark, 240 4.9% 83.9%))",
        },
        "btn-secondary": {
          "DEFAULT": "rgb(var(--btn-secondary, 240 4.8% 95.9%))",
          "dark": "rgb(var(--btn-secondary-dark, 240 3.7% 15.9%))",
          "foreground": {
            "DEFAULT": "rgb(var(--btn-secondary-foreground, 240 5.9% 10%))",
            "dark": "rgb(var(--btn-secondary-foreground-dark, 0 0% 98%))",
          },
          "hover": {
            "DEFAULT": "var(--btn-secondary-hover, var(--btn-secondary) / 80%)",
            "dark": "rgb(var(--btn-secondary-hover-dark, 240 3.7% 15.9%))",
          },
        },
        "card-card": {
          "DEFAULT": "rgb(var(--card-card, 0 0% 100%))",
          "dark": "rgb(var(--card-card-dark, 240 10% 3.9%))",
          "foreground": {
            "DEFAULT": "rgb(var(--card-card-foreground, 240 5.9% 10%))",
            "dark": "rgb(var(--card-card-foreground-dark, 0 0% 98%))",
          },
        },
        "checkbox-checkbox": {
          "primary": {
            "DEFAULT": "rgb(var(--checkbox-checkbox-primary, 240 5.9% 10%))",
            "dark": "rgb(var(--checkbox-checkbox-primary-dark, 0 0% 98%))",
            "foreground": {
              "DEFAULT": "rgb(var(--checkbox-checkbox-primary-foreground, 0 0% 98%))",
              "dark": "rgb(var(--checkbox-checkbox-primary-foreground-dark, 240 5.9% 10%))",
            },
            "ring": {
              "DEFAULT": "rgb(var(--checkbox-checkbox-primary-ring, 240 5.9% 10%))",
              "dark": "rgb(var(--checkbox-checkbox-primary-ring-dark, 240 4.9% 83.9%))",
            },
          },
        },
        "input-input": {
          "DEFAULT": "rgb(var(--input-input, 240 5.9% 90%))",
          "dark": "rgb(var(--input-input-dark, 240 3.7% 15.9%))",
          "ring": {
            "DEFAULT": "rgb(var(--input-input-ring, 240 5.9% 90%))",
            "dark": "rgb(var(--input-input-ring-dark, 240 3.7% 15.9%))",
          },
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
          DEFAULT: ['240 50 60', (prefixKey: string, value: string) => {
            return `oklch(var(${prefixKey}, ${value}))`
          }] as [string, (prefixKey: string, value: string) => string],
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
            DEFAULT: ['120 80% 50%', (prefixKey: string, value: string) => {
              return `color-mix(in srgb, var(${prefixKey}, ${value}), transparent 20%)`
            }] as [string, (prefixKey: string, value: string) => string], // 自定义函数
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
    expect(result['test-rgbColor'].DEFAULT).toBe('rgb(var(--test-rgbColor, 255 0 0))')

    // 验证 HSL 强制格式
    expect(result['test-hslColor'].DEFAULT).toBe('hsl(var(--test-hslColor, 240 50% 60%))')

    // 验证 undefined（原始值不包裹）
    expect(result['test-rawColor'].DEFAULT).toBe('var(--test-rawColor, 240 50% 60%)')

    // 验证单元素数组（默认为 undefined）
    expect(result['test-singleArrayColor'].DEFAULT).toBe('var(--test-singleArrayColor, 180 30% 70%)')

    // 验证自定义函数
    expect(result['test-customColor'].DEFAULT).toBe('oklch(var(--test-customColor, 240 50 60))')
    // 验证混合使用场景
    expect(result['test-mixedColors'].DEFAULT).toBe('hsl(var(--test-mixedColors, 0 0% 100%))')
    expect((result['test-mixedColors'].accent as any).DEFAULT).toBe('rgb(var(--test-mixedColors-accent, 255 128 64))')
    expect((result['test-mixedColors'].raw as any).DEFAULT).toBe('var(--test-mixedColors-raw, 120 80% 50%)')
    expect((result['test-mixedColors'].hover as any).DEFAULT).toBe('color-mix(in srgb, var(--test-mixedColors-hover, 120 80% 50%), transparent 20%)')
    expect(result['test-cssColor'].DEFAULT).toBe('var(--test-cssColor, var(--test-cssColor, 240 50% 60%))')
    expect(result['test-cssColor'].dark).toBe('var(--test-cssColor-dark, var(--test-cssColor-dark, 240 3.7% 15.9%))')
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
        hover: ['120 80% 50%', (prefixKey: string, value: string) => {
          return `color-mix(in srgb, var(${prefixKey}, ${value}), transparent 20%)`
        }] as [string, (prefixKey: string, value: string) => string], // 自定义函数
      },
    }

    expect(processTheme(theme)).toMatchInlineSnapshot(`
      {
        ".dark": {
          "--background": "240 10% 3.9%",
          "--btn-background": "hsl(var(--background))",
          "--btn-primary": "hsl(var(--primary))",
          "--btn-primary-foreground": "hsl(var(--primary-foreground))",
          "--btn-primary-hover": "hsl(var(--btn-primary) / 90%)",
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
          "--btn-primary-hover": "hsl(var(--btn-primary) / 90%)",
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
            "DEFAULT": "var(--btn-primary-hover, hsl(var(--btn-primary) / 90%))",
            "dark": "var(--btn-primary-hover-dark, hsl(var(--btn-primary) / 90%))",
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
      background: {
        DEFAULT: 'hsl(0 0% 100%)',
        dark: 'hsl(240 10% 3.9%)',
      },
      switch: {
        background: {
          DEFAULT: 'hsl(var(--background))',
          dark: 'hsl(var(--background))',
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
      btn: {
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

      },
    }

    expect(processTheme(theme)).toMatchInlineSnapshot(`
      {
        ".dark": {
          "--background": "hsl(240 10% 3.9%)",
          "--btn-destructive": "hsl(var(--destructive))",
          "--btn-destructive-foreground": "hsl(var(--destructive-foreground))",
          "--btn-destructive-hover": "hsl(var(--btn-destructive) / 90%)",
          "--destructive": "0 62.8% 30.6%",
          "--destructive-foreground": "0 0% 98%",
          "--switch-background": "hsl(var(--background))",
        },
        ":root": {
          "--background": "hsl(0 0% 100%)",
          "--btn-destructive": "hsl(var(--destructive))",
          "--btn-destructive-foreground": "hsl(var(--destructive-foreground))",
          "--btn-destructive-hover": "hsl(var(--btn-destructive) / 90%)",
          "--destructive": "0 84.2% 60.2%",
          "--destructive-foreground": "0 0% 98%",
          "--switch-background": "hsl(var(--background))",
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
        "btn-destructive": {
          "DEFAULT": "var(--btn-destructive, hsl(var(--destructive)))",
          "dark": "var(--btn-destructive-dark, hsl(var(--destructive)))",
          "foreground": {
            "DEFAULT": "var(--btn-destructive-foreground, hsl(var(--destructive-foreground)))",
            "dark": "var(--btn-destructive-foreground-dark, hsl(var(--destructive-foreground)))",
          },
          "hover": {
            "DEFAULT": "var(--btn-destructive-hover, hsl(var(--btn-destructive) / 90%))",
            "dark": "var(--btn-destructive-hover-dark, hsl(var(--btn-destructive) / 90%))",
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
        "switch-background": {
          "DEFAULT": "var(--switch-background, hsl(var(--background)))",
          "dark": "var(--switch-background-dark, hsl(var(--background)))",
        },
      }
    `)
  })
})
