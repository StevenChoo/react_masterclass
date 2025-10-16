'use client'

import { useState, createContext, useContext } from 'react'
import Link from 'next/link'

/*
// 🙅 FAULTY VERSION - Prop Drilling

function App() {
  const [user, setUser] = useState({ name: 'Alice', role: 'Admin' })
  return <Layout user={user} setUser={setUser} />
}

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
  return <UserMenu user={user} setUser={setUser} />
}

function UserMenu({ user, setUser }: any) {
  return (
    <div className="error" style={{ padding: '1rem', marginBottom: '1rem' }}>
      <p>User: {user.name} ({user.role})</p>
      <button onClick={() => setUser({ name: 'Bob', role: 'User' })}>
        Switch to Bob
      </button>
      <br/><br/>
      <strong>🔴 Problem:</strong> user and setUser passed through 3 components that don't use them!
    </div>
  )
}

function Sidebar({ user }: any) {
  return <div>Sidebar (doesn't use user, just passes it)</div>
}

function MainContent({ user, setUser }: any) {
  return <UserProfile user={user} setUser={setUser} />
}

function UserProfile({ user, setUser }: any) {
  return (
    <div>
      <p>Profile: {user.name}</p>
      <button onClick={() => setUser({ ...user, name: user.name + '!' })}>
        Add !
      </button>
    </div>
  )
}
*/

// ✅ CORRECT VERSION - Context Solution

const UserContext = createContext<any>(null)

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({ name: 'Alice', role: 'Admin' })
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Sidebar />
      <MainContent />
    </div>
  )
}

function Header() {
  // No props needed - just render UserMenu
  return <UserMenu />
}

function UserMenu() {
  // Directly access context
  const { user, setUser } = useContext(UserContext)
  return (
    <div className="success" style={{ padding: '1rem', marginBottom: '1rem' }}>
      <p>User: {user.name} ({user.role})</p>
      <button onClick={() => setUser({ name: 'Bob', role: 'User' })}>
        Switch to Bob
      </button>
      <br/><br/>
      <strong>✅ Solution:</strong> No prop drilling! Components in between don't need to know about user.
    </div>
  )
}

function Sidebar() {
  return <div style={{ padding: '0.5rem', marginBottom: '1rem' }}>Sidebar (clean - no user props!)</div>
}

function MainContent() {
  return <UserProfile />
}

function UserProfile() {
  const { user, setUser } = useContext(UserContext)
  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <p>Profile: {user.name}</p>
      <button onClick={() => setUser({ ...user, name: user.name + '!' })}>
        Add !
      </button>
    </div>
  )
}

export default function PropDrillingDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-5/prop-drilling-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>Pitfall #8: Prop Drilling</h1>

      <div className="warning">
        <strong>The Problem:</strong> Passing props through multiple components that don't use them,
        just to reach a deeply nested component. Makes code brittle and hard to refactor.
      </div>

      <UserProvider>
        <div className="demo-container">
          <div className="demo-section">
            <h2>✅ Correct: Context Solution</h2>

            <Layout>
              <Header />
              <Sidebar />
              <MainContent />
            </Layout>

            <div style={{ marginTop: '1rem' }}>
              <p>Notice: Header, Layout, Sidebar, MainContent don't have user props!</p>
              <p>Only UserMenu and UserProfile access the context directly.</p>
            </div>
          </div>
        </div>
      </UserProvider>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Wrong: Prop drilling
function App() {
  const [user, setUser] = useState({ name: 'Alice' })
  return <Layout user={user} setUser={setUser} />
}
function Layout({ user, setUser }) {
  return <Header user={user} setUser={setUser} />
}
function Header({ user, setUser }) {
  return <UserMenu user={user} setUser={setUser} />
}
// 3 components that don't use user, just pass it!

// ✅ Correct: Context
const UserContext = createContext()
function App() {
  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  )
}
function Layout() { return <Header /> }
function Header() { return <UserMenu /> }
function UserMenu() {
  const { user, setUser } = useContext(UserContext)
  // Direct access! No drilling!
}

// 💡 Alternative: Component composition
// Pass components as children instead of drilling props`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Tip:</strong> Uncomment the faulty version at the top to see prop drilling in action.</p>
        <p><strong>Rule:</strong> If you're passing props through 3+ components, use Context or composition!</p>
      </div>
    </main>
  )
}
