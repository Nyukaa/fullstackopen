import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";

const BlogView = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const navigate = useNavigate();

  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  const user = useSelector((state) => state.user);

  // (fix refresh bug)
  if (!blog || !user || !blog.user) {
    return null;
  }

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleDelete = () => {
    if (window.confirm(`Delete blog "${blog.title}"?`)) {
      dispatch(deleteBlog(blog.id, user.token));
      dispatch(showNotification("Blog deleted", "success"));
      navigate("/");
    }
  };

  return (
    <div className="blog-view">
      <h2>{blog.title}</h2>

      <a href={blog.url}>{blog.url}</a>
      <p>
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
      </p>

      <p>added by {blog.author}</p>

      {user.username === blog.user.username && (
        <button onClick={handleDelete}>remove</button>
      )}
    </div>
  );
};

export default BlogView;
