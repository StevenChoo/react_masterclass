import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>React Masterclass - Live Demos</h1>
      <p>Interactive examples organized by presentation section</p>

      <section style={{ marginTop: '3rem' }}>
        <h2>Section 3: The Basics</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Foundation concepts - JSX, components, state, events, and lists
        </p>

        <div className="demo-grid">
          <Link href="/section-3/state-updates" className="demo-card">
            <h3>3.1 State Updates</h3>
            <p>Scheduled vs Functional Updates - Understanding the stale closure problem</p>
          </Link>

          <Link href="/section-3/state-immutability" className="demo-card">
            <h3>3.2 State Immutability</h3>
            <p>Mutation vs Immutable Patterns - Why you must create new references</p>
          </Link>

          <Link href="/section-3/conditional-rendering" className="demo-card">
            <h3>3.3 Conditional Rendering</h3>
            <p>The "0" Pitfall - Common bug with the && operator</p>
          </Link>

          <Link href="/section-3/lists-and-keys" className="demo-card">
            <h3>3.4 Lists and Keys</h3>
            <p>Rendering dynamic data with proper keys</p>
          </Link>

          <Link href="/section-3/event-handling" className="demo-card">
            <h3>3.5 Event Handling</h3>
            <p>Synthetic events and preventDefault()</p>
          </Link>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2>Section 4: The Intermediate</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          Core patterns for production - Hooks, state management, and composition
        </p>

        <div className="demo-grid">
          <Link href="/section-4/useeffect-dependencies" className="demo-card">
            <h3>4.1 useEffect Dependencies</h3>
            <p>Understanding the three patterns and dependency arrays</p>
          </Link>

          <Link href="/section-4/useeffect-missing-deps" className="demo-card">
            <h3>4.2 Missing Dependencies</h3>
            <p>Stale closures from forgetting dependencies</p>
          </Link>

          <Link href="/section-4/useeffect-async" className="demo-card">
            <h3>4.3 Async Functions</h3>
            <p>The correct pattern for async operations in useEffect</p>
          </Link>

          <Link href="/section-4/useref-dom" className="demo-card">
            <h3>4.4 useRef DOM</h3>
            <p>Focus management and DOM manipulation the React way</p>
          </Link>

          <Link href="/section-4/useref-vs-usestate" className="demo-card">
            <h3>4.5 useRef vs useState</h3>
            <p>When to use each - re-render vs no re-render</p>
          </Link>

          <Link href="/section-4/usememo-optimization" className="demo-card">
            <h3>4.6 useMemo</h3>
            <p>Caching expensive calculations with performance metrics</p>
          </Link>

          <Link href="/section-4/custom-hook-localstorage" className="demo-card">
            <h3>4.7 Custom Hook</h3>
            <p>useLocalStorage - Reusable stateful logic with persistence</p>
          </Link>

          <Link href="/section-4/lifting-state" className="demo-card">
            <h3>4.8 Lifting State Up</h3>
            <p>Sharing state between sibling components</p>
          </Link>

          <Link href="/section-4/context-api" className="demo-card">
            <h3>4.9 Context API</h3>
            <p>Avoiding prop drilling with Context pattern</p>
          </Link>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2>Section 5: Common Pitfalls</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          The most common React mistakes and how to avoid them
        </p>

        <div className="demo-grid">
          <Link href="/section-5/inline-functions" className="demo-card">
            <h3>5.1 Inline Functions</h3>
            <p>How inline functions break React.memo and cause unnecessary re-renders</p>
          </Link>

          <Link href="/section-5/keys-in-lists" className="demo-card">
            <h3>5.2 Keys in Lists</h3>
            <p>Missing or incorrect keys confuse React's reconciliation</p>
          </Link>

          <Link href="/section-5/conditional-with-zero" className="demo-card">
            <h3>5.3 Conditional Rendering with 0</h3>
            <p>The && operator renders "0" when you expect nothing</p>
          </Link>

          <Link href="/section-5/mutating-state" className="demo-card">
            <h3>5.4 Mutating State</h3>
            <p>Direct mutations break React's change detection</p>
          </Link>

          <Link href="/section-5/useeffect-cleanup" className="demo-card">
            <h3>5.5 useEffect Cleanup</h3>
            <p>Memory leaks from missing cleanup functions</p>
          </Link>

          <Link href="/section-5/overusing-useeffect" className="demo-card">
            <h3>5.6 Overusing useEffect</h3>
            <p>When NOT to use useEffect - compute during render instead</p>
          </Link>

          <Link href="/section-5/context-misuse" className="demo-card">
            <h3>5.7 Context API Misuse</h3>
            <p>Single context with all state causes over-rendering</p>
          </Link>

          <Link href="/section-5/prop-drilling" className="demo-card">
            <h3>5.8 Prop Drilling</h3>
            <p>Passing props through multiple components unnecessarily</p>
          </Link>

          <Link href="/section-5/not-using-fragments" className="demo-card">
            <h3>5.9 Not Using Fragments</h3>
            <p>Unnecessary wrapper divs break semantic HTML</p>
          </Link>

          <Link href="/section-5/unnecessary-rerenders" className="demo-card">
            <h3>5.10 Unnecessary Re-renders</h3>
            <p>Missing memoization causes performance issues</p>
          </Link>
        </div>
      </section>
    </main>
  )
}
