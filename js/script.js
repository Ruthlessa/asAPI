// Static Random Pic API Implementation
// Images are randomized at build time

// 初始化所有功能
function initAll() {
    // 处理随机图片
    const randomImages = document.querySelectorAll('img[alt^="random:"]');
    randomImages.forEach(img => {
        const type = img.alt.split(':')[1] || 'h';
        
        function loadImage() {
            const randomId = Math.floor(Math.random() * 1000);
            const imageUrl = `https://www.dmoe.cc/random.php?id=${randomId}`;
            img.src = imageUrl;
            
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.onload = function() {
                img.style.opacity = '1';
            };
            
            img.onerror = function() {
                loadImage();
            };
        }
        
        loadImage();
    });
    
    // 处理背景图片
    const bgElements = document.querySelectorAll('[data-random-bg]');
    bgElements.forEach(element => {
        function loadBackgroundImage() {
            const randomId = Math.floor(Math.random() * 1000);
            const imageUrl = `https://www.dmoe.cc/random.php?id=${randomId}`;
            element.style.backgroundImage = `url('${imageUrl}')`;
            
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.3s ease';
            
            const img = new Image();
            img.src = imageUrl;
            img.onload = function() {
                element.style.opacity = '1';
            };
            
            img.onerror = function() {
                loadBackgroundImage();
            };
        }
        
        loadBackgroundImage();
    });
    
    // 设置网站背景
    function setWebsiteBackground() {
        function loadWebsiteBackground() {
            const randomId = Math.floor(Math.random() * 1000);
            const imageUrl = `https://www.dmoe.cc/random.php?id=${randomId}`;
            
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
            testImg.src = imageUrl;
            testImg.onerror = function() {
                loadWebsiteBackground();
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