const authorization = (roles) => (req, res, next) => {

    try {

        let flag = true;



        if (req.user.role == roles) {
            flag = false;
            return next()
            console.log(e)

        }
        
        else if (flag) {
            return res.send({ message: "no permission" })
        }



    }
    catch (err) {
        return res.send({ err: err })
    }


}
module.exports = authorization;