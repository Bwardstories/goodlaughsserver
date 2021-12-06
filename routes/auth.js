const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const router = express.Router();

//  ROUTE FOR CREATING NEW USER

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  //  makes sure each field was entered
  let tempEmail = email.toLowerCase();
  if (!password || !username || !email) {
    return res.status(422).json({
      error: "Please enter a vaild email, username, and password",
    });
  }
  // searches databse for user by username
  User.findOne({ username: username }).then(savedUser => {
    //  if user already exists, sends an error message back
    if (savedUser) {
      return res
        .status(422)
        .send("User already exists, please use another name");
    }

    // if no user exists, hashes password

    bcrypt
      .hash(password, 12)
      .then(hashedpassword => {
        const user = new User({
          username,
          email: tempEmail,
          passwordHash: hashedpassword,
          isAdmin:
            email === "thewardbunch@gmail.com" ||
            email === "brianwardfo8@gmail.com" ||
            email === "kiethDcomedy@gmail.com"
              ? true
              : false,
        });
        user
          .save()
          .then(user => {
            res.json({ message: "User created successfully" });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
});

// ROUTE FOR SIGNING IN WITH EXISTING ACCOUNT
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // checks for password and email
  let tempEmail = email.toLowerCase();
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please enter a valid email and password" });
  }
  //  searches for user by email, and then compares the password with the hashed password ...
  const user = await User.findOne({ email: tempEmail });

  if (!user) {
    return res.status(401).json({ error: "That Email is not registered" });
  }
  const match = await bcrypt.compare(password, user.passwordHash);
  // if password doesn't match, sends back a 401 status and error message
  if (!(user && match)) {
    return res.status(401).json({ error: "Invalid username and/or password" });
  }

  //  defines object for jwt token
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  res.status(200).send({
    token,
    username: user.username,
    id: user._id,
    isAdmin: user.isAdmin,
    message: "Logged in successfully",
  });
});

module.exports = router;
