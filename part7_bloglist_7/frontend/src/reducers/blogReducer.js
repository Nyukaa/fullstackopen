import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions;

// thunk для загрузки блогов
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

// thunk для создания блога
export const createBlog = (blog, token, user) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog, token);
    //for awoiding rendering issues
    const blogWithUser = {
      ...newBlog,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
    };

    dispatch(appendBlog(blogWithUser));
    // dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user,
    };
    const returned = await blogService.update(blog.id, updatedBlog);
    dispatch(updateBlog(returned));
  };
};

export const deleteBlog = (id, token) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id, token);
    dispatch(removeBlog(id));
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(id, comment);
    dispatch(updateBlog(updatedBlog));
  };
};
export default blogSlice.reducer;
