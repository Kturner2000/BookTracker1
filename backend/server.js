const express = require("express");
const cors = require("cors");
const connectDB = require("./lib/db.js");
const path = require("path");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: './.env' }); // Verify this path
}



const app = express();
// app.use(cookieParser());

app.use(express.json());
// CORS Configuration
const corsOrigin = process.env.NODE_ENV === "production" 
    ? process.env.FRONTEND_URL 
    : "http://localhost:5173";

app.use(cors({ origin: corsOrigin, credentials: true }));


const PORT = process.env.PORT || 5000;

// Routes

const bookRoutes = require('./routes/books.routes.js');
const seriesRoutes = require('./routes/series.routes.js') 
const authRoutes = require('./routes/auth.routes.js')

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
    });
}


app.use("/api/books", bookRoutes)
app.use("/api/series", seriesRoutes)
app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
   
    console.log(`server is running on port ${process.env.PORT}`);
    
    connectDB();
});