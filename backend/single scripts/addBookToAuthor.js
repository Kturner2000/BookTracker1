const mongoose = require('mongoose');
const Book = require('../models/book.model.js');
const Author = require('../models/author.model.js'); // Assuming you have an Author model
const connectDB = require("../lib/db.js");

async function addBooksToAuthors() {
  try {
    // Connect to your database
    await connectDB();

    // Fetch all books
    const books = await Book.find();

    // Loop through each book and update the corresponding author
    for (let book of books) {
      if (book.author && book.author.length > 0) {
        // Loop through each author in the book
        for (let authorName of book.author) {
          // Find the author by name
          let author = await Author.findOne({ name: authorName });

          // If the author doesn't exist, create a new one
          if (!author) {
            author = new Author({
              name: authorName,
              totalBooks: 1,
              books: [book._id]  // Add current book to the author's books
            });
            await author.save();
            console.log(`Created new author: ${author.name}`);
          } else {
            // Add the book ID to the author's books array if it's not already present
            if (!author.books.includes(book._id)) {
              author.books.push(book._id);
              author.totalBooks += 1; // Increment the totalBooks count
              await author.save();
              console.log(`Added book: ${book.title} to author: ${author.name}`);
            }
          }
        }
      }
    }

    console.log('All authors updated successfully!');
  } catch (error) {
    console.error('Error updating authors:', error);
  } finally {
    await mongoose.disconnect(); // Disconnect from the database after the update
  }
}

// Run the script
addBooksToAuthors();
