# 静态随机图片

一个在构建时生成随机二次元图片的静态实现，基于 `https://www.dmoe.cc/random.php` 端点。

## 项目简介

这个项目提供了一种简单的方式来在网站中使用随机二次元图片，具有以下特点：

- **静态生成**：图片 URL 在构建时预先生成，无运行时开销
- **主源唯一**：只使用 `https://www.dmoe.cc/random.php` 作为图片源
- **快速加载**：页面加载更快，图片 URL 预先生成
- **响应式设计**：适配各种屏幕尺寸
- **点击放大**：支持图片点击放大查看
- **背景图片**：网站整体背景使用 API 图片
- **图库功能**：包含 44 张随机二次元图片
- **部署简单**：支持部署到 Cloudflare Workers

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/MCQA2580/asAPI
cd asAPI
```

### 2. 构建项目

```bash
# 使用 npm
npm run build

# 或直接使用 node
node scripts/build.js
```

### 3. 查看效果

打开 `index.html` 文件在浏览器中查看演示效果。

## 使用方法

### 1. 图片使用

在 HTML 中使用带有特定 alt 属性的 img 标签：

```html
<!-- 随机图片 -->
<img alt="random:h" class="demo-image">
```

### 2. 构建过程

运行构建脚本会自动生成随机图片 URL 并更新 `index.html` 文件：

```bash
npm run build
```

构建脚本会：
- 为图库生成 44 张随机图片 URL
- 更新页面中的图片链接
- 确保所有图片都来自主源 `https://www.dmoe.cc/random.php`

## 项目结构

```
├── index.html          # 主页面
├── css/                # 样式文件目录
│   └── style.css       # 主样式文件
├── js/                 # JavaScript 文件目录
│   └── script.js       # 客户端脚本
├── scripts/            # 构建脚本目录
│   └── build.js        # 静态生成脚本
├── worker/             # Cloudflare Workers 目录
│   └── worker.js       # Workers 脚本
├── package.json        # 项目配置
├── wrangler.jsonc      # Workers 配置
└── README.md           # 本文档
```

## 部署到 Cloudflare Workers

### 1. 准备工作

- 确保已安装 Wrangler CLI：`npm install -g wrangler`
- 登录 Cloudflare 账户：`wrangler login`

### 2. 部署

```bash
# 使用 npm 脚本
npm run deploy

# 或直接使用 wrangler
npx wrangler deploy
```

### 3. 验证部署

部署成功后，你将获得一个 Workers 域名，例如：`https://your-project.your-account.workers.dev`

## 功能特性

- ✅ 静态生成模式，无运行时开销
- ✅ 只使用主源 `https://www.dmoe.cc/random.php`
- ✅ 网站整体背景使用 API 图片
- ✅ 图库功能（44 张随机图片）
- ✅ 图片点击放大功能
- ✅ 响应式设计，适配各种屏幕
- ✅ 部署到 Cloudflare Workers
- ✅ 简洁的项目结构

## 技术实现

1. **静态生成**：使用 Node.js 构建脚本在构建时生成随机图片 URL
2. **客户端增强**：使用 JavaScript 添加点击放大功能
3. **服务器端**：使用 Cloudflare Workers 提供动态访问
4. **样式设计**：使用 CSS 实现响应式布局和美观的界面

## 注意事项

- **主源唯一**：项目只使用 `https://www.dmoe.cc/random.php` 作为图片源，无备用源
- **构建依赖**：需要 Node.js 环境来运行构建脚本
- **网络连接**：构建过程需要访问 `https://www.dmoe.cc/random.php`
- **部署环境**：Cloudflare Workers 部署需要 Cloudflare 账户

## 许可证

MIT

## 开源链接

- [GitHub 仓库](https://github.com/MCQA2580/asAPI)