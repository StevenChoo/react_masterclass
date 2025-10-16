'use client'

import Link from 'next/link'

export default function MutatingStateDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>Pitfall #4: Mutating State</h1>

      <div className="warning">
        <strong>The Problem:</strong> Directly modifying state objects/arrays instead of creating new ones.
        React won't detect changes because the reference stays the same!
      </div>

      <div className="demo-section" style={{ marginTop: '2rem' }}>
        <h2>📍 See Full Interactive Demo</h2>
        <p>This breaks React's contract. Covered in detail in Section 3: The Basics</p>

        <Link href="/section-3/state-immutability" style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.75rem 1.5rem',
          background: '#0070f3',
          color: 'white',
          borderRadius: '4px',
          textDecoration: 'none'
        }}>
          → Go to State Immutability Demo (Section 3.2)
        </Link>

        <div style={{ marginTop: '2rem' }} className="code-block">
          <pre>{`// 🙅 Wrong: Direct mutation
const addTodo = (text) => {
  todos.push({ id: Date.now(), text })
  setTodos(todos) // Same reference!
  // React won't re-render!
}

// ✅ Correct: New array with spread
const addTodo = (text) => {
  setTodos([...todos, { id: Date.now(), text }])
  // New reference = React re-renders ✅
}

// 🙅 Wrong: Mutating object
todo.done = !todo.done
setTodos(todos)

// ✅ Correct: Map creates new array + objects
setTodos(todos.map(todo =>
  todo.id === id
    ? { ...todo, done: !todo.done }
    : todo
))`}</pre>
        </div>

        <div className="banner banner-tip" style={{ marginTop: '1rem', padding: '1rem', background: '#fee', borderRadius: '4px' }}>
          ⚠️ <strong>Golden Rule:</strong> Treat state as immutable. Always return new objects/arrays.
          React uses reference equality (===) to detect changes!
        </div>
      </div>
    </main>
  )
}
