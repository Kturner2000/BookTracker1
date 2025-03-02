const mongoose = require('mongoose');
const Book = require('../models/book.model.js');  
const Series = require('../models/series.model.js');  // Adjust path based on your project structure
const connectDB = require("../lib/db.js");


async function addSeriesIdsToBooks() {
    try {
        // Connect to your database

        await connectDB()

        // Fetch all books
        const books = await Book.find(); 

        // Loop through each book and update it with seriesId
        for (let book of books) {
            const series = await Series.findOne({ name: book.seriesName });  // Find series by name

            if (series) {
                book.seriesId = series._id;  // Set the seriesId to the book
                await book.save();  // Save the updated book
                console.log(`Updated book: ${book.title} with seriesId: ${series._id}`);
            }
        }

        console.log('Books updated successfully!');
        mongoose.disconnect();  // Disconnect from the database after the update

    } catch (error) {
        console.error('Error updating books:', error);
    }
}

// Run the script

addSeriesIdsToBooks()


