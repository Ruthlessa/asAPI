// Static Site Generator for Random Pic API
// Generates random images at build time

const fs = require('fs');
const path = require('path');

// Configuration
const API_BASE = 'https://www.dmoe.cc/random.php'; // 主图片源

// Helper function to generate random image URL
function generateRandomImageUrl(type = 'h') {
    // 使用主图片源 https://www.dmoe.cc/random.php
    const randomId = Math.floor(Math.random() * 1000);
    return `${API_BASE}?id=${randomId}`;
}

// Generate random images data
function generateRandomImagesData() {
    return {
        horizontal: generateRandomImageUrl('h'),
        vertical: generateRandomImageUrl('v'),
        square: generateRandomImageUrl('s'),
        // Generate multiple images for gallery
        gallery: Array.from({ length: 44 }, () => generateRandomImageUrl('h'))
    };
}

// Update the HTML file with generated images
function updateHtmlFile(imagesData) {
    const htmlPath = path.join(__dirname, '..', 'index.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Replace placeholder images with generated ones
    // For img tags with alt="random:h"
    htmlContent = htmlContent.replace(/<img alt="random:([hv])">/g, (match, type) => {
        const imageUrl = type === 'h' ? imagesData.horizontal : imagesData.vertical;
        return `<img alt="random:${type}" src="${imageUrl}">`;
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