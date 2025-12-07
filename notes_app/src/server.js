const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const notesRoutes = require("./routes/notesRoutes");
// const{ errorHandler } = require("./utils/errorHandler");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// error handler
app.use(errorHandler);

const PORT = process.env.port || 8484;

/* server test
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send(`Server running succesfully on port ${PORT}`);
});
*/

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error("Failed to connect to DB", err);
    process.exit(1);
})

// app.get("/test-db", (req, res) => {
//   res.send("DB connection test route");
// });
