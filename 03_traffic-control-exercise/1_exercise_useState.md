# Exercise 1: Implementing State Management with useState

**Estimated Time:** 45-60 minutes
**Difficulty:** Beginner to Intermediate
**Concepts:** useState, event handlers, conditional rendering, array filtering

## 🎯 Goal

Transform the static airport traffic control application into an interactive one by adding state management using React's `useState` hook. You'll implement filtering functionality and an emergency mode toggle.

## 📋 What You'll Learn

- How to use the `useState` hook
- How to handle user interactions (button clicks)
- How to filter arrays based on state
- How to pass callback functions as props
- How to conditionally render content based on state
- How to lift state up to parent components

## 🚀 Prerequisites

- The base traffic control application is set up and running
- Basic understanding of React components and props
- Familiarity with JavaScript array methods (filter, map)

---

## 📝 Step 1: Add Filter State to App Component

Currently, the App component displays all flights. Let's add state to track which filter is active.

**Open `src/App.tsx`**

### 1.1 Import useState

At the top of the file, import `useState` from React:

```tsx
import { useState } from 'react';
import FlightBoard from './FlightBoard';
import RunwayStatus from './RunwayStatus';
import ControlPanel from './ControlPanel';
import { mockFlights, mockRunways, FlightType } from './types';
import styles from './App.module.css';
```

### 1.2 Add State Variables

Inside the `App` component, add state for the filter and emergency mode:

```tsx
export default function App() {
  // State for filtering flights
  const [flightFilter, setFlightFilter] = useState<'all' | FlightType>('all');

  // State for emergency mode
  const [emergencyMode, setEmergencyMode] = useState(false);

  // Using mock data directly - no state management yet
  const flights = mockFlights;
  const runways = mockRunways;

  // ... rest of the component
```

**What's happening:**
- `flightFilter` stores the current filter: 'all', 'arrival', or 'departure'
- `setFlightFilter` is the function to update the filter
- `emergencyMode` is a boolean tracking emergency mode status
- `setEmergencyMode` toggles the emergency mode

**You should see:** No visual changes yet, but the app should still run without errors.

---

## 📝 Step 2: Filter Flights Based on State

Now let's use the filter state to show only relevant flights.

**Update the flight filtering logic in `src/App.tsx`:**

```tsx
export default function App() {
  const [flightFilter, setFlightFilter] = useState<'all' | FlightType>('all');
  const [emergencyMode, setEmergencyMode] = useState(false);

  const flights = mockFlights;
  const runways = mockRunways;

  // Filter flights based on current filter
  const filteredFlights = flightFilter === 'all'
    ? flights
    : flights.filter(flight => flight.type === flightFilter);

  // Calculate statistics using filtered flights
  const totalFlights = filteredFlights.length;
  const activeFlights = filteredFlights.filter(
    f => f.status === 'boarding' || f.status === 'departed'
  ).length;
  const availableRunways = runways.filter(r => r.status === 'available').length;

  return (
    // ... JSX remains the same for now
```

**What's happening:**
- `filteredFlights` uses a ternary operator to either show all flights or filter by type
- Statistics are calculated from filtered flights instead of all flights
- When filter is 'all', we show everything
- When filter is 'arrival' or 'departure', we only show matching flights

**You should see:** Still no visual changes, but filtering logic is in place.

---

## 📝 Step 3: Create Handler Functions

Let's create functions that will be called when users click buttons.

**Add these handler functions in `src/App.tsx` before the return statement:**

```tsx
export default function App() {
  const [flightFilter, setFlightFilter] = useState<'all' | FlightType>('all');
  const [emergencyMode, setEmergencyMode] = useState(false);

  const flights = mockFlights;
  const runways = mockRunways;

  const filteredFlights = flightFilter === 'all'
    ? flights
    : flights.filter(flight => flight.type === flightFilter);

  const totalFlights = filteredFlights.length;
  const activeFlights = filteredFlights.filter(
    f => f.status === 'boarding' || f.status === 'departed'
  ).length;
  const availableRunways = runways.filter(r => r.status === 'available').length;

  // Handler: Filter to show arrivals only
  const handleFilterArrivals = () => {
    setFlightFilter('arrival');
  };

  // Handler: Filter to show departures only
  const handleFilterDepartures = () => {
    setFlightFilter('departure');
  };

  // Handler: Clear filter and show all flights
  const handleClearFilter = () => {
    setFlightFilter('all');
  };

  // Handler: Toggle emergency mode
  const handleEmergency = () => {
    setEmergencyMode(!emergencyMode);
  };

  // Handler: Refresh data (placeholder for now)
  const handleRefresh = () => {
    console.log('Refresh clicked - data refreshed');
    // In a real app, this would fetch new data
  };

  return (
    <div className={styles.app}>
      {/* ... rest of JSX */}
```

