'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Todo {
  id: number
  text: string
  completed: boolean
}

/*
// 🙅 FAULTY VERSION - Separate State (Can't Communicate)

function FaultyParent() {
  return (
    <div>
      <FilterButtons />
      <TodoList />
    </div>
  )
}

function FilterButtons() {
  const [filter, setFilter] = useState('all')
  // How do we tell TodoList about filter? We can't! 🔴

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('active')}>Active</button>
      <button onClick={() => setFilter('completed')}>Completed</button>
    </div>
  )
}

function TodoList() {
  const [todos, setTodos] = useState([...])
  // How do we get filter from FilterButtons? We can't! 🔴

  return <div>...</div>
}
*/

// ✅ CORRECT VERSION - Lifted State

type FilterType = 'all' | 'active' | 'completed'

function FilterButtons({ filter, setFilter }: { filter: FilterType; setFilter: (f: FilterType) => void }) {
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
    </div>
  )
}

function TodoList({ todos, filter, onToggle }: { todos: Todo[]; filter: FilterType; onToggle: (id: number) => void }) {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div>
      <p style={{ marginBottom: '0.5rem', color: '#666' }}>
        Showing {filteredTodos.length} of {todos.length} todos
      </p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredTodos.map(todo => (
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
            onClick={() => onToggle(todo.id)}
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

function CorrectParent() {
  // State lives in the parent! ✅
  const [filter, setFilter] = useState<FilterType>('all')
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React hooks', completed: true },
    { id: 2, text: 'Master state management', completed: false },
    { id: 3, text: 'Build awesome apps', completed: false },
    { id: 4, text: 'Deploy to production', completed: true },
  ])

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div>
      <FilterButtons filter={filter} setFilter={setFilter} />
      <TodoList todos={todos} filter={filter} onToggle={toggleTodo} />
    </div>
  )
}

export default function LiftingStateDemo() {
  return (
    <main>
      <Link href="/" className="back-link">← Back to index</Link>

      <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#d4edda', border: '2px solid #28a745', borderRadius: '4px' }}>
        <strong>✅ This is the CORRECT version showing the solution.</strong>
        {' '}
        <Link href="/section-4/lifting-state-faulty" style={{ color: '#dc3545', textDecoration: 'underline' }}>
          See the problem version →
        </Link>
      </div>

      <h1>4.8 Lifting State Up</h1>

      <div className="warning">
        <strong>The Pattern:</strong> When two sibling components need the same state,
        lift it to their parent. The parent becomes the single source of truth!
      </div>

      <div className="demo-container">
        <div className="demo-section">
          <h2>✅ Correct: State Lifted to Parent</h2>
          <CorrectParent />

          <div className="success" style={{ marginTop: '1.5rem' }}>
            <strong>✅ Success!</strong>
            <br/>• Parent owns both filter and todos state
            <br/>• FilterButtons receives filter as prop
            <br/>• TodoList receives both filter and todos as props
            <br/>• Both components can now communicate through parent
            <br/>• Single source of truth!
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }} className="code-block">
        <pre>{`// 🙅 Before: Separate State (Can't Communicate)
function Parent() {
  return (
    <div>
      <FilterButtons />  {/* Own state */}
      <TodoList />       {/* Own state */}
    </div>
  )
}

function FilterButtons() {
  const [filter, setFilter] = useState('all')
  // How do we tell TodoList about filter? 🔴
  return <div>...</div>
}

function TodoList() {
  const [todos, setTodos] = useState([])
  // How do we get filter from FilterButtons? 🔴
  return <div>...</div>
}

// ✅ After: Lifted State (Can Communicate!)
function Parent() {
  const [filter, setFilter] = useState('all')
  const [todos, setTodos] = useState([])

  return (
    <div>
      <FilterButtons
        filter={filter}
        setFilter={setFilter}
      />
      <TodoList
        todos={todos}
        filter={filter}
      />
    </div>
  )
}

function FilterButtons({ filter, setFilter }) {
  return <div>...</div>  // Uses props ✅
}

function TodoList({ todos, filter }) {
  const filtered = todos.filter(/* use filter */)
  return <div>...</div>  // Uses props ✅
}`}</pre>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p><strong>Pattern:</strong> State lives in the lowest common ancestor of components that need it.</p>
        <p><strong>Tip:</strong> Uncomment faulty version at top to see the communication problem.</p>
      </div>
    </main>
  )
}
