const express = require("express");
const User = require("../model/usermodel")
const router = express.Router();
const authorization = require("../authorization/authorization");
const authenticate = require("../authenticate/authenticate");
const Admin = require("../model/adminblockmodel");




router.get("/allusers", authenticate, authorization("admin"), async (req, res) => {

    try {
        let user = await User.find({}).lean().exec();
        
        return res.status(201).send(user)

    }
    catch (err) {

        return res.status(400).send({ err })
    }
})

router.patch("/blockuser/:id", async (req, res) => {

    try {


        // req.body.banned = !req.body.banned;

        let updateobj = await User.findById(req.params.id);


        if (!updateobj) {
            return res.status(401).send({ message: "No user found" })
        }
        updateobj.banned = !updateobj.banned;

        let blockuser = await User.findByIdAndUpdate(req.params.id, updateobj, { new: true });






        return res.send(blockuser)


    }
    catch (err) {

        return res.status(400).send(err)
    }
})



module.exports = router;