const Book = require('../models/book.model');
const Series = require('../models/series.model')
const mongoose = require("mongoose");



async function getAllBooks(req, res) {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error('Error getting all books:', error.message);
        res.status(500).json({ message: 'Error getting all books' });
    }
}

async function getNotPublishedBooks(req, res) {
  const currentDate = new Date();
  try {
      const booksNotPublished = await Book
      .find({ publishDate: { $gt: currentDate } })
      .sort( {publishDate: 1} )
      res.json(booksNotPublished);
  } catch (error) {
      res.status(500).json({ message: "Error retrieving books" });
  }
}


async function saveBookToDatabase(req, res) {
  try {
    const bookData = req.body;

    // Validate required fields
    if (!bookData.title || !bookData.author) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const session = await Book.startSession();
    try {
      await session.withTransaction(async () => {
        let series;
        if (bookData.seriesName) {
          series = await Series.findOneAndUpdate(
            { name: bookData.seriesName },
            { $inc: { totalBooks: 1 } },
            { new: true, session }
          );

          if (!series) {
            series = new Series({
              name: bookData.seriesName,
              totalBooks: 1,
              books: []
            });
            await series.save({ session });
          }
        }

        const newBook = new Book({
          ...bookData,
          author: Array.isArray(bookData.author) ? bookData.author : [bookData.author],
          seriesId: series?._id
        });

        await newBook.save({ session });

        if (series) {
          series.books.push(newBook._id);
          await series.save({ session });
        }

        res.status(201).json({
          message: 'Book saved successfully',
          book: newBook,
          series: series
        });
      });
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error("Error in saveBookToDatabase:", error);
    res.status(500).json({
      message: 'Error saving book',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}


async function getBook(req, res) {
  try {
    const { id } = req.params;

    // Find the book by its _id and populate the seriesId field
    const book = await Book.findById(id).populate('seriesId'); // Populate the seriesId field with the corresponding Series data

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book); // Return the book with the populated seriesId
  } catch (error) {
    console.error("Error in getBook:", error.message);
    res.status(500).json({ message: 'Error getting book from database' });
  }
}



async function updateBookById(req, res) {
  try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedBook = await Book.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedBook) {
          return res.status(404).json({ message: 'Book not found' });
      }

      // If the book is part of a series, update the series
      if (updatedBook.seriesName) {
          const series = await Series.findOne({ name: updatedBook.seriesName });
          if (series) {
              await series.save(); // This will trigger the pre-save middleware
          }
      }

      res.json(updatedBook);
  } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ message: 'Error updating book in database' });
  }
}

async function getBooksByReadStatus(req, res) {
  const { status } = req.params;
  const { genre } = req.query;
  let books, series;
  let currentDate = new Date();

  const genreFilter = genre ? {genre : genre} : {};
  
  switch (status) {
    case 'currentlyReading':
      books = await Book.find({ readStatus: 'currentlyReading' })
        .sort({ seriesOrder: 1 })
        .select({ title: 1, author: 1, readStatus: 1, coverImage: 1 });
     
      break;
    case 'read':
      books = await Book.aggregate([
        { $match: { readStatus: 'read' } }, // Filter books with read status
        {
          $addFields: {
            lastReadDate: { $arrayElemAt: ["$bookRead", -1] } // Get last (most recent) date from bookRead array
          }
        },
        { $sort: { lastReadDate: -1 } }, // Sort by most recent read date
        {
          $project: {
            title: 1,
            author: 1,
            readStatus: 1,
            coverImage: 1,
            updatedAt: 1,
            lastReadDate: 1 // Optional: include lastReadDate in the result
          }
        }
      ]);
      break;
    case 'wantToRead':
      books = await Book.find({ 
        readStatus: 'wantToRead',  
        publishDate: { $lte: currentDate }, 
        ...genreFilter })
        .sort({ seriesOrder: 1 })
        .select({ title: 1, author: 1, readStatus: 1, coverImage: 1, seriesOrder: 1, publishDate: 1 });
     
      break;
    default:
      return res.status(400).json({ error: 'Invalid status' });
  }

  res.json({ books, series });
}






  

module.exports =  {saveBookToDatabase, getBook, updateBookById, getAllBooks, getNotPublishedBooks, getBooksByReadStatus}