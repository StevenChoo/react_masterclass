'use client'

import { useState } from 'react'
import Link from 'next/link'

// 🙅 FAULTY VERSION - Missing preventDefault and stopPropagation

export default function EventHandlingFaultyDemo() {
  const [text, setText] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState<Array<{ text: string; email: string; timestamp: string }>>([])
  const [parentClickCount, setParentClickCount] = useState(0)
  const [innerClickCount, setInnerClickCount] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  // 🔴 FAULTY: Missing e.preventDefault()
  const handleSubmitFaulty = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('🔴 Form submitted:', { text, email })
    console.log('🔴 About to add to state...')

    if (text.trim() || email.trim()) {
      setSubmitted([
        ...submitted,
        {
          text: text || '(empty)',
          email: email || '(empty)',
          timestamp: new Date().toLocaleTimeString()
        }
      ])
      setText('')
      setEmail('')
    }
    // 💥 Missing e.preventDefault()!
    // Page will reload and all state will be lost!
    console.log('🔴 State updated... but page will reload now! 💥')
  }

  const handleParentClick = () => {
    setParentClickCount(prev => prev + 1)
    console.log('🔴 Parent div clicked! Count:', parentClickCount + 1)
  }

  // 🔴 FAULTY: Missing e.stopPropagation()
  const handleInnerClickFaulty = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInnerClickCount(prev => prev + 1)
    console.log('🔴 Inner button clicked! Count:', innerClickCount + 1)
    // 💥 Missing e.stopPropagation()!
    // Event will bubble to parent, triggering BOTH handlers!
    console.log('🔴 Event will now bubble to parent... 💥')
  }

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problems.</strong>
        {' '}
        <Link href="/section-3/event-handling" style={{ color: '#28a745', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>Event Handling - Faulty Version</h1>

      <div className="warning">
        <strong>The Problem:</strong> Missing e.preventDefault() and e.stopPropagation() causes unexpected behavior!
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>🙅 Problem 1: Missing preventDefault()</h2>
          <form onSubmit={handleSubmitFaulty} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input
              type="text"
              value={text}
              onChange={handleChange}
              placeholder="Enter text..."
            />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email..."
            />
            <button type="submit">Submit Form (will reload page!)</button>
          </form>

          <div style={{ marginTop: '1rem' }}>
            <h3>Submitted items ({submitted.length}):</h3>
            {submitted.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic' }}>No items yet (they get lost on page reload!)</p>
            ) : (
              <ul style={{ marginTop: '0.5rem' }}>
                {submitted.map((item, index) => (
                  <li key={index} style={{ padding: '0.5rem', border: '1px solid #ddd', marginBottom: '0.25rem' }}>
                    <strong>{item.timestamp}</strong> - {item.text} / {item.email}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="error" style={{ marginTop: '1rem' }}>
            <strong>Try this:</strong>
            <br/>1. Type something in both fields
            <br/>2. Click "Submit Form"
            <br/>3. Watch the page reload - all state is lost! 💥
            <br/>4. Check console to see the logs before reload
            <br/><br/>
            <strong>Why it happens:</strong> Without e.preventDefault(), the browser performs default form submission (page reload).
          </div>
        </div>

        <div className="demo-section">
          <h2>🙅 Problem 2: Missing stopPropagation()</h2>

          <div
            onClick={handleParentClick}
            style={{
              padding: '2rem',
              border: '2px solid #dc3545',
              borderRadius: '4px',
              cursor: 'pointer',
              background: '#ffe6e6'
            }}
          >
            <p><strong>Parent Div</strong> (Click count: {parentClickCount})</p>
            <p style={{ fontSize: '0.9em', marginTop: '0.5rem' }}>Click anywhere in this red box</p>

            <button
              onClick={handleInnerClickFaulty}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: '#ffc107',
                border: '2px solid #ff9800',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Inner Button (Click count: {innerClickCount})
            </button>
          </div>

          <div className="error" style={{ marginTop: '1rem' }}>
            <strong>Try this:</strong>
            <br/>1. Click the yellow "Inner Button"
            <br/>2. Notice BOTH counters increment! 💥
            <br/>3. Check console - you'll see both handlers fire
            <br/>4. The parent div handler is triggered even though you clicked the button
            <br/><br/>
            <strong>Why it happens:</strong> Without e.stopPropagation(), the click event bubbles up to parent elements.
            <br/>
            <strong>Expected behavior:</strong> Only the button's counter should increment, not the parent's.
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Wrong: Missing preventDefault
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  console.log('Form submitted')
  setSubmitted([...submitted, text])
  // Missing e.preventDefault()!
  // Page reloads and state is lost! 💥
}

// 🙅 Wrong: Missing stopPropagation
const handleInnerClick = (e: React.MouseEvent) => {
  console.log('Inner clicked')
  setInnerCount(count + 1)
  // Missing e.stopPropagation()!
  // Event bubbles to parent! 💥
}

// 💡 Fix: Add e.preventDefault() to prevent default behavior
// 💡 Fix: Add e.stopPropagation() to stop event bubbling`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Rule:</strong> Always use e.preventDefault() on form submissions to prevent page reload!</p>
        <p><strong>Rule:</strong> Use e.stopPropagation() when you want to prevent parent handlers from firing!</p>
      </div>
    </main>
  )
}
