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
      const currentDate = new Date("<YYYY-mm-dd>");
      
      // Add readStatusUpdatedAt if it doesn't exist
      if (book.readStatus === 'read' && !book.bookRead.includes(currentDate)) {
        book.bookRead.push(new Date(currentDate)); // Push the date into the array
      }

      


      await book.save(); // Save the updated book
      console.log(`Updated book: ${book.title} with readBook: ${book.bookRead}`);
    }

    console.log('All books updated successfully!');
  } catch (error) {
    console.error('Error updating books:', error);
  } finally {
    await mongoose.disconnect(); // Disconnect from the database after the update
  }
}

// Function to format date as d/m/y


updateBooks();
