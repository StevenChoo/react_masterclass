'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function OverusingUseEffectDemo() {
  const [products] = useState([
    { id: 1, name: 'React Book', category: 'books' },
    { id: 2, name: 'TypeScript Guide', category: 'books' },
    { id: 3, name: 'Laptop', category: 'electronics' },
  ])
  const [category, setCategory] = useState('books')

  // ✅ CORRECT: Compute during render (no useEffect needed!)
  const filteredProducts = products.filter(p => p.category === category)

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>Pitfall #6: Overusing useEffect</h1>

      <div className="warning">
        <strong>The Problem:</strong> Using useEffect for logic that should be in event handlers or computed during render.
        This causes extra render cycles and makes code harder to debug.
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>✅ Correct: Compute During Render</h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <button onClick={() => setCategory('books')}>Books</button>
            <button onClick={() => setCategory('electronics')} style={{ marginLeft: '0.5rem' }}>Electronics</button>
          </div>

          <p>Category: <strong>{category}</strong></p>
          <ul>
            {filteredProducts.map(p => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>

          <div className="success" style={{ marginTop: '1rem' }}>
            <strong>No useEffect needed!</strong> This is derived state - just compute it during render.
            Single render cycle, no extra state, always in sync.
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// ✅ Correct: Compute during render
const filteredProducts = products.filter(
  p => p.category === category
)

// 🙅 Wrong: Using useEffect for computation
const [filtered, setFiltered] = useState([])
useEffect(() => {
  setFiltered(products.filter(p => p.category === category))
}, [products, category])
// Problems: Extra render, unnecessary state, can get out of sync

// 💡 Ask yourself: Does this synchronize with external systems?
// If not, don't use useEffect!`}</pre>
      </div>
    </main>
  )
}
