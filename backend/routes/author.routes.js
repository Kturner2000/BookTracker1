const express = require("express");
 const {
   getAllAuthors, getAuthor
 } = require("../controllers/author.controller");

const router = express.Router();

router.get('/', getAllAuthors)
router.get('/:id', getAuthor)



module.exports = router