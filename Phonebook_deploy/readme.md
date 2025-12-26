# 📞 Phonebook App – Step 11

This project is part of the **Full Stack Open 2024** course (University of Helsinki).  
The goal is to build a full-stack phonebook application. Users can view, add, and delete contacts, with data stored on a server.

---

## 📚 Description

The app allows users to:

- View a list of persons with names and phone numbers
- Add new contacts through a form
- Delete existing contacts
- Receive notifications for successful operations or errors (e.g., duplicate name, network errors)

The application interacts with a backend server via **REST API** and updates the frontend in real time.

---

## 🛠️ Tech Stack

- **Frontend:** React, JavaScript, HTML5, CSS3
- **Backend:** Express.js (Node.js)
- **Database:** JSON file (or later, MongoDB in extended exercises)
- **HTTP Client:** Axios for API requests

---

## 🚀 Features

✅ Display a list of all contacts  
✅ Add new contact with validation (no duplicates allowed)  
✅ Delete contacts from the phonebook  
✅ Search/filter contacts dynamically by name  
✅ Notifications for actions (success/error)  
✅ Frontend-backend integration with REST API

---

## ⚙️ Backend (Express)

Built with **Express.js** running on **Node.js**.

Provides RESTful API endpoints:

- `GET /api/persons` → fetch all contacts
- `GET /api/persons/:id` → fetch single contact by ID
- `POST /api/persons` → add a new contact with validation
- `DELETE /api/persons/:id` → delete a contact by ID

**Middleware used:**

- Morgan (logging)
- JSON parsing
- Error handling

Also serves the **React frontend** in production.

---

## 🌐 Deployment

The app is deployed on **Render**:

- Backend (Express API) and frontend (React build) are hosted on the same Render web service
- Continuous deployment is enabled from GitHub repository
- Environment variables (e.g., `PORT`) are configured in Render dashboard
- The production build of the React app is served by Express

👉 [Live Demo on Render](https://phonebook-backend-iagy.onrender.com/)

---

## 🎯 Learning Objectives

- Connect React frontend to a backend API
- Manage state with React hooks (`useState`, `useEffect`)
- Implement CRUD operations via RESTful endpoints
- Handle notifications and validation errors
- Deploy a full-stack app to a cloud service (Render)
