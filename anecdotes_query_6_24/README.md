# Full Stack Open — Part 6

## Exercises 6.20 – 6.24: Anecdotes, React Query & Notifications

This project implements the Anecdotes application for **Full Stack Open Part 6**, exercises **6.20–6.24**.  
The app uses **React Query**, **Context + useReducer**, and a **JSON Server backend** with validation.

---

## 🚀 Technologies Used

- **React**
- **@tanstack/react-query**
- **useReducer + Context API**
- **JSON Server (with custom validation middleware)**

---

## 📌 Exercise Breakdown

### 🟦 6.20 – 6.21: Fetching & Creating Anecdotes with React Query

**Added:**

- Fetch anecdotes using `useQuery`
- Create new anecdotes using `useMutation`
- Display loading and error states

**Core functions:**

```js
useQuery({ queryKey: ["anecdotes"], queryFn: getAnecdotes });
useMutation({ mutationFn: createAnecdote });
```

### 6.22: Updating Anecdotes (Voting)

When a user votes on an anecdote:

- `updateAnecdoteMutation` sends a **PUT** request.
- The cache is manually updated:

This avoids a full refetch and keeps the UI instant.

### 6.23: Global Notification System

A global notification context is created using Context + useReducer.

Reducer actions:

SET — show a notification

CLEAR — hide notification after timeout

The provider wraps the app.
Used across the app with useContext(NotificationContext).

### 6.24: Server Validation Errors

The backend rejects anecdotes shorter than 5 characters.

Server-side validation (JSON Server middleware).

Client-side error handling: Handled in useMutation.
Shows a notification instead of crashing.
