const { default: mongoose } = require("mongoose");
const Blog = require("../model/blogmodel");
const express = require("express");
const authenticate = require("../authenticate/authenticate.js");
const User = require("../model/usermodel");
const { body, validationResult } = require('express-validator');

const router = express.Router();



router.get("", async (req, res, next) => {
    try {

        let blog = await Blog.find({}).populate("user_id")
        return res.send(blog)
    }
    catch (err) {

        return res.send({ message: err })
    }
})

router.get("/:_id", authenticate, async (req, res, next) => {
    try {

        console.log(req.params)
        let blog = await Blog.find({ user_id: req.params._id }).lean().exec();

        return res.send(blog)
    }
    catch (err) {

        return res.send({ message: err })
    }
})

router.post("", body('title').isLength({ min: 1 }), body('desc').isLength({ min: 1 }), body('image').isLength({ min: 1 }), authenticate, async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }


        req.body.user_id = req.user._id;
        console.log(req.body)

        let newupdated = await User.findOne({ _id: req.user._id }).lean().exec();
        console.log(newupdated.banned, "newyuopdated")

        if (newupdated?.banned) {
            return res.status(400).send({ message: "Temporarily you are blocked. Contact administration" })
        }


        let blog = await Blog.create(req.body);
        return res.send(blog)
    }
    catch (err) {
        console.log(err)
        return res.send({ message: err })
    }
})


router.patch("", authenticate, async (req, res) => {

    try {

        let blog = await Blog.findByIdAndUpdate(req.body._id, req.body, { new: true });

        return res.send(blog)

    }
    catch (err) {

        return res.send(err)
    }
})

router.delete("/:_id", authenticate, async (req, res) => {

    try {

        console.log(req.params)

        let blog = await Blog.findByIdAndDelete(req.params._id);

        return res.send(blog)

    }
    catch (err) {

        return res.send(err)
    }
})




module.exports = router


