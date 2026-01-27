🏗️ Project Structure

```
/backend
  ├─ app.js
  ├─ models/
  ├─ controllers/
  ├─ tests/
      ├─ blog_api.test.js       # Integration
      ├─ user_api.test.js       # Integration
      ├─ list_helper.test.js    # Unit

/frontend
  ├─ src/
      ├─ components/
          ├─ Blog.jsx
          ├─ BlogForm.jsx
          ├─ Blog.test.jsx       # Unit
          ├─ BlogForm.test.jsx   # Unit
  ├─ vitest.config.js

/e2e-tests

  ├─ tests/                 # Playwright tests
```

🎯 Learning Objectives

- Implement unit tests for React components (UI behavior, event handling)

- Write integration tests for backend APIs with MongoDB

- Perform E2E tests simulating real user workflows

- Learn testing libraries: Vitest, React Testing Library, Supertest, Playwright

- Understand separation of concerns: unit vs integration vs E2E
