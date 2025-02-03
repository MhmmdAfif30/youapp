const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log("Database MongoDB Connected...");
    } catch (err) {
        console.error("Database MongoDB Connection Failed:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
