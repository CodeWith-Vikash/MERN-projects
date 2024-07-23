const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  note: { type: String, required: true },
  title:{type: String, required: true},
  dateCreated:{type: Date, default:Date.now()}
});

module.exports = mongoose.model("note", noteSchema);
