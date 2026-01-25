# 📝 Anecdotes App – Step 3

This project is part of the **Full Stack Open 2024** course (University of Helsinki).  
The goal is to build a simple voting application in React where users can browse programming anecdotes and vote for their favorites.

## 📚 Description

The app displays one anecdote at a time, chosen randomly.  
Users can vote for the currently visible anecdote, and the application tracks the number of votes for each anecdote.  
Additionally, the app highlights the anecdote with the most votes.

## 🛠️ Tech Stack

- **React** (functional components, props, state)
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**
- **Vite / Create React App** (depending on setup)

## 🚀 Features

✅ Display a random anecdote from a predefined list  
✅ Allow users to vote for anecdotes  
✅ Track votes using React state  
✅ Show total votes for the current anecdote  
✅ Highlight the anecdote with the most votes

## 📂 Project Structure

´´´
src/
├── components/
│ ├── Button.jsx # Reusable button component
│ └── Anecdote.jsx # Component for displaying anecdote text & votes
├── App.jsx # Main application logic
└── main.jsx # React entry point

´´´

## ▶️ Running the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/anecdotes-step3.git
   cd anecdotes-step3
   ```

2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open in your browser:
   ```
   http://localhost:5173
   ```
