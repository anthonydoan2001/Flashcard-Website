const mongoose = require("mongoose");
const Counter = require("./Counter");

const FolderSchema = new mongoose.Schema({
  _id: {
    type: Number, // Sequential ID
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cardCount: {
    type: Number,
    default: 0,
  },
  cards: [
    {
      topic: {
        type: String,
        required: true,
      },
      explanation: {
        type: String,
        required: true,
      },
    },
  ],
});

// Pre-save hook to assign sequential IDs
FolderSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const counter = await Counter.findOneAndUpdate(
    { name: "folder" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true } // Create if it doesn't exist
  );

  this._id = counter.seq;
  next();
});

module.exports = mongoose.model("Folder", FolderSchema);
