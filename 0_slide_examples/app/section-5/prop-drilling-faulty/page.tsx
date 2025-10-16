'use client'

import { useState } from 'react'
import Link from 'next/link'

// 🙅 FAULTY VERSION - Prop Drilling (Active Demo)

function Layout({ user, setUser }: any) {
  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Sidebar user={user} />
      <MainContent user={user} setUser={setUser} />
    </div>
  )
}

function Header({ user, setUser }: any) {
  // Header doesn't use user, just passes it down
  return <UserMenu user={user} setUser={setUser} />
}

function UserMenu({ user, setUser }: any) {
  return (
    <div className="error" style={{ padding: '1rem', marginBottom: '1rem' }}>
      <p>User: {user.name} ({user.role})</p>
      <button onClick={() => setUser({ name: 'Bob', role: 'User' })}>
        Switch to Bob
      </button>
      <div style={{ marginTop: '0.5rem', fontSize: '0.9em' }}>
        🔴 user and setUser drilled through 3 components that don't use them!
      </div>
    </div>
  )
}

function Sidebar({ user }: any) {
  // Sidebar doesn't use user, receives it for no reason
  return <div style={{ padding: '0.5rem', marginBottom: '1rem', background: '#fee' }}>
    Sidebar (doesn't use user prop, just forced to receive it)
  </div>
}

function MainContent({ user, setUser }: any) {
  // MainContent doesn't use user, just passes it down
  return <UserProfile user={user} setUser={setUser} />
}

function UserProfile({ user, setUser }: any) {
  return (
    <div style={{ padding: '1rem', border: '1px solid red' }}>
      <p>Profile: {user.name}</p>
      <button onClick={() => setUser({ ...user, name: user.name + '!' })}>
        Add !
      </button>
    </div>
  )
}

export default function PropDrillingFaultyDemo() {
  const [user, setUser] = useState({ name: 'Alice', role: 'Admin' })

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problem.</strong>
        {' '}
        <Link href="/section-5/prop-drilling" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>Pitfall #8: Prop Drilling (Faulty - Drilling Through Layers)</h1>

      <div className="warning">
        <strong>The Problem:</strong> Passing props through multiple components that don't use them,
        just to reach a deeply nested component. Makes code brittle and hard to refactor.
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>🙅 Problem: Prop Drilling</h2>

          <Layout user={user} setUser={setUser} />

          <div className="error" style={{ marginTop: '1rem' }}>
            <strong>🔴 The Problem - Prop Drilling Chain:</strong>
            <br/><br/>
            <code>App</code> (has user state)
            <br/>↓ passes <code>user, setUser</code> to...
            <br/><code>Layout</code> (doesn't use them, just passes down)
            <br/>↓ passes <code>user, setUser</code> to...
            <br/><code>Header</code> (doesn't use them, just passes down)
            <br/>↓ passes <code>user, setUser</code> to...
            <br/><code>UserMenu</code> (FINALLY uses them!)
            <br/><br/>
            <strong>And a parallel chain:</strong>
            <br/><code>Layout</code>
            <br/>↓ passes <code>user, setUser</code> to...
            <br/><code>MainContent</code> (doesn't use them, just passes down)
            <br/>↓ passes <code>user, setUser</code> to...
            <br/><code>UserProfile</code> (FINALLY uses them!)
            <br/><br/>
            <strong>Why it's bad:</strong>
            <br/>• Layout, Header, MainContent are "middlemen" - they receive props they don't need
            <br/>• Changing user prop signature means updating 5 component signatures
            <br/>• Can't reuse Layout or Header without providing user props
            <br/>• Code is tightly coupled and hard to refactor
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
            <strong>Real-world impact:</strong> Imagine you need to add another user field like
            <code>permissions</code>. You'd have to thread it through Layout → Header → UserMenu
            AND Layout → MainContent → UserProfile. That's 5 components to change for one new field!
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Current code - Prop drilling
function App() {
  const [user, setUser] = useState({ name: 'Alice' })
  return <Layout user={user} setUser={setUser} />
}

function Layout({ user, setUser }) {
  // Layout doesn't use user!
  return (
    <div>
      <Header user={user} setUser={setUser} />
      <MainContent user={user} setUser={setUser} />
    </div>
  )
}

function Header({ user, setUser }) {
  // Header doesn't use user!
  return <UserMenu user={user} setUser={setUser} />
}

function UserMenu({ user, setUser }) {
  // Finally! Someone uses it!
  return <div>{user.name}</div>
}

// The problem chain:
// App → Layout → Header → UserMenu
// 3 components in between don't use user, just pass it!

// Maintenance nightmare:
// - Want to add a field? Update 4 components
// - Want to rename user? Update 4 components
// - Want to reuse Header? Must provide user prop
// - Tight coupling - can't change one without others`}</pre>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px' }}>
        <strong>🐛 The Bug:</strong> Prop drilling creates unnecessary coupling between components.
        Intermediate components that don't use the props are forced to know about them, receive them,
        and pass them down. This makes the codebase brittle, hard to refactor, and difficult to test
        components in isolation. Use Context or component composition to avoid this!
      </div>
    </main>
  )
}
