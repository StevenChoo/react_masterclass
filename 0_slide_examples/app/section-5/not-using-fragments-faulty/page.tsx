'use client'

import Link from 'next/link'

// 🙅 FAULTY VERSION - Unnecessary Wrapper Divs (Active Demo)

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
    <div className="error" style={{ padding: '1rem', marginBottom: '2rem' }}>
      <h3>🙅 Broken Table Structure</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid red' }}>
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
        <strong>Problem:</strong> The &lt;div&gt; inside tbody breaks the table structure!
        Browser can't render it correctly.
      </p>
    </div>
  )
}

function FaultyList() {
  const items = ['Apple', 'Banana', 'Cherry']
  return (
    <div>
      <h3>List with Wrapper Divs</h3>
      <ul>
        {items.map(item => (
          <div key={item} style={{ margin: '0.5rem 0', padding: '0.25rem', background: '#fee' }}>
            <li>{item}</li>
            <span style={{ color: '#666', fontSize: '0.8em' }}> (in stock)</span>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default function NotUsingFragmentsFaultyDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problem.</strong>
        {' '}
        <Link href="/section-5/not-using-fragments" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>Pitfall #9: Not Using Fragments (Faulty - Wrapper Divs)</h1>

      <div className="warning">
        <strong>The Problem:</strong> Adding unnecessary wrapper divs breaks semantic HTML,
        inflates the DOM, and can break CSS layouts (especially flex/grid).
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>🙅 Problem: Unnecessary Wrapper Divs</h2>

          <FaultyTable />
          <FaultyList />

          <div className="error" style={{ marginTop: '1rem' }}>
            <strong>🔴 The Problems:</strong>
            <br/><br/>
            <strong>1. Table Structure Broken:</strong>
            <br/>• Valid HTML: <code>&lt;tbody&gt; → &lt;tr&gt; → &lt;td&gt;</code>
            <br/>• Our code: <code>&lt;tbody&gt; → &lt;div&gt; → &lt;tr&gt; → &lt;td&gt;</code> 💥
            <br/>• The &lt;div&gt; breaks the table DOM structure
            <br/>• Browser can't apply table layout correctly
            <br/>• Table rendering is broken!
            <br/><br/>
            <strong>2. List Structure Broken:</strong>
            <br/>• Valid HTML: <code>&lt;ul&gt; → &lt;li&gt;</code>
            <br/>• Our code: <code>&lt;ul&gt; → &lt;div&gt; → &lt;li&gt;</code> 💥
            <br/>• The &lt;div&gt; breaks semantic list structure
            <br/>• Accessibility tools get confused
            <br/>• CSS list styles don't work properly
            <br/><br/>
            <strong>Why it happens:</strong>
            <br/>• React requires single root element from components
            <br/>• Developers add &lt;div&gt; as wrapper to satisfy this
            <br/>• But this &lt;div&gt; becomes part of the actual DOM!
            <br/>• Breaks HTML semantics and CSS layouts
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
            <strong>Other problems caused by wrapper divs:</strong>
            <br/>• Breaks CSS Flexbox/Grid layouts (extra layer changes calculations)
            <br/>• Inflates DOM size (more nodes to manage)
            <br/>• Breaks CSS selectors like <code>table &gt; tbody &gt; tr</code>
            <br/>• Makes debugging harder (extra elements in DevTools)
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Current code - Wrapper div breaks structure
function TableRows() {
  return (
    <div>  {/* 💥 This div breaks table structure! */}
      <tr><td>Data 1</td></tr>
      <tr><td>Data 2</td></tr>
    </div>
  )
}

<table>
  <tbody>
    <TableRows />
  </tbody>
</table>

// Rendered DOM:
<table>
  <tbody>
    <div>  {/* ❌ Invalid! div inside tbody! */}
      <tr><td>Data 1</td></tr>
      <tr><td>Data 2</td></tr>
    </div>
  </tbody>
</table>

// Why it's broken:
// - HTML spec: tbody can only contain tr elements
// - We added a div in between
// - Browser tries to fix it (auto-corrects DOM)
// - Table layout breaks
// - CSS doesn't work as expected

// Same problem with lists:
<ul>
  {items.map(item => (
    <div key={item}>  {/* ❌ Invalid! div inside ul! */}
      <li>{item}</li>
    </div>
  ))}
</ul>

// HTML spec: ul can only contain li elements directly`}</pre>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px' }}>
        <strong>🐛 The Bug:</strong> Using wrapper divs to satisfy React's "single root" requirement
        breaks HTML semantics. Tables, lists, and other structured elements have strict rules about
        what children they can contain. Adding divs violates these rules and breaks rendering,
        accessibility, and CSS. Use Fragments instead - they group elements without adding DOM nodes!
      </div>
    </main>
  )
}
