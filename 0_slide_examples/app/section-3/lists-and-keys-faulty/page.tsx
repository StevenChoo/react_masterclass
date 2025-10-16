'use client'

import { useState } from 'react'
import Link from 'next/link'

interface User {
  id: number
  name: string
}

// 🙅 FAULTY VERSION - Index as Key (Active Demo)

function FaultyUserList() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ])

  const shuffle = () => {
    const shuffled = [...users].sort(() => Math.random() - 0.5)
    setUsers(shuffled)
    console.log('🔴 List shuffled, but keys (indexes) stay the same!')
  }

  const addUser = () => {
    const newId = Math.max(...users.map(u => u.id)) + 1
    setUsers([{ id: newId, name: `User ${newId}` }, ...users])
  }

  const removeFirst = () => {
    setUsers(users.slice(1))
  }

  return (
    <div className="demo-section">
      <h2>🙅 Problem: Index as Key</h2>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={shuffle}>Shuffle List</button>
        <button onClick={addUser}>Add User at Top</button>
        <button onClick={removeFirst}>Remove First</button>
      </div>

      {/* 🔴 FAULTY: Using index as key! */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user, index) => (
          <li
            key={index}  // 💥 Index as key!
            style={{
              padding: '0.75rem',
              marginBottom: '0.5rem',
              background: '#f5f5f5',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>
              <strong>[Key: {index}]</strong> {user.name} (ID: {user.id})
            </span>
            <input
              type="text"
              placeholder="Type something..."
              style={{ padding: '0.25rem', width: '150px' }}
            />
          </li>
        ))}
      </ul>

      <div className="error" style={{ marginTop: '1rem' }}>
        <strong>🔴 The Problem:</strong>
        <br/>1. Type some text in the input fields
        <br/>2. Click "Shuffle List"
        <br/>3. The text stays in the wrong places! 💥
        <br/><br/>
        <strong>Why?</strong>
        <br/>• We use index as key: key=0, key=1, key=2
        <br/>• After shuffle, positions change but keys stay: still key=0, key=1, key=2
        <br/>• React thinks: "Same keys = same components = keep the old inputs!"
        <br/>• Input values belong to keys, not to users!
        <br/>• Result: Text appears with wrong users
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
        <strong>The fundamental problem:</strong> Keys should identify items across renders.
        Index keys identify positions, not items. When items move, the keys don't move with them!
      </div>
    </div>
  )
}

export default function ListsAndKeysFaultyDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problem.</strong>
        {' '}
        <Link href="/section-3/lists-and-keys" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>3.4 Lists and Keys (Faulty - Index as Key)</h1>

      <div className="warning">
        <strong>The Problem:</strong> Using array index as key breaks when the list reorders.
        Keys should be stable identifiers from your data, not positions in the array!
      </div>

      <div className="demo-container">
        <FaultyUserList />
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Current code - Index as key
{users.map((user, index) => (
  <li key={index}>  // 💥 Index as key!
    {user.name}
    <input />
  </li>
))}

// Initial render:
// key=0: Alice with input
// key=1: Bob with input
// key=2: Charlie with input

// After shuffle (Charlie, Alice, Bob):
// key=0: Charlie (but React keeps key=0's old input from Alice!)
// key=1: Alice (but React keeps key=1's old input from Bob!)
// key=2: Bob (but React keeps key=2's old input from Charlie!)

// Keys identify positions, not items!
// When items move, keys don't follow them.

// What React does:
// "key=0 still exists, just update the text to 'Charlie'"
// "But keep the same input component (with Alice's text)"
// Result: Wrong text with wrong users!`}</pre>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px' }}>
        <strong>🐛 The Bug:</strong> Index keys identify positions in the array, not items.
        When you reorder, React thinks "key=0 is still the first item" and reuses the old
        component (with its input state). Use stable IDs from your data: <code>key={`user.id`}</code>
      </div>
    </main>
  )
}
