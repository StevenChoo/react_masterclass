'use client'

import { useState } from 'react'
import Link from 'next/link'

/*
// 🙅 FAULTY VERSION - Stale Closure Problem
// Uncomment this to demonstrate the bug during live session

export default function StateUpdatesDemo() {
  const [count, setCount] = useState(0)

  function handleClickWrong() {
    setCount(count + 1)
    console.log('After first setCount:', count)  // Still 0! (old value)

    setCount(count + 1)  // Uses old value again
    // Only increments by 1, not 2!
  }

  function delayedIncrementWrong() {
    setTimeout(() => {
      setCount(count + 1)
      // Uses stale count from when timeout was created!
    }, 1000)
  }

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>State Updates: Scheduled vs Functional</h1>

      <div className="demo-container">
        <div className="demo-section">
          <h2>🙅 Wrong: Stale Closure</h2>
          <p>Current count: <strong>{count}</strong></p>
          <button onClick={handleClickWrong}>Increment by 2 (broken)</button>
          <button onClick={delayedIncrementWrong}>Delayed +1 (broken)</button>
          <div className="error">
            <strong>Problem:</strong> Both setCount calls use the same stale count value
          </div>
        </div>
      </div>
    </main>
  )
}
*/

// ✅ CORRECT VERSION - Functional Updates

export default function StateUpdatesDemo() {
  const [count, setCount] = useState(0)

  function handleClickCorrect() {
    setCount(prev => prev + 1)  // prev = 0
    setCount(prev => prev + 1)  // prev = 1
    // Correctly increments by 2 ✅
  }

  function delayedIncrementCorrect() {
    setTimeout(() => {
      setCount(prev => prev + 1)
      // Always gets latest count ✅
    }, 1000)
  }

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-3/state-updates-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>State Updates: Scheduled vs Functional</h1>

      <div className="warning">
        <strong>Key Concept:</strong> State updates are scheduled, not immediate.
        React batches state updates for performance.
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>✅ Correct: Functional Updates</h2>
          <p>Current count: <strong>{count}</strong></p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleClickCorrect}>Increment by 2</button>
            <button onClick={delayedIncrementCorrect}>Delayed +1 (1 second)</button>
          </div>
          <div className="success" style={{ marginTop: '1rem' }}>
            <strong>Solution:</strong> Functional updates use the latest value from the update queue
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// ✅ Correct approach
setCount(prev => prev + 1)  // prev = current value
setCount(prev => prev + 1)  // prev = updated value

// 🙅 Wrong approach
setCount(count + 1)  // Uses stale value
setCount(count + 1)  // Uses same stale value again`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Tip:</strong> To see the faulty version, uncomment the code block at the top of this file and comment out the correct version.</p>
      </div>
    </main>
  )
}
