'use client'

import { useState, memo } from 'react'
import Link from 'next/link'

let childRenderCount = 0

// 🙅 FAULTY VERSION - Inline Functions Causing Re-renders (Active Demo)

const ExpensiveChild = memo(({ onClick }: { onClick: () => void }) => {
  childRenderCount++
  console.log('🔴 ExpensiveChild rendered:', childRenderCount)

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

ExpensiveChild.displayName = 'ExpensiveChild'

export default function InlineFunctionsFaultyDemo() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problem.</strong>
        {' '}
        <Link href="/section-5/inline-functions" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>Pitfall #1: Inline Functions in JSX (Faulty - No useCallback)</h1>

      <div className="warning">
        <strong>The Problem:</strong> Creating new functions on every render causes child components to re-render unnecessarily.
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>🙅 Bad: Inline Function (No useCallback)</h2>
          <p>Parent count: <strong>{count}</strong></p>
          <button onClick={() => setCount(count + 1)}>Increment Parent Count</button>

          {/* 🔴 FAULTY: New function reference every render! */}
          <ExpensiveChild onClick={() => console.log('clicked')} />

          <div className="error" style={{ marginTop: '1rem' }}>
            <strong>🔴 The Problem:</strong>
            <br/>Click "Increment Parent Count" - child re-renders even though onClick logic didn't change!
            <br/>Check console: Child render count increases with every parent update.
            <br/><br/>
            <strong>Why?</strong>
            <br/>• We pass an inline function: <code>onClick={'{'}() =&gt; console.log('clicked'){'}'}</code>
            <br/>• Every render creates a NEW function with a NEW reference
            <br/>• React.memo compares: old onClick === new onClick? No! Different functions!
            <br/>• React thinks onClick prop changed, so it re-renders the child 💥
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
            <strong>React.memo is broken here!</strong> It checks if props changed using reference equality (===).
            Since we create a new function every render, onClick always looks "different" to React.memo,
            so it can't prevent the re-render.
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Current code - Inline function
function Parent() {
  const [count, setCount] = useState(0)
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <ExpensiveChild onClick={() => console.log('clicked')} />
    </>
  )
}

const ExpensiveChild = memo(({ onClick }) => {
  // This re-renders on every parent update! 💥
  return <button onClick={onClick}>Child Button</button>
})

// What React sees:
// Render 1: onClick = function#1
// Render 2: onClick = function#2 (NEW reference!)
// Render 3: onClick = function#3 (NEW reference!)
// React.memo: "Props changed every time, must re-render!"

// Why it's broken:
// - JavaScript creates new function every render
// - New function = new reference
// - React.memo uses === to compare props
// - function#1 === function#2? No! → Re-render
// - Result: React.memo is useless here`}</pre>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px' }}>
        <strong>🐛 The Bug:</strong> Inline functions create new references every render, breaking React.memo.
        Even though the function logic is identical, React sees it as a "new prop" and re-renders the child.
        Use useCallback to maintain the same function reference across renders!
      </div>
    </main>
  )
}
