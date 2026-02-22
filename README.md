# 静态随机图片 API

一个在构建时生成随机图片的静态实现，基于二次元图片 API 端点。

## 项目简介

这个项目基于 [EdgeOne_Function_PicAPI](https://github.com/afoim/EdgeOne_Function_PicAPI) 实现，提供了两种使用方式：

### 1. 静态生成模式（默认）
- **无运行时开销**：页面加载更快
- **更快的页面加载**：图片 URL 预先生成
- **页面加载一致性**：每次加载看到相同的图片
- **SEO 友好**：静态内容更容易被搜索引擎索引

### 2. 服务器端模式（EdgeOne Function）
- **动态随机图片**：每次请求都返回不同的图片
- **多尺寸支持**：横向、纵向、方形等多种尺寸
- **多图片源**：集成多个可靠的图片服务
- **API 接口**：提供 JSON 格式的 API 响应

## 快速开始

### 1. 克隆项目

```bash
git clone <仓库地址>
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

在 `build.js` 文件中，你可以修改提示词数组来自定义生成图片的风格：

```javascript
const prompts = [
    'anime girl beautiful artwork',
    'anime landscape scenic view',
    'anime character cute design',
    // 添加更多自定义提示词
];
```

### 自定义图片大小

在 `build.js` 文件中，你可以修改图片尺寸配置：

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
https://www.dmoe.cc/random.php?id={random}
```

### 二次元图片 API

项目使用 `https://www.dmoe.cc/random.php` 作为主要的二次元图片源，这是一个可靠的二次元图片服务。

## 示例输出

运行构建脚本后，你的 HTML 将被更新为实际的图片 URL：

```html
<!-- 构建前 -->
<img alt="random:h">

<!-- 构建后 -->
<img alt="random:h" src="https://www.dmoe.cc/random.php?id=123456">
```

## 项目结构

```
├── index.html          # 演示页面
├── style.css           # 样式文件
├── script.js           # 动态加载（ fallback ）
├── build.js            # 构建脚本
├── package.json        # 项目配置
├── worker.js           # 服务器端脚本
├── wrangler.jsonc      # Workers 配置
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
- ✅ 二次元图片支持

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
- 构建脚本会为每张图片生成不同的随机参数
- 尝试重新运行构建脚本
- 检查图片 API 是否正常响应

## 集成到其他项目

### 方法 1：复制文件

1. 复制 `build.js` 文件到你的项目
2. 在你的 HTML 文件中添加占位符图片标签
3. 运行 `node build.js` 生成静态图片

### 方法 2：作为依赖使用

1. 将此项目作为子模块添加到你的项目
2. 配置构建脚本调用此项目的构建过程
3. 在你的 HTML 中使用相同的占位符格式

## 服务器端模式（EdgeOne Function）

### 部署步骤

1. **准备工作**
   - 确保已安装 Wrangler CLI：`npm install -g wrangler`
   - 登录 Cloudflare 账户：`wrangler login`

2. **部署到 Cloudflare Workers**
   ```bash
   # 使用 npm 脚本
   npm run deploy
   
   # 或直接使用 wrangler
   npx wrangler deploy
   ```

3. **验证部署**
   部署成功后，你将获得一个 Workers 域名，例如：`https://static-random-pic-api.<你的账户>.workers.dev`

### API 端点

部署后，你可以使用以下端点：

#### 1. 随机图片端点

- **默认横向图片**：`/random`
- **横向图片**：`/random/h`
- **纵向图片**：`/random/v`
- **方形图片**：`/random/s`
- **小尺寸方形**：`/random/small`
- **大尺寸横向**：`/random/large`

#### 2. JSON API 端点

- **API 接口**：`/api/random`
- **参数**：
  - `type`：图片类型（horizontal, vertical, square, small, large）

- **响应示例**：
  ```json
  {
    "success": true,
    "type": "horizontal",
    "imageUrl": "https://www.dmoe.cc/random.php?id=123456",
    "timestamp": 1771760761000
  }
  ```

### 图片源配置

在 `worker.js` 文件中，你可以修改图片源配置：

```javascript
const IMAGE_SOURCES = {
    // 内置图片源
    builtin: [
        'https://picsum.photos/{width}/{height}?random={random}',
        'https://via.placeholder.com/{width}x{height}',
        'https://placekitten.com/{width}/{height}',
        'https://placeimg.com/{width}/{height}/any'
    ],
    
    // 二次元图片源
    anime: [
        'https://www.dmoe.cc/random.php?id={random}',
        'https://www.dmoe.cc/random.php?id={random}',
        'https://www.dmoe.cc/random.php?id={random}',
        'https://www.dmoe.cc/random.php?id={random}'
    ],
    
    // 自定义图片源（可以根据需要添加）
    custom: []
};
```

### 图片尺寸配置

在 `worker.js` 文件中，你可以修改图片尺寸配置：

```javascript
const IMAGE_SIZES = {
    horizontal: { width: 800, height: 450 },
    vertical: { width: 450, height: 800 },
    square: { width: 500, height: 500 },
    small: { width: 200, height: 200 },
    large: { width: 1200, height: 675 }
};
```

## 演示页面

项目包含一个完整的演示页面 `index.html`，展示了以下功能：

- 横向图片示例
- 背景图片示例
- 图片库展示
- 响应式设计

## 许可证

MIT

## 更新日志

### v1.2.0
- 切换到 `https://www.dmoe.cc/random.php` 作为二次元图片源
- 优化图片生成逻辑
- 更新文档为中文

### v1.1.0
- 添加服务器端模式（EdgeOne Function）
- 集成 [EdgeOne_Function_PicAPI](https://github.com/afoim/EdgeOne_Function_PicAPI) 功能
- 支持多图片源配置
- 提供完整的 API 端点
- 支持 JSON API 响应

### v1.0.0
- 初始版本
- 支持静态生成随机图片
- 支持横向、纵向和方形图片
- 支持背景图片
- 响应式设计

## 贡献

欢迎提交问题和 pull 请求来改进这个项目！
