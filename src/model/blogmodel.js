const mongoose = require("mongoose");

const blogschema = mongoose.Schema({

    title: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" }


})

const blog = mongoose.model("blog", blogschema);
module.exports = blog;