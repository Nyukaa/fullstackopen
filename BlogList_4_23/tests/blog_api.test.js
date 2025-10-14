const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});
//4_8
test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

//4_9
test("unique identifier property of blogs is named id", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => {
    assert.ok(blog.id); // id exists and  not empty
    assert.strictEqual(blog._id, undefined); // _id deleted
  });
});

//4_10
test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Async/Await makes life easier",
    author: "Author 4",
    url: "http://example.com/4",
    likes: 10,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  // how many blogs in DB
  const blogsAtEnd = await Blog.find({});
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  // Check thaat new blog is in DB
  const titles = blogsAtEnd.map((b) => b.title);
  assert.ok(titles.includes("Async/Await makes life easier"));
});
//4_11
test("if likes property is missing, it defaults to 0", async () => {
  const newBlog = {
    title: "Blog without likes",
    author: "Author X",
    url: "http://example.com/x",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});
//4_12
test("blog without title is not added", async () => {
  const newBlog = {
    author: "Author Y",
    url: "http://example.com/y",
    likes: 5,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

test("blog without url is not added", async () => {
  const newBlog = {
    title: "Blog without url",
    author: "Author Z",
    likes: 7,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

//4_13

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    const contents = blogsAtEnd.map((b) => b.title);
    assert(!contents.includes(blogToDelete.title));
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
  });

  test("fails with status code 404 if blog does not exist", async () => {
    const validNonexistingId = await helper.nonExistingBlogId();
    await api.delete(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test("fails with status code 400 if id is invalid", async () => {
    const invalidId = "12345invalidid";
    await api.delete(`/api/blogs/${invalidId}`).expect(400);
  });
});

//4_14
describe("updating a blog", () => {
  test("succeeds in updating likes with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedData = { ...blogToUpdate, likes: blogToUpdate.likes + 10 };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 10);
  });

  test("fails with status code 404 if blog does not exist", async () => {
    const nonExistingId = await helper.nonExistingBlogId();

    const updatedData = { likes: 99 };

    await api.put(`/api/blogs/${nonExistingId}`).send(updatedData).expect(404);
  });

  test("fails with status code 400 if id is invalid", async () => {
    const invalidId = "12345badid";
    await api.put(`/api/blogs/${invalidId}`).send({ likes: 77 }).expect(400);
  });
});
after(async () => {
  await mongoose.connection.close();
});
