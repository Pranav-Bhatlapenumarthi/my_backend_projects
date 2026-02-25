const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes.js");
const connectDb = require("./config/db.js");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

connectDb();
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));