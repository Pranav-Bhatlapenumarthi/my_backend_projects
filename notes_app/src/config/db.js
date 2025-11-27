const mongoose = require("mongoose");

const connectDB = async() => {
     const uri = process.env.MONGO_URI;
     if(!uri){
          throw new Error("MONGO_URI not set in .env");
     }

     await mongoose.connect(uri, {
          useNewUrlParser: true, // tells the driver to use the newer, more robust connection string parser
          useUnifiedTopology: true, // enables the server monitoring engine to fix any legacy issues and deprecation warnings
     });
     console.log("MongoDB connected");
}

module.exports = connectDB;