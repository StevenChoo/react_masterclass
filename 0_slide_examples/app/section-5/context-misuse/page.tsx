'use client'

import { useState, useContext, createContext, memo } from 'react'
import Link from 'next/link'

/*
// 🙅 FAULTY VERSION - Single Context with All State (Causes Over-Rendering)

const AppContext = createContext<any>(null)

function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({ name: 'Alice', email: 'alice@example.com' })
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState(0)

  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme, notifications, setNotifications }}>
      {children}
    </AppContext.Provider>
  )
}

// Any component using context re-renders when ANY value changes!
const UserDisplay = memo(() => {
  const { user } = useContext(AppContext)
  console.log('🔴 UserDisplay re-rendered')
  return <div>User: {user.name}</div>
})

const ThemeToggle = memo(() => {
  const { theme, setTheme } = useContext(AppContext)
  console.log('🔴 ThemeToggle re-rendered')
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Theme: {theme}
    </button>
  )
})

const NotificationBadge = memo(() => {
  const { notifications, setNotifications } = useContext(AppContext)
  console.log('🔴 NotificationBadge re-rendered')
  return (
    <div>
      <span>Notifications: {notifications}</span>
      <button onClick={() => setNotifications(notifications + 1)}>+1</button>
    </div>
  )
})

export default function ContextMisuseDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>Pitfall #7: Context API Misuse</h1>

      <div className="warning">
        <strong>The Problem:</strong> Putting all state in one Context causes every consumer to re-render
        when ANY value changes, even if they don't use that value. React.memo doesn't help!
      </div>

      <AppProvider>
        <div className="demo-container">
          <div className="demo-section">
            <h2>🙅 Problem: Single Context with All State</h2>

            <UserDisplay />
            <ThemeToggle />
            <NotificationBadge />

            <div className="error" style={{ marginTop: '1rem' }}>
              <strong>Open console and click any button.</strong>
              <br/>All three components re-render even though they only use one value each!
              <br/>React.memo is useless here because Context bypasses it.
            </div>
          </div>
        </div>
      </AppProvider>
    </main>
  )
}
*/

// ✅ CORRECT VERSION - Split Contexts

const UserContext = createContext<any>(null)
const ThemeContext = createContext<any>(null)
const NotificationContext = createContext<any>(null)

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({ name: 'Alice', email: 'alice@example.com' })
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light')
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState(0)
  return <NotificationContext.Provider value={{ notifications, setNotifications }}>{children}</NotificationContext.Provider>
}

// Each component only re-renders when its own context changes
const UserDisplay = memo(() => {
  const { user } = useContext(UserContext)
  console.log('✅ UserDisplay re-rendered')
  return <div>User: {user.name}</div>
})

const ThemeToggle = memo(() => {
  const { theme, setTheme } = useContext(ThemeContext)
  console.log('✅ ThemeToggle re-rendered')
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Theme: {theme}
    </button>
  )
})

const NotificationBadge = memo(() => {
  const { notifications, setNotifications } = useContext(NotificationContext)
  console.log('✅ NotificationBadge re-rendered')
  return (
    <div>
      <span>Notifications: {notifications}</span>
      <button onClick={() => setNotifications(notifications + 1)} style={{ marginLeft: '0.5rem' }}>+1</button>
    </div>
  )
})

export default function ContextMisuseDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-5/context-misuse-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>Pitfall #7: Context API Misuse</h1>

      <div className="warning">
        <strong>The Problem:</strong> Single Context with all app state causes over-rendering.
        Every consumer re-renders when ANY value changes, even unrelated ones!
      </div>

      <UserProvider>
        <ThemeProvider>
          <NotificationProvider>
            <div className="demo-container">
              <div className="demo-section">
                <h2>✅ Correct: Split Contexts by Concern</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <UserDisplay />
                  <ThemeToggle />
                  <NotificationBadge />
                </div>

                <div className="success" style={{ marginTop: '1rem' }}>
                  <strong>Open console and click buttons.</strong>
                  <br/>Only the component using the changed context re-renders!
                  <br/>Notification button only re-renders NotificationBadge, not UserDisplay or ThemeToggle.
                </div>
              </div>
            </div>
          </NotificationProvider>
        </ThemeProvider>
      </UserProvider>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Wrong: Single context with everything
const AppContext = createContext({ user, theme, notifications })
// Any consumer re-renders on ANY change!

// ✅ Correct: Split by concern
const UserContext = createContext(user)
const ThemeContext = createContext(theme)
const NotificationContext = createContext(notifications)
// Only relevant consumers re-render

// 💡 Rule: One context per independent concern
// Alternative: Use state management library (Zustand, Jotai)`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Tip:</strong> Uncomment the faulty version at the top to see the over-rendering problem.</p>
        <p><strong>Rule:</strong> Split contexts by update frequency and concern. Don't create a "god context"!</p>
      </div>
    </main>
  )
}
