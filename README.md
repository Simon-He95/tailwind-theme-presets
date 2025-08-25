<div align="center">

# 🎨 Tailwind Theme Presets

**让多主题管理变得优雅而简单**

[![npm version](https://img.shields.io/npm/v/tailwind-theme-preset.svg?style=for-the-badge&color=3b82f6)](https://www.npmjs.com/package/tailwind-theme-preset)
[![npm downloads](https://img.shields.io/npm/dm/tailwind-theme-preset.svg?style=for-the-badge&color=10b981)](https://www.npmjs.com/package/tailwind-theme-preset)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/tailwind-theme-preset?style=for-the-badge&color=f59e0b)](https://bundlephobia.com/package/tailwind-theme-preset)

</div>

---

## 🚀 为什么选择 Tailwind Theme Presets？

> **告别繁琐的 CSS 变量管理，拥抱优雅的主题配置体验！**

**🔥 痛点解决**

- ❌ **传统方式**：在多个 CSS 文件中分散管理 `:root` 和 `.dark` 变量
- ❌ **维护困难**：主题变量散落各处，难以统一管理和修改
- ❌ **重复劳动**：手动编写大量重复的 CSS 变量声明

**✨ 现在只需**

- ✅ **一个配置文件**统一管理所有主题
- ✅ **自动生成**层级化的 CSS 变量和 Tailwind 颜色类
- ✅ **完美兼容** Shadcn/ui 设计系统

## ✨ 核心特性

<table>
<tr>
<td width="50%">

### 🎨 **统一主题管理**

```javascript
// 一个配置搞定所有主题
presetTheme({
  btn: { primary: { DEFAULT: '...', dark: '...' } },
})
```

</td>
<td width="50%">

### 🌈 **智能变量生成**

```css
/* 自动生成层级化 CSS 变量 */
:root {
  --btn-primary: 240 5.9% 10%;
}
.dark {
  --btn-primary: 0 0% 98%;
}
```

</td>
</tr>
<tr>
<td>

### 🔥 **Tailwind 颜色类**

```html
<!-- 直接使用生成的颜色类 -->
<button class="bg-btn-primary text-btn-primary-foreground">Perfect!</button>
```

</td>
<td>

### � **Shadcn/ui 兼容**

```json
// 无缝集成 Shadcn/ui 设计系统
{
  "primary": { "DEFAULT": "240 5.9% 10%", "dark": "0 0% 98%" }
}
```

</td>
</tr>
</table>

**🚀 更多亮点**

- 📦 **零配置** - 开箱即用，无需额外配置
- 🔧 **TypeScript 支持** - 完整的类型定义和智能提示
- ⚡ **轻量级** - 极小的包体积，不影响构建性能
- 🔄 **热更新支持** - 开发时主题变更立即生效

## 📦 快速开始

### 安装

<details>
<summary><strong>📋 选择你喜欢的包管理器</strong></summary>

```bash
# npm
npm install tailwind-theme-preset

# pnpm (推荐)
pnpm add tailwind-theme-preset

# yarn
yarn add tailwind-theme-preset

# bun
bun add tailwind-theme-preset
```

</details>

## 🚀 使用方法

### ⚡ 5 分钟上手

<div align="center">

**步骤 1：配置主题** → **步骤 2：享受魔法** ✨

</div>

在你的 `tailwind.config.js` 中添加：

```javascript
import { presetTheme } from 'tailwind-theme-preset'

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    presetTheme({
      btn: {
        primary: {
          DEFAULT: '240 5.9% 10%', // 🌞 亮色主题
          dark: '0 0% 98%', // 🌙 暗色主题
          foreground: {
            DEFAULT: '0 0% 98%', // 文字颜色
            dark: '240 5.9% 10%',
          },
        },
      },
    }),
  ],
}
```

**🎉 就这么简单！现在你可以在 HTML 中直接使用：**

```html
<button class="bg-btn-primary text-btn-primary-foreground hover:opacity-90">
  ✨ 完美的主题按钮
</button>
```

### 🔧 进阶配置

<details>
<summary><strong>🎯 主题配置结构详解</strong></summary>

主题配置采用直观的嵌套对象结构：

| 键名      | 说明          | 示例                       |
| --------- | ------------- | -------------------------- |
| `DEFAULT` | 🌞 亮色主题值 | `'240 5.9% 10%'`           |
| `dark`    | 🌙 暗色主题值 | `'0 0% 98%'`               |
| 其他键    | 🎨 自定义变体 | `hover`, `focus`, `active` |

```javascript
const themeConfig = {
  // 🎯 组件分类
  btn: {
    // 🎨 变体设计
    primary: {
      DEFAULT: '240 5.9% 10%', // 🌞 默认状态
      dark: '0 0% 98%', // 🌙 暗色状态
      hover: {
        DEFAULT: 'var(--btn-primary) / 90%', // 🔄 引用其他变量
        dark: '0 0% 98%',
      },
      foreground: {
        // 🔤 文字颜色
        DEFAULT: '0 0% 98%',
        dark: '240 5.9% 10%',
      },
    },
    secondary: {
      DEFAULT: '240 4.8% 95.9%',
      dark: '240 3.7% 15.9%',
    },
  },
  // 🏷️ 其他组件
  badge: {
    accent: {
      DEFAULT: '240 4.8% 95.9%',
      dark: '240 3.7% 15.9%',
    },
  },
}
```

</details>

## 🎨 生成的魔法效果

### 🔮 自动生成的 CSS 变量

<details>
<summary><strong>🌟 看看插件为你生成了什么</strong></summary>

```css
/* 🌞 亮色主题变量 */
:root {
  --btn-primary: 240 5.9% 10%;
  --btn-primary-foreground: 0 0% 98%;
  --btn-primary-hover: var(--btn-primary) / 90%;
  --btn-secondary: 240 4.8% 95.9%;
  --badge-accent: 240 4.8% 95.9%;
}

/* 🌙 暗色主题变量 */
.dark {
  --btn-primary: 0 0% 98%;
  --btn-primary-foreground: 240 5.9% 10%;
  --btn-primary-hover: 0 0% 98%;
  --btn-secondary: 240 3.7% 15.9%;
  --badge-accent: 240 3.7% 15.9%;
}
```

</details>

### ✨ 智能 Tailwind 颜色类

<details>
<summary><strong>🎯 可直接使用的颜色类</strong></summary>

```json
// 🚀 自动生成的颜色配置
{
  "extend": {
    "colors": {
      "btn-primary": "hsl(var(--btn-primary, 240 5.9% 10%))",
      "btn-primary-foreground": "hsl(var(--btn-primary-foreground, 0 0% 98%))",
      "btn-primary-hover": "hsl(var(--btn-primary-hover, var(--btn-primary) / 90%))",
      "btn-secondary": "hsl(var(--btn-secondary, 240 4.8% 95.9%))",
      "badge-accent": "hsl(var(--badge-accent, 240 4.8% 95.9%))"
    }
  }
}
```

**🎉 现在你可以这样使用：**

```html
<!-- 🎨 完美的主题按钮 -->
<button
  class="bg-btn-primary text-btn-primary-foreground hover:bg-btn-primary-hover
               transition-colors duration-200 px-6 py-3 rounded-lg font-medium"
>
  🚀 Primary Button
</button>

<!-- 🏷️ 优雅的标签 -->
<span class="bg-badge-accent px-3 py-1 rounded-full text-sm">
  ✨ Accent Badge
</span>
```

</details>

### 🎛️ 高级颜色控制

<details>
<summary><strong>🔥 精细化颜色格式控制 (v0.0.2+)</strong></summary>

现在支持对每个颜色值进行精细化控制，支持多种格式和自定义处理函数：

#### 基本用法

```javascript
const themeConfig = {
  colors: {
    brand: {
      // 🎯 强制使用 RGB 格式
      primary: { DEFAULT: ['255 0 0', 'rgb'] },

      // 🎨 强制使用 HSL 格式
      secondary: { DEFAULT: ['240 50% 60%', 'hsl'] },

      // 🔄 不包裹任何函数，直接使用原始值
      accent: { DEFAULT: ['240 50% 60%', undefined] },

      // ⚡ 自定义处理函数
      special: {
        DEFAULT: [
          '240 50 60',
          (prefixKey, value) => {
            return `oklch(var(${prefixKey}, ${value}))`
          },
        ],
      },
    },
  },
}
```

#### 生成结果对比

| 配置                         | 生成的 CSS 值                                     |
| ---------------------------- | ------------------------------------------------- |
| `['255 0 0', 'rgb']`         | `rgb(var(--colors-brand-primary, 255 0 0))`       |
| `['240 50% 60%', 'hsl']`     | `hsl(var(--colors-brand-secondary, 240 50% 60%))` |
| `['240 50% 60%', undefined]` | `var(--colors-brand-accent, 240 50% 60%)`         |
| `['240 50 60', customFn]`    | `oklch(var(--colors-brand-special, 240 50 60))`   |

#### 实际应用场景

```javascript
const advancedTheme = {
  btn: {
    primary: {
      // 🎯 混合使用不同格式
      DEFAULT: '240 5.9% 10%', // 使用全局默认格式
      rgb: ['255 128 64', 'rgb'], // 强制 RGB
      raw: ['240 50% 60%', undefined], // 原始值，不包裹
      gradient: [
        '120 80% 50%',
        (prefix, value) => {
          return `linear-gradient(45deg, var(${prefix}, ${value}), transparent)`
        },
      ],
    },
  },
}
```

**🚀 完全兼容现有配置，渐进式升级！**

</details>

## 🤝 与 Shadcn/ui 完美融合

<div align="center">

**🎨 Shadcn/ui 用户的福音！**

_无缝集成，即插即用，告别手动配置的痛苦_

</div>

<details>
<summary><strong>🔥 点击查看完整的 Shadcn/ui 兼容配置</strong></summary>

```javascript
import { presetTheme } from 'tailwind-theme-preset'

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    presetTheme({
      // 🎯 Shadcn/ui 完整主题配置
      background: {
        DEFAULT: '0 0% 100%', // 🏠 页面背景
        dark: '240 10% 3.9%',
      },
      foreground: {
        DEFAULT: '240 10% 3.9%', // 📝 主要文字
        dark: '0 0% 98%',
      },
      card: {
        DEFAULT: '0 0% 100%', // 🃏 卡片背景
        dark: '240 10% 3.9%',
        foreground: {
          DEFAULT: '240 10% 3.9%', // 📄 卡片文字
          dark: '0 0% 98%',
        },
      },
      primary: {
        DEFAULT: '240 5.9% 10%', // 🔵 主要按钮
        dark: '0 0% 98%',
        foreground: {
          DEFAULT: '0 0% 98%', // 🔠 主按钮文字
          dark: '240 5.9% 10%',
        },
      },
      secondary: {
        DEFAULT: '240 4.8% 95.9%', // ⚪ 次要按钮
        dark: '240 3.7% 15.9%',
        foreground: {
          DEFAULT: '240 5.9% 10%', // 📰 次按钮文字
          dark: '0 0% 98%',
        },
      },
      muted: {
        DEFAULT: '240 4.8% 95.9%', // 🔇 静音背景
        dark: '240 3.7% 15.9%',
        foreground: {
          DEFAULT: '240 3.8% 46.1%', // 💬 静音文字
          dark: '240 5% 64.9%',
        },
      },
      accent: {
        DEFAULT: '240 4.8% 95.9%', // ✨ 强调色
        dark: '240 3.7% 15.9%',
        foreground: {
          DEFAULT: '240 5.9% 10%', // 🎯 强调文字
          dark: '0 0% 98%',
        },
      },
      destructive: {
        DEFAULT: '0 84.2% 60.2%', // 🔴 危险操作
        dark: '0 62.8% 30.6%',
        foreground: {
          DEFAULT: '0 0% 98%', // ⚠️ 危险文字
          dark: '0 0% 98%',
        },
      },
      border: {
        DEFAULT: '240 5.9% 90%', // 📏 边框
        dark: '240 3.7% 15.9%',
      },
      input: {
        DEFAULT: '240 5.9% 90%', // 📝 输入框
        dark: '240 3.7% 15.9%',
      },
      ring: {
        DEFAULT: '240 5.9% 10%', // 💍 焦点环
        dark: '240 4.9% 83.9%',
      },
    }),
  ],
}
```

**🎉 现在你就拥有了完整的 Shadcn/ui 主题系统！**

</details>

## 📚 API 参考

### 🔧 `presetTheme(theme: DeepPartial<Theme>, options?: Options)`

创建一个智能的 Tailwind CSS preset。

| 参数      | 类型                 | 说明            |
| --------- | -------------------- | --------------- |
| `theme`   | `DeepPartial<Theme>` | 🎨 主题配置对象 |
| `options` | `Options?`           | ⚙️ 可选配置参数 |

**Options 参数：**

| 属性        | 类型             | 默认值  | 说明                    |
| ----------- | ---------------- | ------- | ----------------------- |
| `colorRule` | `'rgb' \| 'hsl'` | `'hsl'` | 🎨 默认颜色包裹函数类型 |

**返回值：**完整的 Tailwind preset 对象

- ✅ `safelist: ['dark']` - 确保暗色模式类不被清除
- 🎨 `theme.extend.colors` - 扩展的颜色配置
- 🔌 `plugins` - CSS 变量生成插件

### 🎨 `generateColors(theme: Theme, options?: Options)`

从主题配置生成 Tailwind 颜色配置。

**颜色值格式支持：**

| 格式       | 类型                  | 示例                         | 生成结果                            |
| ---------- | --------------------- | ---------------------------- | ----------------------------------- |
| 简单字符串 | `string`              | `'240 5.9% 10%'`             | `hsl(var(--prefix, 240 5.9% 10%))`  |
| RGB 强制   | `[string, 'rgb']`     | `['255 0 0', 'rgb']`         | `rgb(var(--prefix, 255 0 0))`       |
| HSL 强制   | `[string, 'hsl']`     | `['240 50% 60%', 'hsl']`     | `hsl(var(--prefix, 240 50% 60%))`   |
| 原始值     | `[string, undefined]` | `['240 50% 60%', undefined]` | `var(--prefix, 240 50% 60%)`        |
| 自定义函数 | `[string, Function]`  | `['240 50 60', customFn]`    | `customFn('--prefix', '240 50 60')` |

### 🔄 `processTheme(theme: Theme)`

处理主题配置，生成结构化的 CSS 变量对象。

## 🎪 完整示例

<div align="center">

**🚀 从配置到实现，一步到位！**

</div>

<details>
<summary><strong>📁 tailwind.config.js - 完整配置</strong></summary>

```javascript
import { presetTheme } from 'tailwind-theme-preset'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  presets: [
    presetTheme({
      // 🎯 按钮系统
      btn: {
        primary: {
          DEFAULT: '240 5.9% 10%', // 🔵 专业蓝
          dark: '0 0% 98%', // ⚪ 纯净白
          hover: {
            DEFAULT: 'var(--btn-primary) / 90%',
            dark: '0 0% 98%',
          },
          foreground: {
            DEFAULT: '0 0% 98%', // 🔠 白色文字
            dark: '240 5.9% 10%', // 🔤 深色文字
          },
        },
        secondary: {
          DEFAULT: '240 4.8% 95.9%', // 🔘 优雅灰
          dark: '240 3.7% 15.9%', // 🌑 深邃灰
          foreground: {
            DEFAULT: '240 5.9% 10%',
            dark: '0 0% 98%',
          },
        },
      },
      // 🃏 卡片系统
      card: {
        DEFAULT: '0 0% 100%', // 📄 纸张白
        dark: '240 10% 3.9%', // 🌃 午夜蓝
        foreground: {
          DEFAULT: '240 5.9% 10%', // 📝 墨水黑
          dark: '0 0% 98%', // 📃 羊皮纸
        },
      },
    }),
  ],
}
```

</details>

<details>
<summary><strong>🎨 HTML - 精美界面实现</strong></summary>

```html
<!-- 🌟 响应式主题页面 -->
<html class="dark">
  <!-- 🌙 暗色模式 / 移除 class 切换亮色 -->
  <body class="bg-card text-card-foreground min-h-screen transition-colors">
    <!-- 🎪 主容器 -->
    <div class="container mx-auto p-8">
      <!-- 🃏 精美卡片 -->
      <div
        class="bg-card p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
      >
        <!-- 📖 标题区域 -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-card-foreground mb-2">
            ✨ Tailwind Theme Presets
          </h1>
          <p class="text-card-foreground/70">🎨 优雅的多主题管理解决方案</p>
        </div>

        <!-- 🎯 按钮展示区 -->
        <div class="flex flex-wrap gap-4">
          <!-- 🔵 主要按钮 -->
          <button
            class="bg-btn-primary text-btn-primary-foreground
                       hover:bg-btn-primary-hover hover:scale-105
                       px-6 py-3 rounded-lg font-medium
                       transition-all duration-200 ease-in-out
                       shadow-md hover:shadow-lg"
          >
            🚀 Primary Action
          </button>

          <!-- ⚪ 次要按钮 -->
          <button
            class="bg-btn-secondary text-btn-secondary-foreground
                       hover:opacity-90 hover:scale-105
                       px-6 py-3 rounded-lg font-medium
                       transition-all duration-200 ease-in-out
                       shadow-md hover:shadow-lg"
          >
            📋 Secondary Action
          </button>

          <!-- 🎭 切换主题按钮 -->
          <button
            onclick="document.documentElement.classList.toggle('dark')"
            class="bg-btn-secondary text-btn-secondary-foreground
                       hover:opacity-90 px-4 py-3 rounded-lg
                       transition-all duration-200"
          >
            🌙/🌞 Toggle Theme
          </button>
        </div>
      </div>
    </div>
  </body>
</html>
```

**🎉 效果预览：**

- 🌞 **亮色模式**：优雅的白色背景 + 深色文字
- 🌙 **暗色模式**：酷炫的深色背景 + 亮色文字
- ✨ **平滑过渡**：颜色切换丝般顺滑
- 📱 **响应式**：完美适配各种设备

</details>

## 🛠️ 开发指南

<div align="center">

**👨‍💻 想要参与贡献？欢迎加入我们！**

</div>

### 🚀 快速启动

```bash
# 📦 安装依赖
pnpm install

# 🔥 开发模式（热重载）
pnpm dev

# 🏗️ 构建发布版本
pnpm build

# 🧪 运行测试套件
pnpm test

# 🔍 TypeScript 类型检查
pnpm typecheck

# 🎨 代码格式化
pnpm format

# 🧹 代码质量检查
pnpm lint
```

### 📊 项目结构

```
tailwind-theme-presets/
├── 📁 src/
│   └── 📄 index.ts          # 🔧 核心逻辑
├── 📁 test/
│   └── 📄 index.test.ts     # 🧪 测试用例
├── 📄 package.json          # 📦 项目配置
├── 📄 tsconfig.json         # 🔧 TypeScript 配置
└── 📖 README.md             # 📚 项目文档
```

---

<div align="center">

## 💖 支持作者

**如果这个项目对你有帮助，请考虑支持一下！**

[![☕ Buy me a coffee](https://img.shields.io/badge/☕-Buy%20me%20a%20coffee-orange.svg?style=for-the-badge)](https://github.com/Simon-He95/sponsor)
[![⭐ Star on GitHub](https://img.shields.io/badge/⭐-Star%20on%20GitHub-yellow.svg?style=for-the-badge)](https://github.com/Simon-He95/tailwind-theme-preset)

## 📄 开源协议

[MIT](./license) © 2024 [Simon He](https://github.com/Simon-He95)

_用 ❤️ 和 ☕ 制作_

## 🎯 赞助商

_感谢所有支持开源的朋友们！_

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/Simon-He95/sponsor/sponsors.svg">
    <img src="https://cdn.jsdelivr.net/gh/Simon-He95/sponsor/sponsors.png" alt="赞助商"/>
  </a>
</p>

---

<div align="center">

**🌟 如果你觉得这个项目很棒，别忘了给个 Star！🌟**

[⬆️ 回到顶部](#-tailwind-theme-presets)

</div>

</div>
