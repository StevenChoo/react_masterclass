'use client'

import { useState } from 'react'
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

// 🙅 FAULTY VERSION - Without useMemo (Active Demo)

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

      <div className="error">
        <strong>Problem:</strong> Click "Unrelated Count" - the expensive calculation runs even though
        maxNumber didn't change! Check console for calculation logs.
        <br/><br/>
        Every render triggers the expensive findPrimes calculation, even when maxNumber stays the same.
        This wastes CPU and makes the UI sluggish! 💥
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

export default function UseMemoOptimizationFaultyDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problem.</strong>
        {' '}
        <Link href="/section-4/usememo-optimization" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>4.6 useMemo Optimization (Faulty)</h1>

      <div className="warning">
        <strong>The Problem:</strong> Without useMemo, expensive calculations run on EVERY render,
        even when their inputs haven't changed. This kills performance!
      </div>

      <div className="demo-container">
        <WithoutMemoComponent />
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Current code - Without useMemo
function Component({ items }) {
  const expensiveResult = expensiveCalculation(items)
  // Runs on EVERY render, even if items unchanged! 💥
  return <div>{expensiveResult}</div>
}

// What happens:
// 1. User clicks unrelated button
// 2. Component re-renders
// 3. expensiveCalculation runs AGAIN
// 4. Same result, but wasted CPU time!

// Example with our demo:
const primes = findPrimes(maxNumber)
// Every time setUnrelatedCount runs:
// - Component re-renders
// - findPrimes calculates AGAIN
// - Same maxNumber, same result, wasted work!`}</pre>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px' }}>
        <strong>🐛 The Bug:</strong> The expensive calculation runs every single render, regardless
        of whether maxNumber changed. Click "Unrelated Count" and watch the calculation count increase
        even though we're finding the exact same primes!
      </div>
    </main>
  )
}
