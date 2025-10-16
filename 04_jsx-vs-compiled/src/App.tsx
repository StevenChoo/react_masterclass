import { UserForm } from './UserForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>JSX vs Compiled JavaScript</h1>
        <p className="subtitle">Understanding how JSX transforms into JavaScript</p>
      </header>

      <main className="app-main">
        <section className="info-section">
          <div className="info-card">
            <h3>Button Component (JSX)</h3>
            <p>Written using standard JSX syntax</p>
            <code>&lt;button className="..." onClick=&#123;...&#125;&gt;&#123;label&#125;&lt;/button&gt;</code>
          </div>

          <div className="info-card">
            <h3>UserForm Component (Compiled)</h3>
            <p>Written using _jsxs() and _jsx() functions</p>
            <code>_jsx('button', &#123; className: '...', onClick: ... &#125;)</code>
          </div>
        </section>

        <section className="demo-section">
          <UserForm />
        </section>

        <section className="explanation-section">
          <h3>Key Differences:</h3>
          <ul>
            <li><strong>JSX:</strong> Uses HTML-like syntax, compiled by Babel/TypeScript</li>
            <li><strong>_jsxs:</strong> Direct JavaScript function calls, what JSX compiles to</li>
            <li><strong>_jsx:</strong> Used for single child or self-closing elements</li>
            <li><strong>_jsxs:</strong> Used for multiple children (plural)</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
