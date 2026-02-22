# Static Random Pic API

A static implementation of a random image API that generates random images at build time.

## How It Works

This API generates random images at build time using the `https://p.2x.nz/` endpoint. It creates static HTML with pre-generated random image URLs, which means:

- No runtime overhead
- Faster page loading
- Consistent images across page loads
- SEO-friendly

## Usage

### 1. Basic Image Usage

Use the `alt="random:h"` attribute on img tags:

```html
<!-- Horizontal image -->
<img alt="random:h">

<!-- Vertical image -->
<img alt="random:v">
```

### 2. Background Image Usage

Use the `data-random-bg="h"` attribute on any element:

```html
<div data-random-bg="h">
    <!-- Content -->
</div>
```

### 3. Build Process

Run the build script to generate random images:

```bash
# Using npm
npm run build

# Or directly with node
node build.js
```

This will update the `index.html` file with generated random image URLs.

## API Reference

### Endpoint

```
https://p.2x.nz/api/ide/v1/text_to_image?prompt={prompt}&image_size={image_size}
```

### Parameters

- `prompt`: Text description of the image (URL encoded)
- `image_size`: Size of the image
  - `landscape_16_9` (horizontal)
  - `portrait_16_9` (vertical)
  - `square` (square)
  - `square_hd` (high definition square)

## Example Output

After running the build script, your HTML will be updated with actual image URLs:

```html
<!-- Before build -->
<img alt="random:h">

<!-- After build -->
<img alt="random:h" src="https://p.2x.nz/api/ide/v1/text_to_image?prompt=beautiful%20landscape%20photography&image_size=landscape_16_9">
```

## Project Structure

```
├── index.html          # Demo page
├── style.css           # Styling
├── script.js           # Dynamic loading (fallback)
├── build.js            # Build script
├── package.json        # Project config
└── README.md           # This documentation
```

## Features

- ✅ Static generation at build time
- ✅ Support for horizontal, vertical, and square images
- ✅ Background image support
- ✅ Gallery functionality
- ✅ Responsive design
- ✅ Fallback to dynamic loading

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
