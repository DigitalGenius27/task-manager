# Task Manager

A full-stack task management application built with React, Vite, Node.js and Express.

## Features

- Create tasks
- Mark tasks as completed
- Delete tasks
- REST API
- Automated backend tests
- ESLint
- Continuous Integration with GitHub Actions
- Continuous Deployment to Render

## Technologies

- React
- Vite
- Node.js
- Express
- Jest
- Supertest
- ESLint
- GitHub Actions
- Render

## CI/CD Pipeline

The project uses GitHub Actions to:

1. Install dependencies
2. Run ESLint
3. Run backend tests
4. Build the frontend
5. Deploy to Render when changes are pushed to `main`

Pull requests run the CI checks but do not trigger deployment.

## Full Stack Open

This project was created for Full Stack Open Exercise 21.

Previous CI/CD exercise:

https://github.com/DigitalGenius27/Fullstack-open-CI-CD