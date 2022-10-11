const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;

const connectDB = async () => {
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log("MongoDB Connected");
};

module.exports = connectDB;