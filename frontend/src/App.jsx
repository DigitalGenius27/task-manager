import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:5001/api/tasks'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setTasks(data))
  }, [])

  const addTask = async event => {
    event.preventDefault()

    if (!newTask.trim()) return

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTask }),
    })

    const task = await response.json()

    setTasks(tasks.concat(task))
    setNewTask('')
  }

  const toggleTask = async task => {
    const response = await fetch(`${API_URL}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: !task.completed,
      }),
    })

    const updatedTask = await response.json()

    setTasks(
      tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    )
  }

  const deleteTask = async id => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <main>
      <h1>Task Manager</h1>

      <form onSubmit={addTask}>
        <input
          value={newTask}
          onChange={event => setNewTask(event.target.value)}
          placeholder="New task..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span
              onClick={() => toggleTask(task)}
              style={{
                textDecoration: task.completed
                  ? 'line-through'
                  : 'none',
                cursor: 'pointer',
              }}
            >
              {task.title}
            </span>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App