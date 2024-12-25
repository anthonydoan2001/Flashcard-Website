const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, required: true },
});

module.exports = mongoose.model("Counter", CounterSchema);
