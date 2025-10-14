const Blog = require("../models/blog");
const initialBlogs = [
  {
    title: "First Blog",
    author: "Author 1",
    url: "http://example.com/1",
    likes: 5,
  },
  {
    title: "Second Blog",
    author: "Author 2",
    url: "http://example.com/2",
    likes: 3,
  },
  {
    title: "Third Blog",
    author: "Author 3",
    url: "http://example.com/3",
    likes: 7,
  },
];
const nonExistingBlogId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    author: "temp",
    url: "http://temp.com",
  });
  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb, nonExistingBlogId };
