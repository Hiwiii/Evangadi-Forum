const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
} catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
}
};

module.exports = dbConnection;


// either .then .catch or async await