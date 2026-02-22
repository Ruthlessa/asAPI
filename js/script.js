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
        img.src = imageUrl;
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // 添加 3 秒超时机制
        const timeoutId = setTimeout(() => {
            console.warn('图片加载超时，清理并重新加载:', imageUrl);
            img.src = '';
            img.style.opacity = '0';
            loadImageWithFallback(img, type, sources, 0);
        }, 3000);
        
        img.onload = function() {
            clearTimeout(timeoutId);
            // 检查是否为空白图片
            if (img.naturalWidth === 0 || img.naturalHeight === 0) {
                console.warn('检测到空白图片，清理并重新加载:', imageUrl);
                img.src = '';
                img.style.opacity = '0';
                loadImageWithFallback(img, type, sources, 0);
                return;
            }
            img.style.opacity = '1';
        };
        
        img.onerror = function() {
            clearTimeout(timeoutId);
            console.warn('图片加载失败，重新加载主源:', imageUrl);
            // 始终重新加载主源
            loadImageWithFallback(img, type, sources, 0);
        };
    }
    
    // 立即清理所有已加载的非主源图片
    function cleanupNonMainSourceImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.src && !img.src.includes(MAIN_SOURCE)) {
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
                    console.warn('拦截到非主源图片设置，强制使用主源:', value);
                    // 生成主源 URL
                    const randomId = Math.floor(Math.random() * 1000);
                    const mainSourceUrl = `${MAIN_SOURCE}?id=${randomId}`;
                    console.log('强制设置为主源:', mainSourceUrl);
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
    
    // 配置观察器
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // 处理随机图片
    const randomImages = document.querySelectorAll('img[alt^="random:"]');
    randomImages.forEach(img => {
        const type = img.alt.split(':')[1] || 'h';
        loadImageWithFallback(img, type, imageSources, 0);
    });
    
    // 处理背景图片
    const bgElements = document.querySelectorAll('[data-random-bg]');
    bgElements.forEach(element => {
        let retryCount = 0;
        const maxRetries = 10;
        
        function loadBackgroundImage() {
            if (retryCount >= maxRetries) {
                console.error('背景元素加载达到最大重试次数，停止尝试:', element);
                element.style.opacity = '1';
                return;
            }
            
            retryCount++;
            const imageUrl = getNextImageUrl();
            console.log(`背景元素加载尝试 ${retryCount}/${maxRetries}:`, imageUrl);
            
            // 先设置为透明，准备加载
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.3s ease';
            
            const img = new Image();
            
            // 移除 CORS 设置，避免跨域问题
            // img.crossOrigin = 'anonymous';
            
            // 添加 10 秒超时机制
            const timeoutId = setTimeout(() => {
                console.warn('背景元素加载超时，清理并重新加载:', imageUrl);
                element.style.backgroundImage = 'none';
                element.style.opacity = '0';
                setTimeout(loadBackgroundImage, 1000);
            }, 10000);
            
            img.onload = function() {
                clearTimeout(timeoutId);
                console.log('背景元素测试加载成功:', imageUrl, '宽度:', img.naturalWidth, '高度:', img.naturalHeight);
                
                // 检查是否为空白图片
                if (img.naturalWidth === 0 || img.naturalHeight === 0) {
                    console.warn('检测到空白背景元素图片，清理并重新加载:', imageUrl);
                    element.style.backgroundImage = 'none';
                    element.style.opacity = '0';
                    setTimeout(loadBackgroundImage, 1000);
                    return;
                }
                
                // 测试成功后，设置为背景
                console.log('设置背景元素:', imageUrl);
                element.style.backgroundImage = `url('${imageUrl}')`;
                
                // 延迟一点再显示，确保背景已经应用
                setTimeout(() => {
                    console.log('显示背景元素:', imageUrl);
                    element.style.opacity = '1';
                    retryCount = 0; // 重置重试计数
                }, 100);
            };
            
            img.onerror = function(event) {
                clearTimeout(timeoutId);
                console.error('背景元素加载失败:', event.target.src, '错误:', event);
                element.style.backgroundImage = 'none';
                element.style.opacity = '0';
                setTimeout(loadBackgroundImage, 1000);
            };
            
            // 开始加载
            console.log('开始加载背景元素:', imageUrl);
            img.src = imageUrl;
        }
        
        // 立即开始加载
        loadBackgroundImage();
    });
    
    // 设置网站背景
    function setWebsiteBackground() {
        console.log('开始设置网站背景');
        
        // 直接设置背景，不使用测试加载
        const imageUrl = getNextImageUrl();
        console.log('设置网站背景:', imageUrl);
        
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
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.8);
                z-index: -1;
                pointer-events: none;
            `;
            document.body.appendChild(overlay);
        }
        
        // 简单的错误处理：如果背景加载失败，尝试一次
        const testImg = new Image();
        testImg.onload = function() {
            console.log('网站背景加载成功:', imageUrl);
        };
        testImg.onerror = function() {
            console.warn('网站背景加载失败，尝试一次新的 URL');
            const newUrl = getNextImageUrl();
            console.log('尝试新的背景 URL:', newUrl);
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