const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  booksRead: { type: Number, default: 0 },
  totalBooks: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
});



  

const Series = mongoose.model("Series", seriesSchema);

module.exports = Series;