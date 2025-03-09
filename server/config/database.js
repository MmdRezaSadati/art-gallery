const mongoose = require("mongoose");

// This file handles the connection to the MongoDB database using Mongoose.
const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = connectDatabase;
