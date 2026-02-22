// Static Random Pic API Implementation
// Images are randomized at build time

// Configuration
const USE_FALLBACK = true; // 使用备用图片服务
const API_BASE = 'https://p.2x.nz/';
const FALLBACK_API = 'https://picsum.photos/';
const IMAGE_SIZES = {
    horizontal: 'landscape_16_9',
    vertical: 'portrait_16_9',
    square: 'square'
};

// Helper function to generate random image URL
function generateRandomImageUrl(type = 'h') {
    if (USE_FALLBACK) {
        // 使用 picsum.photos 作为备用
        const randomId = Math.floor(Math.random() * 1000);
        
        if (type === 'h') {
            return `${FALLBACK_API}800/450?random=${randomId}`;
        } else if (type === 'v') {
            return `${FALLBACK_API}450/800?random=${randomId}`;
        } else {
            return `${FALLBACK_API}400/400?random=${randomId}`;
        }
    } else {
        // 使用原有的 p.2x.nz API
        const size = type === 'h' ? IMAGE_SIZES.horizontal : 
                     type === 'v' ? IMAGE_SIZES.vertical : 
                     IMAGE_SIZES.square;
        
        // Generate a random prompt for variety
        const prompts = [
            'beautiful landscape photography',
            'city skyline at sunset',
            'mountain range with snow',
            'beach with palm trees',
            'forest with autumn leaves',
            'ocean waves crashing',
            'desert landscape with cactus',
            'lake with mountains in background'
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
            console.error('Failed to load random image:', imageUrl);
            img.style.opacity = '1';
            img.alt = 'Image failed to load';
        };
    });
}

// Handle elements with data-random-bg attribute
function handleRandomBackgrounds() {
    const bgElements = document.querySelectorAll('[data-random-bg]');
    
    bgElements.forEach(element => {
        const type = element.dataset.randomBg || 'h';
        const imageUrl = generateRandomImageUrl(type);
        
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
            console.error('Failed to load background image:', imageUrl);
            element.style.opacity = '1';
            element.style.backgroundColor = '#34495e'; // Fallback color
        };
    });
}

// Initialize the random image generation
function initRandomImages() {
    handleRandomImages();
    handleRandomBackgrounds();
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