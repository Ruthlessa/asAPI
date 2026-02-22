// Static Random Pic API Implementation
// Images are randomized at build time

// 初始化所有功能
function initAll() {
    // 主源 URL
    const MAIN_SOURCE = 'https://www.dmoe.cc/random.php';
    
    // 图片源数组（只使用主源）
    const imageSources = [
        function() {
            const randomId = Math.floor(Math.random() * 1000);
            return `${MAIN_SOURCE}?id=${randomId}`;
        }
    ];
    
    // 获取主源图片 URL
    function getNextImageUrl() {
        return imageSources[0]();
    }
    
    // 加载图片并使用主源
    function loadImageWithFallback(img, type, sources, sourceIndex) {
        const imageUrl = sources[sourceIndex]();
        
        // 只在开发模式下输出加载信息
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('加载图片:', imageUrl, '类型:', type);
        }
        
        // 保存原始的 src，用于点击放大功能
        img.dataset.originalSrc = imageUrl;
        
        // 清除之前可能存在的事件监听器，避免内存泄漏
        img.onload = null;
        img.onerror = null;
        
        img.src = imageUrl;
        
        // 重置样式，确保图片正常显示
        img.style.opacity = '1';
        img.style.transition = 'opacity 0.3s ease';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.display = 'block';
        
        // 添加 5 秒超时机制
        const timeoutId = setTimeout(() => {
            // 只在开发模式下输出警告信息
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.warn('图片加载超时，清理并重新加载:', imageUrl);
            }
            img.src = '';
            img.style.opacity = '0';
            loadImageWithFallback(img, type, sources, 0);
        }, 5000);
        
        img.onload = function() {
            clearTimeout(timeoutId);
            
            // 只在开发模式下输出成功信息
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('图片加载成功:', imageUrl, '宽度:', img.naturalWidth, '高度:', img.naturalHeight);
            }
            
            // 检查是否为空白图片
            if (img.naturalWidth === 0 || img.naturalHeight === 0) {
                // 只在开发模式下输出警告信息
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    console.warn('检测到空白图片，清理并重新加载:', imageUrl);
                }
                img.src = '';
                img.style.opacity = '0';
                loadImageWithFallback(img, type, sources, 0);
                return;
            }
            
            // 确保图片显示
            img.style.opacity = '1';
        };
        
        img.onerror = function(event) {
            clearTimeout(timeoutId);
            // 只在开发模式下输出错误信息
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.error('图片加载失败:', event.target.src, '错误:', event);
            }
            // 始终重新加载主源
            loadImageWithFallback(img, type, sources, 0);
        };
    }
    
    // 立即清理所有已加载的非主源图片
    function cleanupNonMainSourceImages() {
        const images = document.querySelectorAll('img');
        let hasNonMainSource = false;
        
        images.forEach(img => {
            if (img.src && !img.src.includes(MAIN_SOURCE)) {
                hasNonMainSource = true;
                img.src = '';
                img.style.opacity = '0';
                // 立即重新加载主源
                loadImageWithFallback(img, 'h', imageSources, 0);
            }
        });
        
        // 只在开发模式下输出警告信息，且只输出一次
        if (hasNonMainSource && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            if (!window.__hasWarnedNonMainSource) {
                console.warn('发现非主源图片，正在清理并重新加载主源');
                window.__hasWarnedNonMainSource = true;
                // 重置警告标志
                setTimeout(() => {
                    window.__hasWarnedNonMainSource = false;
                }, 5000);
            }
        }
    }
    
    // 立即执行一次清理
    cleanupNonMainSourceImages();
    
    // 覆盖 Image 构造函数以拦截所有图片创建
    const originalImage = window.Image;
    window.Image = function(width, height) {
        const img = new originalImage(width, height);
        
        // 重写 src setter
        Object.defineProperty(img, 'src', {
            get: function() {
                return originalImage.prototype.src.call(this);
            },
            set: function(value) {
                if (value && !value.includes(MAIN_SOURCE)) {
                    // 只在开发模式下输出警告信息
                    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                        if (!window.__hasWarnedNonMainSource) {
                            console.warn('拦截到非主源图片设置，强制使用主源');
                            window.__hasWarnedNonMainSource = true;
                            setTimeout(() => {
                                window.__hasWarnedNonMainSource = false;
                            }, 5000);
                        }
                    }
                    // 生成主源 URL
                    const randomId = Math.floor(Math.random() * 1000);
                    const mainSourceUrl = `${MAIN_SOURCE}?id=${randomId}`;
                    originalImage.prototype.src.call(this, mainSourceUrl);
                } else {
                    originalImage.prototype.src.call(this, value);
                }
            }
        });
        
        return img;
    };
    
    // 添加 DOM 突变观察器以捕获动态添加的图片
    const observer = new MutationObserver((mutations) => {
        // 批量处理突变，减少重复操作
        const imagesToProcess = [];
        
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // 检查新增的节点是否为图片
                    if (node.tagName === 'IMG') {
                        // 只处理没有 data-processed 属性的图片，避免重复处理
                        if (!node.dataset.processed) {
                            node.dataset.processed = 'true';
                            imagesToProcess.push(node);
                        }
                    }
                    // 检查新增节点的子元素中是否有图片
                    else {
                        const newImages = node.querySelectorAll('img:not([data-processed])');
                        newImages.forEach(img => {
                            img.dataset.processed = 'true';
                            imagesToProcess.push(img);
                        });
                    }
                }
            });
        });
        
        // 批量处理图片，避免重复操作
        if (imagesToProcess.length > 0) {
            imagesToProcess.forEach(img => {
                loadImageWithFallback(img, 'h', imageSources, 0);
            });
        }
    });
    
    // 配置观察器，只观察必要的元素
    const container = document.querySelector('.container');
    if (container) {
        observer.observe(container, {
            childList: true,
            subtree: true
        });
    } else {
        // 如果没有容器元素，只观察 body
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // 处理随机图片
    const randomImages = document.querySelectorAll('img[alt^="random:"]');
    randomImages.forEach(img => {
        const type = img.alt.split(':')[1] || 'h';
        loadImageWithFallback(img, type, imageSources, 0);
    });
    
    // 设置网站背景
    function setWebsiteBackground() {
        // 只在开发模式下输出信息
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('开始设置网站背景');
        }
        
        // 直接设置背景，不使用测试加载
        const imageUrl = getNextImageUrl();
        
        // 只在开发模式下输出信息
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('设置网站背景:', imageUrl);
        }
        
        // 确保背景样式正确设置
        document.body.style.backgroundImage = `url('${imageUrl}')`;
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
            // 只在开发模式下输出信息
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('网站背景加载成功:', imageUrl);
            }
        };
        testImg.onerror = function() {
            // 只在开发模式下输出警告信息
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.warn('网站背景加载失败，尝试一次新的 URL');
            }
            const newUrl = getNextImageUrl();
            // 只在开发模式下输出信息
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('尝试新的背景 URL:', newUrl);
            }
            document.body.style.backgroundImage = `url('${newUrl}')`;
        };
        testImg.src = imageUrl;
    }
    setWebsiteBackground();
    
    // 图片点击放大功能
    function initImageZoom() {
        const modal = document.createElement('div');
        modal.id = 'image-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            cursor: pointer;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.id = 'modal-image';
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            transition: transform 0.3s ease;
        `;
        
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            z-index: 1001;
        `;
        
        modal.appendChild(modalImg);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
        
        const images = document.querySelectorAll('img[alt^="random:"], .demo-image');
        images.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                modal.style.display = 'flex';
                modalImg.src = this.src;
                document.body.style.overflow = 'hidden';
            });
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target === closeBtn) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    initImageZoom();
}

// 运行初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}