const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  streamlink: {
    type: String,
  },
  userid: {
    type: String,
  },
  type: {},
});

analyticsSchema.set("timestamps", true);
const Analytics =
  mongoose.models.Analytics || mongoose.model("Analytics", analyticsSchema);

export default Analytics;
