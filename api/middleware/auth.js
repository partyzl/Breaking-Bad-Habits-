const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    //console.log(req.headers);
    const header = req.headers['authorization'];
    if(header) {
        const token = header.split(' ')[1]; //splitting the bearer token at the space and keeping the token
        jwt.verify(token, process.env.SECRET, async (err, data) =>{
            console.log(data);
            if(err){
                res.status(403)
                .json({err: `Invalid Token`})
            } else {
                next();
            }
        })
    } else {
        res.status(403)
        .json({err: `Missing Token`})
    }
}

module.exports = verifyToken;