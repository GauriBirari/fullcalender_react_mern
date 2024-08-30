require("dotenv").config();
const express = require("express");
const app = express();
const connectToMongo = require("./config/db");

// Connect to MongoDB
connectToMongo();

const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));


// Routers
// Uncomment the line below to enable the calendar route
app.use("/api/calender", require("./routes/calenderRoute"));

app.get("/", (req, res) => {
    res.send(
        `<marquee>
            <h1>Hello, Running Calendar Project</h1>
        </marquee>`
    );
});

// Port configuration
const port = process.env.PORT || 6000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
