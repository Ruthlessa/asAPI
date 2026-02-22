# Static Random Pic API

A static implementation of a random image API that generates random images at build time, based on the `https://p.2x.nz/` endpoint.

## 项目简介

这个项目提供了一种在构建时生成随机图片的方法，相比运行时生成，它具有以下优势：

- **无运行时开销**：页面加载更快
- **更快的页面加载**：图片 URL 预先生成
- **页面加载一致性**：每次加载看到相同的图片
- **SEO 友好**：静态内容更容易被搜索引擎索引

## 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd static-random-pic-api
```

### 2. 安装依赖（可选）

```bash
npm install
```

### 3. 构建项目

```bash
# 使用 npm
npm run build

# 或直接使用 node
node build.js
```

### 4. 查看效果

打开 `index.html` 文件在浏览器中查看演示效果。

## 使用方法

### 1. 基本图片使用

在 img 标签上使用 `alt="random:h"` 属性：

```html
<!-- 横向图片 -->
<img alt="random:h">

<!-- 纵向图片 -->
<img alt="random:v">

<!-- 方形图片 -->
<img alt="random:s">
```

### 2. 背景图片使用

在任何元素上使用 `data-random-bg="h"` 属性：

```html
<div data-random-bg="h">
    <h2>背景图片示例</h2>
    <p>这个元素的背景是随机生成的</p>
</div>
```

### 3. 构建过程

运行构建脚本生成随机图片：

```bash
# 使用 npm
npm run build

# 或直接使用 node
node build.js
```

这将更新 `index.html` 文件，替换占位符为实际的随机图片 URL。

## 自定义配置

### 自定义提示词

在 `build.js` 文件中，你可以修改 `prompts` 数组来自定义生成图片的提示词：

```javascript
const prompts = [
    'beautiful landscape photography',
    'city skyline at sunset',
    'mountain range with snow',
    // 添加更多自定义提示词
];
```

### 自定义图片大小

在 `build.js` 文件中，你可以修改 `IMAGE_SIZES` 对象来自定义图片大小：

```javascript
const IMAGE_SIZES = {
    horizontal: 'landscape_16_9',
    vertical: 'portrait_16_9',
    square: 'square'
};
```

## API 参考

### 端点

```
https://p.2x.nz/api/ide/v1/text_to_image?prompt={prompt}&image_size={image_size}
```

### 参数

- `prompt`：图片描述文本（URL 编码）
- `image_size`：图片大小
  - `landscape_16_9`（横向 16:9）
  - `portrait_16_9`（纵向 16:9）
  - `square`（方形）
  - `square_hd`（高清方形）
  - `landscape_4_3`（横向 4:3）
  - `portrait_4_3`（纵向 4:3）

## 示例输出

运行构建脚本后，你的 HTML 将被更新为实际的图片 URL：

```html
<!-- 构建前 -->
<img alt="random:h">

<!-- 构建后 -->
<img alt="random:h" src="https://p.2x.nz/api/ide/v1/text_to_image?prompt=beautiful%20landscape%20photography&image_size=landscape_16_9">
```

## 项目结构

```
├── index.html          # 演示页面
├── style.css           # 样式文件
├── script.js           # 动态加载（ fallback ）
├── build.js            # 构建脚本
├── package.json        # 项目配置
└── README.md           # 本文档
```

## 功能特性

- ✅ 构建时静态生成
- ✅ 支持横向、纵向和方形图片
- ✅ 背景图片支持
- ✅ 图库功能
- ✅ 响应式设计
- ✅ 动态加载 fallback
- ✅ 自定义提示词
- ✅ 多种图片尺寸支持

## 浏览器支持

- Chrome/Edge（最新版本）
- Firefox（最新版本）
- Safari（最新版本）
- 移动设备浏览器

## 故障排除

### 1. 构建失败

**问题**：运行 `node build.js` 时出现错误

**解决方案**：
- 确保 Node.js 已安装（版本 10+）
- 检查 `build.js` 文件是否存在
- 确保网络连接正常（需要访问 API 端点）

### 2. 图片不显示

**问题**：页面上图片不显示

**解决方案**：
- 确保已运行构建脚本
- 检查网络连接
- 查看浏览器控制台是否有错误信息
- 尝试刷新页面

### 3. 图片重复

**问题**：多张图片显示相同内容

**解决方案**：
- 构建脚本会为每张图片生成不同的提示词，但 API 可能返回相似结果
- 尝试修改 `build.js` 中的提示词数组
- 重新运行构建脚本

## 集成到其他项目

### 方法 1：复制文件

1. 复制 `build.js` 文件到你的项目
2. 在你的 HTML 文件中添加占位符图片标签
3. 运行 `node build.js` 生成静态图片

### 方法 2：作为依赖使用

1. 将此项目作为子模块添加到你的项目
2. 配置构建脚本调用此项目的构建过程
3. 在你的 HTML 中使用相同的占位符格式

## 演示页面

项目包含一个完整的演示页面 `index.html`，展示了以下功能：

- 横向图片示例
- 背景图片示例
- 图片库展示
- 响应式设计

## 许可证

MIT

## 更新日志

### v1.0.0
- 初始版本
- 支持静态生成随机图片
- 支持横向、纵向和方形图片
- 支持背景图片
- 响应式设计

## 贡献

欢迎提交问题和 pull 请求来改进这个项目！
