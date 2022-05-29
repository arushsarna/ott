const mongoose = require("mongoose");

const streamlinkSchema = new mongoose.Schema({
  type: {
    type: String,
    // required: true,
  },
  id: {
    type: String,
    // required: true,
  },
  episode: {
    type: Number,
  },
  link: {
    type: String,
    // required: true,
  },
});
streamlinkSchema.set("timestamps", true);
const Streamlink =
  mongoose.models.Streamlink || mongoose.model("Streamlink", streamlinkSchema);

export default Streamlink;
