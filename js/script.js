// Static Random Pic API Implementation
// Images are randomized at build time

// Configuration
const USE_FALLBACK = true; // 使用备用图片服务
const API_BASE = 'https://p.2x.nz/';
const FALLBACK_API = 'https://picsum.photos/800/600'; // 可靠的随机图片 API
const IMAGE_SIZES = {
    horizontal: 'landscape_16_9',
    vertical: 'portrait_16_9',
    square: 'square'
};

// Helper function to generate random image URL
function generateRandomImageUrl(type = 'h') {
    if (USE_FALLBACK) {
        // 使用新的二次元图片 API
        const randomId = Math.floor(Math.random() * 1000);
        return `https://www.dmoe.cc/random.php?id=${randomId}`;
    } else {
        // 使用原有的 p.2x.nz API
        const size = type === 'h' ? IMAGE_SIZES.horizontal : 
                     type === 'v' ? IMAGE_SIZES.vertical : 
                     IMAGE_SIZES.square;
        
        // Generate a random anime prompt for variety
        const prompts = [
            'anime girl beautiful artwork',
            'anime landscape scenic view',
            'anime character cute design',
            'anime cityscape futuristic',
            'anime nature magical forest',
            'anime fantasy world',
            'anime school life',
            'anime sci-fi space scene'
        ];
        
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        const encodedPrompt = encodeURIComponent(randomPrompt);
        
        // Use the provided API endpoint
        return `${API_BASE}api/ide/v1/text_to_image?prompt=${encodedPrompt}&image_size=${size}`;
    }
}

// Handle img tags with alt="random:h"
function handleRandomImages() {
    const randomImages = document.querySelectorAll('img[alt^="random:"]');
    
    randomImages.forEach(img => {
        const type = img.alt.split(':')[1] || 'h';
        
        // Function to load image with retry
        function loadImage() {
            const imageUrl = generateRandomImageUrl(type);
            img.src = imageUrl;
            
            // Add loading state
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.onload = function() {
                img.style.opacity = '1';
            };
            
            // Handle errors
            img.onerror = function() {
                console.error('Failed to load random image, retrying:', imageUrl);
                // Retry with a new image
                loadImage();
            };
        }
        
        // Start loading
        loadImage();
    });
}

// Handle elements with data-random-bg attribute
function handleRandomBackgrounds() {
    const bgElements = document.querySelectorAll('[data-random-bg]');
    
    bgElements.forEach(element => {
        const type = element.dataset.randomBg || 'h';
        
        // Function to load background image with retry
        function loadBackgroundImage() {
            // 使用新的二次元图片 API
            const randomId = Math.floor(Math.random() * 1000);
            const imageUrl = `https://www.dmoe.cc/random.php?id=${randomId}`;
            
            // Set background image
            element.style.backgroundImage = `url('${imageUrl}')`;
            
            // Add loading state
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.3s ease';
            
            // Create an image to preload and check if it loads
            const img = new Image();
            img.src = imageUrl;
            img.onload = function() {
                element.style.opacity = '1';
            };
            
            img.onerror = function() {
                console.error('Failed to load background image, retrying:', imageUrl);
                // Retry with a new image
                loadBackgroundImage();
            };
        }
        
        // Start loading
        loadBackgroundImage();
    });
}

// Set website background
function setWebsiteBackground() {
    // Function to load website background with retry
    function loadWebsiteBackground() {
        // 使用新的二次元图片 API
        const randomId = Math.floor(Math.random() * 1000);
        const imageUrl = `https://www.dmoe.cc/random.php?id=${randomId}`;
        
        // Set background image for body
        document.body.style.backgroundImage = `url('${imageUrl}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundAttachment = 'fixed';
        // Add semi-transparent overlay for better text readability
        document.body.style.position = 'relative';
        
        // Create overlay if it doesn't exist
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
        
        // Test if background image loads
        const testImg = new Image();
        testImg.src = imageUrl;
        testImg.onerror = function() {
            console.error('Failed to load website background, retrying:', imageUrl);
            // Retry with a new image
            loadWebsiteBackground();
        };
    }
    
    // Start loading
    loadWebsiteBackground();
}

// Initialize the random image generation
function initRandomImages() {
    handleRandomImages();
    handleRandomBackgrounds();
    setWebsiteBackground();
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRandomImages);
} else {
    initRandomImages();
}

// Add refresh functionality (optional)
function refreshRandomImages() {
    handleRandomImages();
    handleRandomBackgrounds();
}

// Expose refresh function globally (for testing)
window.refreshRandomImages = refreshRandomImages;

// 图片点击放大功能
function initImageZoom() {
    // 创建模态框元素
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
    
    // 创建放大图片元素
    const modalImg = document.createElement('img');
    modalImg.id = 'modal-image';
    modalImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        transition: transform 0.3s ease;
    `;
    
    // 创建关闭按钮
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
    
    // 组装模态框
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // 获取所有图片元素
    const images = document.querySelectorAll('img[alt^="random:"], .demo-image');
    
    // 为每张图片添加点击事件
    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            document.body.style.overflow = 'hidden';
        });
    });
    
    // 点击模态框关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target === closeBtn) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 按 ESC 键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// 初始化所有功能
function initAll() {
    initRandomImages();
    initImageZoom();
}

// 运行初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}