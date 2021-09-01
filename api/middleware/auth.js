const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const header = req.headers['authorization'];
    console.log(header)
    if (header) {
        const token = header.split(' ')[1]; //splitting the bearer token at the space and keeping the token
        console.log(token)
        jwt.verify(token, process.env.SECRET, async(err, data) => {
            console.log("this is " + data);
            if (err) {
                res.status(403)
                    .json({ err: `Invalid Token` })
            } else {
                next();
            }
        })
    } else {
        res.status(403)
            .json({ err: `Missing Token` })
    }
}

module.exports = verifyToken;