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
  theme?: Record<string, any>
  darkMode?: boolean | string[]
  content?: string[]
}
let flattenedTheme: Record<string, string> = {}
// todo：针对一些 #fff 这里可以考虑 转换 成 hsl 或 rgb 形式以便更好地处理颜色
export function presetTheme(theme: DeepPartial<Theme>, options: Options) {
  const mergedTheme = deepMerge({}, theme) as Theme
  flattenedTheme = flatten(mergedTheme)
  return {
    safelist: ['dark', ...(options.safelist || [])],
    darkMode: options.darkMode,
    content: options.content || [],
    theme: {
      extend: {
        colors: generateColors(mergedTheme, options),
        ...(options.theme || {}),
      },
      // 这里可以添加更多的主题配置
    },
    plugins: [processPlugin(mergedTheme)],
  }
}

export function generateColors(theme: Theme, options: Options = { colorRule: 'hsl' }) {
  // 测试环境
  flattenedTheme = flatten(theme)
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
            if (typeof colorValue === 'string') {
              colors[key] = {
                DEFAULT: `var(--${key}, ${resolvedValue(colorValue)})`,
              }
            }
            else if (Array.isArray(colorValue)) {
              colors[key] = {
                DEFAULT: `var(--${key}, ${resolvedValue(colorValue[0])})`,
              }
              if (colorValue[1] === undefined) {
                colors[key] = {
                  DEFAULT: `var(--${colorKey}, ${resolvedValue(colorValue[0])})`,
                }
              }
              else if (typeof colorValue[1] === 'string') {
                colors[key] = {
                  DEFAULT: `${colorValue[1]}(var(--${colorKey}, ${resolvedValue(colorValue[0])}))`,
                }
              }
              else if (typeof colorValue[1] === 'function') {
                colors[key] = {
                  DEFAULT: colorValue[1](`--${colorKey}`, colorValue[0]),
                }
              }
            }
          }
          else {
            // // .themeKey 添加
            colors[key] = colors[key] || {}
            colors[key][cssVarKey] = colors[key][cssVarKey] || {}
            if (typeof colorValue === 'string') {
              colors[key][cssVarKey] = {
                DEFAULT: resolvedValue(colorValue),
              }
            }
            else if (Array.isArray(colorValue)) {
              if (colorValue[1] === undefined) {
                colors[key][cssVarKey] = `var(--${colorKey}, ${resolvedValue(colorValue[0])})`
              }
              else if (typeof colorValue[1] === 'string') {
                colors[key][cssVarKey] = `${colorValue[1]}(var(--${colorKey}, ${resolvedValue(colorValue[0])}))`
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
            colorRule = resolvedValue(secondParam)
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
          colorString = resolvedValue(value)
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
          = /^(?:rgba?|hsla?)\s*\(/.test(colorString) // rgb(), rgba(), hsl(), hsla()
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
  // 这个应该只在测试环境使用
  flattenedTheme = flatten(theme)
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
              if (/(?:hsl|rgb)\(var\(/.test(cssVarValue))
                processed[':root'][`--${key}`] = resolvedValue(cssVarValue)
              else
                processed[':root'][`--${key}`] = cssVarValue
            }
            else if (Array.isArray(cssVarValue)) {
              if (/(?:hsl|rgb)\(var\(/.test(cssVarValue[0]))
                processed[':root'][`--${key}`] = resolvedValue(cssVarValue[0])
              else
                processed[':root'][`--${key}`] = cssVarValue[0]
            }
          }
          else {
            // .themeKey 添加
            if (typeof cssVarValue === 'string') {
              processed[`.${cssVarKey}`] = processed[`.${cssVarKey}`] || {}
              // 如果 value 是 hsl 或 rgb 格式 (var(--)) 的形式就要使用 resolvedValue 向下递归去找是否存在 hsl 或 rgb 嵌套的场景去处理
              if (/(?:hsl|rgb)\(var\(/.test(cssVarValue))
                processed[`.${cssVarKey}`][`--${key}`] = resolvedValue(cssVarValue)
              else
                processed[`.${cssVarKey}`][`--${key}`] = cssVarValue
            }
            else if (Array.isArray(cssVarValue)) {
              if (/(?:hsl|rgb)\(var\(/.test(cssVarValue[0]))
                processed[':root'][processCssVarKey] = resolvedValue(cssVarValue[0])
              else
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
          if (/(?:hsl|rgb)\(var\(/.test(value))
            processed[':root'][prefixKey] = resolvedValue(value)
          else
            processed[':root'][prefixKey] = value
        }
        else if (Array.isArray(value)) {
          if (/(?:hsl|rgb)\(var\(/.test(value[0]))
            processed[':root'][prefixKey] = resolvedValue(value[0])
          else
            processed[':root'][prefixKey] = value[0]
        }
      }
      else if (typeof value === 'string') {
        // .themeKey 添加
        processed[`.${key}`] = processed[`.${key}`] || {}
        // 如果 value 是 hsl 或 rgb 格式 (var(--)) 的形式就要使用 resolvedValue 向下递归去找是否存在 hsl 或 rgb 嵌套的场景去处理
        if (/(?:hsl|rgb)\(var\(/.test(value))
          processed[`.${key}`][prefixKey] = resolvedValue(value)
        else
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

function resolvedValue(cssVarValue: string): string {
  return resolveNestedColorFunctions(cssVarValue, [], new Set())
}

/**
 * 递归解析嵌套的颜色函数和变量引用
 * @param value 要处理的CSS值
 * @param visited 已访问的变量路径数组，用于生成注释
 * @param visitedSet 已访问的变量集合，防止循环引用
 */
function resolveNestedColorFunctions(value: string, visited: string[], visitedSet: Set<string>): string {
  // 匹配颜色函数的正则表达式：hsl(...) 或 rgb(...)
  const colorFuncRegex = /(hsl|rgb|rgba|hsla)\s*\((.*)\)/g

  return value.replace(colorFuncRegex, (match, funcName, content) => {
    // 解析内容中的变量引用
    const { resolvedContent, finalVisited } = resolveVariablesInContent(content, visited, visitedSet)

    // 检查解析后的内容是否包含同类型的嵌套函数
    const nestedFuncRegex = new RegExp(`(${funcName})\\s*\\(([^)]+)\\)`)
    const nestedMatch = resolvedContent.match(nestedFuncRegex)

    if (nestedMatch) {
      // 如果有同类型嵌套，提取内部内容
      const innerContent = nestedMatch[2]
      // 保留透明度等修饰符
      const remainingContent = resolvedContent.replace(nestedFuncRegex, innerContent)

      // 如果有访问路径，添加注释并替换变量引用
      if (finalVisited.length > 1) {
        // 将原始变量引用替换为最终变量引用
        const originalVar = `var(${finalVisited[0]})`
        const finalVar = `var(${finalVisited.slice(-1)[0]})`
        const result = match.replace(originalVar, finalVar)
        return `${result}/* ${finalVisited.join(' -> ')} */`
      }
      return `${funcName}(${remainingContent})`
    }

    const result = `${funcName}(${resolvedContent})`
    // 如果有访问路径，添加注释并替换变量引用
    if (finalVisited.length > 1) {
      const originalVar = `var(${finalVisited[0]})`
      const finalVar = `var(${finalVisited.slice(-1)[0]})`
      const resultWithReplacedVar = match.replace(originalVar, finalVar)
      return `${resultWithReplacedVar}/* ${finalVisited.join(' -> ')} */`
    }
    else if (finalVisited.length) {
      const v = flattenedTheme[finalVisited[0]]
      if (/hsl|rgb/.test(v)) {
        return `${content}/* ${finalVisited.join(' -> ')} */`
      }
      return match
    }
    return result
  })
}

/**
 * 解析内容中的变量引用
 * @param content 要解析的内容
 * @param visited 已访问的变量路径数组
 * @param visitedSet 已访问的变量集合
 * @returns 解析后的内容和更新的访问路径
 */
function resolveVariablesInContent(
  content: string,
  visited: string[],
  visitedSet: Set<string>,
): { resolvedContent: string, finalVisited: string[] } {
  // 匹配 var(--variable-name) 的正则表达式
  // eslint-disable-next-line regexp/optimal-quantifier-concatenation,regexp/no-super-linear-backtracking
  const varRegex = /var\s*\(\s*(--[^,)]+)(?:\s*,\s*([^)]+))?\s*\)/g
  let finalVisited = [...visited]

  const resolvedContent = content.replace(varRegex, (match, varName) => {
    // 防止循环引用
    if (visitedSet.has(varName)) {
      return match
    }

    // 查找变量值
    const varValue = flattenedTheme[varName]
    if (!varValue) {
      return match // 如果找不到变量，保持原样
    }

    // 创建新的访问集合和路径
    const newVisitedSet = new Set(visitedSet)
    newVisitedSet.add(varName)
    const newVisited = [...visited, varName]

    // 检查变量值是否是颜色函数
    const colorFuncMatch = varValue.match(/^(hsl|rgb|rgba|hsla)\s*\((.+)\)$/)
    if (colorFuncMatch) {
      const [, _funcName, innerContent] = colorFuncMatch

      // 递归解析内部内容
      const { resolvedContent: resolvedInnerContent, finalVisited: innerFinalVisited }
        = resolveVariablesInContent(innerContent, newVisited, newVisitedSet)

      // 更新最终访问路径
      finalVisited = innerFinalVisited

      // 返回解析后的内容，不包含外层函数包装
      return resolvedInnerContent
    }
    else {
      // 如果不是颜色函数，递归解析变量值
      const resolvedVarValue = resolveNestedColorFunctions(varValue, newVisited, newVisitedSet)

      // 更新最终访问路径
      finalVisited = newVisited

      return resolvedVarValue
    }
  })

  return { resolvedContent, finalVisited }
}

export function flatten(theme: Theme): Record<string, string> {
  const result: Record<string, string> = {}

  function recurse(curr: any, prefix: string) {
    for (const key in curr) {
      const value = curr[key]
      const newKey = prefix ? key === 'DEFAULT' ? prefix : `${prefix}-${key}` : `--${key}`
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        recurse(value, newKey)
      }
      else {
        result[newKey] = value
      }
    }
  }

  recurse(theme, '')
  return result
}
