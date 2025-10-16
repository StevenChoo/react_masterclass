'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

let componentRenderCount = 0

export default function UseRefVsUseStateDemo() {
  componentRenderCount++

  // useState example: Counter visible in UI
  const [count, setCount] = useState(0)

  // useRef example: Timer ID not visible in UI
  const intervalRef = useRef<number>()
  const renderCountRef = useRef(0)

  // Track renders with useRef (doesn't cause re-render)
  useEffect(() => {
    renderCountRef.current++
  })

  const startTimer = () => {
    if (intervalRef.current) return // Already running

    intervalRef.current = window.setInterval(() => {
      setCount(c => c + 1)
      console.log('⏱️ Timer tick')
    }, 1000)
    console.log('✅ Timer started, ID:', intervalRef.current)
  }

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
      console.log('⏹️ Timer stopped')
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>4.5 useRef vs useState</h1>

      <div className="warning">
        <strong>Key Difference:</strong> useState triggers re-renders when changed, useRef does not.
        Use useState for UI data, useRef for instance values.
      </div>

      <div className="demo-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* useState example */}
          <div style={{ padding: '1.5rem', border: '3px solid #4caf50', borderRadius: '8px' }}>
            <h2>useState Example</h2>
            <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '1rem' }}>
              Counter shown in UI
            </p>

            <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>
              Count: {count}
            </div>

            <button onClick={() => setCount(count + 1)} style={{ marginRight: '0.5rem' }}>
              Increment
            </button>
            <button onClick={() => setCount(0)}>
              Reset
            </button>

            <div className="success" style={{ marginTop: '1rem', fontSize: '0.9em' }}>
              ✅ <strong>Changes trigger re-render</strong>
              <br/>✅ New value next render
              <br/>✅ Asynchronous update
              <br/>✅ Use when: Value shown in UI
            </div>

            <div className="code-block" style={{ marginTop: '1rem' }}>
              <pre style={{ fontSize: '0.75em' }}>{`const [count, setCount] = useState(0)

return <div>{count}</div>
// count appears in JSX`}</pre>
            </div>
          </div>

          {/* useRef example */}
          <div style={{ padding: '1.5rem', border: '3px solid #2196f3', borderRadius: '8px' }}>
            <h2>useRef Example</h2>
            <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '1rem' }}>
              Timer ID hidden from UI
            </p>

            <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>
              Count: {count}
            </div>

            <button onClick={startTimer} style={{ marginRight: '0.5rem' }}>
              Start Timer
            </button>
            <button onClick={stopTimer}>
              Stop Timer
            </button>

            <div className="success" style={{ marginTop: '1rem', fontSize: '0.9em' }}>
              ✅ <strong>Changes DON'T trigger re-render</strong>
              <br/>✅ Updated value immediately
              <br/>✅ Synchronous update
              <br/>✅ Use when: Value NOT shown in UI
            </div>

            <div className="code-block" style={{ marginTop: '1rem' }}>
              <pre style={{ fontSize: '0.75em' }}>{`const intervalRef = useRef<number>()

intervalRef.current = setInterval(...)
// Timer ID not in JSX`}</pre>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Component Render Count:</strong> {componentRenderCount}
          <p style={{ fontSize: '0.9em', marginTop: '0.5rem' }}>
            Notice: Clicking "Start Timer" doesn't cause a re-render because it only updates the ref!
            Only the timer ticks (which call setCount) cause re-renders.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// useState: For UI data
const [count, setCount] = useState(0)
setCount(count + 1)  // Triggers re-render
return <div>{count}</div>  // Value shown in UI

// useRef: For instance values
const intervalRef = useRef<number>()
intervalRef.current = setInterval(...)  // No re-render
// Timer ID not needed in JSX, just for cleanup

// ⚠️ Common mistake: Using useState for timer IDs
const [timerId, setTimerId] = useState<number>()
// Wasteful - causes unnecessary re-render when setting timer ID!

// ✅ Correct: Use useRef for timer IDs
const timerRef = useRef<number>()
// No re-render, immediate access, perfect!`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Rule:</strong> If it affects what renders, use useState. If not, use useRef.</p>
        <p><strong>Tip:</strong> Check console logs to see timer lifecycle events.</p>
      </div>
    </main>
  )
}
