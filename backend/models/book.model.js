const mongoose = require("mongoose");

const bookSchema =  new mongoose.Schema({
    title: { type: String, required: true },
    author: [{ type: String, required: true }],
    seriesName: { type: String, ref: 'Series' },
    seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Series' },  // Reference to Series model
    publishDate: {
      type : Date, 
      validate: {
      validator: (date) => !isNaN(date.getTime()),
      message: 'Invalid date'
    }},
    readStatus: { 
      type: String, 
      enum: ['currentlyReading', 'read', 'wantToRead', 'none'],
      default: 'wantToRead'
    },
    bookReadDates: {
      type: [String],
      default: []
    },
    coverImage: String,
    blurb: String,
    genre: {
      type: [String],
      enum: [
        'romance', 
        'fantasy', 
        'sci-fi', 
        'classic', 
        'children', 
        'ya', 
        'mystery-crime',
        'graphic-novels-manga', 
        'non-fiction'
      ],
      required : true,
    },
    pageCount: Number,
  },
);


  const Book = mongoose.model("Book", bookSchema);

  module.exports = Book;