const request = require('supertest')
const app = require('../app')

describe('Task API', () => {
  test('tasks are returned as JSON', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).toHaveLength(2)
  })

  test('a task can be created', async () => {
    const newTask = {
      title: 'Test CI/CD',
    }

    const response = await request(app)
      .post('/api/tasks')
      .send(newTask)
      .expect(201)

    expect(response.body.title).toBe(newTask.title)
    expect(response.body.completed).toBe(false)
  })

  test('health check works', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200)

    expect(response.text).toBe('ok')
  })
})