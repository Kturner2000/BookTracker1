const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const connectDB = require("./lib/db.js");

// Load environment variables from .env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env' });
}

// Log environment variables to verify they are loaded correctly
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

const corsOrigin = process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL
    : "http://localhost:5173";

app.use(cors({ origin: corsOrigin, credentials: true }));

// Routes
const bookRoutes = require('./routes/books.routes.js');
const seriesRoutes = require('./routes/series.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const authorRoutes = require('./routes/author.routes.js');

app.use("/api/books", bookRoutes);
app.use("/api/series", seriesRoutes);
app.use("/api/author", authorRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    connectDB();
});
