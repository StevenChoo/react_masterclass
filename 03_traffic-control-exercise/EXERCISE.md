# Airport Traffic Control Exercise - Base Setup

**Type:** Pre-configured base for multiple exercises
**Concepts:** Component composition, props, TypeScript interfaces, CSS Modules

## 🎯 Overview

This is a **base application** designed to be used for multiple React exercises. It provides a simplified airport traffic control system with three main components, all fully functional but **without state management**.

The application is intentionally built with static data to allow students to practice adding various React concepts:
- State management (useState, useReducer, Context API)
- Side effects (useEffect, data fetching)
- Performance optimization (useMemo, useCallback, React.memo)
- Advanced patterns (custom hooks, compound components)

## 📦 What's Included

### Three Main Components

1. **FlightBoard** - Displays flight information in a table format
   - Shows flight number, airline, origin/destination, status, gate
   - Color-coded status indicators
   - Responsive table layout

2. **RunwayStatus** - Shows the current status of airport runways
   - Visual cards for each runway
   - Status indicators (available, occupied, maintenance)
   - Displays current flight if runway is occupied

3. **ControlPanel** - Control interface with buttons and statistics
   - Real-time statistics display
   - Filter buttons (arrivals/departures)
   - Action buttons (refresh, emergency mode)
   - **Note:** All buttons currently log to console - ready for state implementation

### Architecture

```
src/
├── types.ts              # TypeScript interfaces and mock data
├── FlightBoard.tsx       # Flight information table component
├── FlightBoard.module.css
├── RunwayStatus.tsx      # Runway status cards component
├── RunwayStatus.module.css
├── ControlPanel.tsx      # Control panel with buttons and stats
├── ControlPanel.module.css
├── App.tsx              # Main app component
├── App.module.css
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🚀 Setup

### 1. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 2. Start Development Server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 💡 Exercise Ideas

This base application can be used for the following exercises:

### 1. **State Management Exercise** (Beginner)
- Add state to make filter buttons work
- Implement filtering logic for arrivals/departures
- Add a "Clear Filter" button functionality
- **Time:** 30-45 minutes

### 2. **Interactive Controls Exercise** (Intermediate)
- Add state for runway status updates
- Implement emergency mode toggle
- Add flight status update functionality
- **Time:** 45-60 minutes

### 3. **Data Fetching Exercise** (Intermediate)
- Replace mock data with API calls
- Add loading states
- Implement auto-refresh functionality
- Handle error states
- **Time:** 60-75 minutes

### 4. **Performance Optimization Exercise** (Advanced)
- Profile the application
- Add React.memo where appropriate
- Optimize re-renders with useMemo/useCallback
- Implement virtualization for large flight lists
- **Time:** 60-90 minutes

### 5. **Context API Exercise** (Intermediate)
- Create a FlightContext for global state
- Implement context-based filtering
- Add theme toggle functionality
- **Time:** 45-60 minutes

### 6. **Custom Hooks Exercise** (Advanced)
- Create useFlightFilter hook
- Create useRunwayStatus hook
- Create useLocalStorage hook for persistence
- **Time:** 60-75 minutes

## 🔍 Current Behavior

### Static Data
- All data comes from `mockFlights` and `mockRunways` in `types.ts`
- No state management - data never changes
- All buttons log to console instead of performing actions

### Components Are Functional But Static
- **FlightBoard** receives and displays flights via props
- **RunwayStatus** receives and displays runways via props
- **ControlPanel** displays statistics but buttons don't affect the app

### What Works
- ✅ All components render correctly
- ✅ Visual design is complete
- ✅ TypeScript types are properly defined
- ✅ CSS Modules for scoped styling
- ✅ Responsive layout

### What Needs Implementation
- ❌ No state management
- ❌ Buttons don't perform actions
- ❌ No filtering functionality
- ❌ No data updates
- ❌ No side effects

## 🎨 Design Features

- **Gradient backgrounds** for visual appeal
- **Color-coded status indicators**
  - Green: Available, Landed, Scheduled
  - Red: Occupied, Cancelled
  - Yellow: Delayed, Boarding, Maintenance
  - Blue: Departed
- **Animations**
  - Floating airplane logo
  - Pulsing status indicators
  - Hover effects on cards and buttons
- **Responsive grid layouts**
- **Custom scrollbar styling**

## 📚 Key Concepts Demonstrated

### Component Composition
- Parent-child component relationships
- Props passing and TypeScript prop types
- Component reusability

### TypeScript
- Interfaces for complex data structures
- Type unions for status values
- Proper typing of component props
- Type-safe helper functions

### CSS Modules
- Scoped styling per component
- No global CSS conflicts
- Modular and maintainable styles

### Modern React
- Functional components only
- React 19 with TypeScript
- StrictMode enabled
- Vite for fast development

## 🛠️ Modifying the Base

### Adding More Flights
Edit `mockFlights` in `src/types.ts`:

```typescript
export const mockFlights: Flight[] = [
  // Add new flight objects here
];
```

### Adding More Runways
Edit `mockRunways` in `src/types.ts`:

```typescript
export const mockRunways: Runway[] = [
  // Add new runway objects here
];
```

### Customizing Styles
Each component has its own CSS Module file:
- `FlightBoard.module.css`
- `RunwayStatus.module.css`
- `ControlPanel.module.css`
- `App.module.css`

## 🎓 Learning Objectives

By using this base application for exercises, students will learn:

1. How to add state to existing components
2. How to implement event handlers
3. How to lift state up to parent components
4. How to pass callbacks down via props
5. How to structure React applications
6. How to work with TypeScript in React
7. How to use CSS Modules for styling
8. How to optimize React performance
9. How to create custom hooks
10. How to implement global state management

## 📝 Notes

- **No external UI libraries** - All components are custom-built
- **CSS Modules only** - No Tailwind or styled-components
- **Modern React practices** - Hooks, functional components, TypeScript
- **Ready for expansion** - Architecture supports adding features easily

## 🚦 Next Steps

Choose an exercise from the "Exercise Ideas" section above and start implementing! Each exercise builds on this base, so you can complete them in order or pick based on your learning goals.

---

**Happy Coding! ✈️**
