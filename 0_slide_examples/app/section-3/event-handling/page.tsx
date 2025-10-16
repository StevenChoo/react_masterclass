'use client'

import { useState } from 'react'
import Link from 'next/link'

/*
// 🙅 FAULTY VERSION - Without preventDefault
// Uncomment this to demonstrate the bug during live session

export default function EventHandlingDemo() {
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  // 🙅 Missing preventDefault - page will reload!
  const handleSubmitWrong = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Form submitted:', text)
    setSubmitted([...submitted, text])
    setText('')
    // Page reloads! State is lost! 😱
  }

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>Event Handling</h1>

      <div className="demo-container">
        <div className="demo-section">
          <h2>🙅 Wrong: Page Reloads</h2>
          <form onSubmit={handleSubmitWrong}>
            <input
              type="text"
              value={text}
              onChange={handleChange}
              placeholder="Type something..."
            />
            <button type="submit">Submit</button>
          </form>

          <div style={{ marginTop: '1rem' }}>
            <h3>Submitted items:</h3>
            <ul>
              {submitted.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="error">
            <strong>Problem:</strong> Without e.preventDefault(), form submission
            reloads the page and loses all state!
          </div>
        </div>
      </div>
    </main>
  )
}
*/

// ✅ CORRECT VERSION - With preventDefault

export default function EventHandlingDemo() {
  const [text, setText] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState<Array<{ text: string; email: string; timestamp: string }>>([])
  const [clickCount, setClickCount] = useState(0)
  const [lastClickPosition, setLastClickPosition] = useState<{ x: number; y: number } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()  // ✅ Prevent page reload!
    console.log('Form submitted:', { text, email })

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
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClickCount(prev => prev + 1)
    setLastClickPosition({ x: e.clientX, y: e.clientY })
  }

  const handleInnerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()  // Stop event from bubbling to parent
    alert('Inner button clicked! Event did not bubble to parent.')
  }

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-3/event-handling-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>Event Handling</h1>

      <div className="warning">
        <strong>Key Concepts:</strong> React wraps browser events in SyntheticEvent for cross-browser consistency.
        Always use e.preventDefault() on forms to prevent page reload.
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>✅ Correct: Form Handling</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
            <button type="submit">Submit Form</button>
          </form>

          <div style={{ marginTop: '1rem' }}>
            <h3>Submitted items ({submitted.length}):</h3>
            <ul style={{ marginTop: '0.5rem' }}>
              {submitted.map((item, index) => (
                <li key={index} style={{ padding: '0.5rem', border: '1px solid #ddd', marginBottom: '0.25rem' }}>
                  <strong>{item.timestamp}</strong> - {item.text} / {item.email}
                </li>
              ))}
            </ul>
          </div>

          <div className="success" style={{ marginTop: '1rem' }}>
            <strong>Solution:</strong> e.preventDefault() prevents default browser behavior (page reload)
          </div>
        </div>

        <div className="demo-section">
          <h2>Mouse Events</h2>
          <button onClick={handleClick}>
            Click Me! (Count: {clickCount})
          </button>

          {lastClickPosition && (
            <p style={{ marginTop: '0.5rem' }}>
              Last click position: X: {lastClickPosition.x}, Y: {lastClickPosition.y}
            </p>
          )}

          <div style={{ marginTop: '1rem' }}>
            <h3>Event Propagation</h3>
            <div
              onClick={() => alert('Parent div clicked!')}
              style={{ padding: '1rem', border: '2px solid blue', cursor: 'pointer' }}
            >
              Click me (parent)
              <button onClick={handleInnerClick} style={{ marginLeft: '1rem' }}>
                Or click me (child - stops propagation)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// ✅ Prevent default behavior
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()  // Don't reload page!
  // Handle form submission
}

// ✅ Stop propagation
const handleInnerClick = (e: React.MouseEvent) => {
  e.stopPropagation()  // Don't trigger parent!
  // Handle click
}

// Common TypeScript event types:
// - React.FormEvent<HTMLFormElement> - form submissions
// - React.ChangeEvent<HTMLInputElement> - input changes
// - React.MouseEvent<HTMLButtonElement> - mouse clicks
// - React.KeyboardEvent<HTMLInputElement> - keyboard events`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Tip:</strong> To see the faulty version (page reload), uncomment the code block at the top of this file and comment out the correct version.</p>
      </div>
    </main>
  )
}
