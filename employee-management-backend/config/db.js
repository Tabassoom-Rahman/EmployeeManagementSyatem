const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURI = 'mongodb://127.0.0.1:27017/employee_db'; // MongoDB URL
        await mongoose.connect(dbURI);
        console.log('MongoDB connected successfully to database: employee_db');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
