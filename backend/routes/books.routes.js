const express = require("express");
 const {
  saveBookToDatabase,
   getBook, updateBookById,
    getAllBooks, getNotPublishedBooks,getBooksByReadStatus
 } = require("../controllers/book.controller");

 

const router = express.Router();

// Public routes
router.get("/", getAllBooks);
router.get("/not-published", getNotPublishedBooks);
router.post("/addBook", saveBookToDatabase);
router.get("/status/:status", getBooksByReadStatus);
router.get('/:id', getBook);
router.put('/edit/:id' ,updateBookById);
module.exports = router;