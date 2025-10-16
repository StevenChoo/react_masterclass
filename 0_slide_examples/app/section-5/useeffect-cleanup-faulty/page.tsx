'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// 🙅 FAULTY VERSION - No Cleanup (Memory Leak!) - Active Demo

function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    console.log('⚠️ Timer started (NO cleanup)')
    // Timer starts
    setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)

    // No cleanup! 🙅
    // Timer keeps running after unmount
  }, [])

  return <div style={{ padding: '1rem', border: '2px solid red' }}>
    <p>Seconds: {seconds}</p>
    <div className="error">
      🔴 Timer running without cleanup! Check console for errors when you hide this.
    </div>
  </div>
}

export default function UseEffectCleanupFaultyDemo() {
  const [showTimer, setShowTimer] = useState(true)
  const [mountCount, setMountCount] = useState(0)

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problem.</strong>
        {' '}
        <Link href="/section-5/useeffect-cleanup" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>Pitfall #5: useEffect Cleanup (Faulty - No Cleanup)</h1>

      <div className="warning">
        <strong>The Problem:</strong> Not returning a cleanup function causes memory leaks,
        race conditions, and crashes when setting state on unmounted components.
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>🙅 Bad: No Cleanup Function</h2>
          <button onClick={() => {
            setShowTimer(!showTimer)
            if (!showTimer) setMountCount(mountCount + 1)
          }}>
            {showTimer ? 'Hide Timer' : 'Show Timer'}
          </button>
          <p>Times mounted: {mountCount}</p>

          {showTimer && <Timer />}

          <div className="error" style={{ marginTop: '1rem' }}>
            <strong>🔴 The Problem:</strong>
            <br/>1. Click "Hide Timer" - the Timer component unmounts
            <br/>2. But setInterval keeps running! It tries to call setSeconds()
            <br/>3. Check console - you'll see React errors about updating unmounted components
            <br/>4. Click Show/Hide multiple times - each mount creates a NEW timer that never stops!
            <br/><br/>
            <strong>Why?</strong>
            <br/>• We start setInterval in useEffect
            <br/>• When component unmounts, setInterval keeps running
            <br/>• It tries to call setSeconds() on unmounted component 💥
            <br/>• React error: "Can't perform a React state update on an unmounted component"
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
            <strong>Memory leak!</strong> Each time you mount/unmount, you leak a setInterval timer.
            After 10 show/hide cycles, you have 10 timers running simultaneously, all trying to
            update non-existent components!
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Current code - No cleanup
useEffect(() => {
  console.log('Timer started')
  setInterval(() => {
    setSeconds(s => s + 1)
  }, 1000)

  // No cleanup! 💥
  // Timer keeps running after unmount
}, [])

// What happens:
// 1. Component mounts → setInterval starts
// 2. Component unmounts → interval STILL RUNS
// 3. Interval calls setSeconds() → React error!
// 4. Mount again → NEW interval starts (old one still running!)
// 5. Unmount again → TWO intervals still running!
// Result: Memory leak + React errors

// The lifecycle problem:
// Mount: ✅ Start interval
// Unmount: ❌ Interval keeps running (not cleaned up)
// Mount again: ✅ Start ANOTHER interval
// Now you have TWO intervals running for one component!`}</pre>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px' }}>
        <strong>🐛 The Bug:</strong> useEffect creates side effects (timers, listeners, subscriptions).
        When the component unmounts, those side effects must be cleaned up. Without a cleanup function,
        they keep running forever, causing memory leaks and trying to update components that don't exist anymore!
      </div>
    </main>
  )
}
