# LimSight Frontend

A modern TypeScript web application built with Vite.

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts a development server at `http://localhost:5173`

### Build

```bash
npm run build
```

Creates an optimized production build in the `dist` folder.

### Preview

```bash
npm run preview
```

Preview the production build locally.

## Project Structure

```
index.html
src/
├── assets/
├── components/
│   ├── assistant/
│   ├── common/
│   └── ide/
├── contexts/
│   └── AssistantContext.tsx # State management
├── pages/
│   ├── AssistantPage.tsx    # REST client
│   └── IDEPage.tsx          # WebSocket client
├── services/
│   ├── api.ts               # REST client
│   └── websocket.ts         # WebSocket client
├── App.tsx
├── assets.d.ts
├── main.tsx
└── style.css
```

## Technologies

- **TypeScript** - Type-safe JavaScript
- **Vite** - Modern build tool and dev server
- **ESLint** - Code linting
