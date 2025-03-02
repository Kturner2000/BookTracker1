const mongoose = require('mongoose');
const Book = require('./models/book.model.js');
const connectDB = require("./lib/db.js");

async function updateBooks() {
  try {
    // Connect to your database
    await connectDB();

    // Fetch all books
    const books = await Book.find();

    // Loop through each book and update it
    for (let book of books) {
      // Add readStatusUpdatedAt if it doesn't exist
      if (!book.readStatusUpdatedAt) {
        book.readStatusUpdatedAt = new Date();
      }

      // Format dates as d/m/y
      if (book.publishDate) {
        book.publishDate = formatDate(book.publishDate);
      }

      if (book.readStatusUpdatedAt) {
        book.readStatusUpdatedAt = formatDate(book.readStatusUpdatedAt);
      }

      await book.save(); // Save the updated book
      console.log(`Updated book: ${book.title} with readStatusUpdatedAt: ${book.readStatusUpdatedAt}`);
    }

    console.log('All books updated successfully!');
  } catch (error) {
    console.error('Error updating books:', error);
  } finally {
    await mongoose.disconnect(); // Disconnect from the database after the update
  }
}

// Function to format date as d/m/y
function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

updateBooks();
