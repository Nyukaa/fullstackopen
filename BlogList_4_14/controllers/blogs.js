const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// blogsRouter.post("/", async (req, res) => {
//   const blog = new Blog(req.body);
//   try {
//     const savedBlog = await blog.save();
//     res.status(201).json(savedBlog);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

blogsRouter.post("/", async (req, res) => {
  const body = req.body;

  if (!body.title || !body.url) {
    return res.status(400).json({ error: "title or url missing" }); //for 4_12 test
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0, // for 4_11 test
  });

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});
//for 4_13
blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (deletedBlog) {
      response.status(204).end(); // deleted successfully
    } else {
      response.status(404).json({ error: "blog not found" }); // blog not found
    }
  } catch (error) {
    response.status(400).json({ error: "malformatted id" }); // invalid id
  }
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
