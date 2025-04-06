const mongoose = require('mongoose');
const Book = require('./models/book.model.js');
const Series = require('./models/series.model.js'); // Assuming you have a Series model
const connectDB = require("./lib/db.js");

async function addBooksToSeries() {
  try {
    // Connect to your database
    await connectDB();

    // Fetch all books
    const books = await Book.find();

    // Loop through each book and update the corresponding series
    for (let book of books) {
      if (book.seriesName) {
        // Find the series by name
        let series = await Series.findOne({ name: book.seriesName });

        // If the series doesn't exist, create it
        if (!series) {
          series = new Series({
            name: book.seriesName,
            totalBooks: 1,
            books: []
          });
          await series.save();
          console.log(`Created new series: ${series.name}`);
        }

        // Add the book ID to the series' books array if it's not already present
        if (!series.books.includes(book._id)) {
          series.books.push(book._id);
          series.totalBooks += 1; // Increment the totalBooks count
          await series.save();
          console.log(`Added book: ${book.title} to series: ${series.name}`);
        }
      }
    }

    console.log('All series updated successfully!');
  } catch (error) {
    console.error('Error updating series:', error);
  } finally {
    await mongoose.disconnect(); // Disconnect from the database after the update
  }
}

// Run the script
addBooksToSeries();
