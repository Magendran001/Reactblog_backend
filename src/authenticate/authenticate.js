const jwt = require('jsonwebtoken');
const authenticate = (req, res, next) => {
    try {

        if (!req.headers.authorization) {
            return res.status(401).send("token must")
        }
        if (req.headers.authorization) {
            let token = req.headers.authorization;
            token = token.split(" ")[1];
            


            const decoded = jwt.verify(token, 'shhhhh');

            let user = decoded.user;
            req.user = user;
            console.log(user, "decoede")
            if (!decoded) {
                return res.status(401).send("token wrong")
            }

        }

        next()

    }

    catch (err) {
        return res.send(err)
    }

}
module.exports = authenticate