'use client'

import { useState } from 'react'
import Link from 'next/link'

/*
// 🙅 FAULTY VERSION - The "0" Pitfall
// Uncomment this to demonstrate the bug during live session

export default function ConditionalRenderingDemo() {
  const [items, setItems] = useState<string[]>([])

  function addItem() {
    setItems([...items, `Item ${items.length + 1}`])
  }

  function clearItems() {
    setItems([])
  }

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>Conditional Rendering: The "0" Pitfall</h1>

      <div className="demo-container">
        <div className="demo-section">
          <h2>🙅 Wrong: Renders "0" when empty</h2>
          <button onClick={addItem}>Add Item</button>
          <button onClick={clearItems}>Clear All</button>

          <div style={{ marginTop: '1rem', padding: '1rem', border: '2px solid red', minHeight: '50px' }}>
            {items.length && <p>Found {items.length} items</p>}
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="error">
            <strong>Problem:</strong> When items = [], renders "0" in the red box!
            <br/>
            JavaScript: 0 is falsy but React renders it as text
          </div>
        </div>
      </div>
    </main>
  )
}
*/

// ✅ CORRECT VERSION - Explicit Boolean Check

export default function ConditionalRenderingDemo() {
  const [items, setItems] = useState<string[]>([])

  function addItem() {
    setItems([...items, `Item ${items.length + 1}`])
  }

  function clearItems() {
    setItems([])
  }

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-3/conditional-rendering-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>Conditional Rendering: The "0" Pitfall</h1>

      <div className="warning">
        <strong>Key Concept:</strong> JavaScript renders 0 as a valid value, not as false.
        This causes unexpected "0" to appear in your UI when using the && operator.
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>✅ Correct: Explicit Boolean Check</h2>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button onClick={addItem}>Add Item</button>
            <button onClick={clearItems}>Clear All</button>
          </div>

          <div style={{ padding: '1rem', border: '2px solid green', minHeight: '50px' }}>
            {items.length > 0 && <p>Found {items.length} items</p>}
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="success" style={{ marginTop: '1rem' }}>
            <strong>Solution:</strong> Convert to explicit boolean with comparison (items.length {'>'} 0)
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Wrong - renders "0"
{items.length && <p>Found {items.length} items</p>}
// When items = [], this renders: 0

// ✅ Correct - explicit boolean
{items.length > 0 && <p>Found {items.length} items</p>}
// When items = [], this renders nothing

// Why? JavaScript falsy values:
// 0, '', false, null, undefined, NaN
// React renders 0 and '' as text!
// React does NOT render: false, null, undefined`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Tip:</strong> To see the faulty version, uncomment the code block at the top of this file and comment out the correct version.</p>
      </div>
    </main>
  )
}
