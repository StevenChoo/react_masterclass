'use client'

import { useState } from 'react'
import Link from 'next/link'

// 🙅 FAULTY VERSION - Renders "0" (Active Demo)

function FaultyProductList() {
  const [items, setItems] = useState<string[]>([])

  const addItem = () => {
    setItems([...items, `Product ${items.length + 1}`])
  }

  const clearItems = () => {
    setItems([])
  }

  return (
    <div className="demo-section">
      <h2>🙅 Problem: Renders "0"</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={addItem} style={{ marginRight: '0.5rem' }}>
          Add Product
        </button>
        <button onClick={clearItems}>
          Clear All
        </button>
      </div>

      <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '4px', minHeight: '100px' }}>
        <p><strong>Items in cart: {items.length}</strong></p>

        {/* 🔴 FAULTY: This renders "0" when items is empty! */}
        {items.length && (
          <ul style={{ marginTop: '0.5rem' }}>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="error" style={{ marginTop: '1rem' }}>
        <strong>🔴 The Problem:</strong>
        <br/>Click "Clear All". You'll see a "0" displayed on the page!
        <br/><br/>
        <strong>Why?</strong>
        <br/>• When items is empty, <code>items.length</code> equals 0
        <br/>• JavaScript's && operator returns the LEFT value if it's falsy
        <br/>• <code>0 && &lt;ul&gt;...&lt;/ul&gt;</code> returns 0
        <br/>• React renders 0 as text on the page! 💥
      </div>

      <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
        <strong>JavaScript quirk:</strong> The && operator doesn't convert to boolean.
        <br/>• <code>0 && anything</code> returns 0 (falsy, but React renders it!)
        <br/>• <code>false && anything</code> returns false (React doesn't render)
        <br/>• <code>null && anything</code> returns null (React doesn't render)
      </div>
    </div>
  )
}

export default function ConditionalRenderingFaultyDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problem.</strong>
        {' '}
        <Link href="/section-3/conditional-rendering" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>3.3 Conditional Rendering (Faulty - The "0" Bug)</h1>

      <div className="warning">
        <strong>The Problem:</strong> Using <code>items.length && &lt;Component /&gt;</code>
        renders "0" on the page when the array is empty. This is Josh Comeau's #1 React pitfall!
      </div>

      <div className="demo-container">
        <FaultyProductList />
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Current code - Renders "0"
{items.length && <Component />}

// When items.length is 0:
// 0 && <Component />  →  evaluates to 0
// React renders: 0 (as text!)

// What React renders:
// - 0 → renders as "0" (number as string)
// - "" → renders as empty string (visible in some cases)
// - false → doesn't render ✅
// - null → doesn't render ✅
// - undefined → doesn't render ✅

// Why this happens:
// JavaScript's && returns the first falsy value
// OR the last value if all are truthy:
console.log(0 && 'hello')      // 0
console.log(false && 'hello')  // false
console.log(null && 'hello')   // null
console.log(5 && 'hello')      // 'hello'`}</pre>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px' }}>
        <strong>🐛 The Bug:</strong> The && operator returns the LEFT value if it's falsy.
        When <code>items.length</code> is 0, the expression evaluates to 0, and React renders
        it as text. Use explicit boolean checks: <code>items.length > 0 && ...</code>
      </div>
    </main>
  )
}
