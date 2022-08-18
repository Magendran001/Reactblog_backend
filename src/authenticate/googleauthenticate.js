const User = require("../model/usermodel");
const jwt = require('jsonwebtoken');
const Token = (user) => jwt.sign({ user }, 'shhhhh');

async function googleauthentication(req, res, next) {

    if (req.body.loginobj?.given_name) {
        console.log(req.body.loginobj)
        let existinguser = await User.findOne({ email: req.body.loginobj.email }).lean().exec();
        console.log(existinguser, "existinguser")
        if (existinguser) {

            let token = Token(existinguser);

            return res.send({ user: existinguser, token })


        }
        else {
            let lastname = req.body.loginobj.family_name ? req.body.loginobj.family_name : req.body.loginobj?.given_name;

            req.body = {

                email: req.body.loginobj?.email,
                password: Math.random(20000, 30000),
                firstname: req.body.loginobj?.given_name,
                lastname: lastname,
            }
            next()
        }


    }
    else {
        next()
    }



}
module.exports = googleauthentication