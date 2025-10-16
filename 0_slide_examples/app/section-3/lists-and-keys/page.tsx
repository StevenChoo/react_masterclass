'use client'

import { useState } from 'react'
import Link from 'next/link'

interface User {
  id: number
  name: string
}

/*
// 🙅 FAULTY VERSION - Using Index as Key
// Uncomment this to demonstrate the bug during live session

export default function ListsAndKeysDemo() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ])

  function addUser() {
    const newId = Math.max(...users.map(u => u.id), 0) + 1
    setUsers([{ id: newId, name: `User ${newId}` }, ...users])
  }

  function removeFirst() {
    setUsers(users.slice(1))
  }

  function shuffleUsers() {
    const shuffled = [...users].sort(() => Math.random() - 0.5)
    setUsers(shuffled)
  }

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>Lists and Keys</h1>

      <div className="demo-container">
        <div className="demo-section">
          <h2>🙅 Wrong: Using Index as Key</h2>
          <button onClick={addUser}>Add User at Start</button>
          <button onClick={removeFirst}>Remove First</button>
          <button onClick={shuffleUsers}>Shuffle Order</button>

          <ul style={{ marginTop: '1rem' }}>
            {users.map((user, index) => (
              <li key={index} style={{ padding: '0.5rem', border: '1px solid #ddd', marginBottom: '0.5rem' }}>
                {user.name} (Key: {index})
                <input type="text" defaultValue={user.name} style={{ marginLeft: '1rem' }} />
              </li>
            ))}
          </ul>

          <div className="error">
            <strong>Problem:</strong> When reordering, same index = different data.
            React gets confused! Try typing in inputs, then shuffle.
          </div>
        </div>
      </div>
    </main>
  )
}
*/

// ✅ CORRECT VERSION - Using Unique IDs as Keys

export default function ListsAndKeysDemo() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ])

  function addUser() {
    const newId = Math.max(...users.map(u => u.id), 0) + 1
    setUsers([{ id: newId, name: `User ${newId}` }, ...users])
  }

  function removeFirst() {
    setUsers(users.slice(1))
  }

  function shuffleUsers() {
    const shuffled = [...users].sort(() => Math.random() - 0.5)
    setUsers(shuffled)
  }

  function sortByName() {
    const sorted = [...users].sort((a, b) => a.name.localeCompare(b.name))
    setUsers(sorted)
  }

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-3/lists-and-keys-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>Lists and Keys</h1>

      <div className="warning">
        <strong>Key Concept:</strong> Keys help React identify which items changed, added, or removed.
        Keys must be stable and unique among siblings.
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>✅ Correct: Using Unique IDs</h2>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button onClick={addUser}>Add User at Start</button>
            <button onClick={removeFirst}>Remove First</button>
            <button onClick={shuffleUsers}>Shuffle Order</button>
            <button onClick={sortByName}>Sort by Name</button>
          </div>

          <ul style={{ marginTop: '1rem' }}>
            {users.map(user => (
              <li key={user.id} style={{ padding: '0.5rem', border: '1px solid #ddd', marginBottom: '0.5rem' }}>
                <strong>{user.name}</strong> (ID: {user.id})
                <input
                  type="text"
                  defaultValue={user.name}
                  placeholder="Type something..."
                  style={{ marginLeft: '1rem', padding: '0.25rem' }}
                />
              </li>
            ))}
          </ul>

          <div className="success" style={{ marginTop: '1rem' }}>
            <strong>Solution:</strong> Stable key={'{'}user.id{'}'} preserves component state correctly.
            Try typing in inputs, then shuffle - input values stay with their user!
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// ✅ Correct: Unique ID from data
{users.map(user => (
  <li key={user.id}>{user.name}</li>
))}

// 🙅 Wrong: Array index
{users.map((user, index) => (
  <li key={index}>{user.name}</li>
))}
// Problem: Reordering breaks - same index, different data

// Keys must be:
// - Unique among siblings
// - Stable (don't change across renders)
// - From the data itself (IDs, emails, etc.)`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Tip:</strong> To see the faulty version, uncomment the code block at the top of this file and comment out the correct version.</p>
      </div>
    </main>
  )
}
