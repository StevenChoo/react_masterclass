'use client'

import Link from 'next/link'

export default function ConditionalWithZeroDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>Pitfall #3: Conditional Rendering with 0</h1>

      <div className="warning">
        <strong>The Problem:</strong> JavaScript's && operator returns the left value if falsy, not false.
        When items.length is 0, it renders the number "0" on the page!
      </div>

      <div className="demo-section" style={{ marginTop: '2rem' }}>
        <h2>📍 See Full Interactive Demo</h2>
        <p>This is Josh Comeau's #1 React pitfall! Covered in detail in Section 3: The Basics</p>

        <Link href="/section-3/conditional-rendering" style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          background: '#0070f3',
          color: 'white',
          borderRadius: '4px',
          textDecoration: 'none'
        }}>
          → Go to Conditional Rendering Demo (Section 3.3)
        </Link>

        <div style={{ marginTop: '2rem' }} className="code-block">
          <pre>{`// 🙅 Wrong: Renders "0"
{items.length && <Component />}
// When items.length is 0, this renders: 0

// ✅ Correct: Explicit boolean
{items.length > 0 && <Component />}

// ✅ Alternative: Ternary
{items.length ? <Component /> : null}

// ✅ Alternative: Convert to boolean
{!!items.length && <Component />}`}</pre>
        </div>

        <div className="banner banner-tip" style={{ marginTop: '1rem', padding: '1rem', background: '#fffbea', borderRadius: '4px' }}>
          ⚠️ <strong>JavaScript Quirk:</strong> 0 && anything returns 0, and React renders it!
          React renders: 0, "" (as text) but NOT: false, null, undefined
        </div>
      </div>
    </main>
  )
}
