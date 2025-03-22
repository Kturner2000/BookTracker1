const Series = require('../models/series.model');
const Book = require('../models/book.model')


async function getAllSeries(req, res) {
    try {
        const allSeries = await Series.find().populate('books');
        res.json(allSeries.length ? allSeries : { message: "No series found" });
    } catch (error) {
        console.error("Error in getAllSeries: ", error.message);
        res.status(500).json({ message: "Error getting series from the database" });
    }
}

async function getSeries(req, res) {
    try {
        const { id } = req.params;

        // Find the series by ID and populate the books field
        const series = await Series.findById(id).populate('books');

        if (!series) {
            return res.status(404).json({ message: 'Series not found' });
        }

        series.books.sort((a, b) => a.publishDate - b.publishDate);
        

        // Send the series as a JSON response
        res.json(series);
    } catch (error) {
        console.error("Error fetching series:", error.message);
        res.status(500).json({ message: 'Error fetching series from the database' });
    }
}


async function updateSeries(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!updateData) {
            return res.status(400).json({ message: 'No data provided for update' });
        }

        const updatedSeries = await Series.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedSeries) {
            return res.status(404).json({ message: 'Series not found' });
        }

        res.json(updatedSeries);
    } catch (error) {
        console.error('Error updating series:', error);
        res.status(500).json({ message: 'Error updating series in database' });
    }
}

async function archiveSeries(req, res) {
    try {
        const { id } = req.params;

        const series = await Series.findById(id);

        if (!series) {
            return res.status(400).json({ message: 'No Series found' });
        }

        const updatedBooks = await Book.updateMany(
            { seriesId: id, readStatus: 'wantToRead' },
            { $set: { readStatus: ""} }
        )


        res.status(200).json({ message: 'Books archived successfully', modifiedCount: updatedBooks.modifiedCount });

       
    } catch (error) {
        res.status(500).json({ message: 'Error archiving books', error: error.message });
    }
}

async function deleteSeriesPermanently(req, res) {
    try {
        const { seriesId } = req.params.id;

        if (!seriesId) {
            return res.status(400).json({ message: 'No Series found' });
        }

        await Book.deleteMany({seriesId: seriesId})

        await Series.deleteOne(seriesId)

        res.status(200).json({ message: 'Series and associated books deleted permanently' });

       
    } catch (error) {
        res.status(500).json({ message: 'Error deleting series', error: error.message });
    }
}

module.exports = { getAllSeries, getSeries, updateSeries, archiveSeries, deleteSeriesPermanently };
