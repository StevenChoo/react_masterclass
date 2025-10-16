'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

let pattern1Count = 0
let pattern2Count = 0
let pattern3Count = 0

export default function UseEffectDependenciesDemo() {
  const [count, setCount] = useState(0)
  const [unrelatedState, setUnrelatedState] = useState(0)

  // Pattern 1: No dependency array - runs after EVERY render
  useEffect(() => {
    pattern1Count++
    console.log('⚠️ Pattern 1 (no deps): Runs after EVERY render', pattern1Count)
  })

  // Pattern 2: Empty array [] - runs ONCE on mount
  useEffect(() => {
    pattern2Count++
    console.log('✅ Pattern 2 (empty []): Runs ONCE on mount', pattern2Count)
  }, [])

  // Pattern 3: Specific dependencies - runs when dependencies change
  useEffect(() => {
    pattern3Count++
    console.log('✅ Pattern 3 ([count]): Runs when count changes', pattern3Count)
  }, [count])

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>4.1 useEffect Dependencies</h1>

      <div className="warning">
        <strong>Understanding the three patterns:</strong> The dependency array controls
        when your effect runs. Choose the right pattern based on your use case!
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>The Three Patterns</h2>

          <div style={{ marginBottom: '1rem' }}>
            <button onClick={() => setCount(count + 1)} style={{ marginRight: '0.5rem' }}>
              Increment Count: {count}
            </button>
            <button onClick={() => setUnrelatedState(unrelatedState + 1)}>
              Increment Unrelated: {unrelatedState}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <div style={{ padding: '1rem', border: '2px solid orange', borderRadius: '4px' }}>
              <h3>Pattern 1</h3>
              <p style={{ fontSize: '0.9em', marginBottom: '0.5rem' }}>No dependency array</p>
              <div className="code-block">
                <pre style={{ fontSize: '0.75em' }}>{`useEffect(() => {
  // Runs after EVERY render
})`}</pre>
              </div>
              <p style={{ marginTop: '0.5rem' }}>Run count: <strong>{pattern1Count}</strong></p>
              <p style={{ fontSize: '0.85em', color: '#666' }}>⚠️ Runs on EVERY state change!</p>
            </div>

            <div style={{ padding: '1rem', border: '2px solid green', borderRadius: '4px' }}>
              <h3>Pattern 2</h3>
              <p style={{ fontSize: '0.9em', marginBottom: '0.5rem' }}>Empty array []</p>
              <div className="code-block">
                <pre style={{ fontSize: '0.75em' }}>{`useEffect(() => {
  // Runs ONCE on mount
}, [])`}</pre>
              </div>
              <p style={{ marginTop: '0.5rem' }}>Run count: <strong>{pattern2Count}</strong></p>
              <p style={{ fontSize: '0.85em', color: '#666' }}>✅ Perfect for initial data fetching</p>
            </div>

            <div style={{ padding: '1rem', border: '2px solid blue', borderRadius: '4px' }}>
              <h3>Pattern 3</h3>
              <p style={{ fontSize: '0.9em', marginBottom: '0.5rem' }}>Specific deps [count]</p>
              <div className="code-block">
                <pre style={{ fontSize: '0.75em' }}>{`useEffect(() => {
  // Runs when count changes
}, [count])`}</pre>
              </div>
              <p style={{ marginTop: '0.5rem' }}>Run count: <strong>{pattern3Count}</strong></p>
              <p style={{ fontSize: '0.85em', color: '#666' }}>✅ Most common pattern</p>
            </div>
          </div>

          <div className="success" style={{ marginTop: '1rem' }}>
            <strong>Try this:</strong>
            <br/>1. Click "Increment Count" - Pattern 1 and 3 run (Pattern 2 stays at 1)
            <br/>2. Click "Increment Unrelated" - Only Pattern 1 runs
            <br/>3. Check console for detailed logs
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// Pattern 1: No deps - runs every render
useEffect(() => {
  console.log('Runs after every render')
  document.title = \`Count: \${count}\`
})  // ⚠️ Usually not what you want!

// Pattern 2: Empty [] - runs once on mount
useEffect(() => {
  console.log('Runs once on mount')
  fetchInitialData()
}, [])  // ✅ Like componentDidMount

// Pattern 3: Specific deps - runs when deps change
useEffect(() => {
  console.log('Runs when count changes')
  saveCountToLocalStorage(count)
}, [count])  // ✅ Most common pattern

// ⚠️ DANGER: Infinite loop!
useEffect(() => {
  setData(newData)  // Updates state...
})  // No deps = runs after every render... which triggers another render... 💥`}</pre>
      </div>

      <div className="warning" style={{ marginTop: '1rem' }}>
        <strong>Common Mistake:</strong> Forgetting the dependency array when setting state
        causes infinite loops! Always include [] or specific dependencies.
      </div>
    </main>
  )
}
