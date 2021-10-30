const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
      unique: true,
    },
    image_url: {
      type: String,
    },
    name: {
      type: String,
      require: true,
    },
    start: {
      type: String,
      require: true,
    },
    start_time: {
      type: String,
      require: true,
    },
    end_time: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
