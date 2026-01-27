# 🧭 BlogList E2E Tests – Playwright (Part 5)

This project is part of the **Full Stack Open 2024** course (University of Helsinki).  
The goal is to create **end-to-end (E2E) tests** for the **BlogList application** using **Playwright**, ensuring that the app works correctly from the user's perspective.

---

## 📚 Description

These E2E tests simulate real user behavior in the browser:  
logging in, creating blogs, liking them, deleting them, and verifying ordering by likes.

The tests communicate with a running backend and frontend instance of the BlogList app.

---

## 🧰 Tech Stack

- **E2E Testing Framework:** [Playwright](https://playwright.dev)
- **Language:** JavaScript (Node.js)
- **Browser Automation:** Chromium (default)
- **Backend:** Express.js / MongoDB (must be running before tests)
- **Helper Functions:** Custom test helpers (`helper.js`) for login and blog creation

---

## 🚀 Features Tested

✅ **Login Form**

- Ensures the login form is visible
- Verifies username and password fields appear correctly

✅ **Authentication**

- Successful login with correct credentials
- Fails login with incorrect password (shows error in red)

✅ **Blog Creation**

- Authenticated users can create new blogs
- Verifies that the created blog appears in the list

✅ **Liking Blogs**

- Users can like blogs
- Like count increases correctly after each click

✅ **Deleting Blogs**

- The creator of a blog can delete it
- Other users cannot see the delete button for blogs they did not create

✅ **Blog Ordering**

- Blogs are displayed in **descending order of likes**

✅ **Database Reset**

- Test database is reset before and after each test to ensure isolation

---

## ⚙️ Project Structure

```
e2e-tests/
├─ tests/
│ └─ blog_app.spec.js # Main Playwright test file
├─ helper.js # Reusable helper functions (login, create blog)
├─ playwright.config.js # Playwright configuration
├─ package.json # Dependencies & scripts
└─ README.md
```

## 🏃‍♂️ Running the Tests

### 1️⃣ Install Dependencies

```
npm install
```

### 2️⃣ Start Backend and Frontend

Make sure your backend (`/api`) and frontend (`/`) servers are running.
The backend should support test database reset at:

### 3️⃣ Run Tests (UI Mode)

```
npx playwright test --ui
```

### 4️⃣ Run Tests (Headless Mode)

```
npx playwright test
```

🧭 Learning Objectives

- Understand how to write E2E tests with Playwright

- Automate realistic user actions: typing, clicking, confirming dialogs

- Verify UI updates dynamically based on backend data

- Ensure backend and frontend integrate seamlessly

- Maintain clean test isolation using /api/testing/reset
