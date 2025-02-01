const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    password_confirmation: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);