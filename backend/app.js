const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())

let tasks = [
  {
    id: 1,
    title: 'Learn CI/CD',
    completed: false,
  },
  {
    id: 2,
    title: 'Build a project',
    completed: false,
  },
]

app.get('/api/tasks', (req, res) => {
  res.json(tasks)
})

app.post('/api/tasks', (req, res) => {
  const { title } = req.body

  if (!title) {
    return res.status(400).json({ error: 'title is required' })
  }

  const task = {
    id: Date.now(),
    title,
    completed: false,
  }

  tasks = tasks.concat(task)

  res.status(201).json(task)
})

app.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id)

  const task = tasks.find(task => task.id === id)

  if (!task) {
    return res.status(404).json({ error: 'task not found' })
  }

  const updatedTask = {
    ...task,
    completed: req.body.completed ?? task.completed,
    title: req.body.title ?? task.title,
  }

  tasks = tasks.map(task =>
    task.id === id ? updatedTask : task
  )

  res.json(updatedTask)
})

app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id)

  const taskExists = tasks.some(task => task.id === id)

  if (!taskExists) {
    return res.status(404).json({ error: 'task not found' })
  }

  tasks = tasks.filter(task => task.id !== id)

  res.status(204).end()
})

app.get('/health', (req, res) => {
  res.send('ok')
})

app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

const PORT = process.env.PORT || 5001

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

module.exports = app