'use client'

import { useState, createContext, useContext, ReactNode } from 'react'
import Link from 'next/link'

// ✅ CORRECT VERSION - Context API

interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
    console.log('🎨 Theme toggled to:', theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook for convenience
function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// Components using Context - no props needed!

function Layout({ children }: { children: ReactNode }) {
  const { theme } = useTheme()
  return (
    <div style={{
      padding: '1.5rem',
      background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
      borderRadius: '8px',
      border: `2px solid ${theme === 'dark' ? '#333' : '#ddd'}`,
      transition: 'all 0.3s',
    }}>
      <p style={{ fontSize: '0.9em', marginBottom: '1rem', opacity: 0.7 }}>
        Layout component (accessing theme via Context)
      </p>
      {children}
    </div>
  )
}

function Header() {
  const { theme } = useTheme()
  return (
    <div style={{
      padding: '1rem',
      marginBottom: '1rem',
      background: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
      borderRadius: '4px',
    }}>
      <h3 style={{ margin: 0 }}>Header Component</h3>
      <p style={{ fontSize: '0.85em', margin: '0.5rem 0 0 0', opacity: 0.7 }}>
        Accessing theme directly via Context - no props!
      </p>
    </div>
  )
}

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '0.75rem 1.5rem',
        background: theme === 'dark' ? '#4caf50' : '#2196f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1rem',
      }}
    >
      {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  )
}

function Content() {
  const { theme } = useTheme()
  return (
    <div style={{
      padding: '1rem',
      background: theme === 'dark' ? '#2a2a2a' : '#f5f5f5',
      borderRadius: '4px',
      marginBottom: '1rem',
    }}>
      <p><strong>Content Component</strong></p>
      <p style={{ fontSize: '0.9em', opacity: 0.8 }}>
        Current theme: <strong>{theme}</strong>
      </p>
      <p style={{ fontSize: '0.85em', opacity: 0.7 }}>
        This component also accesses Context directly!
      </p>
    </div>
  )
}

function ContextDemo() {
  return (
    <ThemeProvider>
      <Layout>
        <Header />
        <Content />
        <ThemeToggleButton />
      </Layout>
    </ThemeProvider>
  )
}

/*
// 🙅 FAULTY VERSION - Prop Drilling

interface User {
  name: string
  avatar: string
}

function App() {
  const user: User = { name: 'Alice', avatar: '/alice.jpg' }
  return <Layout user={user} />  // Pass to Layout
}

function Layout({ user }: { user: User }) {
  // Layout doesn't use user, just passes it down! 🔴
  return (
    <div>
      <Header user={user} />  // Pass to Header
      <main>Content...</main>
    </div>
  )
}

function Header({ user }: { user: User }) {
  // Header doesn't use user, just passes it down! 🔴
  return (
    <header>
      <Logo />
      <UserMenu user={user} />  // Pass to UserMenu
    </header>
  )
}

function UserMenu({ user }: { user: User }) {
  // Finally uses it! But had to pass through 3 components! 😫
  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <span>{user.name}</span>
    </div>
  )
}
*/

export default function ContextAPIDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-4/context-api-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>4.9 Context API</h1>

      <div className="warning">
        <strong>The Solution:</strong> Context creates a "broadcast channel" where data flows
        directly from Provider to any component that needs it - no prop drilling!
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>✅ Context Solution</h2>
          <ContextDemo />

          <div className="success" style={{ marginTop: '1.5rem' }}>
            <strong>✅ Benefits:</strong>
            <br/>• Layout, Header, Content don't need theme props
            <br/>• Components access Context directly via useTheme()
            <br/>• Add new components that need theme? No refactoring!
            <br/>• Clean, maintainable code
            <br/>• Check console when toggling theme
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 1. Create context with type
interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 2. Create provider component
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 3. Create custom hook for convenience
function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

// 4. Use anywhere in the tree!
function Button() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme}>
      Toggle to {theme === 'light' ? 'dark' : 'light'}
    </button>
  )
}

// 5. Wrap app with provider
function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Header />
        <Button />
      </Layout>
    </ThemeProvider>
  )
}`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Pattern:</strong> Create context → Provider → Custom hook → Use anywhere!</p>
        <p><strong>When to use:</strong> Theme, auth, language - data needed across many components.</p>
        <p><strong>Warning:</strong> All consumers re-render when Context value changes!</p>
      </div>
    </main>
  )
}
