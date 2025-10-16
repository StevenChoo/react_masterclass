'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

/*
// 🙅 FAULTY VERSION - No Cleanup (Memory Leak!)
// Uncomment this to demonstrate the problem

function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    console.log('⚠️ Timer started (NO cleanup)')
    // Timer starts
    setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)

    // No cleanup! 🙅
    // Timer keeps running after unmount
  }, [])

  if (!isVisible) return null

  return <div style={{ padding: '1rem', border: '2px solid red' }}>
    <p>Seconds: {seconds}</p>
    <div className="error">
      🔴 Timer running without cleanup! Check console for errors when you hide this.
    </div>
  </div>
}

export default function UseEffectCleanupDemo() {
  const [showTimer, setShowTimer] = useState(true)
  const [mountCount, setMountCount] = useState(0)

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>Pitfall #5: useEffect Cleanup</h1>

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
            <strong>Try this:</strong>
            <br/>1. Show/hide the timer multiple times
            <br/>2. Check console - you'll see errors trying to update unmounted component
            <br/>3. Each mount creates a NEW timer that never gets cleaned up!
          </div>
        </div>
      </div>
    </main>
  )
}
*/

// ✅ CORRECT VERSION - With Cleanup

function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    console.log('✅ Timer started (with cleanup)')
    // Timer starts
    const intervalId = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)

    // Cleanup function ✅
    return () => {
      console.log('✅ Timer cleaned up')
      clearInterval(intervalId)
    }
  }, [])

  return <div style={{ padding: '1rem', border: '2px solid green' }}>
    <p>Seconds: {seconds}</p>
    <div className="success">
      ✅ Timer properly cleaned up on unmount!
    </div>
  </div>
}

export default function UseEffectCleanupDemo() {
  const [showTimer, setShowTimer] = useState(true)
  const [mountCount, setMountCount] = useState(0)

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-5/useeffect-cleanup-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>Pitfall #5: useEffect Cleanup</h1>

      <div className="warning">
        <strong>The Problem:</strong> Not returning a cleanup function from useEffect causes memory leaks,
        race conditions, and crashes. If useEffect creates something, cleanup must destroy it!
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>✅ Correct: With Cleanup Function</h2>
          <button onClick={() => {
            setShowTimer(!showTimer)
            if (!showTimer) setMountCount(mountCount + 1)
          }}>
            {showTimer ? 'Hide Timer' : 'Show Timer'}
          </button>
          <p>Times mounted: {mountCount}</p>

          {showTimer && <Timer />}

          <div className="success" style={{ marginTop: '1rem' }}>
            <strong>Try this:</strong>
            <br/>1. Show/hide the timer multiple times
            <br/>2. Check console - clean mount/unmount messages
            <br/>3. No errors! Timer is properly cleaned up each time
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// ✅ Correct with cleanup
useEffect(() => {
  const intervalId = setInterval(() => {
    setSeconds(s => s + 1)
  }, 1000)

  return () => clearInterval(intervalId) // Cleanup!
}, [])

// 🙅 Wrong - no cleanup
useEffect(() => {
  setInterval(() => setSeconds(s => s + 1), 1000)
  // Timer keeps running after unmount! Memory leak!
}, [])`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Tip:</strong> To see the faulty version, uncomment the code block at the top.</p>
        <p><strong>Rule:</strong> Always return cleanup for: setInterval, setTimeout, event listeners, subscriptions, WebSockets</p>
      </div>
    </main>
  )
}
