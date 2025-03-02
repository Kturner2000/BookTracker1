const mongoose = require("mongoose");
const Series = require('./series.model'); 

const bookSchema =  new mongoose.Schema({
    title: { type: String, required: true },
    author: [{ type: String, required: true }],
    seriesName: { type: String, ref: 'Series' },
    seriesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Series' },  // Reference to Series model
    seriesOrder: { type: Number },
    publishDate: {
      type : Date, 
      validate: {
      validator: (date) => !isNaN(date.getTime()),
      message: 'Invalid date'
    }},
    readStatus: { 
      type: String, 
      enum: ['currentlyReading', 'read', 'wantToRead'],
      default: 'wantToRead'
    },
    readStatusUpdatedAt: {
      type: Date,
      default: null
    },
    coverImage: String,
    blurb: String,
    genre: {
      type: String,
      enum: ['romance', 'fantasy', 'sci-fi', 'classic', 'children'],
      required : true,
    },
    pageCount: Number,
  }, {
    timestamps: true
  }
);

bookSchema.pre('save', function(next) {
  if (this.isModified('readStatus')) {
    this.readStatusUpdatedAt = new Date();
  }
  next();
});



  const Book = mongoose.model("Book", bookSchema);

  module.exports = Book;