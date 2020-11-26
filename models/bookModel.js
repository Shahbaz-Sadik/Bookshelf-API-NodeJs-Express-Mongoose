const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: [true, "A Book must have a name"],
    unique: true,
  },
  authorName: {
    type: String,
    required: [true, "A book must have Author"],
  },
  publishYear: {
    type: String,
    required: [true, "A book must have publish Year"],
  },
  edition: {
    type: String,
    default: "1st",
  },
  language: {
    type: String,
    default: "English",
  },
  price: {
    type: Number,
    required: [true, "A book must have a price"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
