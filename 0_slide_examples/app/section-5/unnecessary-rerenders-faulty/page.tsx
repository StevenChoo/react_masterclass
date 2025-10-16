'use client'

import { useState } from 'react'
import Link from 'next/link'

// Render counters
let parentRenderCount = 0
let expensiveChildRenderCount = 0
let cheapChildRenderCount = 0

// 🙅 FAULTY VERSION - No Memoization (Active Demo)

function ExpensiveChild({ data, onClick }: { data: number[], onClick: () => void }) {
  expensiveChildRenderCount++
  console.log('🔴 ExpensiveChild rendered:', expensiveChildRenderCount)

  // Expensive computation runs on EVERY render!
  console.log('💥 Computing sum... (expensive operation!)')
  const sum = data.reduce((acc, val) => acc + val, 0)

  return (
    <div className="error" style={{ padding: '1rem', margin: '1rem 0' }}>
      <p>ExpensiveChild Render Count: {expensiveChildRenderCount}</p>
      <p>Sum: {sum}</p>
      <button onClick={onClick}>Click Me</button>
      <p style={{ fontSize: '0.9em', marginTop: '0.5rem' }}>
        🔴 Re-renders on every parent update, even though data doesn't change!
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

export default function UnnecessaryRerendersFaultyDemo() {
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

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problem.</strong>
        {' '}
        <Link href="/section-5/unnecessary-rerenders" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>Pitfall #10: Unnecessary Re-renders (Faulty - No Memoization)</h1>

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

          <div className="error" style={{ marginTop: '1rem' }}>
            <strong>🔴 The Problem:</strong>
            <br/><br/>
            <strong>Test 1 - Click "Increment Unrelated State":</strong>
            <br/>• Parent re-renders (expected)
            <br/>• CheapChild re-renders (count didn't change!) 💥
            <br/>• ExpensiveChild re-renders (data and onClick didn't change!) 💥
            <br/>• ExpensiveChild recomputes sum (unnecessary work!) 💥
            <br/><br/>
            <strong>Why?</strong>
            <br/>• <code>const data = [1, 2, 3, 4, 5]</code> creates NEW array every render
            <br/>• <code>const handleClick = () =&gt; {'{'}...{'}'}</code> creates NEW function every render
            <br/>• React compares props with <code>===</code> (reference equality)
            <br/>• Old data array !== new data array (different references!)
            <br/>• Old function !== new function (different references!)
            <br/>• React thinks props changed → triggers re-render
            <br/>• But the VALUES are the same! [1,2,3,4,5] is still [1,2,3,4,5]
            <br/><br/>
            <strong>Performance Impact:</strong>
            <br/>• Every parent render = children re-render
            <br/>• Expensive computations run unnecessarily
            <br/>• With 10 children, you do 10x more work than needed
            <br/>• Multiplies with nesting → entire app slows down
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
            <strong>The root cause:</strong> JavaScript creates new object/array/function references
            on every render. React uses <code>===</code> to compare props. Even though the VALUES
            are identical, the REFERENCES are different, so React treats them as "changed" props.
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Current code - No memoization
function Parent() {
  const [count, setCount] = useState(0)
  const [other, setOther] = useState(0)

  // New references every render!
  const data = [1, 2, 3] // ❌ new array
  const handleClick = () => {} // ❌ new function

  return (
    <>
      <button onClick={() => setOther(other + 1)}>
        Update Unrelated State
      </button>
      <ExpensiveChild data={data} onClick={handleClick} />
    </>
  )
}

function ExpensiveChild({ data, onClick }) {
  // No React.memo!
  const sum = data.reduce((a, b) => a + b) // No useMemo!
  return <div onClick={onClick}>{sum}</div>
}

// What happens when you click "Update Unrelated State":
// 1. setOther(1) called
// 2. Parent re-renders
// 3. data = [1, 2, 3] created (new reference!)
// 4. handleClick = () => {} created (new reference!)
// 5. React: old data !== new data? Yes! (references differ)
// 6. React: old onClick !== new onClick? Yes! (references differ)
// 7. React: Props changed → ExpensiveChild must re-render
// 8. ExpensiveChild re-renders and recomputes sum
// 9. But nothing actually changed! Same values! 💥

// The triple whammy:
// ❌ No React.memo → component re-renders on every parent render
// ❌ No useMemo → array created with new reference every render
// ❌ No useCallback → function created with new reference every render
// Result: Constant unnecessary re-renders + wasted computations`}</pre>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px' }}>
        <strong>🐛 The Bug:</strong> Without memoization, React can't tell that props are "the same".
        Creating new arrays/functions every render gives them new references, so React sees them as
        "changed" even when values are identical. This causes unnecessary re-renders and wasted
        computations. Use React.memo + useMemo + useCallback to maintain stable references!
      </div>
    </main>
  )
}
