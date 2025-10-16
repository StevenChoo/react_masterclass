'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Todo {
  id: number
  text: string
  completed: boolean
}

// 🙅 FAULTY VERSION - Separate State (Can't Communicate) - Active Demo

type FilterType = 'all' | 'active' | 'completed'

function FilterButtons() {
  const [filter, setFilter] = useState<FilterType>('all')
  // How do we tell TodoList about filter? We can't! 🔴

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button
        onClick={() => setFilter('all')}
        style={{
          padding: '0.5rem 1rem',
          marginRight: '0.5rem',
          background: filter === 'all' ? '#2196f3' : '#e0e0e0',
          color: filter === 'all' ? 'white' : 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        All
      </button>
      <button
        onClick={() => setFilter('active')}
        style={{
          padding: '0.5rem 1rem',
          marginRight: '0.5rem',
          background: filter === 'active' ? '#2196f3' : '#e0e0e0',
          color: filter === 'active' ? 'white' : 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Active
      </button>
      <button
        onClick={() => setFilter('completed')}
        style={{
          padding: '0.5rem 1rem',
          background: filter === 'completed' ? '#2196f3' : '#e0e0e0',
          color: filter === 'completed' ? 'white' : 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Completed
      </button>
      <p style={{ marginTop: '0.5rem', color: '#666' }}>Current filter: {filter}</p>
    </div>
  )
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React hooks', completed: true },
    { id: 2, text: 'Master state management', completed: false },
    { id: 3, text: 'Build awesome apps', completed: false },
    { id: 4, text: 'Deploy to production', completed: true },
  ])
  // How do we get filter from FilterButtons? We can't! 🔴
  // We can only show ALL todos

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div>
      <p style={{ marginBottom: '0.5rem', color: '#666' }}>
        Showing all {todos.length} todos (can't filter!)
      </p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              padding: '0.75rem',
              marginBottom: '0.5rem',
              background: '#f5f5f5',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => toggleTodo(todo.id)}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {}}
              style={{ marginRight: '0.75rem', cursor: 'pointer' }}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#999' : 'black' }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FaultyParent() {
  return (
    <div>
      <FilterButtons />
      <TodoList />
    </div>
  )
}

export default function LiftingStateFaultyDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
        <strong>⚠️ This is the FAULTY version showing the problem.</strong>
        {' '}
        <Link href="/section-4/lifting-state" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          See the correct version →
        </Link>
      </div>

      <h1>4.8 Lifting State Up (Faulty)</h1>

      <div className="warning">
        <strong>The Problem:</strong> FilterButtons and TodoList are siblings with their own separate state.
        They can't communicate! Clicking filter buttons does nothing because TodoList doesn't know about the filter.
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>🙅 Problem: Siblings Can't Communicate</h2>
          <FaultyParent />

          <div className="error" style={{ marginTop: '1.5rem' }}>
            <strong>🔴 The Problem:</strong>
            <br/>• FilterButtons has its own filter state
            <br/>• TodoList has its own todos state
            <br/>• They're siblings - can't share data!
            <br/>• Click filter buttons - nothing happens!
            <br/>• TodoList always shows all todos
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Current code - Separate State (Can't Communicate)
function Parent() {
  return (
    <div>
      <FilterButtons />  {/* Own filter state */}
      <TodoList />       {/* Own todos state */}
    </div>
  )
}

function FilterButtons() {
  const [filter, setFilter] = useState('all')
  // Filter lives here... 🔴
  return <div>...</div>
}

function TodoList() {
  const [todos, setTodos] = useState([])
  // ...but we need it here! 🔴
  // How do we get filter from FilterButtons?
  // WE CAN'T! They're siblings!
  return <div>...</div>
}`}</pre>
      </div>

      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8d7da', borderRadius: '4px' }}>
        <strong>🐛 The Bug:</strong> React's data flow is one-way (top-down). Sibling components
        can't directly access each other's state. The filter buttons change their local filter state,
        but TodoList has no way to know about it!
      </div>
    </main>
  )
}
