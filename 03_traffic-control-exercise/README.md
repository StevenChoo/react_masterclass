# React + TypeScript + Vite

This project is a simplified airport traffic control application built with React 19, TypeScript, and Vite.

## Getting Started

```bash
npm install
npm run dev
```

## Architecture Overview

The application consists of three main components:

### Components

- **`FlightBoard`** - Displays flight information in a table format with status indicators
- **`RunwayStatus`** - Shows runway status cards with availability monitoring
- **`ControlPanel`** - Interactive control panel with statistics and action buttons

### Project Structure

```
src/
├── types.ts                   # TypeScript interfaces and mock data
├── FlightBoard.tsx            # Flight information table
├── FlightBoard.module.css
├── RunwayStatus.tsx           # Runway status display
├── RunwayStatus.module.css
├── ControlPanel.tsx           # Control panel component
├── ControlPanel.module.css
├── App.tsx                    # Main application
├── App.module.css
└── main.tsx                   # Entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