**What's happening:**
- Each handler updates the appropriate state
- `handleFilterArrivals` sets filter to 'arrival'
- `handleFilterDepartures` sets filter to 'departure'
- `handleClearFilter` resets filter to 'all'
- `handleEmergency` toggles the boolean (if true → false, if false → true)

---

## 📝 Step 4: Update ControlPanel Props

Now we need to pass the handlers to the ControlPanel component.

### 4.1 Update ControlPanel Props Interface

**Open `src/ControlPanel.tsx` and update the interface:**

```tsx
import styles from './ControlPanel.module.css';

interface ControlPanelProps {
  totalFlights: number;
  activeFlights: number;
  availableRunways: number;
  onFilterArrivals: () => void;
  onFilterDepartures: () => void;
  onClearFilter: () => void;
  onRefresh: () => void;
  onEmergency: () => void;
  emergencyMode: boolean;
  currentFilter: 'all' | 'arrival' | 'departure';
}

export default function ControlPanel({
  totalFlights,
  activeFlights,
  availableRunways,
  onFilterArrivals,
  onFilterDepartures,
  onClearFilter,
  onRefresh,
  onEmergency,
  emergencyMode,
  currentFilter
}: ControlPanelProps) {
  // Component implementation below...
```

**What's happening:**
- Added callback props for each action
- Added `emergencyMode` boolean to show current state
- Added `currentFilter` to highlight the active filter

### 4.2 Update Button onClick Handlers

**Replace the placeholder handlers in `src/ControlPanel.tsx`:**

```tsx
export default function ControlPanel({
  totalFlights,
  activeFlights,
  availableRunways,
  onFilterArrivals,
  onFilterDepartures,
  onClearFilter,
  onRefresh,
  onEmergency,
  emergencyMode,
  currentFilter
}: ControlPanelProps) {
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
              currentFilter === 'arrival' ? styles.buttonActive : ''
            }`}
            onClick={onFilterArrivals}
          >
            📥 Arrivals Only
          </button>
          <button
            className={`${styles.button} ${styles.buttonPrimary} ${
              currentFilter === 'departure' ? styles.buttonActive : ''
            }`}
            onClick={onFilterDepartures}
          >
            📤 Departures Only
          </button>
          <button
            className={`${styles.button} ${styles.buttonSecondary} ${
              currentFilter === 'all' ? styles.buttonActive : ''
            }`}
            onClick={onClearFilter}
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
            onClick={onRefresh}
          >
            🔄 Refresh Data
          </button>
          <button
            className={`${styles.button} ${styles.buttonDanger} ${
              emergencyMode ? styles.buttonEmergencyActive : ''
            }`}
            onClick={onEmergency}
          >
            {emergencyMode ? '✅ Deactivate Emergency' : '🚨 Emergency Mode'}
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className={styles.infoBox}>
        <div className={styles.infoIcon}>ℹ️</div>
        <div className={styles.infoText}>
          <strong>Current Filter:</strong> {currentFilter === 'all' ? 'All Flights' : currentFilter === 'arrival' ? 'Arrivals' : 'Departures'}
        </div>
      </div>
    </div>
  );
}
```

**What's happening:**
- Buttons now call the passed-in handler functions
- Active filter buttons get highlighted with `buttonActive` class
- Emergency banner appears when `emergencyMode` is true
- Emergency button text changes based on mode
- Info box shows current filter

---

## 📝 Step 5: Add Styles for Active States

**Add these styles to `src/ControlPanel.module.css`:**

```css
/* Add at the end of the file */

.buttonActive {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  transform: translateY(-2px);
}

.buttonEmergencyActive {
  animation: emergencyActive 1s ease-in-out infinite;
}

