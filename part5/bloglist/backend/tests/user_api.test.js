const bcrypt = require("bcrypt");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });

  await user.save();
});

test("creation succeeds with a fresh username", async () => {
  const usersAtStart = await User.find({});

  const newUser = {
    username: "mluukkai",
    name: "Matti Luukkainen",
    password: "salainen",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await User.find({});
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
});

test("creation fails with proper statuscode and message if username already taken", async () => {
  const usersAtStart = await User.find({});

  const newUser = {
    username: "root",
    name: "Superuser",
    password: "salainen",
  };

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  expect(result.body.error).toContain("expected `username` to be unique");

  const usersAtEnd = await User.find({});
  expect(usersAtEnd).toHaveLength(usersAtStart.length);
});

test("creation fails if username or password too short", async () => {
  const newUser = {
    username: "ab",
    name: "Shorty",
    password: "12",
  };

  const result = await api.post("/api/users").send(newUser).expect(400);

  expect(result.body.error).toContain("at least 3 characters");
});
