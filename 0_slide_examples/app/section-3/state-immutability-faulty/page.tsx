'use client'

import { useState } from 'react'
import Link from 'next/link'

let renderCount = 0

// 🙅 FAULTY VERSION - Direct Mutation (Active Demo)

function FaultyUserProfile() {
  renderCount++
  const [user, setUser] = useState({ name: 'Alice', age: 25 })

  const updateNameFaulty = () => {
    console.log('🔴 Before mutation:', user)
    user.name = 'Bob'  // Direct mutation! 💥
    setUser(user)  // Same reference!
    console.log('🔴 After mutation:', user)
    console.log('🔴 Did component re-render? No! Render count:', renderCount)
  }

  return (
    <div className="demo-section">
      <h2>🙅 Problem: Direct Mutation</h2>

      <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px', marginBottom: '1rem' }}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Render Count:</strong> {renderCount}</p>
      </div>

      <button onClick={updateNameFaulty}>
        Change Name to Bob (broken!)
      </button>

      <div className="error" style={{ marginTop: '1rem' }}>
        <strong>🔴 The Problem:</strong>
        <br/>Click the button. The name doesn't change in the UI!
        <br/>Check console: The object IS mutated, but React doesn't detect it.
        <br/><br/>
        <strong>Why?</strong>
        <br/>• We modified the object directly: <code>user.name = 'Bob'</code>
        <br/>• Then called <code>setUser(user)</code> with the SAME reference
        <br/>• React compares: old reference === new reference? Yes! Same object!
        <br/>• React thinks nothing changed, so it doesn't re-render 💥
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
        React uses reference equality (===) to detect changes. If you mutate an object
        without creating a new reference, React won't see the change!
      </div>
    </div>
  )
}

export default function StateImmutabilityFaultyDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problem.</strong>
        {' '}
        <Link href="/section-3/state-immutability" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>3.2 State Immutability (Faulty - Direct Mutation)</h1>

      <div className="warning">
        <strong>The Problem:</strong> Mutating objects/arrays directly instead of creating new references.
        React won't detect changes because the reference stays the same!
      </div>

      <div className="demo-container">
        <FaultyUserProfile />
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Current code - Direct mutation
const updateName = () => {
  user.name = 'Bob'  // Mutate directly! 💥
  setUser(user)      // Same reference!

  // React's check:
  // oldUser === newUser? Yes! (same object reference)
  // React: "Nothing changed, no re-render needed"
  // But the object WAS changed internally!
  // Result: UI doesn't update 💥
}

// What happens internally:
const oldUser = { name: 'Alice', age: 25 }  // Memory address: 0x001
user.name = 'Bob'  // Still at address: 0x001 (mutated in place)
setUser(user)      // Still at address: 0x001

// React: oldUser (0x001) === user (0x001) → true
// React: "No change detected" → No re-render!`}</pre>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px' }}>
        <strong>🐛 The Bug:</strong> React compares object references with ===. When you mutate
        an object in place, the reference doesn't change, so React thinks nothing happened.
        Always create NEW objects with spread operator!
      </div>
    </main>
  )
}
