const requestLogger = (req, res, next) => {
  console.log(req.method, req.path, req.body);
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  res.status(400).send({ error: err.message });
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
