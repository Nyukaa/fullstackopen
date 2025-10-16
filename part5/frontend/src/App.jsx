import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  //for checking if user is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setNotification({
        message: `Logged in as ${user.username}`,
        type: "success",
      });
      setTimeout(() => setNotification({ message: null, type: null }), 5000);
      console.log("Logged in as", user.username);
    } catch (exception) {
      setNotification({ message: "Wrong username or password", type: "error" });
      setTimeout(() => setNotification({ message: null, type: null }), 5000);
    }
  };
  const handleLogout = () => {
    setUser(null); // убираем пользователя из состояния
    window.localStorage.removeItem("loggedBlogAppUser"); // очищаем localStorage
  };

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject, user.token);
      setBlogs(blogs.concat(returnedBlog));
      setNotification({
        message: `A new blog "${returnedBlog.title}" by ${returnedBlog.author} added!`,
        type: "success",
      });
      setTimeout(() => setNotification({ message: null, type: null }), 5000);
    } catch (error) {
      console.error("Error creating blog:", error);
      setNotification({
        message: `Error creating blog: ${error.message}`,
        type: "error",
      });
      setTimeout(() => setNotification({ message: null, type: null }), 5000);
    }
  };
  // 👇 если пользователь не вошёл — показываем форму логина
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification.message} type={notification.type} />

        {/* {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>} */}

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  //  everithing good with password, username, token
  return (
    <div>
      <Notification message={notification.message} type={notification.type} />

      <h2>blogs</h2>
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm createBlog={createBlog} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
