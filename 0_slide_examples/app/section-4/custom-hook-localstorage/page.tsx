'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// ✅ Custom Hook: useLocalStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  // Get initial value from localStorage or use provided initial value
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Update localStorage when value changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
      console.log(`✅ Saved to localStorage: ${key} =`, value)
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, value])

  return [value, setValue] as const
}

// Using the custom hook
export default function CustomHookLocalStorageDemo() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')
  const [language, setLanguage] = useLocalStorage<string>('language', 'en')
  const [fontSize, setFontSize] = useLocalStorage<number>('fontSize', 16)

  const clearAllSettings = () => {
    setTheme('light')
    setLanguage('en')
    setFontSize(16)
    console.log('🗑️ Settings reset to defaults')
  }

  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <h1>4.7 Custom Hook: useLocalStorage</h1>

      <div className="warning">
        <strong>Purpose:</strong> Custom hooks extract reusable stateful logic into functions.
        No need for HOCs or render props - just call the hook!
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>Settings Form with Persistence</h2>

          <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1rem' }}>
            {/* Theme Setting */}
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Theme: <span style={{ fontWeight: 'normal', color: '#666' }}>{theme}</span>
              </label>
              <select
                value={theme}
                onChange={e => setTheme(e.target.value as 'light' | 'dark')}
                style={{ padding: '0.5rem', fontSize: '1rem', width: '200px' }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* Language Setting */}
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Language: <span style={{ fontWeight: 'normal', color: '#666' }}>{language}</span>
              </label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                style={{ padding: '0.5rem', fontSize: '1rem', width: '200px' }}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            {/* Font Size Setting */}
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Font Size: <span style={{ fontWeight: 'normal', color: '#666' }}>{fontSize}px</span>
              </label>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={e => setFontSize(Number(e.target.value))}
                style={{ width: '200px' }}
              />
            </div>
          </div>

          <button onClick={clearAllSettings} style={{ marginTop: '1.5rem' }}>
            Reset to Defaults
          </button>

          <div className="success" style={{ marginTop: '1.5rem' }}>
            <strong>✅ Try this:</strong>
            <br/>1. Change any settings above
            <br/>2. Refresh the page (F5)
            <br/>3. Your settings persist! 🎉
            <br/>4. Check console for localStorage activity
          </div>
        </div>

        <div className="demo-section" style={{ marginTop: '2rem' }}>
          <h2>Preview with Your Settings</h2>
          <div
            style={{
              padding: '2rem',
              background: theme === 'dark' ? '#333' : '#fff',
              color: theme === 'dark' ? '#fff' : '#000',
              fontSize: `${fontSize}px`,
              border: '2px solid #ccc',
              borderRadius: '4px',
              transition: 'all 0.3s',
            }}
          >
            <p><strong>Theme:</strong> {theme}</p>
            <p><strong>Language:</strong> {language}</p>
            <p><strong>Font Size:</strong> {fontSize}px</p>
            <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
              This text adapts to your settings!
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// Custom Hook Implementation
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

// Usage - Clean and Reusable!
function SettingsForm() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [language, setLanguage] = useLocalStorage('language', 'en')

  return (
    <div>
      <select value={theme} onChange={e => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  )
}

// Benefits:
// ✅ Reusable across components
// ✅ Logic is testable independently
// ✅ Cleaner component code
// ✅ localStorage sync is automatic`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Pattern:</strong> Custom hooks must start with "use" prefix.</p>
        <p><strong>Tip:</strong> Check libraries like react-use, usehooks-ts for ready-made hooks!</p>
      </div>
    </main>
  )
}
