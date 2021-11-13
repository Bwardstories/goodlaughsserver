const express = require("express");
const authRouter = require("./auth");
const eventRouter = require("./events");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/events", eventRouter);
router.get("/", () => {
  return "hello World";
});

module.exports = router;
