export type ColorValue = string | [string] | [string, 'rgb' | 'hsl' | ((prefixKey: string, value: string) => string) | undefined]

export interface RecursiveRecord {
  DEFAULT?: ColorValue
  dark?: string
  [key: string]: string | ColorValue | RecursiveRecord | undefined
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
interface Options {
  colorRule?: 'rgb' | 'hsl'
  safelist?: string[]
}
export function presetTheme(theme: DeepPartial<Theme>, options: Options) {
  const mergedTheme = deepMerge({}, theme) as Theme
  return {
    safelist: ['dark', ...(options.safelist || [])],
    theme: {
      extend: {
        colors: generateColors(mergedTheme, options),
      },
      // 这里可以添加更多的主题配置
    },
    plugins: [processPlugin(mergedTheme)],
  }
}

export function generateColors(theme: Theme, options: Options = { colorRule: 'hsl' }) {
  const colors: Theme = {}
  for (const key in theme) {
    const value = theme[key]
    if (typeof value === 'object') {
      for (const cssVarKey in value) {
        const colorKey = `${key}-${cssVarKey}`
        const colorValue = value[cssVarKey]
        if (typeof colorValue === 'object' && !Array.isArray(colorValue)) {
          const processedValue = deepMerge({}, colorValue)
          colors[colorKey] = processedColor(processedValue, `--${colorKey}`)
        }
        else {
          if (cssVarKey === 'DEFAULT') {
            // :root 添加
            colors[key] = {
              DEFAULT: `var(--${key}, ${colorValue})`,
            }
          }
          else {
            // // .themeKey 添加
            colors[key] = colors[key] || {}
            colors[key][cssVarKey] = colors[key][cssVarKey] || {}
            if (typeof colorValue === 'string') {
              colors[key][cssVarKey] = {
                DEFAULT: colorValue,
              }
            }
            else if (Array.isArray(colorValue)) {
              if (colorValue[1] === undefined) {
                colors[key][cssVarKey] = `var(--${colorKey}, ${colorValue[0]})`
              }
              else if (typeof colorValue[1] === 'string') {
                colors[key][cssVarKey] = `${colorValue[1]}(var(--${colorKey}, ${colorValue[0]}))`
              }
              else if (typeof colorValue[1] === 'function') {
                colors[key][cssVarKey] = colorValue[1](`--${colorKey}`, colorValue[0])
              }
            }
          }
        }
      }
    }
  }
  // eslint-disable-next-line no-console
  console.log('[THEME] Extend colors:', colors)
  return colors

  function processedColor(colorValue: any, prefixKey: string) {
    for (const key in colorValue) {
      const value = colorValue[key]

      // 处理字符串或数组格式的颜色值
      if (typeof value === 'string' || Array.isArray(value)) {
        let colorString: string
        let colorRule: string = options.colorRule || 'hsl'
        let customHandler: ((prefixKey: string, value: string) => string) | undefined

        // 处理新的数组格式
        if (Array.isArray(value)) {
          colorString = value[0]
          const secondParam = value.length > 1 ? value[1] : undefined // 如果只有一个元素，默认为 undefined
          if (typeof secondParam === 'string') {
            colorRule = secondParam
          }
          else if (typeof secondParam === 'function') {
            customHandler = secondParam
          }
          else if (secondParam === undefined) {
            // 如果第二个参数是 undefined，表示不希望被包裹
            colorValue[key] = `var(${prefixKey}${key === 'DEFAULT' ? '' : `-${key}`}, ${colorString})`
            continue
          }
        }
        else if (typeof value === 'string') {
          colorString = value
        }
        else {
          continue
        }

        const currentPrefixKey = key === 'DEFAULT' ? prefixKey : `${prefixKey}-${key}`

        // 如果有自定义处理函数，直接使用
        if (customHandler) {
          colorValue[key] = customHandler(currentPrefixKey, colorString)
          continue
        }

        // 检查是否为已经是完整的颜色格式，不需要包装
        const isCompleteColor
          = /^(?:rgb|rgba|hsl|hsla)\s*\(/.test(colorString) // rgb(), rgba(), hsl(), hsla()
            || /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(colorString) // 十六进制
            || /^var\s*\(/.test(colorString) // CSS 变量

        if (isCompleteColor) {
          colorValue[key] = `var(${currentPrefixKey}, ${colorString})`
        }
        else {
          colorValue[key] = `${colorRule}(var(${currentPrefixKey}, ${colorString}))`
        }
      }
      else if (typeof value === 'object' && value !== null) {
        processedColor(value, `${prefixKey}-${key}`)
      }
    }
    return colorValue
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
        if (typeof cssVarValue === 'object' && !Array.isArray(cssVarValue)) {
          processedTheme(cssVarValue, processCssVarKey, processed)
        }
        else {
          if (cssVarKey === 'DEFAULT') {
            // :root 添加
            if (typeof cssVarValue === 'string') {
              processed[':root'][`--${key}`] = cssVarValue
            }
            else if (Array.isArray(cssVarValue)) {
              processed[':root'][`--${key}`] = cssVarValue[0]
            }
          }
          else {
            // .themeKey 添加
            if (typeof cssVarValue === 'string') {
              processed[`.${cssVarKey}`] = processed[`.${cssVarKey}`] || {}
              processed[`.${cssVarKey}`][`--${key}`] = cssVarValue
            }
            else if (Array.isArray(cssVarValue)) {
              processed[':root'][processCssVarKey] = cssVarValue[0]
            }
          }
        }
      }
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
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      processedTheme(value, `${prefixKey}-${key}`, processed)
    }
    else {
      if (key === 'DEFAULT') {
        // :root 添加
        if (typeof value === 'string') {
          processed[':root'][prefixKey] = value
        }
        else if (Array.isArray(value)) {
          processed[':root'][prefixKey] = value[0]
        }
      }
      else if (typeof value === 'string') {
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
        ; (target as any)[key] = deepMerge(
          (target as any)[key] || {},
          (source as any)[key],
        )
      }
      else {
        ; (target as any)[key] = (source as any)[key]
      }
    }
  }
  return target
}
