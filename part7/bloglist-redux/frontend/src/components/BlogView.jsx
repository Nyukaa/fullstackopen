import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog, addComment } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";
import { useState } from "react";
const BlogView = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const navigate = useNavigate();

  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
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
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, comment));
    setComment("");
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
      <h3>comments</h3>

      {/* ✅ add comment */}
      <form onSubmit={handleCommentSubmit}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit">add comment</button>
      </form>

      {/* ✅ list comments */}
      <ul>
        {blog.comments?.map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogView;
