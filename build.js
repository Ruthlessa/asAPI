// Static Site Generator for Random Pic API
// Generates random images at build time

const fs = require('fs');
const path = require('path');

// Configuration
const USE_FALLBACK = true; // 使用备用图片服务
const API_BASE = 'https://p.2x.nz/';
const FALLBACK_API = 'https://picsum.photos/';
const ANIME_API = 'https://neeko-copilot.bytedance.net/api/text2image?prompt={prompt}&size={size}';
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

// Generate random images data
function generateRandomImagesData() {
    return {
        horizontal: generateRandomImageUrl('h'),
        vertical: generateRandomImageUrl('v'),
        square: generateRandomImageUrl('s'),
        // Generate multiple images for gallery
        gallery: Array.from({ length: 4 }, () => generateRandomImageUrl('h'))
    };
}

// Update the HTML file with generated images
function updateHtmlFile(imagesData) {
    const htmlPath = path.join(__dirname, 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Replace placeholder images with generated ones
    // For img tags with alt="random:h"
    htmlContent = htmlContent.replace(/<img alt="random:([hv])">/g, (match, type) => {
        const imageUrl = type === 'h' ? imagesData.horizontal : imagesData.vertical;
        return `<img alt="random:${type}" src="${imageUrl}">`;
    });
    
    // For elements with data-random-bg
    htmlContent = htmlContent.replace(/<div class="bg-demo" data-random-bg="([hv])">/g, (match, type) => {
        const imageUrl = type === 'h' ? imagesData.horizontal : imagesData.vertical;
        return `<div class="bg-demo" data-random-bg="${type}" style="background-image: url('${imageUrl}');">`;
    });
    
    // For gallery images
    htmlContent = htmlContent.replace(/<div class="gallery-grid">[\s\S]*?<\/div>/, () => {
        const galleryImages = imagesData.gallery.map(url => `<img alt="random:h" src="${url}">`).join('');
        return `<div class="gallery-grid">${galleryImages}</div>`;
    });
    
    // Write back the updated HTML
    fs.writeFileSync(htmlPath, htmlContent);
    console.log('✓ Updated index.html with random images');
}

// Main build function
function build() {
    console.log('Starting build process...');
    
    try {
        const imagesData = generateRandomImagesData();
        updateHtmlFile(imagesData);
        
        console.log('\nBuild completed successfully!');
        console.log('\nGenerated images:');
        console.log(`- Horizontal: ${imagesData.horizontal}`);
        console.log(`- Vertical: ${imagesData.vertical}`);
        console.log(`- Square: ${imagesData.square}`);
        console.log('\nGallery images:');
        imagesData.gallery.forEach((url, index) => {
            console.log(`- ${index + 1}: ${url}`);
        });
        
    } catch (error) {
        console.error('❌ Build failed:', error);
    }
}

// Run build if executed directly
if (require.main === module) {
    build();
}

module.exports = { build, generateRandomImageUrl };