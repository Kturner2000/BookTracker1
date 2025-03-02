const mongoose = require('mongoose');
const Book = require('../models/book.model.js');
const Series = require('../models/series.model.js');
const connectDB = require('../lib/db.js');

async function addBooksToSeries() {
    try {
        // Connect to your database
        await connectDB();

        // Fetch all books
        const books = await Book.find();

        // Loop through each book and update the corresponding series
        for (let book of books) {
            if (book.seriesId) {
                // Find the series by ID
                const series = await Series.findById(book.seriesId);

                if (series) {
                    // Add the book ID to the series' books array if it's not already present
                    if (!series.books.includes(book._id)) {
                        series.books.push(book._id);
                        await series.save();
                        console.log(`Added book: ${book.title} to series: ${series.name}`);
                    }
                }
            }
        }

        console.log('Series updated successfully!');
        mongoose.disconnect();  // Disconnect from the database after the update

    } catch (error) {
        console.error('Error updating series:', error);
    }
}

// Run the script
addBooksToSeries();
