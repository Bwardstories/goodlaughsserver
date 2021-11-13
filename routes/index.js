const express = require("express");
const authRouter = require("./auth");
const eventRouter = require("./events");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/events", eventRouter);
router.get("/", (req, res) => {
  res.send("hello World");
});

module.exports = router;
