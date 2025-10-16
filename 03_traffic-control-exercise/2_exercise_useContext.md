# Exercise 2: Refactoring to Context API with useContext

**Estimated Time:** 60-75 minutes
**Difficulty:** Intermediate
**Concepts:** Context API, useContext hook, Provider pattern, eliminating prop drilling

## 🎯 Goal

Refactor the traffic control application from Exercise 1 to use React's Context API instead of prop drilling. You'll learn how to share state across multiple components without passing props through every level.

## 📋 What You'll Learn

- How to create a React Context
- How to use the `useContext` hook
- How to implement the Provider pattern
- How to eliminate prop drilling
- How to structure context for complex applications
- When to use Context vs prop drilling

## 🚀 Prerequisites

- **IMPORTANT:** Complete Exercise 1 (useState) first
- Your app should have working filter and emergency mode functionality
- Understanding of how props flow from parent to child

## 🤔 The Problem: Prop Drilling

Currently, your App component:
1. Manages state (filter, emergency mode)
2. Passes state down to ControlPanel
3. Passes callbacks down to ControlPanel
4. ControlPanel uses these props

This works, but what if you had 5 levels of components? You'd pass props through components that don't even use them. This is called "prop drilling" and Context API solves it.

---

## 📝 Step 1: Create the Context

Let's create a new file for our flight context.

**Create `src/FlightContext.tsx`:**

```tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import { Flight, Runway, FlightType, mockFlights, mockRunways } from './types';

// Define the shape of our context
interface FlightContextType {
  // State values
  flights: Flight[];
  runways: Runway[];
  flightFilter: 'all' | FlightType;
  emergencyMode: boolean;

  // Derived values
  filteredFlights: Flight[];
  totalFlights: number;
  activeFlights: number;
  availableRunways: number;

  // Actions
  setFlightFilter: (filter: 'all' | FlightType) => void;
  setEmergencyMode: (mode: boolean) => void;
  filterArrivals: () => void;
  filterDepartures: () => void;
  clearFilter: () => void;
  toggleEmergency: () => void;
  refreshData: () => void;
}

// Create the context with undefined as default
// We'll provide actual values through the Provider
const FlightContext = createContext<FlightContextType | undefined>(undefined);

// Provider component that wraps our app
interface FlightProviderProps {
  children: ReactNode;
}

export function FlightProvider({ children }: FlightProviderProps) {
  // All the state from App.tsx
  const [flightFilter, setFlightFilter] = useState<'all' | FlightType>('all');
  const [emergencyMode, setEmergencyMode] = useState(false);

  // Static data (in a real app, this might come from an API)
  const flights = mockFlights;
  const runways = mockRunways;

  // Computed values
  const filteredFlights = flightFilter === 'all'
    ? flights
    : flights.filter(flight => flight.type === flightFilter);

  const totalFlights = filteredFlights.length;
  const activeFlights = filteredFlights.filter(
    f => f.status === 'boarding' || f.status === 'departed'
  ).length;
  const availableRunways = runways.filter(r => r.status === 'available').length;

  // Action functions
  const filterArrivals = () => setFlightFilter('arrival');
  const filterDepartures = () => setFlightFilter('departure');
  const clearFilter = () => setFlightFilter('all');
  const toggleEmergency = () => setEmergencyMode(!emergencyMode);
  const refreshData = () => {
    console.log('Data refreshed via Context');
    // In a real app, you'd refetch data here
  };

  // Context value object
  const value: FlightContextType = {
    // State
    flights,
    runways,
    flightFilter,
    emergencyMode,

    // Derived values
    filteredFlights,
    totalFlights,
    activeFlights,
    availableRunways,

    // Actions
    setFlightFilter,
    setEmergencyMode,
    filterArrivals,
    filterDepartures,
    clearFilter,
    toggleEmergency,
    refreshData,
  };

  return (
    <FlightContext.Provider value={value}>
      {children}
    </FlightContext.Provider>
  );
}

// Custom hook to use the context
export function useFlightContext() {
  const context = useContext(FlightContext);

  if (context === undefined) {
    throw new Error('useFlightContext must be used within a FlightProvider');
  }

  return context;
}
```

**What's happening:**
- Created a Context with `createContext`
- Defined TypeScript interface for type safety
- Created a Provider component that holds all state and logic
- Created a custom hook `useFlightContext` for easy access
- Error handling if context is used outside Provider

**You should see:** File created, no errors. App still works with old implementation.

---

## 📝 Step 2: Wrap App with Provider

Now we need to provide the context to our component tree.

