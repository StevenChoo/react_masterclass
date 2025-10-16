'use client'

import Link from 'next/link'

export default function KeysInListsDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>Pitfall #2: Keys in Lists</h1>

      <div className="warning">
        <strong>The Problem:</strong> Missing, duplicate, or index-based keys confuse React's reconciliation algorithm.
        This causes wrong updates, lost state, and performance issues.
      </div>

      <div className="demo-section" style={{ marginTop: '2rem' }}>
        <h2>📍 See Full Interactive Demo</h2>
        <p>This pitfall is covered in detail in Section 3: The Basics</p>

        <Link href="/section-3/lists-and-keys" style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          background: '#0070f3',
          color: 'white',
          borderRadius: '4px',
          textDecoration: 'none'
        }}>
          → Go to Lists and Keys Demo (Section 3.4)
        </Link>

        <div style={{ marginTop: '2rem' }} className="code-block">
          <pre>{`// 🙅 Wrong: Index as key
{todos.map((todo, index) => (
  <li key={index}>{todo.text}</li>
))}
// Problem: Reordering breaks - same index, different data

// ✅ Correct: Stable ID from data
{todos.map(todo => (
  <li key={todo.id}>{todo.text}</li>
))}
// Solution: Stable key tracks identity correctly`}</pre>
        </div>

        <div className="banner banner-tip" style={{ marginTop: '1rem', padding: '1rem', background: '#fee', borderRadius: '4px' }}>
          ⚠️ <strong>Rule 3 of Reconciliation:</strong> Keys provide stable identity across renders.
          Think of them like database primary keys - you wouldn't use array indexes as primary keys!
        </div>
      </div>
    </main>
  )
}
