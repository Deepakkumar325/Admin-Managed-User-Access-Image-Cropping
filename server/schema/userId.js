const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    default: "-",
  },
  password: String,
  action: {
    type: Boolean,
    default: true,  /// default
  },
  image: {
    type: String,
    default: "../image/download.png", // image default
  },
});

const userId = mongoose.model("userIds", schema);
module.exports = userId;


// Deepak kumar