**Update `src/main.tsx`:**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { FlightProvider } from './FlightContext';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <FlightProvider>
      <App />
    </FlightProvider>
  </StrictMode>
);
```

**What's happening:**
- Wrapped `<App />` with `<FlightProvider>`
- Now all components inside App can access the context
- Context values are available anywhere in the tree

**You should see:** App still works, but we're not using the context yet.

---

## 📝 Step 3: Refactor App Component

Let's remove state from App and use the context instead.

**Update `src/App.tsx`:**

```tsx
import FlightBoard from './FlightBoard';
import RunwayStatus from './RunwayStatus';
import ControlPanel from './ControlPanel';
import { useFlightContext } from './FlightContext';
import styles from './App.module.css';

export default function App() {
  // Get everything from context
  const {
    filteredFlights,
    runways,
    emergencyMode,
  } = useFlightContext();

  return (
    <div className={`${styles.app} ${emergencyMode ? styles.emergencyMode : ''}`}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>✈️</div>
          <div className={styles.title}>
            <h1>Airport Traffic Control System</h1>
            <p className={styles.subtitle}>Schiphol International Airport</p>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.topSection}>
          <div className={styles.controlPanelWrapper}>
            <ControlPanel />
          </div>
          <div className={styles.runwayStatusWrapper}>
            <RunwayStatus runways={runways} flights={filteredFlights} />
          </div>
        </div>

        <div className={styles.flightBoardWrapper}>
          <FlightBoard flights={filteredFlights} />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Traffic Control Exercise • React Masterclass 2024</p>
      </footer>
    </div>
  );
}
```

**What's happening:**
- Removed all `useState` declarations
- Removed all handler functions
- Called `useFlightContext()` to get values
- ControlPanel now receives NO props (we'll update it next)
- Still passing props to FlightBoard and RunwayStatus (we could refactor these too)

**You should see:** App compiles but ControlPanel will show TypeScript errors.

---

## 📝 Step 4: Refactor ControlPanel to Use Context

Now update ControlPanel to get values from context instead of props.

**Update `src/ControlPanel.tsx`:**

```tsx
import { useFlightContext } from './FlightContext';
import styles from './ControlPanel.module.css';

// No more props needed!
export default function ControlPanel() {
  // Get everything from context
  const {
    totalFlights,
    activeFlights,
    availableRunways,
    flightFilter,
    emergencyMode,
    filterArrivals,
    filterDepartures,
    clearFilter,
    toggleEmergency,
    refreshData,
  } = useFlightContext();

  return (
    <div className={styles.controlPanel}>
      <div className={styles.header}>
        <h2>Control Panel</h2>
        <div className={styles.timestamp}>
          {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Emergency Mode Banner */}
      {emergencyMode && (
        <div className={styles.emergencyBanner}>
          🚨 EMERGENCY MODE ACTIVE 🚨
        </div>
      )}

      {/* Statistics Section */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Flights</div>
          <div className={styles.statValue}>{totalFlights}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Active</div>
          <div className={styles.statValue}>{activeFlights}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Available Runways</div>
          <div className={styles.statValue}>{availableRunways}</div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Flight Filters</h3>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.buttonPrimary} ${
              flightFilter === 'arrival' ? styles.buttonActive : ''
            }`}
            onClick={filterArrivals}
          >
            📥 Arrivals Only
          </button>
          <button
            className={`${styles.button} ${styles.buttonPrimary} ${
              flightFilter === 'departure' ? styles.buttonActive : ''
            }`}
            onClick={filterDepartures}
          >
            📤 Departures Only
          </button>
          <button
            className={`${styles.button} ${styles.buttonSecondary} ${
              flightFilter === 'all' ? styles.buttonActive : ''
            }`}
            onClick={clearFilter}
          >
            ✖ Clear Filter
          </button>
        </div>
      </div>

      {/* Action Controls */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Actions</h3>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.buttonSuccess}`}
            onClick={refreshData}
          >
            🔄 Refresh Data
          </button>
          <button
            className={`${styles.button} ${styles.buttonDanger} ${
              emergencyMode ? styles.buttonEmergencyActive : ''
            }`}
            onClick={toggleEmergency}
          >
            {emergencyMode ? '✅ Deactivate Emergency' : '🚨 Emergency Mode'}
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className={styles.infoBox}>
        <div className={styles.infoIcon}>ℹ️</div>
        <div className={styles.infoText}>
          <strong>Current Filter:</strong> {
            flightFilter === 'all' ? 'All Flights' :
            flightFilter === 'arrival' ? 'Arrivals' :
            'Departures'
          }
        </div>
      </div>
    </div>
  );
}
```

**What's happening:**
- Removed ALL props from the component
- Used `useFlightContext()` to access state and functions
- Called context functions directly (no `on` prefix needed)
- Component now gets data directly from context

**You should see:** App works exactly as before! All buttons functional.

---

## 📝 Step 5: Test Everything

Test all functionality to ensure it works:

1. **Filter Buttons:**
   - Click "Arrivals Only" → Should show 2 flights
   - Click "Departures Only" → Should show 3 flights
   - Click "Clear Filter" → Should show all 5 flights
   - Active button should have blue glow

2. **Emergency Mode:**
   - Click "Emergency Mode" → Banner appears, button changes
   - Click "Deactivate Emergency" → Banner disappears
   - Background should pulse when active

3. **Stats Update:**
   - Total flights should update when filtering
   - Active flights should update based on filter

---

## 📝 Step 6: Optional - Refactor Other Components

You can also refactor FlightBoard and RunwayStatus to use context.

**Update `src/FlightBoard.tsx`:**

```tsx
import { useFlightContext } from './FlightContext';
import { Flight } from './types';
import styles from './FlightBoard.module.css';

