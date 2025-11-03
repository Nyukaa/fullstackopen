import { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false);
  //console.log("Blog component user:", user);
  //console.log("Blog component blog user:", blog.user.id);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  // Toggle function
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{" "}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {user?.id === blog?.user.id && (
            <div>
              <button onClick={() => handleDelete(blog.id)}>delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
