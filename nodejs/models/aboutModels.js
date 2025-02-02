const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
    image: { type: String, required: true },
    displayName: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    birthday: { type: Date, required: true },
    horoscope: { type: String, required: true },
    zodiac: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("About", AboutSchema);