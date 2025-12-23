import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Appnotification from "./components/AppNotification";
// import blogService from "./services/blogs";
// import loginService from "./services/login";
import Toggleable from "./components/Toggleable";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "./reducers/notificationReducer";
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogReducer";
import { initializeUser, loginUser, logoutUser } from "./reducers/userReducer";
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  //const [notification, setNotification] = useState({
  //   message: null,
  //   type: null,
  // });

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
      dispatch(createBlog(blogObject, user.token));
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
  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog));
    } catch (error) {
      console.error("Error liking blog:", error);
      dispatch(
        showNotification(`Error liking blog: ${error.message}`, "error")
      );
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
        await dispatch(deleteBlog(id, user.token));
        dispatch(
          showNotification(
            `Blog "${blogToDelete.title}" deleted successfully`,
            "success"
          )
        );
      } catch (error) {
        dispatch(
          showNotification(`Error deleting blog: ${error.message}`, "error")
        );
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
      <Appnotification
        message={notification.message}
        type={notification.type}
      />

      <h2>blogs</h2>
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Toggleable buttonLabel="create new blog">
        <BlogForm createBlog={addBlog} />
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

// useEffect(() => {
//   blogService.getAll().then((blogs) => setBlogs(blogs));
// }, []);

//  const createBlog = async (blogObject) => {
//     try {
//       const returnedBlog = await blogService.create(blogObject, user.token);

//       const blogWithUser = {
//         ...returnedBlog,
//         user: { ...user }, // assign the current user to the blog's user field
//       };
//       console.log("Creating blog:", blogWithUser);
//       console.log("Current user:", user);

//       setBlogs(blogs.concat(blogWithUser));
// dispatch(
//         showNotification(
//           `A new blog "${returnedBlog.title}" by ${returnedBlog.author} added!`,
//           "success"
//         )
//       );
// const handleLike = async (blog) => {
//     const updatedBlog = {
//       ...blog,
//       likes: blog.likes + 1,
//       user: blog.user.id ? blog.user.id : blog.user,
//     };
//     const returnedBlog = await blogService.update(blog.id, updatedBlog);
//     // ensure the user field is populated correctly
//     const blogWithUser = {
//       ...returnedBlog,
//       user:
//         typeof returnedBlog.user === "string" ? blog.user : returnedBlog.user,
//     };   console.log("Updated blog:", returnedBlog, blogWithUser);
//   setBlogs(blogs.map((b) => (b.id === blog.id ? blogWithUser : b)));
// };
// const handleDelete = async (id) => {
//   const blogToDelete = blogs.find((b) => b.id === id);
//   //console.log("Deleting blog:", blogToDelete);
//   if (
//     window.confirm(
//       `Delete blog "${blogToDelete.title}" by ${blogToDelete.author}?`
//     )
//   ) {
//     try {
//       await blogService.deleteBlog(id, user.token);
//       setBlogs(blogs.filter((b) => b.id !== id));
//       dispatch(
//         showNotification(
//           `Blog "${blogToDelete.title}" deleted successfully`,
//           "success"
//         )
//       );
//     } catch (error) {
//       dispatch(
//         showNotification(`Error deleting blog: ${error.message}`, "error")
//       );
//     }
//   }
// };
// useEffect(() => {
//   const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
//   if (loggedUserJSON) {
//     const user = JSON.parse(loggedUserJSON);
//     setUser(user);
//   }
// }, []);
