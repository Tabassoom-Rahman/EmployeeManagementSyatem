const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    countryCode: { type: String, required: true } // Ensure correct casing here
});

module.exports = mongoose.model('Employee', employeeSchema);
