const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://admin:admin@cluster0.iokuwlg.mongodb.net/?retryWrites=true&w=majority");

module.exports = connect;
