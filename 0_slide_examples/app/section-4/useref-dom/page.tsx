'use client'

import { useRef } from 'react'
import Link from 'next/link'

export default function UseRefDOMDemo() {
  const inputRef = useRef<HTMLInputElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const focusInput = () => {
    inputRef.current?.focus()
    console.log('✅ Input focused via useRef')
  }

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    console.log('✅ Scrolled to section via useRef')
  }

  const getInputValue = () => {
    const value = inputRef.current?.value || ''
    alert(`Input value: "${value}"`)
    console.log('✅ Read input value:', value)
  }

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
      console.log('✅ Cleared input')
    }
  }

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>4.4 useRef: DOM References</h1>

      <div className="warning">
        <strong>Purpose:</strong> useRef provides a way to access DOM elements directly,
        the RIGHT way to manipulate DOM in React (unlike document.querySelector).
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>Example 1: Focus Management</h2>

          <div style={{ marginBottom: '1rem' }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type something..."
              style={{
                padding: '0.5rem',
                fontSize: '1rem',
                border: '2px solid #ccc',
                borderRadius: '4px',
                marginRight: '0.5rem',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={focusInput}>Focus Input</button>
            <button onClick={getInputValue}>Get Value</button>
            <button onClick={clearInput}>Clear & Focus</button>
          </div>

          <div className="success" style={{ marginTop: '1rem' }}>
            <strong>Valid use case:</strong> Focus management for accessibility (keyboard navigation,
            form validation, autofocus on modals)
          </div>
        </div>

        <div className="demo-section" style={{ marginTop: '2rem' }}>
          <h2>Example 2: Scroll to Element</h2>

          <button onClick={scrollToSection} style={{ marginBottom: '1rem' }}>
            Scroll to Bottom Section
          </button>

          <div style={{ height: '200px', overflow: 'auto', border: '2px solid #ccc', padding: '1rem' }}>
            <p>Scroll content... Lorem ipsum dolor sit amet.</p>
            <p>More content here...</p>
            <p>Keep scrolling...</p>
            <p>Almost there...</p>

            <div
              ref={sectionRef}
              style={{
                padding: '1rem',
                background: '#e3f2fd',
                border: '2px solid #1976d2',
                borderRadius: '4px',
                marginTop: '1rem',
              }}
            >
              <strong>🎯 Target Section</strong>
              <p>You scrolled here using useRef!</p>
            </div>
          </div>

          <div className="success" style={{ marginTop: '1rem' }}>
            <strong>Valid use case:</strong> Scroll position management, smooth scrolling to sections,
            "scroll to top" buttons
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  const focusInput = () => {
    // Access the actual DOM element
    inputRef.current?.focus()
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  )
}

// Other valid use cases:
// - Measuring elements (getBoundingClientRect())
// - Integrating non-React libraries (charts, maps)
// - Managing media playback (video.play())
// - Triggering animations

// 🙅 Invalid use case: Don't use refs to replace state!
// If it affects what renders, use useState instead.`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Rule:</strong> useRef for DOM access is the RIGHT way to manipulate DOM in React.</p>
        <p><strong>Tip:</strong> Check console for logs when interacting with the demos.</p>
      </div>
    </main>
  )
}
