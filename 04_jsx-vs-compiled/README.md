# JSX vs Compiled JavaScript

This project demonstrates the difference between JSX syntax and its compiled JavaScript output using React's `_jsx` and `_jsxs` functions.

## Getting Started

```bash
npm install
npm run dev
```

The dev server will automatically open at http://localhost:5173

## Project Structure

- **Button.tsx** - Component written in JSX syntax
- **UserForm.tsx** - Component written using compiled `_jsxs()` and `_jsx()` functions
- **App.tsx** - Main application showcasing both approaches

## Key Concepts

### JSX Syntax
JSX allows you to write HTML-like syntax in JavaScript, which gets compiled to function calls.

### Compiled Output
The `_jsx` and `_jsxs` functions are what JSX compiles to:
- `_jsx()` - For single child or self-closing elements
- `_jsxs()` - For elements with multiple children

## Step-by-Step Exercise Instructions

### Part 1: Modifying the _jsxs Component (UserForm.tsx)

**Goal:** Add a new paragraph with a prop to see how compiled JSX handles props and rendering.

1. Open `src/UserForm.tsx` in your editor
2. Find the success message section (around line 75, the second child in the main return)
3. Add a new paragraph after the email confirmation. Add this code after the email `_jsxs('p', ...)` block:

```typescript
_jsx('p', {
  className: 'registration-id',
  children: ['Registration ID: ', _jsx('code', { children: `USER-${Date.now()}` })]
})
```

4. Save the file and observe the browser update
5. Notice how:
   - The `className` prop is passed as an object property
   - The `children` is an array containing text and a nested `_jsx()` call
   - Props are always passed as the second argument

6. **Optional:** Add a custom prop by modifying the code:

```typescript
_jsx('p', {
  className: 'registration-id',
  'data-testid': 'user-id',
  style: { fontSize: '14px', color: '#666' },
  children: ['Registration ID: ', _jsx('code', { children: `USER-${Date.now()}` })]
})
```

### Part 2: Modifying the JSX Component (Button.tsx)

**Goal:** Add a new prop to the Button component and see how it propagates through both JSX and _jsxs usage.

