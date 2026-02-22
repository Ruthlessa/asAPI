// EdgeOne Function PicAPI 服务器端实现
// 基于 https://github.com/afoim/EdgeOne_Function_PicAPI
// 使用 ES Modules 语法

// 图片源配置
const IMAGE_SOURCES = {
    // 内置图片源
    builtin: [
        'https://picsum.photos/{width}/{height}?random={random}',
        'https://via.placeholder.com/{width}x{height}',
        'https://placekitten.com/{width}/{height}',
        'https://placeimg.com/{width}/{height}/any'
    ],
    
    // 二次元图片源（新 API）
    anime: [
        'https://www.dmoe.cc/random.php?id={random}',
        'https://www.dmoe.cc/random.php?id={random}',
        'https://www.dmoe.cc/random.php?id={random}',
        'https://www.dmoe.cc/random.php?id={random}'
    ],
    
    // 自定义图片源（可以根据需要添加）
    custom: []
};

// 图片尺寸配置
const IMAGE_SIZES = {
    // 横向图片
    horizontal: {
        width: 800,
        height: 450
    },
    // 纵向图片
    vertical: {
        width: 450,
        height: 800
    },
    // 方形图片
    square: {
        width: 500,
        height: 500
    },
    // 小尺寸方形
    small: {
        width: 200,
        height: 200
    },
    // 大尺寸横向
    large: {
        width: 1200,
        height: 675
    }
};

// 生成随机 ID
function generateRandomId() {
    return Math.floor(Math.random() * 1000000);
}

// 生成随机图片 URL
function generateRandomImageUrl(type = 'horizontal') {
    const size = IMAGE_SIZES[type] || IMAGE_SIZES.horizontal;
    // 使用二次元图片源
    const sources = [...IMAGE_SOURCES.anime, ...IMAGE_SOURCES.custom];
    const randomSource = sources[Math.floor(Math.random() * sources.length)];
    const randomId = generateRandomId();
    
    // 替换 URL 中的占位符
    return randomSource
        .replace('{width}', size.width)
        .replace('{height}', size.height)
        .replace('{random}', randomId);
}

// 处理图片请求
function handleImageRequest(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // 解析请求路径
    const pathParts = pathname.split('/').filter(Boolean);
    
    // 处理根路径
    if (pathParts.length === 0) {
        return new Response(
            JSON.stringify({
                message: 'EdgeOne Function PicAPI',
                version: '1.0.0',
                endpoints: {
                    '/': 'API 信息',
                    '/random': '随机图片（默认横向）',
                    '/random/h': '横向随机图片',
                    '/random/v': '纵向随机图片',
                    '/random/s': '方形随机图片',
                    '/random/small': '小尺寸方形图片',
                    '/random/large': '大尺寸横向图片',
                    '/api/random': 'API 接口（JSON 响应）'
                }
            }, null, 2),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
    }
    
    // 处理随机图片请求
    if (pathParts[0] === 'random') {
        const type = pathParts[1] || 'h';
        let imageType = 'horizontal';
        
        // 映射类型参数
        switch (type) {
            case 'h':
                imageType = 'horizontal';
                break;
            case 'v':
                imageType = 'vertical';
                break;
            case 's':
                imageType = 'square';
                break;
            case 'small':
                imageType = 'small';
                break;
            case 'large':
                imageType = 'large';
                break;
        }
        
        const imageUrl = generateRandomImageUrl(imageType);
        
        // 重定向到随机图片
        return Response.redirect(imageUrl, 302);
    }
    
    // 处理 API 接口
    if (pathParts[0] === 'api' && pathParts[1] === 'random') {
        const type = url.searchParams.get('type') || 'horizontal';
        const imageUrl = generateRandomImageUrl(type);
        
        return new Response(
            JSON.stringify({
                success: true,
                type,
                imageUrl,
                timestamp: Date.now()
            }, null, 2),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
        );
    }
    
    // 处理 404
    return new Response(
        JSON.stringify({
            success: false,
            message: 'Not Found',
            path: pathname
        }, null, 2),
        {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    );
}

// 导出默认处理函数（ES Modules 语法）
export default {
    fetch(request) {
        // 处理 Cloudflare 安全验证
        const url = new URL(request.url);
        if (url.pathname === '/' && request.method === 'GET') {
            // 返回一个简单的 HTML 页面，而不是 JSON
            const html = `
                <!DOCTYPE html>
                <html lang="zh-CN">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>静态随机图片 API</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            min-height: 100vh;
                            margin: 0;
                            padding: 20px;
                            background-color: #f5f5f5;
                        }
                        h1 {
                            color: #3498db;
                            margin-bottom: 20px;
                        }
                        p {
                            text-align: center;
                            max-width: 600px;
                            margin-bottom: 30px;
                        }
                        .button {
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #3498db;
                            color: white;
                            text-decoration: none;
                            border-radius: 4px;
                            font-weight: bold;
                            transition: background-color 0.3s ease;
                        }
                        .button:hover {
                            background-color: #2980b9;
                        }
                    </style>
                </head>
                <body>
                    <h1>静态随机图片 API</h1>
                    <p>这是一个基于二次元图片 API 的静态随机图片服务。您可以通过以下端点获取随机图片：</p>
                    <ul>
                        <li>/random - 随机图片（默认横向）</li>
                        <li>/random/h - 横向随机图片</li>
                        <li>/random/v - 纵向随机图片</li>
                        <li>/random/s - 方形随机图片</li>
                        <li>/api/random - API 接口（JSON 响应）</li>
                    </ul>
                    <a href="/random" class="button">获取随机图片</a>
                </body>
                </html>
            `;
            return new Response(html, {
                headers: {
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        return handleImageRequest(request);
    }
};

// 导出函数（用于本地测试）
export {
    generateRandomImageUrl,
    handleImageRequest
};