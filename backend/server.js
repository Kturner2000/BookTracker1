const express = require("express");
require("dotenv").config();
const cors = require("cors");



const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
    // cors({
    //     origin: "http://localhost:4173",
    //     credentials: true,
    // })
);

const connectDB = require("./lib/db.js");

const PORT = process.env.PORT;

// Routes

const bookRoutes = require('./routes/books.routes.js');
const seriesRoutes = require('./routes/series.routes.js') 
const authRoutes = require('./routes/auth.routes.js')


app.use("/api/books", bookRoutes)
app.use("/api/series", seriesRoutes)
app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
    connectDB();
});