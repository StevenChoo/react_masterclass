'use client'

import { Fragment } from 'react'
import Link from 'next/link'

/*
// 🙅 FAULTY VERSION - Unnecessary Wrapper Divs

function TableRows() {
  return (
    <div>
      <tr>
        <td>Row 1, Cell 1</td>
        <td>Row 1, Cell 2</td>
      </tr>
      <tr>
        <td>Row 2, Cell 1</td>
        <td>Row 2, Cell 2</td>
      </tr>
    </div>
  )
}

function FaultyTable() {
  return (
    <div className="error" style={{ padding: '1rem' }}>
      <h3>🙅 Broken Table Structure</h3>
      <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
          </tr>
        </thead>
        <tbody>
          <TableRows />
        </tbody>
      </table>
      <p style={{ marginTop: '0.5rem' }}>
        <strong>Problem:</strong> The &lt;div&gt; breaks the table structure! Browser can't render it correctly.
      </p>
    </div>
  )
}

function FaultyList() {
  const items = ['Apple', 'Banana', 'Cherry']
  return (
    <ul>
      {items.map(item => (
        <div key={item} style={{ margin: '0.5rem 0' }}>
          <li>{item}</li>
          <span style={{ color: '#666', fontSize: '0.8em' }}> (in stock)</span>
        </div>
      ))}
    </ul>
  )
}
*/

// ✅ CORRECT VERSION - Using Fragments

function TableRows() {
  return (
    <>
      <tr>
        <td>Row 1, Cell 1</td>
        <td>Row 1, Cell 2</td>
      </tr>
      <tr>
        <td>Row 2, Cell 1</td>
        <td>Row 2, Cell 2</td>
      </tr>
    </>
  )
}

function CorrectTable() {
  return (
    <div className="success" style={{ padding: '1rem' }}>
      <h3>✅ Correct Table Structure</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Column 1</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Column 2</th>
          </tr>
        </thead>
        <tbody>
          <TableRows />
        </tbody>
      </table>
      <p style={{ marginTop: '0.5rem' }}>
        <strong>Solution:</strong> Fragment (&lt;&gt;) groups elements without adding DOM nodes!
      </p>
    </div>
  )
}

function CorrectList() {
  const items = ['Apple', 'Banana', 'Cherry']
  return (
    <ul>
      {items.map(item => (
        <Fragment key={item}>
          <li>{item}</li>
          <span style={{ color: '#666', fontSize: '0.8em', marginLeft: '0.5rem' }}>(in stock)</span>
        </Fragment>
      ))}
    </ul>
  )
}

function DescriptionList() {
  const terms = [
    { term: 'React', definition: 'A JavaScript library for building user interfaces' },
    { term: 'Fragment', definition: 'Groups elements without adding extra DOM nodes' },
  ]

  return (
    <dl>
      {terms.map(({ term, definition }) => (
        <Fragment key={term}>
          <dt style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>{term}</dt>
          <dd style={{ marginLeft: '1rem', color: '#666' }}>{definition}</dd>
        </Fragment>
      ))}
    </dl>
  )
}

export default function NotUsingFragmentsDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-5/not-using-fragments-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>Pitfall #9: Not Using Fragments</h1>

      <div className="warning">
        <strong>The Problem:</strong> Adding unnecessary wrapper divs breaks semantic HTML,
        inflates the DOM, and can break CSS layouts (especially flex/grid).
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>✅ Correct: Using Fragments</h2>

          <CorrectTable />

          <div style={{ marginTop: '2rem' }}>
            <h3>List with Multiple Elements per Item</h3>
            <CorrectList />
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3>Description List</h3>
            <DescriptionList />
          </div>

          <div className="success" style={{ marginTop: '1rem' }}>
            <strong>When to use Fragments:</strong>
            <br/>• Returning multiple elements from a component
            <br/>• Mapping arrays where each item has multiple elements
            <br/>• Maintaining semantic HTML (tables, lists, dl/dt/dd)
            <br/>• Avoiding unnecessary divs that break CSS layouts
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Wrong: Unnecessary div
function TableRows() {
  return (
    <div>
      <tr><td>Data</td></tr>
    </div>
  )
}
// Breaks table structure!

// ✅ Correct: Short syntax Fragment
function TableRows() {
  return (
    <>
      <tr><td>Data</td></tr>
    </>
  )
}

// ✅ Correct: Named Fragment (when you need keys)
{items.map(item => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.definition}</dd>
  </Fragment>
))}

// 💡 Rule: Use <></> when you don't need keys
// Use <Fragment key={...}> when mapping arrays`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Tip:</strong> Uncomment the faulty version at the top to see broken HTML structure.</p>
        <p><strong>Rule:</strong> Fragments are free! Use them liberally to avoid wrapper divs.</p>
      </div>
    </main>
  )
}
