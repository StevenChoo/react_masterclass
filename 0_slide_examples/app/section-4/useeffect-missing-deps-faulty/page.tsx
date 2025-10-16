'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// 🙅 FAULTY VERSION - Missing Dependencies (Active Demo)

function FaultyComponent() {
  const [userId, setUserId] = useState(1)
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(`🔴 User ${userId}, count: ${count}`)
  }, [userId])  // count is missing!

  return (
    <div className="demo-section">
      <h2>🙅 Problem: Missing Dependencies</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setUserId(userId === 1 ? 2 : 1)} style={{ marginRight: '0.5rem' }}>
          Switch User (Current: {userId})
        </button>
        <button onClick={() => setCount(count + 1)}>
          Increment Count: {count}
        </button>
      </div>

      <div className="error">
        <strong>Check console:</strong> Click "Increment Count" multiple times, then "Switch User".
        <br/>Notice the console shows the OLD count value! The effect captured count when it first ran.
        <br/>This is a <strong>stale closure</strong> - the effect "remembers" the old count value.
        <br/><br/>
        <strong>The Problem:</strong> We forgot to include `count` in the dependency array!
      </div>
    </div>
  )
}

export default function UseEffectMissingDepsFaultyDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problem.</strong>
        {' '}
        <Link href="/section-4/useeffect-missing-deps" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>4.2 useEffect Missing Dependencies (Faulty)</h1>

      <div className="warning">
        <strong>The Problem:</strong> Forgetting to include values used inside the effect
        in the dependency array. This causes the effect to use stale values and miss updates!
      </div>

      <div className="demo-container">
        <FaultyComponent />
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Current code - missing count dependency
function Component({ userId }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(\`User \${userId}, count: \${count}\`)
  }, [userId])  // count is missing! 🔴
  // The effect captures count's value when it first runs
  // If count changes but userId doesn't, effect won't re-run
  // Console will show stale count value!
}

// What should happen:
// 1. User 1, count: 0 (initial)
// 2. User 1, count: 1 (after increment)
// 3. User 1, count: 2 (after increment)
// 4. User 2, count: 2 (after switch)

// What actually happens:
// 1. User 1, count: 0 (initial)
// 2. (no log - effect doesn't run)
// 3. (no log - effect doesn't run)
// 4. User 2, count: 0 (shows OLD count!) 💥`}</pre>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px' }}>
        <strong>🐛 The Bug:</strong> The useEffect only runs when userId changes, so incrementing
        count doesn't trigger the effect. When you switch users, it logs the count value that was
        captured when the effect first ran (which was 0).
      </div>
    </main>
  )
}