1. Open `src/Button.tsx` in your editor
2. Add a new optional prop to the interface:

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  icon?: string; // NEW: Add this line
}
```

3. Update the component to use the new prop:

```typescript
export function Button({ label, onClick, variant = 'primary', disabled = false, icon }: ButtonProps) {
  return (
    <button
      className={`button button-${variant}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {icon && <span className="button-icon">{icon}</span>}
      {label}
    </button>
  );
}
```

4. Add CSS for the icon in `src/Button.css`:

```css
.button-icon {
  margin-right: 8px;
}
```

5. Now update `src/UserForm.tsx` to pass the icon prop using `_jsx()`:

Find the Submit button (around line 69) and change:
```typescript
_jsx(Button, {
  label: 'Submit',
  onClick: handleSubmit,
  variant: 'primary',
  disabled: !name || !email
})
```

To:
```typescript
_jsx(Button, {
  label: 'Submit',
  onClick: handleSubmit,
  variant: 'primary',
  disabled: !name || !email,
  icon: '✓' // NEW: Add this line
})
```

6. Save and observe how the JSX component receives the prop through the compiled `_jsx()` call

### Part 3: Adding a New Component to See the Interaction

**Goal:** Create a small JSX component and use it within the _jsxs UserForm.

1. Create a new file `src/Badge.tsx`:

```typescript
interface BadgeProps {
  text: string;
  color?: 'blue' | 'green' | 'yellow';
}

export function Badge({ text, color = 'blue' }: BadgeProps) {
  return (
    <span className={`badge badge-${color}`}>
      {text}
    </span>
  );
}
```

2. Add styles in `src/Badge.css`:

```css
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
}

.badge-blue {
  background-color: #e3f2fd;
  color: #1976d2;
}

.badge-green {
  background-color: #e8f5e9;
  color: #388e3c;
}

.badge-yellow {
  background-color: #fff9c4;
  color: #f57c00;
}
```

3. Import the Badge in `src/UserForm.tsx`:

```typescript
import { Badge } from './Badge';
import './Badge.css';
```

4. Use the Badge in the success message heading using `_jsxs()` (around line 76):

Change:
```typescript
_jsx('h3', {
  children: 'Registration Successful!'
})
```

To:
```typescript
_jsxs('h3', {
  children: [
    'Registration Successful!',
    _jsx(Badge, { text: 'NEW', color: 'green' })
  ]
})
```

5. Save and see how a JSX component (Badge) is called from compiled code using `_jsx(Badge, props)`

## Debugging with Browser DevTools

This project is configured with sourcemaps and unminified builds for easy debugging during development.

### Opening DevTools

1. **Chrome/Edge:** Press `F12` or `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
2. **Firefox:** Press `F12` or `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
3. **Safari:** Press `Cmd+Option+I` (enable Developer menu in Preferences first)

### Inspecting the Component Structure

**Step 1: Elements/Inspector Tab**
1. Open DevTools and go to the **Elements** (Chrome) or **Inspector** (Firefox) tab
2. Click the "Select Element" tool (top-left corner icon)
3. Hover over the form elements to see the component hierarchy
4. Notice:
   - The Button component renders as a `<button>` element
   - The UserForm structure matches the `_jsxs()` calls
   - CSS classes are applied correctly

**Step 2: Sources Tab - View Original Code**
1. Go to the **Sources** tab
2. Navigate to `localhost:5173` → `src` folder
3. Open `UserForm.tsx` - you'll see the original `_jsxs()` code with line numbers
4. Open `Button.tsx` - you'll see the original JSX code
5. Set breakpoints by clicking on line numbers

**Step 3: Console Tab - Inspecting Props**
1. Go to the **Console** tab
2. Add a console.log in `UserForm.tsx` before the return statement:

```typescript
console.log('UserForm state:', { name, email, submitted });
```

3. Add a console.log in `Button.tsx`:

```typescript
export function Button({ label, onClick, variant = 'primary', disabled = false, icon }: ButtonProps) {
  console.log('Button props:', { label, variant, disabled, icon });
  return (
    // ... rest of code
```

4. Interact with the form and watch the console output

**Step 4: React DevTools Extension**

For the best React debugging experience, install React DevTools:
- [Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

Once installed:
1. Open DevTools and find the **Components** tab
2. Inspect the component tree: `App` → `UserForm` → `Button`
3. Click on components to see their props and state in real-time
4. Edit props/state directly to test behavior

**Step 5: Network Tab - Understanding Build Output**
1. Go to the **Network** tab
2. Refresh the page (`Cmd/Ctrl + R`)
3. Filter by "JS" to see JavaScript files
4. Click on `UserForm.tsx` to see how it's served by Vite
5. Notice Vite serves the original TypeScript with inline sourcemaps

**Step 6: Debugging with Breakpoints**
1. In **Sources** tab, open `src/UserForm.tsx`
2. Set a breakpoint on the line with `_jsx(Button, { ... })`
3. Click the Submit button in the app
4. Execution will pause at your breakpoint
5. Hover over variables to inspect their values
6. Use the debugger controls:
   - **Step Over** (F10) - Execute current line
   - **Step Into** (F11) - Enter function calls
   - **Step Out** (Shift+F11) - Exit current function
   - **Resume** (F8) - Continue execution

### Key Observations During Debugging

**What to Look For:**

1. **Component Rendering:** Watch the Elements tab update as you interact with the form
2. **Props Flow:** See how props pass from `_jsx(Button, props)` to the actual Button component
3. **State Updates:** Observe state changes in React DevTools Components tab
4. **Re-renders:** Count how many times components re-render (add console.logs)
5. **Event Handlers:** Set breakpoints in `onClick` handlers to trace execution

**Common Debugging Tasks:**

- **"Why isn't my component updating?"** → Check state in React DevTools
- **"What props is this component receiving?"** → Set breakpoint, inspect props object
- **"How many times is this rendering?"** → Add console.log with component name
- **"Which component is triggering this?"** → Use call stack in Sources debugger
- **"What's the component hierarchy?"** → Use React DevTools Components tab

## Exercise Goals

1. Compare JSX syntax with its compiled equivalent
2. Understand how React transforms JSX under the hood
3. See how both approaches work together in a real application
4. Learn to modify both JSX and compiled code
5. Practice debugging React applications with browser DevTools

## Tech Stack

- React + TypeScript
- Vite (with sourcemaps enabled)
- CSS

## Debugging Configuration

This project includes:
- **Sourcemaps enabled** (`sourcemap: true`) - Maps compiled code back to source
- **Unminified builds** (`minify: false`) - Readable code in browser
- **Auto-open browser** - Dev server opens automatically
- **Hot Module Replacement** - Changes appear instantly
