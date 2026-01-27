import mongoose from "mongoose";
import supertest from "supertest";
import test from "node:test";
import assert from "node:assert";

import app from "../app.js";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import helper from "./test_helper.js";

const api = supertest(app);

let token;

// beforeEach заменяем на отдельный setup-тест
test("setup: create user and get token", async (t) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const user = {
    username: "testuser",
    name: "Test User",
    password: "secret123",
  };
  await api.post("/api/users").send(user);

  const loginResponse = await api
    .post("/api/login")
    .send({ username: "testuser", password: "secret123" });

  token = loginResponse.body.token;

  assert.ok(token, "Token should be defined");
});

test("Blog creation succeeds with valid token", async (t) => {
  const newBlog = {
    title: "Blog with token",
    author: "Token Author",
    url: "http://example.com/token",
    likes: 5,
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const titles = blogsAtEnd.map((b) => b.title);
  assert.ok(titles.includes("Blog with token"));
});

test("Blog creation fails with 401 if token is missing", async (t) => {
  const newBlog = {
    title: "Blog without token",
    author: "NoToken Author",
    url: "http://example.com/notoken",
    likes: 3,
  };

  await api.post("/api/blogs").send(newBlog).expect(401);

  const blogsAtEnd = await helper.blogsInDb();
  const titles = blogsAtEnd.map((b) => b.title);
  assert.ok(!titles.includes("Blog without token"));
});

test("cleanup: close mongoose connection", async (t) => {
  await mongoose.connection.close();
});
