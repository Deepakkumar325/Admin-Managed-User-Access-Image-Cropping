const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  pass: String,    // pass
});

const adminlog = mongoose.model("admins", schema);

module.exports = adminlog;
