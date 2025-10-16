'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/*
// 🙅 FAULTY VERSION - Missing Dependencies

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
      </div>
    </div>
  )
}
*/

// ✅ CORRECT VERSION - All Dependencies Included

function CorrectComponent() {
  const [userId, setUserId] = useState(1)
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(`✅ User ${userId}, count: ${count}`)
  }, [userId, count])  // All dependencies included!

  return (
    <div className="demo-section">
      <h2>✅ Solution: Include All Dependencies</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setUserId(userId === 1 ? 2 : 1)} style={{ marginRight: '0.5rem' }}>
          Switch User (Current: {userId})
        </button>
        <button onClick={() => setCount(count + 1)}>
          Increment Count: {count}
        </button>
      </div>

      <div className="success">
        <strong>Check console:</strong> Click "Increment Count" - you'll see logs with updated count!
        <br/>The effect runs whenever userId OR count changes.
        <br/>Always shows current values, no stale closures ✅
      </div>
    </div>
  )
}

export default function UseEffectMissingDepsDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-4/useeffect-missing-deps-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>4.2 useEffect Missing Dependencies</h1>

      <div className="warning">
        <strong>The Problem:</strong> Forgetting to include values used inside the effect
        in the dependency array. This causes the effect to use stale values and miss updates!
      </div>

      <div className="demo-container">
        <CorrectComponent />
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Wrong - missing count dependency
function Component({ userId }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(\`User \${userId}, count: \${count}\`)
  }, [userId])  // count is missing!
  // The effect captures count's value when it first runs
  // If count changes but userId doesn't, effect won't re-run
  // Console will show stale count value!
}

// ✅ Correct - all dependencies included
function Component({ userId }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(\`User \${userId}, count: \${count}\`)
  }, [userId, count])  // All dependencies included ✅
  // Effect re-runs whenever userId OR count changes
  // Always shows current values!
}`}</pre>
      </div>

      <div className="success" style={{ marginTop: '1rem', padding: '1rem' }}>
        <strong>💡 ESLint to the rescue!</strong>
        <br/>Install <code>eslint-plugin-react-hooks</code> - it automatically catches missing dependencies!
        <br/>
        <br/>
        <code>npm install eslint-plugin-react-hooks --save-dev</code>
        <br/>
        <br/>This plugin will show warnings like: "React Hook useEffect has a missing dependency: 'count'."
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Rule:</strong> Include all values from component scope used in the effect!</p>
        <p><strong>Tip:</strong> Uncomment the faulty version at the top to see the stale closure problem.</p>
      </div>
    </main>
  )
}
