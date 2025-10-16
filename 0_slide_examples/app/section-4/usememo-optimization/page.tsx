'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

let calculationCount = 0
let componentRenderCount = 0

// Expensive calculation: Find prime numbers
const findPrimes = (max: number): number[] => {
  calculationCount++
  console.log(`🔢 Calculating primes up to ${max}... (calculation #${calculationCount})`)

  const primes: number[] = []
  for (let i = 2; i <= max; i++) {
    let isPrime = true
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false
        break
      }
    }
    if (isPrime) primes.push(i)
  }

  return primes
}

/*
// 🙅 FAULTY VERSION - Without useMemo

function WithoutMemoComponent() {
  componentRenderCount++
  const [maxNumber, setMaxNumber] = useState(1000)
  const [unrelatedCount, setUnrelatedCount] = useState(0)

  // Recalculates EVERY render! 💥
  const primes = findPrimes(maxNumber)

  return (
    <div className="demo-section">
      <h2>🙅 Without useMemo</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setMaxNumber(maxNumber + 500)}>
          Increase Max: {maxNumber}
        </button>
        <button onClick={() => setUnrelatedCount(unrelatedCount + 1)} style={{ marginLeft: '0.5rem' }}>
          Unrelated Count: {unrelatedCount}
        </button>
      </div>

      <div className="error">
        <strong>Problem:</strong> Click "Unrelated Count" - the expensive calculation runs even though
        maxNumber didn't change! Check console for calculation logs.
        <br/>
        <br/>
        Found {primes.length} primes. Calculation ran {calculationCount} times.
      </div>
    </div>
  )
}
*/

// ✅ CORRECT VERSION - With useMemo

function WithMemoComponent() {
  componentRenderCount++
  const [maxNumber, setMaxNumber] = useState(1000)
  const [unrelatedCount, setUnrelatedCount] = useState(0)

  // Only recalculates when maxNumber changes! ✅
  const primes = useMemo(() => {
    return findPrimes(maxNumber)
  }, [maxNumber])

  return (
    <div className="demo-section">
      <h2>✅ With useMemo</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setMaxNumber(maxNumber + 500)} style={{ marginRight: '0.5rem' }}>
          Increase Max: {maxNumber}
        </button>
        <button onClick={() => setUnrelatedCount(unrelatedCount + 1)}>
          Unrelated Count: {unrelatedCount}
        </button>
      </div>

      <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Component Render Count:</strong> {componentRenderCount}
        <br/>
        <strong>Calculation Run Count:</strong> {calculationCount}
        <br/>
        <strong>Primes Found:</strong> {primes.length}
      </div>

      <div className="success">
        <strong>Success!</strong> Click "Unrelated Count" - calculation doesn't re-run!
        <br/>Only runs when maxNumber changes.
        <br/>Check console - no unnecessary calculations ✅
      </div>

      <details style={{ marginTop: '1rem' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Show Prime Numbers</summary>
        <div style={{ marginTop: '0.5rem', fontSize: '0.85em', maxHeight: '100px', overflow: 'auto' }}>
          {primes.join(', ')}
        </div>
      </details>
    </div>
  )
}

export default function UseMemoOptimizationDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-4/usememo-optimization-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>4.6 useMemo: Performance Optimization</h1>

      <div className="warning">
        <strong>Purpose:</strong> useMemo caches expensive calculations between renders.
        Only recalculates when dependencies change, preventing unnecessary work!
      </div>

      <div className="demo-container">
        <WithMemoComponent />
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Without useMemo - recalculates every render
function Component({ items }) {
  const expensiveResult = expensiveCalculation(items)
  // Runs on EVERY render, even if items unchanged!
  return <div>{expensiveResult}</div>
}

// ✅ With useMemo - only recalculates when items change
function Component({ items }) {
  const expensiveResult = useMemo(
    () => expensiveCalculation(items),
    [items]  // Only recalculate if items changes
  )
  return <div>{expensiveResult}</div>
}

// Example: Filtering large lists
const filteredItems = useMemo(
  () => items.filter(item => item.active),
  [items]
)

// When to use useMemo:
// ✅ Heavy calculations (filtering 1000s of items, complex math)
// ✅ Avoiding expensive re-calculations
// ✅ Preventing object recreation for dependencies

// 🙅 Don't use everywhere - it has overhead too!
// Only use when you've measured that it's needed.`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Rule:</strong> Profile first, optimize second. Don't use useMemo everywhere!</p>
        <p><strong>Tip:</strong> Uncomment faulty version at top to see the performance problem.</p>
      </div>
    </main>
  )
}
