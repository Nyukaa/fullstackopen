# ✏️ BlogList Frontend – React Component Tests (Part 4)

This project is part of the **Full Stack Open 2024** course (University of Helsinki).  
The goal is to test the **BlogList frontend components** using **Vitest** and **React Testing Library**.

---

## 📚 Description

The tests cover:

- Rendering of individual blog components (`<Blog />`)
- Blog creation form (`<BlogForm />`)
- User interactions such as viewing blog details, liking a blog, and submitting a new blog
- Ensuring proper event handlers are called
- Component behavior without a full backend

These tests are focused on **UI behavior** and **component logic**, not backend integration.

---

## 🛠️ Tech Stack

- **Frontend:** React
- **Testing:** Vitest, React Testing Library, user-event
- **Mocking:** Vitest mock functions (`vi.fn()`)

---

## 🚀 Features Tested

### `<Blog />` Component

✅ Renders blog **title and author** by default  
✅ Hides **URL and likes** initially  
✅ Shows URL and likes when the **view button** is clicked  
✅ Clicking the **like button** twice calls the event handler twice

### `<BlogForm />` Component

✅ Calls the `createBlog` function when a new blog is submitted  
✅ Passes the correct blog details (`title`, `author`, `url`) to the handler

---

## ⚙️ Test Scenarios

### Blog Component Tests

- **Render check:** title and author visible, URL and likes hidden
- **View interaction:** URL and likes become visible after clicking "view"
- **Like interaction:** clicking "like" twice triggers handler twice

### BlogForm Component Tests

- **Form submission:** inputs accept user typing
- **Event handling:** `createBlog` function called once with correct data

---

## 🧪 Running Tests

```bash
# Run all frontend tests
npm run test

# Run in watch mode
npm run test:watch
```

Tests are unit tests, verifying component logic and UI behavior without connecting to backend services.

## 🎯 Learning Objectives

- Test React components with Vitest and React Testing Library

- Mock functions to simulate event handlers

- Simulate user events using user-event

- Verify conditional rendering of components

- Ensure proper data flow from components to event handlers
