# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a multi-page static HTML website project with modern styling and interactive features. The project is in German and serves as a personal website with testing capabilities.

### Files:
- `index.html` - Hauptseite (Landing page)
- `steckbrief.html` - Persönlicher Steckbrief mit Avatar-Bereich
- `webhooks.html` - n8n Webhook-Test-Interface mit File-Upload

## Development Commands

Since this is a static HTML project without a build system:
- Open any `.html` file directly in a web browser to view the site
- Use any static file server for local development:
  - `python -m http.server 8000` 
  - `npx serve .`
  - `php -S localhost:8000`
- No build, test, or lint commands are available

## Architecture

- **Static HTML**: Multi-page website with consistent styling
- **Tailwind CSS**: Via CDN for responsive design and dark theme
- **JavaScript**: Vanilla JS for webhook testing and file uploads
- **Responsive**: Mobile-first design with desktop optimizations
- **Dark Theme**: Consistent dark gradient background across all pages

## Features

### Styling & Design
- Dark gradient backgrounds with animated particles
- Tailwind CSS utility classes for consistent styling
- Responsive navigation between pages
- Glassmorphism effects and smooth transitions

### Steckbrief Page (`steckbrief.html`)
- Personal profile card with avatar placeholder (200x200px recommended)
- Skills section with colored badges
- Contact information with social links
- Responsive grid layout

### Webhook Testing (`webhooks.html`)
- n8n webhook integration testing
- Multiple test modes: Simple, Form, JSON, File Upload
- PDF file upload with drag & drop support
- Automatic file download handling (TXT/Excel responses)
- Real-time response logging
- Support for both direct file responses and JSON-embedded files

## Customization

### Avatar Image
For the profile page, add a 200x200px image and replace the placeholder div in `steckbrief.html` with:
```html
<img src="your-avatar.jpg" alt="Your Name" class="w-48 h-48 rounded-full object-cover">
```

### Content Updates
- Update placeholder text in square brackets `[...]` throughout the pages
- Modify contact links and social media URLs
- Customize skills and personal information in the profile page