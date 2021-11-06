const express = require("express");
const Event = require("../models/event");

const router = express.Router();

router.post("/createEvent", async (req, res) => {
  console.log(req.body.data, "from backend");
  const { id, image_url, name, start, end } = req.body.data;
  const event = new Event({
    id: id,
    image_url: image_url,
    name: name.html,
    start: start.local,
    start_time: start.local,
    end_time: end.local,
  });
  event
    .save()
    .then(user => {
      res.json({ message: "User created successfully" });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/getEvents", async (req, res) => {
  Event.find({})
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
