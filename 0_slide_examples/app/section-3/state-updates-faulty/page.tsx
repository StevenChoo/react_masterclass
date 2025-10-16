'use client'

import { useState } from 'react'
import Link from 'next/link'

// 🙅 FAULTY VERSION - Stale Closure Problem (Active Demo)

function FaultyCounter() {
  const [count, setCount] = useState(0)

  const handleClickFaulty = () => {
    console.log('🔴 Starting count:', count)
    setCount(count + 1)  // count = 0, sets to 1
    setCount(count + 1)  // count STILL = 0, sets to 1 again!
    console.log('🔴 Both updates used count =', count)
    // Result: count becomes 1, not 2! 💥
  }

  return (
    <div className="demo-section">
      <h2>🙅 Problem: Stale Closure</h2>

      <div style={{ fontSize: '2rem', margin: '1rem 0' }}>
        Count: {count}
      </div>

      <button onClick={handleClickFaulty} style={{ marginBottom: '1rem' }}>
        Click to increment (broken!)
      </button>

      <div className="error">
        <strong>🔴 The Problem:</strong>
        <br/>Click the button. Count only increases by 1, not 2!
        <br/>Check console: Both updates use the same old count value (0).
        <br/><br/>
        <strong>Why?</strong> When you call <code>setCount(count + 1)</code> twice:
        <br/>• First call: count = 0, so sets to 0 + 1 = 1
        <br/>• Second call: count STILL = 0 (stale!), so sets to 0 + 1 = 1 again
        <br/>• React batches both, last one wins: count becomes 1 💥
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
        This is called a "stale closure" - the function captures the count value
        when it was created, and both updates use that same old value.
      </div>
    </div>
  )
}

export default function StateUpdatesFaultyDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problem.</strong>
        {' '}
        <Link href="/section-3/state-updates" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>3.1 State Updates (Faulty - Stale Closure)</h1>

      <div className="warning">
        <strong>The Problem:</strong> Using state values directly in updates causes stale closures.
        Multiple updates in the same render use the same old value!
      </div>

      <div className="demo-container">
        <FaultyCounter />
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Current code - Direct value (stale closure)
const handleClick = () => {
  setCount(count + 1)  // count = 0, sets to 1
  setCount(count + 1)  // count STILL = 0, sets to 1
  // Both updates use the captured count value (0)
  // Result: count becomes 1, not 2! 💥
}

// What React does:
// 1. handleClick runs, count = 0 at this moment
// 2. First setCount schedules: "set to 0 + 1 = 1"
// 3. Second setCount schedules: "set to 0 + 1 = 1" (same old count!)
// 4. React batches updates: 1, then 1 → final value: 1

// Why it's broken:
// - State updates are scheduled, not immediate
// - Both updates read the same captured count value
// - The function "closes over" count = 0 (stale closure)`}</pre>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px' }}>
        <strong>🐛 The Bug:</strong> When you use <code>count + 1</code> directly, both updates
        read the same old count value that was captured when the function ran. This is a stale
        closure - the function remembers the old value, not the updated one!
      </div>
    </main>
  )
}
