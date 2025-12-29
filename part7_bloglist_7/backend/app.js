const express = require("express");
const mongoose = require("mongoose");

const config = require("./utils/config");
const middleware = require("./utils/middleware");
const path = require("path");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const testingRouter = require("./controllers/testing");
const app = express();

mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err.message));

app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor); // for 4_20

console.log("✅ Mounting /api/blogs route");

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}
if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "dist");
  app.use(express.static(distPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
