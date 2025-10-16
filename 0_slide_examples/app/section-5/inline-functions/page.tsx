'use client'

import { useState, useCallback, memo } from 'react'
import Link from 'next/link'

let childRenderCount = 0

/*
// 🙅 FAULTY VERSION - Inline Functions Causing Re-renders
// Uncomment this to demonstrate the problem

const ExpensiveChild = memo(({ onClick }: { onClick: () => void }) => {
  childRenderCount++
  console.log('ExpensiveChild rendered:', childRenderCount)

  return (
    <div style={{ padding: '1rem', border: '2px solid red', marginTop: '1rem' }}>
      <p><strong>Expensive Child Component</strong></p>
      <p>Render count: {childRenderCount}</p>
      <button onClick={onClick}>Child Button</button>
      <div className="error" style={{ marginTop: '0.5rem' }}>
        🔴 Re-renders every time parent renders!
      </div>
    </div>
  )
})

export default function InlineFunctionsDemo() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>Pitfall #1: Inline Functions in JSX</h1>

      <div className="warning">
        <strong>The Problem:</strong> Creating new functions on every render causes child components to re-render unnecessarily.
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>🙅 Bad: Inline Function (No useCallback)</h2>
          <p>Parent count: <strong>{count}</strong></p>
          <button onClick={() => setCount(count + 1)}>Increment Parent Count</button>

          <ExpensiveChild onClick={() => console.log('clicked')} />

          <div className="error" style={{ marginTop: '1rem' }}>
            <strong>Problem:</strong> New function reference every render → React.memo doesn't work
          </div>
        </div>
      </div>
    </main>
  )
}
*/

// ✅ CORRECT VERSION - Using useCallback

const ExpensiveChild = memo(({ onClick }: { onClick: () => void }) => {
  childRenderCount++
  console.log('ExpensiveChild rendered:', childRenderCount)

  return (
    <div style={{ padding: '1rem', border: '2px solid green', marginTop: '1rem' }}>
      <p><strong>Expensive Child Component (Memoized)</strong></p>
      <p>Render count: {childRenderCount}</p>
      <button onClick={onClick}>Child Button</button>
      <div className="success" style={{ marginTop: '0.5rem' }}>
        ✅ Only re-renders when onClick changes!
      </div>
    </div>
  )
})

export default function InlineFunctionsDemo() {
  const [count, setCount] = useState(0)

  // Same function reference across renders
  const handleChildClick = useCallback(() => {
    console.log('Child button clicked!')
  }, []) // Empty deps = never changes

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-5/inline-functions-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>Pitfall #1: Inline Functions in JSX</h1>

      <div className="warning">
        <strong>The Problem:</strong> Creating new functions on every render causes child components to re-render unnecessarily.
        React.memo() won't work if props are new function references every render.
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>✅ Correct: Using useCallback</h2>
          <p>Parent count: <strong>{count}</strong></p>
          <button onClick={() => setCount(count + 1)}>Increment Parent Count</button>

          <ExpensiveChild onClick={handleChildClick} />

          <div className="success" style={{ marginTop: '1rem' }}>
            <strong>Solution:</strong> useCallback creates stable function reference → React.memo works correctly
            <br />
            <strong>Result:</strong> Click "Increment Parent Count" - child doesn't re-render!
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// ✅ Correct with useCallback
const handleChildClick = useCallback(() => {
  console.log('clicked')
}, []) // Empty deps = never changes

<ExpensiveChild onClick={handleChildClick} />

// 🙅 Wrong - inline function
<ExpensiveChild onClick={() => console.log('clicked')} />
// New function every render = memo doesn't work`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Tip:</strong> To see the faulty version, uncomment the code block at the top of this file.</p>
        <p><strong>Performance Impact:</strong> This problem multiplies with nested components - can cause entire app slowdowns!</p>
      </div>
    </main>
  )
}
