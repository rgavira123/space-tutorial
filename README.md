# Space Tutorial - News Page

A modern news page application built with TypeScript, React, TailwindCSS, and Framer Motion. This application showcases a responsive news article layout with interactive advertisements and smooth animations.

## Features

- **Modern Tech Stack**: Built with TypeScript, React, TailwindCSS, and Framer Motion
- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Interactive Ads**: Sidebar and banner advertisements with smooth animations
- **Ad Toggle**: Button to hide/show ads with fluid animations using Framer Motion
- **Sample News Content**: Mars water discovery article with lorem ipsum content
- **Smooth UI**: Fluid animations and transitions throughout the application

## Technology Stack

- **TypeScript**: Type-safe JavaScript development
- **React 18**: Modern React with hooks
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Production-ready motion library for React
- **Vite**: Fast build tool and development server

## Getting Started

### Prerequisites


### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd space-tutorial
```

2. Install dependencies:
```bash
npm install
```
### Development

- Run both API and frontend: pnpm dev
- Frontend dev server: http://localhost:5173
- API server: http://localhost:5174 (proxied under /api by Vite)

### Production build

- Build both frontend and server TS: pnpm build
- Start API only (serves data): pnpm start:server

The frontend currently expects /api endpoints available; in production, deploy the server and host the built frontend separately or via a static host.

### Development Workflow

Start the development server with hot reload:
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build Workflow

Build the application for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

Preview the production build:
```bash
npm run preview
```

### Linting

Check TypeScript compilation and types:
```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── NewsArticle.tsx    # Main news article component
│   ├── Advertisement.tsx   # Reusable ad component
│   └── AdToggle.tsx       # Toggle button for ads
├── App.tsx                # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles with Tailwind
```

## Features Showcase

### News Article
- Professional news article layout
- Rich content with lorem ipsum text
- Social sharing buttons
- Reading time indicator
- Responsive typography

### Interactive Advertisements
- **Left Sidebar**: Premium Space Tours ad
- **Right Sidebar**: Space Equipment Sale ad
- **Bottom Banner**: Space Community ad
- Hover effects and click animations
- Smooth show/hide transitions

### Ad Toggle Functionality
- Toggle button in the header to hide/show all ads
- Smooth animations powered by Framer Motion
- Layout reflows smoothly when ads are hidden
- Visual feedback with icons and state changes

### Responsive Design
- Mobile-first approach
- Flexible grid layout
- Optimized for all screen sizes
- Touch-friendly interactive elements

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - TypeScript type checking
- `npm run preview` - Preview production build

## License

MIT License - see LICENSE file for details
