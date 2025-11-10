# ✏️ BlogList Backend – Testing (Full Stack)

This project is part of the **Full Stack Open 2024** course (University of Helsinki).  
The backend has been tested extensively with **Node built-in test runner**, **Supertest**, and custom test helpers to ensure correct behavior of blog operations and user authentication.

---

### **1️⃣ Unit Tests – Helper Functions**

Located in utils/list_helper.js

### 2️⃣ Integration Tests – Blog API

Located in tests/blog_api.test.js token_api.test.js and tests/user_api.test.js:

---

## 📚 Description

The tests cover:

- CRUD operations for blogs
- Blog likes management
- User creation and authentication
- Token-based authorization
- Utility functions for blog analysis (total likes, favorite blog, most blogs, most likes)

All tests use a **separate test database** to avoid affecting production data. Before each test, the database is cleared for a clean state.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Password Security:** bcrypt / bcryptjs
- **Testing:** Node built-in test runner, Supertest, Assert

---

## 🚀 Tested Features

✅ Fetch all blogs as JSON  
✅ Unique identifier `id` for blogs  
✅ Add new blogs (with and without `likes`)  
✅ Blog deletion (valid, non-existent, invalid IDs)  
✅ Blog updating (valid, non-existent, invalid IDs)  
✅ User creation and login  
✅ Blog creation with JWT token  
✅ Prevent blog creation without token  
✅ Utility functions:

- Total likes across blogs
- Favorite blog (most likes)
- Author with most blogs
- Author with most likes

---

## ⚙️ Example API Test Endpoints

### Blogs

- `GET /api/blogs` → fetch all blogs
- `POST /api/blogs` → create a new blog (requires JWT token)
- `PUT /api/blogs/:id` → update blog information
- `DELETE /api/blogs/:id` → delete a blog

### Users & Login

- `POST /api/users` → create a new user
- `POST /api/login` → authenticate a user and receive JWT token

---

## 🧪 Running the Tests

### 1️⃣ Install Dependencies

```
npm install
```

### 2️⃣ Run Tests

# Run all tests

```
node test/blog_api.test.js

# Or using built-in test runner

node --test
```

### 3️⃣ Notes

- Tests ensure database is reset before each run

- JWT token authentication is verified for protected routes

- Utility functions are tested separately for correct analytics results

- MongoDB connection is closed after tests to prevent hanging

### 🎯 Learning Objectives

- Test backend APIs with Supertest and Node test runner

- Verify authentication flows using JWT

- Ensure CRUD operations work as expected

- Analyze blog data with utility functions

- Manage a test database safely without affecting production
