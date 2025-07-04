const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Enable CORS for frontend dev server
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/registration", require("./routes/registration"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/applications", require("./routes/applications"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
