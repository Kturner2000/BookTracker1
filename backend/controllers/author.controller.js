const Author = require('../models/author.model');


async function getAllAuthors(req, res) {
    try {
        const allAuthor = await Author.find();
        res.json(allAuthor.length ? allAuthor : { message: "No series found" });
    } catch (error) {
        console.error("Error in getAllAuthors: ", error.message);
        res.status(500).json({ message: "Error getting series from the database" });
    }
}

async function getAuthor(req, res) {
    try {
        const { id } = req.params;

        // Find the series by ID and populate the books field
        const author = await Author.findById(id).populate('books');

        if (!series) {
            return res.status(404).json({ message: 'Series not found' });
        }

        author.books.sort((a, b) => a.publishDate - b.publishDate);
        

        // Send the series as a JSON response
        res.json(author);
    } catch (error) {
        console.error("Error fetching series:", error.message);
        res.status(500).json({ message: 'Error fetching series from the database' });
    }
}




module.exports = { getAllAuthors, getAuthor};
