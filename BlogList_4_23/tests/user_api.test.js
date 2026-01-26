import supertest from "supertest";
import app from "../app.js";

import User from "../models/user.js";
import { test, beforeEach } from "node:test";
import assert from "node:assert";

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const user = new User({ username: "root", password: "secret" });

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
  assert.ok(usersAtEnd.length == usersAtStart.length + 1);
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

  assert.ok(result.body.error == "expected `username` to be unique");

  const usersAtEnd = await User.find({});
  assert.ok(usersAtEnd.length == usersAtStart.length);
});

test("creation fails if username or password too short", async () => {
  const newUser = {
    username: "ab",
    name: "Shorty",
    password: "12",
  };

  const result = await api.post("/api/users").send(newUser).expect(400);

  assert.ok(result.body.error.indexOf("at least 3 characters") !== -1);
});
