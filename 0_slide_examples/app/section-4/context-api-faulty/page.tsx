'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

// 🙅 FAULTY VERSION - Prop Drilling (Active Demo)

interface User {
  name: string
  avatar: string
}

function Layout({ user }: { user: User }) {
  // Layout doesn't use user, just passes it down! 🔴
  return (
    <div style={{
      padding: '1.5rem',
      background: '#ffffff',
      color: '#000000',
      borderRadius: '8px',
      border: '2px solid #ddd',
      transition: 'all 0.3s',
    }}>
      <p style={{ fontSize: '0.9em', marginBottom: '1rem', opacity: 0.7 }}>
        Layout component (doesn't use user, just passes it through 🔴)
      </p>
      <Header user={user} />
      <Content user={user} />
    </div>
  )
}

function Header({ user }: { user: User }) {
  // Header doesn't use user either, just passes it down! 🔴
  return (
    <div style={{
      padding: '1rem',
      marginBottom: '1rem',
      background: '#f5f5f5',
      borderRadius: '4px',
    }}>
      <h3 style={{ margin: 0 }}>Header Component</h3>
      <p style={{ fontSize: '0.85em', margin: '0.5rem 0 0 0', opacity: 0.7 }}>
        Doesn't use user, but must accept and pass it 🔴
      </p>
      <UserMenu user={user} />
    </div>
  )
}

function UserMenu({ user }: { user: User }) {
  // FINALLY uses user! But we had to pass through 3 components! 😫
  return (
    <div style={{
      marginTop: '0.5rem',
      padding: '0.5rem',
      background: '#fff',
      border: '1px solid #ccc',
      borderRadius: '4px',
    }}>
      <strong>UserMenu:</strong> {user.name}
      <br/>
      <span style={{ fontSize: '0.85em', color: '#666' }}>
        (Finally using user after drilling through 3 components!)
      </span>
    </div>
  )
}

function Content({ user }: { user: User }) {
  // Content doesn't use user either, just passes it! 🔴
  return (
    <div style={{
      padding: '1rem',
      background: '#f5f5f5',
      borderRadius: '4px',
      marginBottom: '1rem',
    }}>
      <p><strong>Content Component</strong></p>
      <p style={{ fontSize: '0.9em', opacity: 0.8 }}>
        Doesn't use user, but must accept and pass it 🔴
      </p>
      <UserProfile user={user} />
    </div>
  )
}

function UserProfile({ user }: { user: User }) {
  // Finally uses user here too! More prop drilling! 😫
  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', marginTop: '0.5rem' }}>
      <strong>UserProfile:</strong> {user.name}
      <br/>
      <span style={{ fontSize: '0.85em', color: '#666' }}>
        (Also finally using user after drilling!)
      </span>
    </div>
  )
}

function PropDrillingDemo() {
  const user: User = { name: 'Alice', avatar: '/alice.jpg' }

  return (
    <div>
      <Layout user={user} />
    </div>
  )
}

export default function ContextAPIFaultyDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problem.</strong>
        {' '}
        <Link href="/section-4/context-api" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>4.9 Context API (Faulty - Prop Drilling)</h1>

      <div className="warning">
        <strong>The Problem:</strong> Prop drilling - passing user through Layout → Header → UserMenu
        and Content → UserProfile. The intermediate components (Layout, Header, Content) don't use
        user, they just pass it through!
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>🙅 Problem: Prop Drilling</h2>
          <PropDrillingDemo />

          <div className="error" style={{ marginTop: '1.5rem' }}>
            <strong>🔴 The Problems:</strong>
            <br/>• Layout, Header, Content must know about user prop
            <br/>• They don't use it, just pass it through
            <br/>• Adding new components? Must thread props through them too!
            <br/>• Changing user interface? Update 5+ components!
            <br/>• Code is tightly coupled and hard to refactor
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Current code - Prop Drilling
function App() {
  const user = { name: 'Alice', avatar: '/alice.jpg' }
  return <Layout user={user} />  // Pass to Layout
}

function Layout({ user }) {
  // Layout doesn't use user, just passes it down! 🔴
  return (
    <div>
      <Header user={user} />  // Pass to Header
      <Content user={user} /> // Pass to Content
    </div>
  )
}

function Header({ user }) {
  // Header doesn't use user, just passes it down! 🔴
  return <UserMenu user={user} />  // Pass to UserMenu
}

function UserMenu({ user }) {
  // Finally uses it! 3 components just to get here! 😫
  return <div>{user.name}</div>
}

// Problems:
// - Layout, Header don't use user but must accept it
// - Tightly coupled component chain
// - Hard to refactor or add new components
// - Lots of prop passing boilerplate`}</pre>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px' }}>
        <strong>🐛 The Bug:</strong> This is "prop drilling" - passing props through components that
        don't need them. It makes code brittle and hard to maintain. Adding a new component in the
        middle? You have to update all the prop interfaces!
      </div>
    </main>
  )
}
