const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  genere: {
    type: String,
  },
  description: {
    type: String,
  },
  streamlink: {
    type: String,
  },
  type: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
});

contentSchema.set("timestamps", true);
const Content =
  mongoose.models.Content || mongoose.model("Content", contentSchema);

export default Content;
