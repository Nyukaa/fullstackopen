const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware"); //

console.log("✅ blogsRouter loaded");

// GET: все блоги (работает без токена)
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

//for 4_20 with required token
blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user; // ✅ получаем пользователя из middleware

  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
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
blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response
        .status(401)
        .json({ error: "only the creator can delete the blog" });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
);

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
//for 7_18 adding comments
blogsRouter.post("/:id/comments", async (req, res, next) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: "Comment is required" });
  }

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).end();

    blog.comments = blog.comments.concat(comment);
    const updatedBlog = await blog.save();
    res.status(201).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
