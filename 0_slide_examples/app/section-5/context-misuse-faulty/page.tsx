'use client'

import { useState, useContext, createContext, memo } from 'react'
import Link from 'next/link'

// 🙅 FAULTY VERSION - Single Context with All State (Causes Over-Rendering) - Active Demo

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
  console.log('🔴 UserDisplay re-rendered (should only re-render when user changes!)')
  return <div style={{ padding: '0.5rem', border: '1px solid red', marginBottom: '1rem' }}>
    User: {user.name}
  </div>
})

UserDisplay.displayName = 'UserDisplay'

const ThemeToggle = memo(() => {
  const { theme, setTheme } = useContext(AppContext)
  console.log('🔴 ThemeToggle re-rendered (should only re-render when theme changes!)')
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{ marginBottom: '1rem' }}
    >
      Theme: {theme}
    </button>
  )
})

ThemeToggle.displayName = 'ThemeToggle'

const NotificationBadge = memo(() => {
  const { notifications, setNotifications } = useContext(AppContext)
  console.log('🔴 NotificationBadge re-rendered (should only re-render when notifications change!)')
  return (
    <div style={{ marginBottom: '1rem' }}>
      <span>Notifications: {notifications}</span>
      <button onClick={() => setNotifications(notifications + 1)} style={{ marginLeft: '0.5rem' }}>+1</button>
    </div>
  )
})

NotificationBadge.displayName = 'NotificationBadge'

export default function ContextMisuseFaultyDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problem.</strong>
        {' '}
        <Link href="/section-5/context-misuse" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>Pitfall #7: Context API Misuse (Faulty - Single Context)</h1>

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
              <strong>🔴 The Problem:</strong>
              <br/>1. Open console and click "+1" on Notifications
              <br/>2. ALL THREE components re-render! 💥
              <br/>3. UserDisplay and ThemeToggle don't even use notifications!
              <br/><br/>
              <strong>Why?</strong>
              <br/>• We have ONE context with <code>{'{user, theme, notifications}'}</code>
              <br/>• When notifications changes, Context value object changes
              <br/>• ALL consumers using <code>useContext(AppContext)</code> must re-render
              <br/>• React.memo is USELESS because Context bypasses it!
              <br/>• Doesn't matter if component only uses <code>user</code> - it re-renders anyway
            </div>

            <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
              <strong>Context propagation rule:</strong> When Context value changes, ALL consumers
              re-render, regardless of which part of the value they actually use. React.memo can't
              prevent this because Context triggers re-renders at a deeper level.
            </div>
          </div>
        </div>
      </AppProvider>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Current code - Single "God" Context
const AppContext = createContext()

function AppProvider({ children }) {
  const [user, setUser] = useState(...)
  const [theme, setTheme] = useState(...)
  const [notifications, setNotifications] = useState(0)

  // Everything in one context!
  return (
    <AppContext.Provider
      value={{ user, setUser, theme, setTheme, notifications, setNotifications }}
    >
      {children}
    </AppContext.Provider>
  )
}

// Components that only care about user:
const UserDisplay = memo(() => {
  const { user } = useContext(AppContext)
  return <div>{user.name}</div>
})

// Problem: When you click "+1 Notifications":
// 1. setNotifications(1) called
// 2. AppProvider re-renders with new value object
// 3. Context value changed → notify ALL consumers
// 4. UserDisplay re-renders even though user didn't change! 💥
// 5. React.memo doesn't help - Context bypasses it

// Why React.memo fails:
// - React.memo only checks props
// - Context is not a prop - it's a different mechanism
// - Context changes trigger re-renders directly
// - No way to opt out without splitting contexts`}</pre>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px' }}>
        <strong>🐛 The Bug:</strong> Single Context with all app state creates a "god context" that
        causes over-rendering. Every consumer re-renders when ANY part of the context changes.
        React.memo cannot prevent these re-renders because Context propagation bypasses prop comparison.
        Split contexts by concern to avoid this!
      </div>
    </main>
  )
}
