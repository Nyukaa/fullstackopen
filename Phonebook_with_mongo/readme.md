# 📞 Phonebook App – Full Stack

This project is part of the **Full Stack Open 2024** course (University of Helsinki).  
The goal is to build a full-stack phonebook application. Users can view, add, update, and delete contacts, with data stored on a MongoDB database.

---

## 📚 Description

The app allows users to:

- View a list of persons with names and phone numbers
- Add new contacts through a form with validation
- Update existing contacts (e.g., mark as important)
- Delete existing contacts
- Receive notifications for successful operations or errors (e.g., duplicate name, invalid phone number, network errors)

The frontend interacts with a backend server via **REST API** and updates in real time.

---

## 🛠️ Tech Stack

- **Frontend:** React, JavaScript, HTML5, CSS3
- **Backend:** Express.js (Node.js)
- **Database:** MongoDB (via Mongoose)
- **HTTP Client:** Axios for API requests

---

## 🚀 Features

✅ Display a list of all contacts  
✅ Add new contact with **name and phone number validation**  
✅ Update contacts  
✅ Delete contacts from the phonebook  
✅ Search/filter contacts dynamically by name  
✅ Notifications for actions (success/error)  
✅ Frontend-backend integration with REST API  
✅ Production-ready deployment served by Express backend

---

## ⚙️ Backend (Express + MongoDB)

Built with **Express.js** running on **Node.js**, connected to **MongoDB**.

### RESTful API endpoints:

- `GET /api/persons` → fetch all contacts
- `GET /api/persons/:id` → fetch a single contact by ID
- `POST /api/persons` → add a new contact with validation
- `PUT /api/persons/:id` → update a contact
- `DELETE /api/persons/:id` → remove a contact

### Middleware used:

- JSON parsing (`express.json()`)
- Request logging (`requestLogger`)
- Error handling (for validation errors, malformed IDs, unknown endpoints)
- Serving static frontend build

---

## 🌐 Phonebook database, step 8 + Deploying the database backend to production

The backend now uses **MongoDB** to store contacts instead of a JSON file.

**Features include:**

- **Validation**:

  - Names must be at least 3 characters long
  - Phone numbers must have length ≥ 8 and be in the format `XX-XXXXXXX` or `XXX-XXXXXXX`
  - Validation errors return descriptive messages in the API response

- **CRUD operations** via Express endpoints:

  - `GET /api/persons` → fetch all contacts
  - `GET /api/persons/:id` → fetch a single contact
  - `POST /api/persons` → add a new contact
  - `PUT /api/persons/:id` → update a contact
  - `DELETE /api/persons/:id` → delete a contact
  - `GET /info` → fetch info

- **Error handling**:

  - Malformed IDs → 400 Bad Request
  - Validation errors → 400 with message
  - Unknown endpoints → 404 Not Found

- **Notifications**: Frontend shows error messages from backend (e.g., validation failure)

- **Deployment**:
  - The frontend production build is served by the backend
  - Only the backend repository is deployed to **Render**
  - Environment variables (e.g., `MONGODB_URI`, `PORT`) configured in Render dashboard

---

## 🎯 Learning Objectives

- Connect React frontend to a backend API
- Manage state with React hooks (`useState`, `useEffect`)
- Implement CRUD operations via RESTful endpoints
- Handle validations and display errors on the frontend
- Deploy a full-stack app to a cloud service (Render)

---

[Phonebook App on Render](https://phonebook-with-mongo.onrender.com/)
