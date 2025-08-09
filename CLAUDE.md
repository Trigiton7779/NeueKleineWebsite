# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a comprehensive multi-page static HTML website project serving as a personal tech portfolio. The project is in German and showcases various technology areas through a hub-based architecture. The site represents Volker Rosin's tech interests from MSR electrical engineering to retro computing.

### Complete File Inventory:

#### Main Pages:
- `index.html` - Landing page with tech category tiles (Software, Elektronik, KI, Retro, Automatisierung)
- `steckbrief.html` - Personal profile with avatar, contact info, and experience details

#### Category Hub Pages:
- `software.html` - Software projects showcase (Web-Apps, Desktop Tools, Scripts, etc.)
- `elektronik.html` - Electronics projects (Arduino/ESP32, PCB Design, etc.)
- `ki-labor.html` - AI experiments (Generative AI, Computer Vision, NLP)
- `retro-computing.html` - Retro computing hub (Emulation, Gaming, Hardware Restoration)
- `automatisierung.html` - Automation workflows (n8n, Smart Home, etc.)

#### Detail Pages:
- `retro-emulatoren.html` - Comprehensive retro emulator links and descriptions
- `webhooks.html` - n8n webhook testing interface with file upload

#### Legal/Contact Pages:
- `kontakt.html` - Contact form with validation and privacy compliance
- `impressum.html` - German legal imprint (TMG compliance)
- `datenschutz.html` - GDPR-compliant privacy policy

#### Configuration System:
- `data/config.json` - Central configuration file with personal data, site settings
- `js/config-loader.js` - Dynamic content loading system via data-config attributes

#### Assets:
- `assets/images/avatar.jpg` - Profile image (200x200px)
- `assets/images/circuit-pattern.webp` - Optimized background pattern (81KB)
- `assets/images/circuit-pattern.png` - Original background pattern (1.55MB, kept as backup)
- `assets/images/GUT_C64_KLEIN.webp` - Commodore 64 computer image (320x240px optimized)
- `assets/images/GUT_AMIGA_KLEIN.webp` - Amiga 500 computer image (320x240px optimized)
- `assets/images/GUT_ATARIST_KLEIN.webp` - Atari ST computer image (320x240px optimized)
- `assets/images/GUT_MSDOS_KLEIN.webp` - MS-DOS PC image (320x240px optimized)
- `assets/images/GUT_APPLE2_KLEIN.webp` - Apple II computer image (320x240px optimized)
- `assets/images/GUT_MAME_KLEIN.webp` - Arcade machine image (320x240px optimized)

## Development Commands

Since this is a static HTML project without a build system:
- Open any `.html` file directly in a web browser to view the site
- Use any static file server for local development:
  - `python -m http.server 8000` 
  - `npx serve .`
  - `php -S localhost:8000`
- No build, test, or lint commands are available

## Architecture

### Technical Stack:
- **Static HTML5**: Semantic markup with consistent structure
- **Tailwind CSS**: Via CDN for responsive design and dark theme utilities
- **Vanilla JavaScript**: For dynamic content loading, form validation, and webhook testing
- **WebP Optimization**: Optimized images for better performance
- **Mobile-First**: Responsive design with desktop enhancements

### Site Architecture:
- **Hub-Based Navigation**: Category pages serve as hubs for related content
- **Hierarchical Structure**: Main categories → sub-categories → detail pages
- **Consistent Footer Navigation**: Kontakt | Impressum | Datenschutz across all pages
- **Breadcrumb Navigation**: Back links on sub-pages for clear user orientation

### Configuration System:
- **Central Data Management**: All personal data, skills, and site metadata in `data/config.json`
- **Dynamic Content Loading**: JavaScript system replaces placeholders with config data
- **Data Attributes**: `data-config="path.to.value"` for automatic content population
- **Nested Object Support**: Handles complex data structures and arrays

## Features

### Design System:
- **Circuit Pattern Background**: WebP-optimized technical pattern with 10% opacity
- **Animated Particles**: Staggered ping animations across all pages
- **Glassmorphism Effects**: Backdrop blur and transparency effects
- **Color-Coded Categories**: Each tech area has unique gradient colors
- **Status-Based Styling**: Visual differentiation for project status (Aktiv, Geplant, Konzept, etc.)
- **Hover Interactions**: Scale transforms and color transitions

### Project Status System:
The site uses a comprehensive status system for projects:
- **Aktiv** (Active) - Currently working on
- **Geplant** (Planned) - In planning phase  
- **Konzept** (Concept) - Conceptual stage
- **Sammlung** (Collection) - Ongoing collection/hobby
- **Lernen** (Learning) - Learning phase
- **Projekt** (Project) - Active project
- **Idee** (Idea) - Just an idea
- **Vision** (Vision) - Future vision
- **Experiment** (Experiment) - Experimental phase
- **Hobby** (Hobby) - Personal hobby project

### Technology Showcases:
Each category page includes comprehensive technology badges:

#### Software Technologies:
- **Languages**: Python, JavaScript, TypeScript
- **Frameworks**: React, Node.js, Flask, FastAPI
- **Tools**: Docker, Git, VS Code

#### Electronics Technologies:
- **Microcontrollers**: Arduino, ESP32, Raspberry Pi
- **Design Tools**: KiCad, Eagle, Altium Designer
- **Components**: Sensors, actuators, communication modules

