require("dotenv").config();
const express = require("express");
const Person = require("./models/person");
const app = express();
// Сначала JSON парсер
app.use(express.json());

// Request logger middleware
const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  if (
    ["POST", "PUT"].includes(req.method) &&
    req.body &&
    Object.keys(req.body).length > 0
  ) {
    console.log("Body:", req.body);
  }
  console.log("---");
  next();
};
app.use(requestLogger);

app.use(express.static("dist"));

app.get("/", (request, response) => {
  response.send("<h1>Phonebook Backend</h1>");
});

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res, next) => {
  const date = new Date();
  Person.countDocuments({})
    .then((count) => {
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
      `);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      if (updatedNote) res.json(updatedNote);
      else res.status(404).json({ error: "Person not found" });
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  console.log("📥 Получен POST-запрос:", req.body);

  const { name, number } = req.body;

  if (!name) {
    console.log("❌ name missing");
    return res.status(400).json({ error: "name missing" });
  }
  if (!number) {
    console.log("❌ number missing");
    return res.status(400).json({ error: "number missing" });
  }

  const person = new Person({ name, number });
  console.log("🆕 Создан новый объект Person:", person);

  person
    .save()
    .then((savedPerson) => {
      console.log("✅ in MongoDB:", savedPerson);
      res.json(savedPerson);
    })
    .catch((error) => {
      console.error("⚠️ in MongoDB:", error.message);
      next(error);
    });
});

// Middleware for unknown endpoints (must come after routes)
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// Error-handling middleware (must come last)
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error); // Pass to default Express error handler if unknown error
};
app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
