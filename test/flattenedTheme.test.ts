import type { Theme } from '../src'
import { describe, expect, it } from 'vitest'
import { flatten } from '../src'

describe('flattenedTheme', () => {
  it('should flatten a nested theme object', () => {
    const theme: Theme = {
      colors: {
        primary: {
          light: '#f0f0f0',
          DEFAULT: '#d0d0d0',
          dark: '#b0b0b0',
        },
        secondary: '#e0e0e0',
      },
      spacing: {
        sm: '8px',
        md: '16px',
        lg: '24px',
      },
    }

    const result = flatten(theme)
    expect(result).toMatchInlineSnapshot(`
      {
        "--colors-primary": "#d0d0d0",
        "--colors-primary-dark": "#b0b0b0",
        "--colors-primary-light": "#f0f0f0",
        "--colors-secondary": "#e0e0e0",
        "--spacing-lg": "24px",
        "--spacing-md": "16px",
        "--spacing-sm": "8px",
      }
    `)
  })
})
