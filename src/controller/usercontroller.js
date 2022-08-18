const User = require("../model/usermodel");
const express = require("express")
const route = express.Router();
var jwt = require('jsonwebtoken');
const googleauthentication = require("../authenticate/googleauthenticate")

const Token = (user) => jwt.sign({ user }, 'shhhhh');
route.post("/signup", googleauthentication, async (req, res) => {

    try {

        let existinguser = await User.findOne({ email: req.body.email }).lean().exec();
        console.log(existinguser)
        if (existinguser)
            return res.status(409).send({ message: "ALready user exist kindly login" })

        let user = await User.create(req.body);

        let token = Token(user);




        return res.send({ user, token })
    }
    catch (err) {

        return res.send(err)

    }
})

route.post("/login", async (req, res) => {

    try {
        if (req.body.token) {



            const decoded = jwt.verify(req.body.token, 'shhhhh');
            let user = decoded.user;

            let token = Token(user);
            return res.send({ user, token })
        }

        if (!req.body.email) {
            return res.status(404).send("kindly enter email")
        }
        console.log(req.body)
        let user = await User.findOne({ email: req.body.email }).lean().exec();
        console.log(user)
        let token = Token(user);

        if (!user) {
            return res.status(404).send("no user kindly regeister first")
        }

        console.log(user)
        if (user.password != req.body.password) {
            return res.status(401).send("password not match")
        }

        return res.send({ user, token })

    }
    catch (err) {

        return res.send(err)

    }
})

module.exports = route