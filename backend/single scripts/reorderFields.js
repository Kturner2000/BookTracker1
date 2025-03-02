const mongoose = require('mongoose');
const Series = require('../models/series.model.js'); // Adjust the path as needed
const connectDB = require('../lib/db.js'); // Adjust the path as needed

async function reorderSeriesFields() {
    try {
        await connectDB();

        // Fetch all series
        const seriesList = await Series.find();

        // Define the desired field order
        const fieldOrder = ['name', 'books', 'booksRead', 'totalBooks', 'completed'];

        // Reorder fields for each series
        const reorderedSeriesList = seriesList.map(series => {
            const reorderedSeries = {};
            fieldOrder.forEach(field => {
                if (series[field] !== undefined) {
                    reorderedSeries[field] = series[field];
                }
            });
            // Include any additional fields not in the specified order
            Object.keys(series.toObject()).forEach(field => {
                if (!fieldOrder.includes(field)) {
                    reorderedSeries[field] = series[field];
                }
            });
            return reorderedSeries;
        });

        console.log(reorderedSeriesList);
        mongoose.disconnect();

    } catch (error) {
        console.error('Error retrieving series:', error);
    }
}

// Run the function
reorderSeriesFields();
