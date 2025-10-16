'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/*
// 🙅 FAULTY VERSION - Async Callback (TypeScript Error!)

// This won't compile in TypeScript:
useEffect(async () => {
  const data = await fetchData()
  setData(data)
}, [])

// Error: "Argument of type '() => Promise<void>' is not assignable
// to parameter of type 'EffectCallback'."
//
// useEffect expects a cleanup function or nothing, not a Promise!
*/

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

// ✅ CORRECT VERSION - Async Function Inside

function UserProfile() {
  const [userId, setUserId] = useState(1)
  const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadUser() {
      setLoading(true)
      setError(null)

      try {
        console.log('✅ Fetching user', userId)
        const data = await fetchUserData(userId)

        if (!cancelled) {
          setUser(data)
          console.log('✅ User loaded:', data)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load user')
          console.error('❌ Error:', err)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadUser()

    // Cleanup: prevent setting state on unmounted component
    return () => {
      cancelled = true
    }
  }, [userId])

  return (
    <div className="demo-section">
      <h2>✅ Correct: Async Function Inside Effect</h2>

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

      {loading && <p>Loading user...</p>}

      {error && <div className="error">{error}</div>}

      {user && !loading && (
        <div className="success" style={{ padding: '1rem' }}>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>ID: {user.id}</p>
        </div>
      )}

      <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
        Check console for loading logs. Try rapidly switching users to see cleanup in action!
      </div>
    </div>
  )
}

export default function UseEffectAsyncDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-4/useeffect-async-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>4.3 useEffect Async Functions</h1>

      <div className="warning">
        <strong>The Problem:</strong> Trying to make the useEffect callback itself async with
        <code>async/await</code>. React expects useEffect to return either nothing or a cleanup
        function, not a Promise!
      </div>

      <div className="demo-container">
        <UserProfile />
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Wrong - useEffect callback can't be async
useEffect(async () => {
  const data = await fetchData()
  setData(data)
}, [])
// TypeScript error: Effect callback must return cleanup function or nothing

// ✅ Correct - async function inside effect
useEffect(() => {
  async function loadData() {
    const data = await fetchData()
    setData(data)
  }
  loadData()
}, [])

// ✅ Better - with error handling and cleanup
useEffect(() => {
  let cancelled = false

  async function loadData() {
    setLoading(true)
    try {
      const data = await fetchData()
      if (!cancelled) {  // Check if still mounted
        setData(data)
      }
    } catch (error) {
      if (!cancelled) {
        setError(error.message)
      }
    } finally {
      if (!cancelled) {
        setLoading(false)
      }
    }
  }

  loadData()

  return () => {
    cancelled = true  // Cleanup: prevent setting state after unmount
  }
}, [])`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Pattern:</strong> Define async function inside useEffect and immediately call it.</p>
        <p><strong>Cleanup:</strong> Use a <code>cancelled</code> flag to prevent race conditions!</p>
      </div>
    </main>
  )
}
