'use client'

import { useState } from 'react'
import Link from 'next/link'

interface User {
  name: string
  age: number
}

/*
// 🙅 FAULTY VERSION - Direct Mutation
// Uncomment this to demonstrate the bug during live session

export default function StateImmutabilityDemo() {
  const [user, setUser] = useState<User>({
    name: 'Alice',
    age: 28
  })
  const [renderCount, setRenderCount] = useState(0)

  function updateNameWrong() {
    user.name = 'Bob'  // 🙅 Mutates original!
    setUser(user)      // Same reference
    // React won't re-render! 😱
  }

  function updateAgeWrong() {
    user.age = user.age + 1
    setUser(user)
  }

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>State Immutability</h1>

      <div className="demo-container">
        <div className="demo-section">
          <h2>🙅 Wrong: Direct Mutation</h2>
          <p>Name: <strong>{user.name}</strong></p>
          <p>Age: <strong>{user.age}</strong></p>
          <p>Render count: <strong>{renderCount}</strong></p>
          <button onClick={updateNameWrong}>Update Name</button>
          <button onClick={updateAgeWrong}>Increment Age</button>
          <div className="error">
            <strong>Problem:</strong> Same object reference = no re-render!
            The values change internally but UI doesn't update.
          </div>
        </div>
      </div>
    </main>
  )
}
*/

// ✅ CORRECT VERSION - Immutable Updates

export default function StateImmutabilityDemo() {
  const [user, setUser] = useState<User>({
    name: 'Alice',
    age: 28
  })
  const [renderCount, setRenderCount] = useState(0)

  // Track renders
  useState(() => {
    setRenderCount(prev => prev + 1)
  })

  function updateNameCorrect() {
    setUser({ ...user, name: 'Bob' })
    // New object, new reference ✅
  }

  function updateAgeCorrect() {
    setUser(prev => ({ ...prev, age: prev.age + 1 }))
  }

  function resetUser() {
    setUser({ name: 'Alice', age: 28 })
  }

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-3/state-immutability-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>State Immutability</h1>

      <div className="warning">
        <strong>Key Concept:</strong> React uses reference equality (===) to detect state changes.
        Mutating objects/arrays doesn't create new references, so React won't re-render.
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>✅ Correct: Create New Object</h2>
          <p>Name: <strong>{user.name}</strong></p>
          <p>Age: <strong>{user.age}</strong></p>
          <p>Render count: <strong>{renderCount}</strong></p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <button onClick={updateNameCorrect}>Update Name to Bob</button>
            <button onClick={updateAgeCorrect}>Increment Age</button>
            <button onClick={resetUser}>Reset</button>
          </div>
          <div className="success" style={{ marginTop: '1rem' }}>
            <strong>Solution:</strong> Spread operator creates new object with new reference
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// ✅ Correct - immutable update
setUser({ ...user, name: 'Bob' })

// With functional update:
setUser(prev => ({ ...prev, age: prev.age + 1 }))

// 🙅 Wrong - direct mutation
user.name = 'Bob'
setUser(user)  // Same reference, no re-render!`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Tip:</strong> To see the faulty version, uncomment the code block at the top of this file and comment out the correct version.</p>
      </div>
    </main>
  )
}
