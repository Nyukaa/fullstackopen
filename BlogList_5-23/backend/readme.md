# ✏️ BlogList Backend – Full Stack (Part 4)

This project is part of the **Full Stack Open 2024** course (University of Helsinki).  
The goal is to build a backend for a **BlogList application**, including user management, authentication, and blog CRUD operations.

---

## 📚 Description

The BlogList backend allows:

- User registration and authentication
- JWT-based login for secure operations
- CRUD operations for blogs
- Blogs are linked to users (each blog belongs to a user)
- Users can delete only their own blogs
- Token-based authorization ensures secure creation and deletion
- Validation and error handling for blogs and users
- Tests ensure the backend works as expected

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Password Security:** bcrypt / bcryptjs
- **Testing:** Node built-in test runner, Supertest, Assert
- **Environment Management:** dotenv

---

## 🚀 Features

✅ Create users with hashed passwords  
✅ Login and receive JWT token  
✅ Create, read, update, delete blogs  
✅ Blogs linked to users  
✅ Only the user who created a blog can delete it  
✅ Populate blogs with user info (`username`, `name`)  
✅ Comprehensive tests for users, login, and blogs

---

## ⚙️ RESTful API Endpoints

### Users

- `GET /api/users` → fetch all users (blogs populated)
- `POST /api/users` → create a new user (hashed password)

### Login

- `POST /api/login` → authenticate a user and return JWT token

### Blogs

- `GET /api/blogs` → fetch all blogs (user info populated)
- `GET /api/blogs/:id` → fetch a single blog
- `POST /api/blogs` → create a new blog (requires JWT token)
- `PUT /api/blogs/:id` → update a blog
- `DELETE /api/blogs/:id` → delete a blog (only creator can delete)

---

## 🧪 Testing

- Tests written with **Node built-in test runner**, **Supertest**, and **Assert**
- Tests cover:
  - User creation, uniqueness, password validation
  - Login and token generation
  - Blog creation, update, deletion
  - Authorization checks (401 if token missing/invalid)
- Example commands:

```bash
# Run all tests
npm test

# Run specific test file
npm test -- tests/token_api.test.js
```

Database for testing is separate (TEST_MONGODB_URI) to avoid affecting production data

Before each test, the database is cleared for a clean state

## ❌ Error Handling

- Malformed IDs → 400 Bad Request

- Validation errors → 400 with error message

- Missing/invalid token → 401 Unauthorized

- Unknown endpoints → 404 Not Found

## 🎯 Learning Objectives

- Connect a backend to MongoDB using Mongoose

- Implement JWT-based authentication for secure operations

- Hash passwords using bcrypt

- Populate referenced documents with Mongoose (populate)

- Write comprehensive backend tests with Node test runner and Supertest

- Handle validation errors and proper HTTP status codes
