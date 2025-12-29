# 📝 Bloglist – React + Redux

A **blog application** built with **React, Redux Toolkit, and Vite** as part of the **Full Stack Open** course.  
The app allows users to **log in, create blogs, like them, delete their own blogs, and add anonymous comments**.

The project demonstrates **modern React architecture**, Redux state management, routing, and full-stack interaction with a Node.js + MongoDB backend.

---

## 🌐 Live Demo

👉 https://your-render-url-here.onrender.com  
_(optional)_

## 💻 GitHub Repositories

- Frontend: https://github.com/Nyukaa/bloglist-frontend
- Backend: https://github.com/Nyukaa/bloglist-backend

---

## 👩‍💻 Author

**Nyukaa**  
GitHub: https://github.com/Nyukaa

---

## 🎯 Project Goals

This project was created to practice and demonstrate:

- React fundamentals (hooks, components, conditional rendering)
- Redux Toolkit for global state management
- Async logic with Redux thunks
- User authentication with JWT
- Routing with React Router
- Full-stack communication with REST APIs
- Clean and scalable application structure

---

## 🛠 Technologies Used

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
</p>

---

## 🧭 Architecture Overview

### Frontend

- React + Vite
- Redux Toolkit slices:
  - `blogs`
  - `user`
  - `notification`
- Async logic with Redux thunks
- Routing with React Router
- Axios for API requests

### Backend

- Node.js + Express
- MongoDB with Mongoose
- JWT-based authentication
- REST API

---

## 🧩 State Management (Redux)

Global state is handled using **Redux Toolkit**:

### Blogs

- Fetch all blogs
- Create a blog
- Like a blog
- Delete a blog
- Add comments

### User

- Login / logout
- User persisted in `localStorage`

### Notifications

- Success and error messages
- Automatically cleared after timeout

---

## 🚀 Features

### Authentication

- Login with username and password
- JWT token stored in `localStorage`
- Protected actions (create/delete blogs)

### Blogs

- View all blogs sorted by likes
- View individual blog pages
- Like blogs
- Delete blogs created by the logged-in user
- Blog-specific routes (`/blogs/:id`)

### Users

- Users list
- Individual user pages
- Blogs grouped by author

### Comments

- Anonymous comments
- Displayed per blog
- Added via: POST /api/blogs/:id/comments

---

## 📄 Pages & Routing

| Route        | Description          |
| ------------ | -------------------- |
| `/`          | Blog list            |
| `/blogs/:id` | Single blog view     |
| `/users`     | Users list           |
| `/users/:id` | Individual user view |
| `/login`     | Login page           |

---

## 🎨 Styling

- Custom CSS (`App.css`)
- Clean and minimal UI
- Navigation menu built with React Router `Link`
- Focus on clarity and usability

---

## 📚 What I Learned

- How Redux Toolkit simplifies state management
- Managing async logic with thunks
- Handling authentication in React applications
- Structuring a full-stack application
- Debugging common React & Redux issues
- Understanding when to use local state vs global state

---

## 🤝 Contributing

This project is primarily educational, but feedback and suggestions are welcome.
