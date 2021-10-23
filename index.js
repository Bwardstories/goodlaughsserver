const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes");
const morgan = require("morgan");

require("dotenv").config();

// define port
const port = 4000;

// Connect to mongoDB

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(result =>
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
  );

//  console logs a success message when connected to database successfully
mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB");
});

//  console logs an error message when connection fails
mongoose.connection.on("error", err => {
  console.log("err connecting", err);
});

// intiializes backend
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
