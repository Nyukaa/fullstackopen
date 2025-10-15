const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// blogsRouter.get("/", async (req, res) => {
//   const blogs = await Blog.find({});
//   res.json(blogs);
// });
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 }); // добавляем данные пользователя
  response.json(blogs);
});

//for 4_20 with required token
blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = request.token
    ? jwt.verify(request.token, process.env.SECRET)
    : null;

  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(401).json({ error: "user not found" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

//for 4_21
blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = request.token
    ? jwt.verify(request.token, process.env.SECRET)
    : null;

  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }

  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response
      .status(401)
      .json({ error: "only the creator can delete the blog" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

//for 4_14
blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      updatedBlog,
      {
        new: true, // return the modified document
        runValidators: true, // check schema validators
        context: "query",
      }
    );

    if (result) {
      response.json(result);
    } else {
      response.status(404).json({ error: "blog not found" });
    }
  } catch (error) {
    response.status(400).json({ error: "malformatted id" });
  }
});

module.exports = blogsRouter;
