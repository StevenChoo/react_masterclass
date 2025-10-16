'use client'

import { useState, memo, useMemo, useCallback } from 'react'
import Link from 'next/link'

// Render counters
let parentRenderCount = 0
let expensiveChildRenderCount = 0
let cheapChildRenderCount = 0

/*
// 🙅 FAULTY VERSION - No Memoization

function ExpensiveChild({ data, onClick }: { data: number[], onClick: () => void }) {
  expensiveChildRenderCount++
  console.log('🔴 ExpensiveChild rendered:', expensiveChildRenderCount)

  // Expensive computation
  const sum = data.reduce((acc, val) => acc + val, 0)

  return (
    <div className="error" style={{ padding: '1rem', margin: '1rem 0' }}>
      <p>ExpensiveChild Render Count: {expensiveChildRenderCount}</p>
      <p>Sum: {sum}</p>
      <button onClick={onClick}>Click Me</button>
      <p style={{ fontSize: '0.9em', marginTop: '0.5rem' }}>
        🔴 Problem: Re-renders on every parent update, even though data doesn't change!
      </p>
    </div>
  )
}

function CheapChild({ count }: { count: number }) {
  cheapChildRenderCount++
  console.log('🔴 CheapChild rendered:', cheapChildRenderCount)

  return (
    <div style={{ padding: '0.5rem', border: '1px solid red', marginBottom: '1rem' }}>
      <p>CheapChild Render Count: {cheapChildRenderCount}</p>
      <p>Count: {count}</p>
      <p style={{ fontSize: '0.9em' }}>🔴 Also re-renders unnecessarily!</p>
    </div>
  )
}

export default function UnnecessaryRerendersDemo() {
  parentRenderCount++
  const [count, setCount] = useState(0)
  const [unrelatedState, setUnrelatedState] = useState(0)

  // New array reference every render!
  const data = [1, 2, 3, 4, 5]

  // New function reference every render!
  const handleClick = () => {
    console.log('Button clicked!')
  }

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>Pitfall #10: Unnecessary Re-renders</h1>

      <div className="warning">
        <strong>The Problem:</strong> Not using React.memo, useMemo, and useCallback causes
        child components to re-render even when their props haven't meaningfully changed.
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>🙅 Bad: No Optimization</h2>

          <p>Parent Render Count: {parentRenderCount}</p>

          <button onClick={() => setCount(count + 1)}>
            Increment Count: {count}
          </button>
          <button onClick={() => setUnrelatedState(unrelatedState + 1)} style={{ marginLeft: '0.5rem' }}>
            Increment Unrelated State: {unrelatedState}
          </button>

          <CheapChild count={count} />
          <ExpensiveChild data={data} onClick={handleClick} />

          <div className="error">
            <strong>Try this:</strong>
            <br/>1. Click "Increment Unrelated State"
            <br/>2. Check console - BOTH children re-render!
            <br/>3. But their props didn't actually change!
          </div>
        </div>
      </div>
    </main>
  )
}
*/

// ✅ CORRECT VERSION - With Memoization

const ExpensiveChild = memo(({ data, onClick }: { data: number[], onClick: () => void }) => {
  expensiveChildRenderCount++
  console.log('✅ ExpensiveChild rendered:', expensiveChildRenderCount)

  // Expensive computation (only runs when data changes)
  const sum = useMemo(() => {
    console.log('💡 Computing sum...')
    return data.reduce((acc, val) => acc + val, 0)
  }, [data])

  return (
    <div className="success" style={{ padding: '1rem', margin: '1rem 0' }}>
      <p>ExpensiveChild Render Count: {expensiveChildRenderCount}</p>
      <p>Sum: {sum}</p>
      <button onClick={onClick}>Click Me</button>
      <p style={{ fontSize: '0.9em', marginTop: '0.5rem' }}>
        ✅ Only re-renders when data or onClick changes!
      </p>
    </div>
  )
})

ExpensiveChild.displayName = 'ExpensiveChild'

const CheapChild = memo(({ count }: { count: number }) => {
  cheapChildRenderCount++
  console.log('✅ CheapChild rendered:', cheapChildRenderCount)

  return (
    <div style={{ padding: '0.5rem', border: '1px solid green', marginBottom: '1rem' }}>
      <p>CheapChild Render Count: {cheapChildRenderCount}</p>
      <p>Count: {count}</p>
      <p style={{ fontSize: '0.9em' }}>✅ Only re-renders when count changes!</p>
    </div>
  )
})

CheapChild.displayName = 'CheapChild'

export default function UnnecessaryRerendersDemo() {
  parentRenderCount++
  const [count, setCount] = useState(0)
  const [unrelatedState, setUnrelatedState] = useState(0)

  // Memoized data - same reference unless dependencies change
  const data = useMemo(() => [1, 2, 3, 4, 5], [])

  // Memoized callback - same reference across renders
  const handleClick = useCallback(() => {
    console.log('Button clicked!')
  }, [])

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-5/unnecessary-rerenders-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>Pitfall #10: Unnecessary Re-renders</h1>

      <div className="warning">
        <strong>The Problem:</strong> Child components re-render on every parent update,
        even when their props haven't meaningfully changed. Causes performance issues!
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>✅ Correct: With Memoization</h2>

          <p>Parent Render Count: {parentRenderCount}</p>

          <button onClick={() => setCount(count + 1)}>
            Increment Count: {count}
          </button>
          <button onClick={() => setUnrelatedState(unrelatedState + 1)} style={{ marginLeft: '0.5rem' }}>
            Increment Unrelated State: {unrelatedState}
          </button>

          <CheapChild count={count} />
          <ExpensiveChild data={data} onClick={handleClick} />

          <div className="success" style={{ marginTop: '1rem' }}>
            <strong>Try this:</strong>
            <br/>1. Click "Increment Unrelated State" - children DON'T re-render ✅
            <br/>2. Click "Increment Count" - only CheapChild re-renders ✅
            <br/>3. Check console to verify optimized rendering
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Wrong: No memoization
function Parent() {
  const data = [1, 2, 3] // New array every render!
  const handleClick = () => {} // New function every render!
  return <ExpensiveChild data={data} onClick={handleClick} />
}
// ExpensiveChild re-renders every time!

// ✅ Correct: Triple combo
function Parent() {
  // 1. useMemo for referential stability
  const data = useMemo(() => [1, 2, 3], [])

  // 2. useCallback for function stability
  const handleClick = useCallback(() => {
    console.log('clicked')
  }, [])

  // 3. React.memo to prevent re-render if props same
  return <ExpensiveChild data={data} onClick={handleClick} />
}

const ExpensiveChild = memo(({ data, onClick }) => {
  // Only re-renders if data or onClick reference changes
  const sum = useMemo(() => data.reduce((a, b) => a + b), [data])
  return <div onClick={onClick}>{sum}</div>
})

// 💡 Golden Rule: React.memo + useMemo + useCallback = Performance`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Tip:</strong> Uncomment the faulty version at the top to see unnecessary re-renders.</p>
        <p><strong>Rule:</strong> Use React.memo for components, useMemo for values, useCallback for functions!</p>
      </div>
    </main>
  )
}
