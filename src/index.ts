export interface RecursiveRecord {
  DEFAULT?: string
  dark?: string
  [key: string]: string | RecursiveRecord | undefined
}
export interface Theme {
  [key: string]: RecursiveRecord
}

export interface ThemeVar {
  ':root': Record<string, string>
  [key: string]: Record<string, string>
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (...args: any[]) => any
    ? T[P]
    : T[P] extends object
      ? DeepPartial<T[P]>
      : T[P]
}
export function presetTheme(theme: DeepPartial<Theme>) {
  const mergedTheme = deepMerge({}, theme) as Theme
  return {
    safelist: ['dark'],
    theme: {
      extend: {
        colors: generateColors(mergedTheme),
      },
      // 这里可以添加更多的主题配置
    },
    plugins: [processPlugin(mergedTheme)],
  }
}

export function generateColors(theme: Theme) {
  const colors: Theme = {}
  for (const key in theme) {
    const value = theme[key]
    if (typeof value === 'object') {
      for (const cssVarKey in value) {
        const colorKey = `${key}-${cssVarKey}`
        const colorValue = value[cssVarKey]
        if (typeof colorValue === 'object') {
          const processedValue = deepMerge({}, colorValue)
          colors[colorKey] = processedValue
          processedColor(processedValue, `--${colorKey}`)
        }
      }
    }
  }
  // eslint-disable-next-line no-console
  console.log('[THEME] Extend colors:', colors)
  return colors
}

function processedColor(colorValue: any, prefixKey: string) {
  for (const key in colorValue) {
    const value = colorValue[key]
    if (key === 'DEFAULT' && typeof value === 'string') {
      colorValue.DEFAULT = `hsl(var(${prefixKey}, ${value}))`
    }
    else if (typeof value === 'object' && value !== null) {
      processedColor(value, `${prefixKey}-${key}`)
    }
  }
}

export function processTheme(theme: Theme) {
  const processed: ThemeVar = {
    ':root': {},
  }

  for (const key in theme) {
    const value = theme[key]
    if (typeof value === 'object') {
      for (const cssVarKey in value) {
        const cssVarValue = value[cssVarKey]
        const processCssVarKey = `--${key}-${cssVarKey}`
        if (typeof cssVarValue === 'object') {
          processedTheme(cssVarValue, processCssVarKey, processed)
        }
      }
    }
    else {
      processed[':root'][`--${key}`] = value
    }
  }
  return processed
}

function processedTheme(
  colorValue: RecursiveRecord,
  prefixKey: string,
  processed: ThemeVar,
) {
  for (const key in colorValue) {
    const value = colorValue[key]
    if (typeof value === 'object' && value !== null) {
      processedTheme(value, `${prefixKey}-${key}`, processed)
    }
    else if (typeof value === 'string') {
      if (key === 'DEFAULT') {
        // :root 添加
        processed[':root'][prefixKey] = value
      }
      else {
        // .themeKey 添加
        processed[`.${key}`] = processed[`.${key}`] || {}
        processed[`.${key}`][prefixKey] = value
      }
    }
  }
}

function processPlugin(themeConfig: Theme) {
  const processedTheme = processTheme(themeConfig)
  // eslint-disable-next-line no-console
  console.log('[PLUGINS] addUtilities:', processedTheme)
  return ({
    addUtilities,
  }: {
    addUtilities: (utilities: Record<string, any>) => void
  }) => {
    // 将 theme 转换成 全局的 CSS 变量
    addUtilities(processedTheme)
  }
}

function deepMerge<T extends Record<string, any>>(...args: T[]): T {
  if (args.length < 2)
    return args[0]
  const target = args[0] || ({} as T)
  for (let i = 1; i < args.length; i++) {
    const source = args[i]
    if (!source)
      continue
    for (const key in source) {
      if (
        source[key]
        && typeof source[key] === 'object'
        && !Array.isArray(source[key])
      ) {
        ;(target as any)[key] = deepMerge(
          (target as any)[key] || {},
          (source as any)[key],
        )
      }
      else {
        ;(target as any)[key] = (source as any)[key]
      }
    }
  }
  return target
}
