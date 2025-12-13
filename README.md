# WaterUI Landing Page

A Neo-Bauhaus style landing page for WaterUI, built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Neo-Bauhaus Design**: Bold geometric shapes, primary colors (red, yellow, blue), clean typography, and asymmetric layouts
- **Architecture Visualization**: Animated data flow showing how WaterUI bridges Rust to native platforms
- **Quick Start Guide**: Step-by-step CLI instructions with playground mode
- **Interactive Code Examples**: Real-world WaterUI examples with syntax highlighting
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) runtime

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

## Project Structure

```
waterui.dev/
├── src/
│   ├── components/
│   │   ├── Hero.tsx              # Hero section with animated background
│   │   ├── Architecture.tsx      # Architecture visualization
│   │   ├── QuickStart.tsx        # CLI quick start guide
│   │   ├── Features.tsx          # Feature highlights
│   │   ├── CodeExamples.tsx      # Interactive code examples
│   │   └── Footer.tsx            # Footer with links
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Tailwind imports
├── index.html
├── package.json
└── README.md
```

## Design System

### Colors

- **Primary Red**: `#d32f2f` - CTAs and primary actions
- **Primary Yellow**: `#fbc02d` - Highlights and accents
- **Primary Blue**: `#1976d2` - Links and secondary actions
- **Success Green**: `#388e3c` - Success states
- **Background**: `#f5f5f0` - Warm off-white
- **Black**: `#000000` - Borders and text

### Typography

- **Font Family**: System font stack for optimal performance
- **Headings**: Bold, black weight (900)
- **Body**: Regular weight (400)

### Components

All components follow Neo-Bauhaus principles:
- Bold geometric shapes (circles, squares, rectangles)
- Strong black borders (3-4px)
- Layered elements with rotation
- Asymmetric layouts
- High contrast color combinations

## Technology Stack

- **React 19.2.3** - UI framework
- **TypeScript** - Type safety
- **Vite 7.2.7** - Build tool and dev server
- **Tailwind CSS 4.1.18** - Utility-first CSS
- **Bun 1.3.4** - JavaScript runtime and package manager

## License

MIT