// Keep props for flexibility, but also support context
interface FlightBoardProps {
  flights?: Flight[]; // Optional now
}

export default function FlightBoard({ flights: flightsProp }: FlightBoardProps) {
  // Use context if no props provided
  const context = useFlightContext();
  const flights = flightsProp ?? context.filteredFlights;

  // ... rest of component remains the same

  const getStatusClass = (status: Flight['status']) => {
    switch (status) {
      case 'scheduled':
        return styles.statusScheduled;
      case 'boarding':
        return styles.statusBoarding;
      case 'departed':
        return styles.statusDeparted;
      case 'landed':
        return styles.statusLanded;
      case 'delayed':
        return styles.statusDelayed;
      case 'cancelled':
        return styles.statusCancelled;
      default:
        return '';
    }
  };

  return (
    <div className={styles.flightBoard}>
      <div className={styles.header}>
        <h2>Flight Information Board</h2>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Flight</th>
              <th>Airline</th>
              <th>Origin/Dest</th>
              <th>Type</th>
              <th>Scheduled</th>
              <th>Actual</th>
              <th>Status</th>
              <th>Gate</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td className={styles.flightNumber}>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td>
                  {flight.type === 'arrival' ? flight.origin : flight.destination}
                </td>
                <td>
                  <span className={flight.type === 'arrival' ? styles.typeArrival : styles.typeDeparture}>
                    {flight.type === 'arrival' ? '↓ ARR' : '↑ DEP'}
                  </span>
                </td>
                <td>{flight.scheduledTime}</td>
                <td>{flight.actualTime || '-'}</td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusClass(flight.status)}`}>
                    {flight.status.toUpperCase()}
                  </span>
                </td>
                <td>{flight.gate || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

**Now you can use FlightBoard with OR without props:**

```tsx
// With props (explicit)
<FlightBoard flights={filteredFlights} />

// Without props (uses context)
<FlightBoard />
```

**What's happening:**
- Component can work with props OR context
- If props provided, use those
- If no props, fall back to context
- This pattern is called "flexible components"

---

## 📝 Step 7: Add a New Consumer Component

Let's prove context works by creating a new component that can access context anywhere.

**Create `src/StatusBar.tsx`:**

```tsx
import { useFlightContext } from './FlightContext';
import styles from './StatusBar.module.css';

export default function StatusBar() {
  const {
    totalFlights,
    activeFlights,
    flightFilter,
    emergencyMode,
  } = useFlightContext();

  return (
    <div className={styles.statusBar}>
      <div className={styles.item}>
        <span className={styles.label}>Flights:</span>
        <span className={styles.value}>{totalFlights}</span>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>Active:</span>
        <span className={styles.value}>{activeFlights}</span>
      </div>

      <div className={styles.item}>
        <span className={styles.label}>Filter:</span>
        <span className={styles.value}>
          {flightFilter === 'all' ? 'All' : flightFilter}
        </span>
      </div>

      {emergencyMode && (
        <div className={`${styles.item} ${styles.emergency}`}>
          <span className={styles.value}>🚨 EMERGENCY</span>
        </div>
      )}
    </div>
  );
}
```

**Create `src/StatusBar.module.css`:**

```css
.statusBar {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.label {
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
}

.value {
  color: #e5e7eb;
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
}

.emergency {
  animation: emergencyFlash 1s ease-in-out infinite;
}

@keyframes emergencyFlash {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

**Add StatusBar to the header in `src/App.tsx`:**

```tsx
import FlightBoard from './FlightBoard';
import RunwayStatus from './RunwayStatus';
import ControlPanel from './ControlPanel';
import StatusBar from './StatusBar';
import { useFlightContext } from './FlightContext';
import styles from './App.module.css';

export default function App() {
  const {
    filteredFlights,
    runways,
    emergencyMode,
  } = useFlightContext();

  return (
    <div className={`${styles.app} ${emergencyMode ? styles.emergencyMode : ''}`}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>✈️</div>
          <div className={styles.title}>
            <h1>Airport Traffic Control System</h1>
            <p className={styles.subtitle}>Schiphol International Airport</p>
          </div>
        </div>
        <StatusBar />
      </header>

      {/* ... rest of JSX */}
    </div>
  );
}
```

**Update `src/App.module.css` header styles:**

```css
.header {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
  padding-bottom: 1rem; /* Add space for StatusBar */
}

.headerContent {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem 0.5rem; /* Adjust bottom padding */
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
```

**What's happening:**
- Created a new component that wasn't in the original app
- It accesses context directly without any prop drilling
- Shows the power of Context API - any component can access shared state

**You should see:** A status bar in the header showing stats that update in real-time.

---

## ✅ Checkpoint: What You've Accomplished

- ✅ Created a Context with `createContext`
- ✅ Built a Provider component with state and logic
- ✅ Created a custom hook for accessing context
- ✅ Eliminated all prop drilling
- ✅ Refactored components to use `useContext`
- ✅ Added a new component that leverages context
- ✅ Maintained all existing functionality

---

## 🎓 Key Concepts Learned

### 1. Context API Pattern

```tsx
// 1. Create Context
const MyContext = createContext<Type | undefined>(undefined);

// 2. Create Provider
export function MyProvider({ children }) {
  const value = { /* state and functions */ };
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}

// 3. Create Custom Hook
export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) throw new Error('Must use within Provider');
  return context;
}

// 4. Use in Components
function MyComponent() {
  const { data, actions } = useMyContext();
  // ...
}
```

### 2. When to Use Context vs Props

**Use Props when:**
- Passing data 1-2 levels down
- Component is reusable and needs flexibility
- Data is specific to that component tree
- Performance is critical (props are faster)

**Use Context when:**
- Passing data 3+ levels deep
- Many components need the same data
- "Global" or "theme" data (user, auth, theme)
- Want to avoid prop drilling

### 3. Context Performance

Context causes re-renders in ALL consumers when value changes. To optimize:

```tsx
// Split contexts by update frequency
<AuthContext>
  <ThemeContext>
    <DataContext>
      <App />
    </DataContext>
  </ThemeContext>
</AuthContext>
```

---

## 🔄 Before vs After Comparison

### Before (Props)

```tsx
// App.tsx - lots of state and handlers
const [filter, setFilter] = useState('all');
const handleFilterArrivals = () => setFilter('arrival');
// ... many more handlers

<ControlPanel
  filter={filter}
  onFilterArrivals={handleFilterArrivals}
  // ... 10 props
/>

// ControlPanel.tsx - lots of props
interface Props {
  filter: string;
  onFilterArrivals: () => void;
  // ... 10 props
}
```

### After (Context)

```tsx
// App.tsx - clean!
const { filteredFlights, emergencyMode } = useFlightContext();

<ControlPanel />

// ControlPanel.tsx - no props!
export default function ControlPanel() {
  const { filter, filterArrivals } = useFlightContext();
  // ...
}
```

---

## 🚀 Next Steps

### Challenge 1: Split Contexts
- Create separate contexts for flights and runways
- Create a ThemeContext for emergency mode styling
- See how multiple contexts work together

### Challenge 2: Context with localStorage
- Save filter preference to localStorage
- Load it on app start
- Persist emergency mode state

### Challenge 3: Add More Global State
- Add user authentication context
- Add notification system context
- Create a settings context

---

## 🐛 Troubleshooting

### Problem: "useFlightContext must be used within a FlightProvider"

**Solution:** Make sure `<FlightProvider>` wraps your `<App />` in main.tsx:
```tsx
<FlightProvider>
  <App />
</FlightProvider>
```

### Problem: TypeScript errors about context being undefined

**Solution:** Check your custom hook has the error check:
```tsx
if (context === undefined) {
  throw new Error('...');
}
```

### Problem: Components not updating when context changes

**Solution:** Make sure you're destructuring values from context:
```tsx
// ✅ Correct
const { filter, setFilter } = useFlightContext();

// ❌ Wrong - won't re-render
const context = useFlightContext();
// later: context.filter
```

---

## 📚 Additional Resources

- [React Context Documentation](https://react.dev/reference/react/useContext)
- [You Might Not Need Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Context Performance Tips](https://react.dev/learn/scaling-up-with-reducer-and-context)

---

**Congratulations!** 🎉 You've successfully refactored your app to use Context API and eliminated prop drilling!
