# React + Vite

# Anecdotes Redux Application (Part 6)

This project is part of the **Full Stack Open** course (University of Helsinki).  
The goal is to create a full-featured anecdote application using **React** and **Redux Toolkit**, with state management, filtering, and notifications.

---

## 📚 Description

This application allows users to:

- View a list of anecdotes.
- Vote for anecdotes to increase their popularity.
- Add new anecdotes.
- Filter anecdotes by text content.
- Receive notifications for important actions (voting or creating anecdotes).

The project was built incrementally according to the exercises 6.3 – 6.13 of the Full Stack Open course.

---

## 🧰 Tech Stack

- Frontend: React
- State Management: Redux Toolkit (`@reduxjs/toolkit`)
- Development Tools: Redux DevTools
- Styling: Basic CSS
- Package Management: npm / Vite (or React scripts)

---

## ✅ Exercises & Features Implemented

### 6.3 – Base React App

- Created initial React application for displaying anecdotes.
- Set up components: `AnecdoteList`, `Anecdote`, and `Notification`.

### 6.4 – Handling State in React

- Managed anecdote list and votes using component-level state.
- Implemented voting functionality.
- Displayed anecdotes sorted by votes.

### 6.5 – Lifting State

- Lifted anecdote state to a parent component to share data across children.
- Passed event handlers as props.

### 6.6 – Forms for New Anecdotes

- Added a form to create new anecdotes.
- Controlled input values using React state.
- Updated anecdote list on submission.

### 6.7 – Filtering Anecdotes

- Added a filter input to display anecdotes matching a search string.
- Implemented filtering functionality in the React components.

### 6.8 – Move to Redux

- Introduced Redux store with `createStore`.
- Managed anecdotes and filter state in Redux.
- Connected React components to the store using `react-redux`.

### 6.9 – Voting & Sorting in Redux

- Refactored voting functionality to work with Redux actions and reducers.
- Sorted anecdotes by votes inside the reducer.
- Updated `AnecdoteList` to use `useSelector` and `useDispatch`.

### 6.10 – Redux Toolkit & Store Refactor

- Installed `@reduxjs/toolkit`.
- Replaced `createStore` and `combineReducers` with `configureStore`.
- Moved store creation to `store.js`.
- Refactored `filterReducer` to use `createSlice`.
- Integrated Redux DevTools automatically.

### 6.11 – Anecdote Reducer Refactor

- Refactored `anecdoteReducer` to use `createSlice`.
- Actions:
  - `createAnecdote` — add a new anecdote.
  - `voteAnecdote` — increment votes for an anecdote.
- Used `current(state)` for debugging immutable state in console.

### 6.12 – Notification Component

- Created `Notification` component with styling.
- Added `notificationReducer` using `createSlice`.
- Displayed initial notification message from the Redux store.

### 6.13 – Show Notifications for Actions

- Extended app to show notifications for 5 seconds when:
  - Voting for an anecdote.
  - Creating a new anecdote.
- Implemented action creators for setting and clearing notifications:
  - `setNotification(message, duration)`
  - `clearNotification()`
- Connected `Notification` component to Redux.

---

## ⚙️ Project Structure

```
src/
├─ components/
│ ├─ AnecdoteList.jsx
│ ├─ Anecdote.jsx
│ ├─ Notification.jsx
│ └─ Filter.jsx
├─ reducers/
│ ├─ anecdoteReducer.js
│ ├─ filterReducer.js
│ └─ notificationReducer.js
├─ store.js
├─ App.jsx
└─ main.jsx
```