@keyframes emergencyActive {
  0%, 100% {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  50% {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 0 20px 10px rgba(239, 68, 68, 0);
  }
}

.emergencyBanner {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: 700;
  font-size: 1.125rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  animation: emergencyPulse 1s ease-in-out infinite;
  letter-spacing: 2px;
}

@keyframes emergencyPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}
```

**What's happening:**
- Active buttons get a blue glow effect
- Emergency button pulses when active
- Emergency banner has a pulsing animation

---

## 📝 Step 6: Pass Props from App to ControlPanel

**Update the ControlPanel usage in `src/App.tsx`:**

```tsx
export default function App() {
  // ... state and handlers from Step 2 and Step 3

  return (
    <div className={styles.app}>
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
            <ControlPanel
              totalFlights={totalFlights}
              activeFlights={activeFlights}
              availableRunways={availableRunways}
              onFilterArrivals={handleFilterArrivals}
              onFilterDepartures={handleFilterDepartures}
              onClearFilter={handleClearFilter}
              onRefresh={handleRefresh}
              onEmergency={handleEmergency}
              emergencyMode={emergencyMode}
              currentFilter={flightFilter}
            />
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
- All handler functions are passed to ControlPanel
- State values (emergencyMode, flightFilter) are passed down
- FlightBoard and RunwayStatus receive `filteredFlights` instead of all flights

---

## 📝 Step 7: Test the Application

Now test all the functionality:

### Test Filter Buttons

1. **Click "📥 Arrivals Only"**
   - Flight board should show only arrivals (KL1234, AF321)
   - Total flights count should update to 2
   - Button should have blue glow

2. **Click "📤 Departures Only"**
   - Flight board should show only departures (BA456, LH789, EK654)
   - Total flights count should update to 3
   - Button should have blue glow

3. **Click "✖ Clear Filter"**
   - All 5 flights should appear
   - Total flights count should be 5

### Test Emergency Mode

1. **Click "🚨 Emergency Mode"**
   - Red banner appears at top of control panel
   - Button changes to "✅ Deactivate Emergency"
   - Button has pulsing animation

2. **Click "✅ Deactivate Emergency"**
   - Banner disappears
   - Button returns to "🚨 Emergency Mode"

### Test Refresh Button

1. **Click "🔄 Refresh Data"**
   - Check browser console for "Refresh clicked" message
   - Application continues working normally

---

## 📝 Step 8: Add Visual Feedback for Emergency Mode (Optional Enhancement)

Let's make the entire app reflect emergency mode.

**Update `src/App.tsx` to add emergency styling:**

```tsx
return (
  <div className={`${styles.app} ${emergencyMode ? styles.emergencyMode : ''}`}>
    {/* ... rest of JSX */}
  </div>
);
```

**Add to `src/App.module.css`:**

```css
/* Add at the end of the file */

.app.emergencyMode {
  animation: emergencyBackground 2s ease-in-out infinite;
}

@keyframes emergencyBackground {
  0%, 100% {
    background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  }
  50% {
    background: linear-gradient(180deg, #1e1510 0%, #2d1a1f 100%);
  }
}
```

**You should see:** When emergency mode is active, the background subtly pulses with a reddish tint.

---

## ✅ Checkpoint: What You've Accomplished

- ✅ Added `useState` hooks to manage filter and emergency mode
- ✅ Created event handler functions
- ✅ Implemented array filtering based on state
- ✅ Passed callbacks down through props
- ✅ Added visual feedback for active states
- ✅ Made buttons fully functional

---

## 🎓 Key Concepts Learned

### 1. useState Hook

```tsx
const [state, setState] = useState(initialValue);
```

- `state` is the current value
- `setState` is the function to update it
- `initialValue` is the starting value

### 2. Event Handlers

```tsx
const handleClick = () => {
  setState(newValue);
};

<button onClick={handleClick}>Click Me</button>
```

- Functions passed to onClick props
- Update state when triggered
- Cause component re-renders

### 3. Conditional Rendering

```tsx
{condition && <Component />}
{condition ? <ComponentA /> : <ComponentB />}
```

- Show/hide elements based on state
- Ternary operator for either/or scenarios

### 4. Lifting State Up

- State lives in parent component (App)
- Passed down as props to children
- Children call parent's functions to update state
- Enables sibling components to share data

### 5. Array Filtering

```tsx
const filtered = array.filter(item => condition);
```

- Creates new array with matching items
- Doesn't modify original array
- Perfect for conditional rendering

---

## 🚀 Next Steps

You've successfully added state management! Here are some ideas to extend this:

### Challenge 1: Add More Filters
- Add filter by status (delayed, boarding, etc.)
- Combine multiple filters

### Challenge 2: Add Search
- Add text input to search by flight number
- Filter flights by airline

### Challenge 3: Sort Functionality
- Add buttons to sort by scheduled time
- Sort by airline name alphabetically

### Challenge 4: Runway Selection
- Click on a runway card to highlight it
- Show which flights are assigned to selected runway

---

## 🐛 Troubleshooting

### Problem: TypeScript errors about props

**Solution:** Make sure you imported `FlightType` from types:
```tsx
import { mockFlights, mockRunways, FlightType } from './types';
```

### Problem: Buttons don't respond

**Solution:** Check that:
1. Handlers are defined in App component
2. Handlers are passed to ControlPanel
3. ControlPanel is calling the props (not the old placeholder functions)

### Problem: Filter doesn't work

**Solution:** Make sure you're passing `filteredFlights` to FlightBoard, not `flights`:
```tsx
<FlightBoard flights={filteredFlights} />
```

---

## 📚 Additional Resources

- [React useState Hook Documentation](https://react.dev/reference/react/useState)
- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [Managing State](https://react.dev/learn/managing-state)

---

**Congratulations!** 🎉 You've successfully implemented state management with useState. Your airport traffic control app is now interactive!