#### AI Technologies:
- **Frameworks**: PyTorch, TensorFlow, OpenCV
- **Libraries**: LangChain, HuggingFace, scikit-learn
- **APIs**: OpenAI, Claude, local models

#### Retro Computing:
- **Emulators**: VICE (C64), WinUAE (Amiga), DOSBox, MAME
- **Systems**: Commodore 64, Amiga 500, Atari ST, NES
- **Tools**: RetroPie, emulation frontends

### Advanced Features:

#### Contact Form (`kontakt.html`):
- **Client-Side Validation**: Real-time form validation with error messages
- **Privacy Compliance**: Required privacy policy checkbox
- **GDPR Compliance**: Data processing consent mechanism
- **Accessibility**: Proper labeling and keyboard navigation
- **Success/Error Handling**: User feedback for form submission

#### Webhook Testing (`webhooks.html`):
- **Multiple Test Modes**: Simple, Form Data, JSON, File Upload
- **File Upload Support**: PDF drag & drop with progress indication
- **Response Handling**: Automatic download for file responses
- **Real-Time Logging**: Response display with syntax highlighting
- **Error Handling**: Comprehensive error reporting and debugging

#### Retro Emulator Directory (`retro-emulatoren.html`):
- **Computer Emulators**: VICE, WinUAE, Hatari, DOSBox, AppleWin, MAME
- **Console Emulators**: RetroArch, Dolphin, PCSX2, ePSXe, Project64, VBA-M
- **Platform Support**: Windows, macOS, Linux compatibility indicators
- **Official Links**: Direct links to official websites and repositories
- **Legal Disclaimer**: ROM usage and copyright information
- **Authentic Hardware Icons**: Original computer/device images in correct 4:3 aspect ratio (64x48px containers)

## Content Management

### Personal Information:
All personal data is centralized in `data/config.json`:
```json
{
  "personal": {
    "name": "Volker Rosin",
    "title": "Elektrotechniker",
    "subtitle": "Planung MSR-Schaltanlagen",
    "experience": "25 Jahre Elektrotechnik",
    "location": "Bochum",
    "email": "v.rosin@email.de"
  }
}
```

### Adding New Projects:
1. Add project data to appropriate category in `config.json`
2. Create new project card in relevant hub page
3. Use consistent status indicators and technology badges
4. Follow established color scheme and styling patterns

### Status Updates:
- Update project status in HTML (Aktiv, Geplant, etc.)
- Use appropriate styling (solid borders for active, dashed for planned)
- Maintain visual consistency across all category pages

## Legal Compliance (German)

### Required Legal Pages:
- **Impressum**: TMG-compliant legal notice with provider information
- **Datenschutz**: GDPR-compliant privacy policy
- **Contact Form**: Privacy policy acceptance requirement

### Personal Data:
- All personal information properly disclosed in Impressum
- Contact email: v.rosin@email.de
- Professional title: Elektrotechniker, Planung MSR-Schaltanlagen
- Location: Bochum, Deutschland

## Asset Management

### Image Optimization:
- **WebP Format**: Use circuit-pattern.webp (81KB) for production
- **PNG Backup**: Keep circuit-pattern.png (1.55MB) as source
- **Avatar**: 200x200px JPEG for profile image
- **Retro Hardware Icons**: 320x240px WebP images optimized for web use
- **Compression**: Maintain quality while optimizing file size

### Background Pattern Usage:
```css
background-image: url('assets/images/circuit-pattern.webp');
background-size: cover;
background-position: center;
background-repeat: no-repeat;
opacity: 10%;
```

### Retro Hardware Icon Implementation:
```html
<!-- Container maintains 4:3 aspect ratio -->
<div class="w-16 h-12 bg-gradient-to-br from-color/20 to-color/20 rounded-lg flex items-center justify-center mr-4">
    <img src="assets/images/GUT_DEVICE_KLEIN.webp" alt="Device Name" class="w-14 h-10 object-cover rounded">
</div>
```

**Icon Specifications:**
- **Container Size**: 64x48px (w-16 h-12) - maintains 4:3 ratio
- **Image Size**: 56x40px (w-14 h-10) - preserves original proportions
- **Source Resolution**: 320x240px WebP optimized images
- **Usage**: Computer/device icons in retro-emulatoren.html

## Navigation Architecture

### Primary Navigation:
Index → Category Hubs → Detail Pages → Back to Hub

### Category Structure:
- **Software**: Web-Apps, Desktop Tools, Scripts, Data Analysis, APIs, Games
- **Elektronik**: Arduino/ESP32, Raspberry Pi, PCB Design, Tools & Equipment
- **KI-Labor**: Generative AI, Computer Vision, NLP & Chatbots, ML Algorithms
- **Retro-Computing**: Emulatoren → Retro-Emulatoren Detail Page
- **Automatisierung**: n8n Workflows, Smart Home, MQTT, Node-RED

### Footer Navigation:
Consistent across all pages: Kontakt | Impressum | Datenschutz

## Customization Guidelines

### Adding New Categories:
1. Create new hub page following existing pattern
2. Add category tile to `index.html` with unique gradient colors
3. Update navigation structure in `config.json`
4. Implement consistent styling and status system

### Modifying Technology Stacks:
1. Update technology badges in relevant hub pages
2. Maintain consistent color coding and icons
3. Add new technologies to showcase grids
4. Update project descriptions accordingly

### Content Localization:
- All content is in German for local market
- Maintain professional technical terminology
- Use consistent status indicators and project descriptions
- Follow German legal requirements for business websites