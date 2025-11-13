import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Toggleable from "./components/Toggleable";
import LoginForm from "./components/LoginForm";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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
      console.log("user", user);
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
      setNotification({ message: "Wrong credentials", type: "error" });
      setTimeout(() => setNotification({ message: null, type: null }), 5000);
    }
  };
  const handleLogout = () => {
    setUser(null); // убираем пользователя из состояния
    window.localStorage.removeItem("loggedBlogAppUser"); // очищаем localStorage
  };
  const handleLike = async (blog) => {
    //console.log("Liking blog:", blog);
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id ? blog.user.id : blog.user,
      //user: { ...blog.user },
      // если user — object, get id blog.user.id ||  user: blog.user,
    };
    const returnedBlog = await blogService.update(blog.id, updatedBlog);
    // Преобразуем user обратно в объект, если сервер вернул только ID
    const blogWithUser = {
      ...returnedBlog,
      user:
        typeof returnedBlog.user === "string" ? blog.user : returnedBlog.user,
    };

    console.log("Updated blog:", returnedBlog, blogWithUser);
    setBlogs(blogs.map((b) => (b.id === blog.id ? blogWithUser : b)));
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject, user.token);

      const blogWithUser = {
        ...returnedBlog,
        user: { ...user }, // assign the current user to the blog's user field
      };
      console.log("Creating blog:", blogWithUser);
      console.log("Current user:", user);

      setBlogs(blogs.concat(blogWithUser));

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

  const handleDelete = async (id) => {
    const blogToDelete = blogs.find((b) => b.id === id);
    //console.log("Deleting blog:", blogToDelete);
    if (
      window.confirm(
        `Delete blog "${blogToDelete.title}" by ${blogToDelete.author}?`
      )
    ) {
      try {
        await blogService.deleteBlog(id, user.token);
        setBlogs(blogs.filter((b) => b.id !== id));
        setTimeout(
          () =>
            setNotification({
              message: `Blog "${blogToDelete.title}" deleted successfully`,
              type: "success",
            }),
          5000
        );
        setTimeout(() => setNotification({ message: null, type: null }), 5000);
      } catch (error) {
        setTimeout(
          setNotification({
            message: `Error deleting blog: ${error.message}`,
            type: "error",
          }),
          5000
        );
        setTimeout(() => setNotification({ message: null, type: null }), 5000);
      }
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
      <Notification message={notification.message} type={notification.type} />

      <h2>blogs</h2>
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Toggleable buttonLabel="create new blog">
        <BlogForm createBlog={createBlog} />
      </Toggleable>

      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
