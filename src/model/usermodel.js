const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    role: { type: String, default: "user" },
    banned: { type: Boolean, default: false }

})

const user = mongoose.model("user", userschema)

module.exports = user
