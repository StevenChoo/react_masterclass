'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Mock API function
const fetchUserData = async (userId: number): Promise<{ id: number; name: string; email: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
  ]

  return users.find(u => u.id === userId) || users[0]
}

// 🙅 FAULTY VERSION - Poor Async Pattern (Active Demo)

function UserProfile() {
  const [userId, setUserId] = useState(1)
  const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null)

  useEffect(() => {
    // Directly calling async without proper structure
    // No cleanup, no error handling, no loading state
    fetchUserData(userId).then(data => {
      setUser(data)
      console.log('🔴 User loaded (no cleanup!):', data)
    })
    // Missing: cleanup function, cancelled flag, error handling
  }, [userId])

  return (
    <div className="demo-section">
      <h2>🙅 Poor Async Pattern</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setUserId(1)} style={{ marginRight: '0.5rem' }}>
          Load User 1
        </button>
        <button onClick={() => setUserId(2)} style={{ marginRight: '0.5rem' }}>
          Load User 2
        </button>
        <button onClick={() => setUserId(3)}>
          Load User 3
        </button>
      </div>

      {!user && <p>No user loaded yet...</p>}

      {user && (
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>ID: {user.id}</p>
        </div>
      )}

      <div className="error" style={{ marginTop: '1rem' }}>
        <strong>🔴 Problems with this code:</strong>
        <br/>• No loading state - user doesn't know data is fetching
        <br/>• No error handling - failures are silent
        <br/>• No cleanup - race condition if you rapidly switch users!
        <br/>• Rapidly click different users to see race condition
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
        Try rapidly clicking between users. The last request to complete wins,
        which might not be the user you selected! This is a race condition 💥
      </div>
    </div>
  )
}

export default function UseEffectAsyncFaultyDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problem.</strong>
        {' '}
        <Link href="/section-4/useeffect-async" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>4.3 useEffect Async Functions (Faulty)</h1>

      <div className="warning">
        <strong>The Problem:</strong> Poor async pattern without proper error handling,
        loading states, or cleanup. This causes race conditions and bad UX!
      </div>

      <div className="demo-container">
        <UserProfile />
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Current code - Poor async pattern
useEffect(() => {
  fetchData().then(data => {
    setData(data)
  })
  // Problems:
  // 1. No loading state
  // 2. No error handling
  // 3. No cleanup - race conditions!
}, [])

// What goes wrong:
// User clicks button A → starts fetching
// User clicks button B → starts fetching
// Response B arrives → setData(B)
// Response A arrives → setData(A) 💥
// Now showing A even though user clicked B!

// Also problematic:
useEffect(async () => {
  // This won't compile! TypeScript error:
  // "Argument of type '() => Promise<void>' is not
  // assignable to parameter of type 'EffectCallback'"
  const data = await fetchData()
  setData(data)
}, [])`}</pre>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px' }}>
        <strong>🐛 The Bugs:</strong>
        <br/>1. <strong>Race condition:</strong> Multiple fetches can complete in wrong order
        <br/>2. <strong>No loading state:</strong> Users don't know something is happening
        <br/>3. <strong>No error handling:</strong> Failures are invisible
        <br/>4. <strong>Can't make effect callback async:</strong> Must use async function inside
      </div>
    </main>
  )
}
