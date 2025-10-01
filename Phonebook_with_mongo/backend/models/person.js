require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "Name must be at least 3 characters long"],
  },
  number: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (v) {
        const regex = /^\d{2,3}-\d+$/;
        return regex.test(v) && v.length >= 8 && v.length < 20;
      },
      message: (props) =>
        `${props.value} is not a valid phone number (must match XX-XXXX..., length 8–19)!`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
