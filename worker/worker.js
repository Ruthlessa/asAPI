// Static Random Pic API Worker
// Returns the static index.html file for root requests

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // For root path, return the static index.html content
  if (url.pathname === '/' || url.pathname === '/index.html') {
    return new Response(
      `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>静态随机图片</title>
    <meta name="referrer" content="no-referrer">
    <meta http-equiv="Access-Control-Allow-Origin" content="*">
    <style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #2c3e50;
    text-align: center;
}

p {
    margin-bottom: 1rem;
}

.gallery-link {
    display: inline-block;
    margin: 1rem 0;
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.gallery-link:hover {
    background-color: #2980b9;
}

.demo-section {
    margin: 2rem 0;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #34495e;
}

code {
    background-color: #f8f9fa;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
}

.demo-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1rem 0;
}

.bg-demo {
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: white;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    margin: 1rem 0;
}

.gallery-section {
    margin: 2rem 0;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.gallery-grid img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.3s;
}

.gallery-grid img:hover {
    transform: scale(1.05);
}

.footer-section {
    margin: 2rem 0;
    padding: 2rem;
    background-color: transparent;
    color: white;
    border-radius: 8px;
    text-align: center;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.github-button {
    display: inline-block;
    margin: 1rem 0;
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.github-button:hover {
    background-color: #2980b9;
}

/* Modal styles for image zoom */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.9);
}

.modal-content {
    margin: 10% auto;
    display: block;
    max-width: 80%;
    max-height: 80%;
}

.close {
    position: absolute;
    top: 20px;
    right: 30px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
}

.close:hover {
    color: #bbb;
}

/* Responsive design */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    h1 {
        font-size: 2rem;
    }
    
    h2 {
        font-size: 1.5rem;
    }
    
    .demo-section,
    .gallery-section,
    .footer-section {
        padding: 1rem;
    }
    
    .gallery-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
    
    .gallery-grid img {
        height: 120px;
    }
}
    </style>
</head>
<body>
    <div class="container">
        <h1>静态随机图片</h1>
        <p>这是一个静态实现。图片在构建时随机生成。</p>
        <a href="#gallery" class="gallery-link">查看图库</a>
        
        <section class="demo-section">
            <h2>横向图片 (横屏)</h2>
            <p>使用 <code>&lt;img alt="random:h"&gt;</code>：</p>
            <img alt="random:h" class="demo-image" src="https://www.dmoe.cc/random.php?id=1">
        </section>
        
        <section id="gallery" class="gallery-section">
            <h2>图库</h2>
            <div class="gallery-grid">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=3">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=4">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=5">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=6">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=7">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=8">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=9">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=10">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=11">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=12">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=13">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=14">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=15">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=16">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=17">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=18">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=19">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=20">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=21">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=22">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=23">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=24">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=25">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=26">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=27">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=28">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=29">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=30">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=31">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=32">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=33">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=34">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=35">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=36">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=37">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=38">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=39">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=40">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=41">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=42">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=43">
                <img alt="random:h" src="https://www.dmoe.cc/random.php?id=44">
            </div>
        </section>
        
        <!-- 开源链接和版权 -->
        <footer class="footer-section">
            <p>项目开源地址：</p>
            <a href="https://github.com/MCQA2580/asAPI" target="_blank" class="github-button">
                访问 GitHub 仓库
            </a>
            <p>© 2026 静态随机图片. All rights reserved.</p>
        </footer>
    </div>
    <script>
// Static Random Pic API Implementation
// Images are randomized at build time

// 初始化所有功能
function initAll() {
    // 主源 URL
    const MAIN_SOURCE = 'https://www.dmoe.cc/random.php';
    
    // 图片源数组（只使用主源，无备用）
    const imageSources = [
        function() {
            const randomId = Math.floor(Math.random() * 1000);
            return MAIN_SOURCE + "?id=" + randomId;
        }
    ];
    
    // 立即清理所有已加载的非主源图片
    function cleanupNonMainSourceImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.src && !img.src.includes('https://www.dmoe.cc/random.php')) {
                console.warn('发现已加载的非主源图片，立即强制清理:', img.src);
                img.src = '';
                img.style.opacity = '0';
                // 立即重新加载主源
                loadImageWithFallback(img, 'h', imageSources, 0);
            }
        });
    }
    
    // 立即执行一次清理
    cleanupNonMainSourceImages();
    
    // 重写 Image 构造函数，拦截所有图片创建
    const originalImage = window.Image;
    window.Image = function(width, height) {
        const img = new originalImage(width, height);
        
        // 重写 src setter
        Object.defineProperty(img, 'src', {
            get: function() {
                return originalImage.prototype.src.call(this);
            },
            set: function(value) {
                if (value && !value.includes('https://www.dmoe.cc/random.php')) {
                    console.warn('拦截到非主源图片设置，强制使用主源:', value);
                    // 生成主源 URL
                    const randomId = Math.floor(Math.random() * 1000);
                    const mainSourceUrl = "https://www.dmoe.cc/random.php?id=" + randomId;
                    console.log('强制设置为主源:', mainSourceUrl);
                    originalImage.prototype.src.call(this, mainSourceUrl);
                } else {
                    originalImage.prototype.src.call(this, value);
                }
            }
        });
        
        return img;
    };
    window.Image.prototype = originalImage.prototype;
    window.Image.toString = function() { return originalImage.toString(); };
    
    // 添加 DOM 突变观察器，捕获所有新增的图片元素
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // 检查新增的节点是否为图片
                    if (node.tagName === 'IMG') {
                        console.log('捕获到新增图片元素，强制使用主源');
                        loadImageWithFallback(node, 'h', imageSources, 0);
                    }
                    // 检查新增节点的子元素中是否有图片
                    const newImages = node.querySelectorAll('img');
                    newImages.forEach(img => {
                        console.log('捕获到新增图片元素（子元素），强制使用主源');
                        loadImageWithFallback(img, 'h', imageSources, 0);
                    });
                }
            });
        });
    });
    
    // 开始观察整个文档的变化
    observer.observe(document, {
        childList: true,
        subtree: true
    });
    
    // 初始化图片
    initImages(imageSources);
    
    // 初始化网站背景
    initWebsiteBackground(imageSources);
    
    // 初始化图片点击放大
    initImageZoom();
    
    // 添加定期检查机制，确保所有图片都使用主源
    setInterval(() => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // 检查图片是否来自主源
            if (img.src && !img.src.includes('https://www.dmoe.cc/random.php')) {
                console.warn('定期检查发现非主源图片，立即强制重新加载主源:', img.src);
                img.src = '';
                img.style.opacity = '0';
                loadImageWithFallback(img, 'h', imageSources, 0);
            } else if (img.src) {
                // 图片已经是主源，保持不变
                console.log('定期检查确认图片来自主源:', img.src);
            }
        });
    }, 300000); // 每5分钟检查一次，减少检查频率
}

// 初始化图片（严格检查并扔掉非主源图片）
function initImages(imageSources) {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // 严格检查当前图片是否为非主源
        if (img.src && !img.src.includes('https://www.dmoe.cc/random.php')) {
            console.warn('发现非主源图片，立即扔掉并强制重新加载主源:', img.src);
            // 立即设置为空白，确保非主源图片不显示
            img.src = '';
            img.style.opacity = '0';
        }
        // 强制所有图片使用主源
        loadImageWithFallback(img, 'h', imageSources, 0);
    });
}

// 初始化网站背景
function initWebsiteBackground(imageSources) {
    console.log('开始设置网站背景');
    
    // 直接设置背景，不使用复杂的测试加载
    const imageUrl = imageSources[0]();
    console.log('设置网站背景:', imageUrl);
    
    // 确保背景样式正确设置
    document.body.style.backgroundImage = 'url("' + imageUrl + '")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.position = 'relative';
    document.body.style.minHeight = '100vh';
    document.body.style.backgroundColor = '#f5f5f5'; // 备用背景色
    
    // 创建覆盖层
    let overlay = document.getElementById('bg-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'bg-overlay';
        overlay.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(255, 255, 255, 0.8); z-index: -1; pointer-events: none;";
        document.body.appendChild(overlay);
    }
    
    // 简单的错误处理：如果背景加载失败，尝试一次
    const testImg = new Image();
    testImg.onload = function() {
        console.log('网站背景加载成功:', imageUrl);
    };
    testImg.onerror = function() {
        console.warn('网站背景加载失败，尝试一次新的 URL');
        const newUrl = imageSources[0]();
        console.log('尝试新的背景 URL:', newUrl);
        document.body.style.backgroundImage = 'url("' + newUrl + '")';
    };
    testImg.src = imageUrl;
}

// 加载图片（只使用主源，失败时重新尝试加载主源）
function loadImageWithFallback(img, type, sources, sourceIndex) {
    if (sourceIndex >= sources.length) {
        console.error('主源失败，重新尝试加载主源');
        // 重新尝试加载主源
        setTimeout(function() {
            loadImageWithFallback(img, type, sources, 0);
        }, 500);
        return;
    }
    
    const imageUrl = sources[sourceIndex]();
    console.log('加载图片:', imageUrl, '类型:', type);
    
    // 重置图片样式，确保正常显示
    img.style.opacity = '1';
    img.style.transition = 'opacity 0.3s ease';
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';
    
    // 保存原始的 src，用于点击放大功能
    img.dataset.originalSrc = imageUrl;
    
    // 设置加载超时机制（5秒）
    const timeoutId = setTimeout(function() {
        console.warn('主源加载超时，重新尝试加载主源:', imageUrl);
        // 清除图片
        img.src = '';
        img.style.opacity = '0';
        // 重新尝试加载主源
        setTimeout(function() {
            loadImageWithFallback(img, type, sources, 0);
        }, 500);
    }, 5000);
    
    // 为原始图片设置 onload 事件监听器
    img.onload = function() {
        clearTimeout(timeoutId);
        console.log('图片加载成功:', imageUrl, '宽度:', img.naturalWidth, '高度:', img.naturalHeight);
        
        // 检查图片是否为空白
        if (img.naturalWidth === 0 || img.naturalHeight === 0) {
            console.warn('主源返回空白，重新尝试加载主源:', imageUrl);
            img.src = '';
            img.style.opacity = '0';
            // 重新尝试加载主源
            setTimeout(function() {
                loadImageWithFallback(img, type, sources, 0);
            }, 500);
            return;
        }
        
        // 确保图片显示
        img.style.opacity = '1';
    };
    
    // 为原始图片设置 onerror 事件监听器
    img.onerror = function(event) {
        clearTimeout(timeoutId);
        console.error('主源失败，重新尝试加载主源:', event);
        // 清除图片
        img.src = '';
        img.style.opacity = '0';
        // 重新尝试加载主源
        setTimeout(function() {
            loadImageWithFallback(img, type, sources, 0);
        }, 500);
    };
    
    // 直接设置原始图片的 src
    img.src = imageUrl;
}

// 初始化图片点击放大
function initImageZoom() {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);
    
    // 创建模态框内容
    const modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    modal.appendChild(modalImg);
    
    // 创建关闭按钮
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.textContent = '×';
    modal.appendChild(closeBtn);
    
    // 点击关闭模态框
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
    
    // 点击模态框外部关闭
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    // 为所有图片添加点击事件
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onclick = function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
        };
    });
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}
    </script>
</body>
</html>`,
      {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
          'cache-control': 'max-age=3600',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
      }
    );
  }
  
  // For other paths, return 404
  return new Response('Not Found', {
    status: 404,
    headers: {
      'content-type': 'text/plain;charset=UTF-8',
    },
  });
}