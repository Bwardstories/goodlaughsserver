const express = require("express");
const authRouter = require("./auth");
const eventRouter = require("./events");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/events", eventRouter);

module.exports = router;
