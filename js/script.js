// Static Random Pic API Implementation
// Images are randomized at build time

// 初始化所有功能
function initAll() {
    // 图片源数组（添加备用图片源）
    const imageSources = [
        function() {
            const randomId = Math.floor(Math.random() * 1000);
            return `https://www.dmoe.cc/random.php?id=${randomId}`;
        },
        function() {
            const width = 800;
            const height = 600;
            const randomId = Math.floor(Math.random() * 1000);
            return `https://picsum.photos/${width}/${height}?random=${randomId}`;
        },
        function() {
            const width = 800;
            const height = 600;
            const randomId = Math.floor(Math.random() * 1000);
            return `https://via.placeholder.com/${width}x${height}?text=Image+${randomId}`;
        }
    ];
    
    // 获取下一个图片源
    let currentSourceIndex = 0;
    function getNextImageUrl() {
        const imageUrl = imageSources[currentSourceIndex]();
        currentSourceIndex = (currentSourceIndex + 1) % imageSources.length;
        return imageUrl;
    }
    
    // 处理随机图片
    const randomImages = document.querySelectorAll('img[alt^="random:"]');
    randomImages.forEach(img => {
        const type = img.alt.split(':')[1] || 'h';
        let retryCount = 0;
        const maxRetries = 5;
        
        function loadImage() {
            if (retryCount >= maxRetries) {
                console.warn('Max retries reached for image:', img);
                img.style.opacity = '1';
                img.alt = 'Image failed to load after multiple attempts';
                return;
            }
            
            const imageUrl = getNextImageUrl();
            img.src = imageUrl;
            
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.onload = function() {
                img.style.opacity = '1';
                retryCount = 0; // 重置重试计数
            };
            
            img.onerror = function() {
                console.warn('Failed to load image, retrying:', imageUrl);
                retryCount++;
                setTimeout(loadImage, 500); // 延迟重试，避免请求过于频繁
            };
        }
        
        loadImage();
    });
    
    // 处理背景图片
    const bgElements = document.querySelectorAll('[data-random-bg]');
    bgElements.forEach(element => {
        let retryCount = 0;
        const maxRetries = 5;
        
        function loadBackgroundImage() {
            if (retryCount >= maxRetries) {
                console.warn('Max retries reached for background:', element);
                element.style.opacity = '1';
                element.style.backgroundColor = '#34495e'; // 备用背景色
                return;
            }
            
            const imageUrl = getNextImageUrl();
            element.style.backgroundImage = `url('${imageUrl}')`;
            
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.3s ease';
            
            const img = new Image();
            img.crossOrigin = 'anonymous'; // 添加 CORS 支持
            img.src = imageUrl;
            img.onload = function() {
                element.style.opacity = '1';
                retryCount = 0; // 重置重试计数
            };
            
            img.onerror = function() {
                console.warn('Failed to load background image, retrying:', imageUrl);
                retryCount++;
                setTimeout(loadBackgroundImage, 500); // 延迟重试，避免请求过于频繁
            };
        }
        
        loadBackgroundImage();
    });
    
    // 设置网站背景
    function setWebsiteBackground() {
        let retryCount = 0;
        const maxRetries = 5;
        
        function loadWebsiteBackground() {
            if (retryCount >= maxRetries) {
                console.warn('Max retries reached for website background');
                document.body.style.backgroundColor = '#f5f5f5'; // 备用背景色
                return;
            }
            
            const imageUrl = getNextImageUrl();
            
            document.body.style.backgroundImage = `url('${imageUrl}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundAttachment = 'fixed';
            document.body.style.position = 'relative';
            
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
            
            const testImg = new Image();
            testImg.crossOrigin = 'anonymous'; // 添加 CORS 支持
            testImg.src = imageUrl;
            testImg.onerror = function() {
                console.warn('Failed to load website background, retrying:', imageUrl);
                retryCount++;
                setTimeout(loadWebsiteBackground, 500); // 延迟重试，避免请求过于频繁
            };
            
            testImg.onload = function() {
                retryCount = 0; // 重置重试计数
            };
        }
        
        loadWebsiteBackground();
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