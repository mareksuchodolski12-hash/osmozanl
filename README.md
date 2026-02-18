# Osmoza Landing Page

Landing page for hydraulic and water treatment services.

## Features

- Next.js 15 with React 19
- TypeScript
- Tailwind CSS
- Framer Motion animations
- Google Analytics integration
- MDX support for content
- Responsive design

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Google Analytics

This project includes Google Analytics (GA4) tracking. The Analytics component is located in `app/analytics.tsx` and is automatically included in the root layout.

### Configuration

The Google Analytics measurement ID is: `G-95496XJE7V`

The Content Security Policy (CSP) in `next.config.ts` has been configured to allow Google Analytics scripts and connections:
- Google Tag Manager scripts
- Google Analytics data collection
- Analytics reporting endpoints

### Privacy

Please ensure compliance with privacy regulations (GDPR, CCPA, etc.) when collecting analytics data. Consider adding a cookie consent banner if required in your jurisdiction.

## Project Structure

```
├── app/              # Next.js app directory
│   ├── [locale]/     # Localized pages
│   ├── analytics.tsx # Google Analytics component
│   └── layout.tsx    # Root layout
├── src/
│   ├── components/   # React components
│   └── lib/          # Utility functions
├── public/           # Static assets
└── next.config.ts    # Next.js configuration
```

## License

Private project for Osmoza landing page.
