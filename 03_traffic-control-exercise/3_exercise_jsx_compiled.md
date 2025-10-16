# Exercise 3: Understanding JSX Compilation

**Estimated Time:** 45-60 minutes
**Difficulty:** Intermediate
**Concepts:** JSX compilation, React.createElement, JSX syntax sugar, JavaScript fundamentals

## 🎯 Goal

Understand that JSX is just syntactic sugar for JavaScript function calls. You'll work with a pre-compiled component, see how JSX transforms to JavaScript, interact with regular components, and modify the compiled version to prove it's just JavaScript.

## 📋 What You'll Learn

- How JSX compiles to JavaScript
- What `React.createElement` actually does
- Why JSX makes React code more readable
- How to write React without JSX (and why you wouldn't want to!)
- That props, children, and components are just JavaScript objects and functions
- How compiled code interacts seamlessly with JSX components

## 🚀 Prerequisites

- Complete Exercise 1 (useState) - your app should have working state
- Basic understanding of JavaScript functions and objects
- Understanding that functions can return other functions/objects

## 🤔 The Core Concept

When you write:

```jsx
<div className="container">
  <h1>Hello</h1>
</div>
```

Babel/TypeScript compiles it to:

```javascript
React.createElement('div', { className: 'container' },
  React.createElement('h1', null, 'Hello')
)
```

**It's all JavaScript!** JSX is just prettier syntax.

---

## 📝 Step 1: Create a JSX Component First

Let's create a component in JSX that we'll then see compiled.

**Create `src/FlightAlert.jsx` (note: .jsx extension):**

```jsx
import { useState } from 'react';
import styles from './FlightAlert.module.css';

export default function FlightAlert({ flights }) {
  const [dismissed, setDismissed] = useState(false);

  const delayedFlights = flights.filter(f => f.status === 'delayed');

  if (dismissed || delayedFlights.length === 0) {
    return null;
  }

  return (
    <div className={styles.alert}>
      <div className={styles.icon}>⚠️</div>
      <div className={styles.content}>
        <h3 className={styles.title}>Flight Delays</h3>
        <p className={styles.message}>
          {delayedFlights.length} flight{delayedFlights.length > 1 ? 's' : ''} delayed
        </p>
        <ul className={styles.list}>
          {delayedFlights.map(flight => (
            <li key={flight.id}>
              {flight.flightNumber} - {flight.airline}
            </li>
          ))}
        </ul>
      </div>
      <button
        className={styles.dismissButton}
        onClick={() => setDismissed(true)}
      >
        ✖
      </button>
    </div>
  );
}
```

**Create `src/FlightAlert.module.css`:**

```css
.alert {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.25rem;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 88, 12, 0.15) 100%);
  border: 2px solid rgba(249, 115, 22, 0.5);
  border-radius: 10px;
  position: relative;
  animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.content {
  flex: 1;
}

.title {
  color: #fdba74;
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.message {
  color: #fed7aa;
  font-size: 0.95rem;
  margin: 0 0 0.75rem 0;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #fef3c7;
  font-size: 0.875rem;
}

.list li {
  padding: 0.25rem 0;
  font-family: 'Courier New', monospace;
}

.dismissButton {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(249, 115, 22, 0.3);
  color: #fdba74;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.dismissButton:hover {
  background: rgba(0, 0, 0, 0.4);
  border-color: rgba(249, 115, 22, 0.6);
  transform: scale(1.1);
}
```

**Add FlightAlert to `src/App.tsx`:**

```tsx
import FlightBoard from './FlightBoard';
import RunwayStatus from './RunwayStatus';
import ControlPanel from './ControlPanel';
import FlightAlert from './FlightAlert';
import { mockFlights, mockRunways } from './types';
import styles from './App.module.css';

export default function App() {
  // ... your existing state and handlers

  const filteredFlights = /* ... your filtering logic */;

  return (
    <div className={styles.app}>
      {/* ... header */}

      <main className={styles.main}>
        {/* Add alert at the top */}
        <FlightAlert flights={filteredFlights} />

        <div className={styles.topSection}>
          {/* ... rest of your components */}
        </div>
      </main>
    </div>
  );
}
```

**You should see:** An alert showing delayed flights (AF321 from the mock data).

---

## 📝 Step 2: See the Compiled Version

Now let's see what this JSX actually compiles to!

**Create `src/FlightAlert.compiled.js` (note: .js extension):**

```javascript
import { useState, createElement } from 'react';
import styles from './FlightAlert.module.css';

export default function FlightAlertCompiled({ flights }) {
  const [dismissed, setDismissed] = useState(false);

  const delayedFlights = flights.filter(f => f.status === 'delayed');

  if (dismissed || delayedFlights.length === 0) {
    return null;
  }

  // This is what your JSX compiles to!
  return createElement(
    'div',
    { className: styles.alert },
    // Child 1: Icon
    createElement('div', { className: styles.icon }, '⚠️'),
    // Child 2: Content div
    createElement(
      'div',
      { className: styles.content },
      // Nested children in content
      createElement('h3', { className: styles.title }, 'Flight Delays'),
      createElement(
        'p',
        { className: styles.message },
        delayedFlights.length,
        ' flight',
        delayedFlights.length > 1 ? 's' : '',
        ' delayed'
      ),
      createElement(
        'ul',
        { className: styles.list },
        // Map over delayed flights
        delayedFlights.map(flight =>
          createElement(
            'li',
            { key: flight.id },
            flight.flightNumber,
            ' - ',
            flight.airline
          )
        )
      )
    ),
    // Child 3: Button
    createElement(
      'button',
      {
        className: styles.dismissButton,
        onClick: () => setDismissed(true)
      },
      '✖'
    )
  );
}
```

**Compare the two files side by side:**

| JSX Version | Compiled Version |
|------------|------------------|
| `<div className={styles.alert}>` | `createElement('div', { className: styles.alert },` |
| `<h3>{text}</h3>` | `createElement('h3', null, text)` |
| `<button onClick={handler}>` | `createElement('button', { onClick: handler },` |

**You should see:** The compiled version is just JavaScript function calls!

---

## 📝 Step 3: Use the Compiled Component

Let's prove the compiled version works exactly the same.

**Update `src/App.tsx` to use compiled version:**

```tsx
import FlightBoard from './FlightBoard';
import RunwayStatus from './RunwayStatus';
import ControlPanel from './ControlPanel';
// import FlightAlert from './FlightAlert';  // Comment out JSX version
import FlightAlert from './FlightAlert.compiled';  // Use compiled version
import { mockFlights, mockRunways } from './types';
import styles from './App.module.css';

// ... rest of your App component stays the same
```

**You should see:** EXACT same result! The alert looks and behaves identically.

**What this proves:**
- JSX is just syntactic sugar
- Compiled JavaScript is what actually runs
- React doesn't care if you use JSX or `createElement`

---

## 📝 Step 4: Modify the Compiled Version

Now let's modify the compiled component to prove we understand how it works.

### Task 4.1: Change the Icon

**In `src/FlightAlert.compiled.js`, change the icon:**

```javascript
// Before
createElement('div', { className: styles.icon }, '⚠️'),

// After - add a spinning animation
createElement('div', {
  className: styles.icon,
  style: { animation: 'spin 3s linear infinite' }
}, '🚨'),
```

**Add the spin animation to `src/FlightAlert.module.css`:**

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**You should see:** The alert icon is now a spinning 🚨.

### Task 4.2: Add a New Child Element

Let's add a timestamp to show when the alert appeared.

**In `src/FlightAlert.compiled.js`, add a fourth child:**

```javascript
return createElement(
  'div',
  { className: styles.alert },
  createElement('div', { className: styles.icon, style: { animation: 'spin 3s linear infinite' } }, '🚨'),
  createElement(
    'div',
    { className: styles.content },
    createElement('h3', { className: styles.title }, 'Flight Delays'),
    createElement(
      'p',
      { className: styles.message },
      delayedFlights.length,
      ' flight',
      delayedFlights.length > 1 ? 's' : '',
      ' delayed'
    ),
    // NEW: Add timestamp
    createElement(
      'p',
      {
        style: {
          color: '#fef3c7',
          fontSize: '0.75rem',
          marginTop: '0.5rem',
          opacity: 0.7
        }
      },
      '⏰ Alert issued: ',
      new Date().toLocaleTimeString()
    ),
    createElement(
      'ul',
      { className: styles.list },
      delayedFlights.map(flight =>
        createElement(
          'li',
          { key: flight.id },
          flight.flightNumber,
          ' - ',
          flight.airline
        )
      )
    )
  ),
  createElement(
    'button',
    {
      className: styles.dismissButton,
      onClick: () => setDismissed(true)
    },
    '✖'
  )
);
```

**You should see:** A timestamp showing when the alert was created.

---

## 📝 Step 5: createElement Deep Dive

Let's understand the signature of `createElement`:

```javascript
React.createElement(
  type,        // String ('div') or Component (MyComponent)
  props,       // Object with props (or null)
  ...children  // Any number of children
)
```

### Examples:

```javascript
// Simple element with no props
createElement('div', null, 'Hello')
// <div>Hello</div>

// Element with props
createElement('div', { className: 'box' }, 'Hello')
// <div className="box">Hello</div>

// Element with multiple children
createElement('div', null,
  'Text',
  createElement('span', null, 'More text')
)
// <div>Text<span>More text</span></div>

// Component (not HTML element)
createElement(MyComponent, { prop1: 'value' }, 'Children')
// <MyComponent prop1="value">Children</MyComponent>
```

---

## 📝 Step 6: Create a New Component Without JSX

Let's create a completely new component using only JavaScript.

**Create `src/QuickStats.compiled.js`:**

```javascript
import { createElement } from 'react';

export default function QuickStats({ flights, runways }) {
  // Calculate stats
  const totalFlights = flights.length;
  const departures = flights.filter(f => f.type === 'departure').length;
  const arrivals = flights.filter(f => f.type === 'arrival').length;
  const availableRunways = runways.filter(r => r.status === 'available').length;
  const occupiedRunways = runways.filter(r => r.status === 'occupied').length;

  // Styles as JavaScript objects
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1rem',
    padding: '1rem',
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
    marginBottom: '1rem'
  };

  const statBoxStyle = {
    textAlign: 'center',
    padding: '0.75rem',
    background: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '6px',
    border: '1px solid rgba(59, 130, 246, 0.3)'
  };

  const labelStyle = {
    color: '#93c5fd',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    marginBottom: '0.5rem'
  };

  const valueStyle = {
    color: '#e5e7eb',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: "'Courier New', monospace"
  };

  // Build the component tree with createElement
  return createElement(
    'div',
    { style: containerStyle },
    // Stat 1: Total Flights
    createElement(
      'div',
      { style: statBoxStyle },
      createElement('div', { style: labelStyle }, 'Total'),
      createElement('div', { style: valueStyle }, totalFlights)
    ),
    // Stat 2: Departures
    createElement(
      'div',
      { style: statBoxStyle },
      createElement('div', { style: labelStyle }, '📤 Departures'),
      createElement('div', { style: valueStyle }, departures)
    ),
    // Stat 3: Arrivals
    createElement(
      'div',
      { style: statBoxStyle },
      createElement('div', { style: labelStyle }, '📥 Arrivals'),
      createElement('div', { style: valueStyle }, arrivals)
    ),
    // Stat 4: Available Runways
    createElement(
      'div',
      { style: statBoxStyle },
      createElement('div', { style: labelStyle }, '🟢 Available'),
      createElement('div', { style: valueStyle }, availableRunways)
    ),
    // Stat 5: Occupied Runways
    createElement(
      'div',
      { style: statBoxStyle },
      createElement('div', { style: labelStyle }, '🔴 Occupied'),
      createElement('div', { style: valueStyle }, occupiedRunways)
    )
  );
}
```

**Add QuickStats to `src/App.tsx`:**

```tsx
import FlightBoard from './FlightBoard';
import RunwayStatus from './RunwayStatus';
import ControlPanel from './ControlPanel';
import FlightAlert from './FlightAlert.compiled';
import QuickStats from './QuickStats.compiled';  // No JSX!
import { mockFlights, mockRunways } from './types';
import styles from './App.module.css';

export default function App() {
  // ... state and filtering logic

  return (
    <div className={styles.app}>
      {/* ... header */}

      <main className={styles.main}>
        <FlightAlert flights={filteredFlights} />

        {/* NEW: Add QuickStats - works perfectly with JSX components! */}
        <QuickStats flights={filteredFlights} runways={runways} />

        <div className={styles.topSection}>
          {/* ... rest */}
        </div>
      </main>
    </div>
  );
}
```

**You should see:** A stats grid showing flight and runway statistics!

**What this proves:**
- Components written with `createElement` work with JSX components
- React doesn't care about the syntax - it's all JavaScript
- Props, children, and events work identically

---

## 📝 Step 7: Convert JSX to Compiled (Practice)

Now you try! Convert this JSX to `createElement`:

**Challenge JSX:**

```jsx
function WelcomeMessage({ username, isAdmin }) {
  return (
    <div className="welcome">
      <h1>Welcome, {username}!</h1>
      {isAdmin && <span className="badge">Admin</span>}
      <button onClick={() => console.log('Clicked')}>
        Get Started
      </button>
    </div>
  );
}
```

**Your Answer (try before looking):**

<details>
<summary>Click to see solution</summary>

```javascript
import { createElement } from 'react';

function WelcomeMessage({ username, isAdmin }) {
  return createElement(
    'div',
    { className: 'welcome' },
    createElement('h1', null, 'Welcome, ', username, '!'),
    isAdmin && createElement('span', { className: 'badge' }, 'Admin'),
    createElement(
      'button',
      { onClick: () => console.log('Clicked') },
      'Get Started'
    )
  );
}
```

**Key points:**
- Conditional rendering (`{isAdmin && <span>}`) becomes JavaScript conditional
- Text interpolation (`{username}`) becomes function arguments
- Event handlers work the same
- className is just a prop

</details>

---

## 📝 Step 8: Interactive Compiled Component

Let's create a fully interactive component without JSX to prove state and events work.

**Create `src/FlightCounter.compiled.js`:**

```javascript
import { useState, createElement } from 'react';

export default function FlightCounter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);

  const containerStyle = {
    padding: '1.5rem',
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.15))',
    border: '2px solid rgba(34, 197, 94, 0.5)',
    borderRadius: '10px',
    textAlign: 'center',
    marginBottom: '1rem'
  };

  const titleStyle = {
    color: '#86efac',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  };

  const counterStyle = {
    color: '#e5e7eb',
    fontSize: '3rem',
    fontWeight: 'bold',
    fontFamily: "'Courier New', monospace",
    margin: '1rem 0'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center'
  };

  const buttonStyle = {
    padding: '0.5rem 1.5rem',
    background: 'rgba(34, 197, 94, 0.3)',
    border: '1px solid rgba(34, 197, 94, 0.5)',
    borderRadius: '6px',
    color: '#86efac',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  return createElement(
    'div',
    { style: containerStyle },
    // Title
    createElement('div', { style: titleStyle }, '✈️ Flight Counter'),
    // Counter display
    createElement('div', { style: counterStyle }, count),
    // Buttons
    createElement(
      'div',
      { style: buttonContainerStyle },
      // Decrement button
      createElement(
        'button',
        {
          style: buttonStyle,
          onClick: () => setCount(count - 1),
          onMouseEnter: (e) => {
            e.target.style.background = 'rgba(34, 197, 94, 0.5)';
            e.target.style.transform = 'scale(1.05)';
          },
          onMouseLeave: (e) => {
            e.target.style.background = 'rgba(34, 197, 94, 0.3)';
            e.target.style.transform = 'scale(1)';
          }
        },
        '➖ Decrease'
      ),
      // Reset button
      createElement(
        'button',
        {
          style: buttonStyle,
          onClick: () => setCount(initialCount)
        },
        '🔄 Reset'
      ),
      // Increment button
      createElement(
        'button',
        {
          style: buttonStyle,
          onClick: () => setCount(count + 1),
          onMouseEnter: (e) => {
            e.target.style.background = 'rgba(34, 197, 94, 0.5)';
            e.target.style.transform = 'scale(1.05)';
          },
          onMouseLeave: (e) => {
            e.target.style.background = 'rgba(34, 197, 94, 0.3)';
            e.target.style.transform = 'scale(1)';
          }
        },
        '➕ Increase'
      )
    )
  );
}
```

**Add to `src/App.tsx`:**

```tsx
import FlightCounter from './FlightCounter.compiled';

// In your render:
<main className={styles.main}>
  <FlightAlert flights={filteredFlights} />
  <QuickStats flights={filteredFlights} runways={runways} />
  <FlightCounter initialCount={filteredFlights.length} />
  {/* ... rest */}
</main>
```

**You should see:** A fully interactive counter with hover effects and state management!

**Test it:**
1. Click ➕ Increase - count goes up
2. Click ➖ Decrease - count goes down
3. Click 🔄 Reset - count returns to initial value
4. Hover over buttons - they change appearance

**What this proves:**
- State works identically in compiled components
- Event handlers work the same
- Hover effects and inline event handlers work
- React re-renders work properly

---

## ✅ Checkpoint: What You've Accomplished

- ✅ Saw how JSX compiles to `createElement` calls
- ✅ Used a pre-compiled component
- ✅ Modified compiled code to add features
- ✅ Created new components without JSX
- ✅ Proved compiled components integrate seamlessly
- ✅ Understood that JSX is just JavaScript

---

## 🎓 Key Concepts Learned

### 1. JSX is Syntactic Sugar

```jsx
// This JSX...
<div className="box">
  <h1>Title</h1>
  <p>Text</p>
</div>

// ...is exactly the same as this JavaScript:
createElement('div', { className: 'box' },
  createElement('h1', null, 'Title'),
  createElement('p', null, 'Text')
)
```

### 2. createElement Signature

```javascript
React.createElement(
  type,        // 'div', 'span', or Component
  props,       // Object or null
  ...children  // Any number of children
)
```

### 3. Everything is JavaScript

- Components are functions
- Props are objects
- Children are arrays/arguments
- Events are functions
- JSX is compiled before runtime

### 4. Why We Use JSX

**Without JSX:**
```javascript
createElement('div', null,
  createElement('header', null,
    createElement('nav', null,
      createElement('ul', null,
        createElement('li', null, 'Home'),
        createElement('li', null, 'About')
      )
    )
  )
)
```

**With JSX:**
```jsx
<div>
  <header>
    <nav>
      <ul>
        <li>Home</li>
        <li>About</li>
      </ul>
    </nav>
  </header>
</div>
```

JSX is:
- More readable
- Easier to write
- Visually represents the structure
- Catches errors at compile time

---

## 🔍 Behind the Scenes

### What Happens at Build Time

1. **You write JSX:**
   ```jsx
   <button onClick={handleClick}>Click me</button>
   ```

2. **Babel/TypeScript transforms it:**
   ```javascript
   createElement('button', { onClick: handleClick }, 'Click me')
   ```

3. **React creates a JavaScript object:**
   ```javascript
   {
     type: 'button',
     props: {
       onClick: handleClick,
       children: 'Click me'
     }
   }
   ```

4. **React uses this object to:**
   - Create/update DOM elements
   - Track changes
   - Trigger re-renders

---

## 🚀 Next Steps

### Challenge 1: Fully Compiled Component
Create a complete feature using only `createElement`:
- Add a search bar (input element)
- Filter flights based on search term
- Show/hide results
- Include clear button

### Challenge 2: Mixed Approach
- Create one component with JSX
- Create its child with `createElement`
- Show they work together seamlessly

### Challenge 3: Performance Investigation
- Compare bundle size with JSX vs compiled
- Check rendering performance
- Understand why JSX doesn't affect runtime performance

---

## 🐛 Troubleshooting

### Problem: "createElement is not defined"

**Solution:** Import it from React:
```javascript
import { createElement } from 'react';
```

### Problem: Children don't render

**Solution:** Check you're passing children as separate arguments:
```javascript
// ✅ Correct
createElement('div', null, 'Child1', 'Child2')

// ❌ Wrong
createElement('div', null, ['Child1', 'Child2'])
```

### Problem: Inline styles don't work

**Solution:** Pass style as an object:
```javascript
// ✅ Correct
createElement('div', { style: { color: 'red' } })

// ❌ Wrong
createElement('div', { style: 'color: red' })
```

---

## 📚 Additional Resources

- [JSX In Depth](https://react.dev/learn/writing-markup-with-jsx)
- [React Without JSX](https://react.dev/reference/react/createElement)
- [Babel REPL](https://babeljs.io/repl) - See JSX compilation live

---

**Congratulations!** 🎉 You now understand that JSX is just JavaScript, and you can work with React at a lower level!
