const mongoose = require("mongoose");
const shortId = require("shortid");

const shortUrlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  ShortUrl: {
    type: String,
    required: true,
    default: shortId.generate(),
  },
  Clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});
module.exports = mongoose.model("ShortUrl", shortUrlSchema);
