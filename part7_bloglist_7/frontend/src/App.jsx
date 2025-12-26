import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import BlogView from "./components/BlogView";
import BlogForm from "./components/BlogForm";
import Appnotification from "./components/AppNotification";
import Navigation from "./components/Navigation";
// import blogService from "./services/blogs";
// import loginService from "./services/login";
import Toggleable from "./components/Toggleable";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import { initializeUser, loginUser, logoutUser } from "./reducers/userReducer";
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);
  //for checking if user is logged in
  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    await dispatch(loginUser(username, password));
    setUsername("");
    setPassword("");
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const addBlog = (blogObject) => {
    try {
      dispatch(createBlog(blogObject, user.token, user));
      dispatch(
        showNotification(`A new blog "${blogObject.title}" added`, "success")
      );
    } catch (error) {
      console.error("Error creating blog:", error);
      dispatch(
        showNotification(`Error creating blog: ${error.message}`, "error")
      );
    }
  };

  // if user is not logged in, show login form

  if (user === null) {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
        notification={notification}
      />
    );
  }
  //  everithing good with password, username, token
  return (
    <div>
      <Appnotification
        message={notification.message}
        type={notification.type}
      />
      <Navigation user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route
          path="/"
          element={
            <>
              <Toggleable buttonLabel="create new blog">
                <BlogForm createBlog={addBlog} />
              </Toggleable>

              {sortedBlogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
