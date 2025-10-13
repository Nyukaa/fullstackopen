require("dotenv").config();

let PORT = process.env.PORT;

console.log("process.env.TEST_MONGODB_URI", process.env.TEST_MONGODB_URI);
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};
console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
module.exports = { MONGODB_URI, PORT };
