const express = require("express");
const mongoose = require("mongoose");

const adminschema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    block: { type: Boolean }
})

const admin = mongoose.model("admin", adminschema)

module.exports = admin;