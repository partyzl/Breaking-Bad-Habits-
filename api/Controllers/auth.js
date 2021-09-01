require('dotenv').config();

const router = require('express').Router();

//const { enhanceUnexpectedTokenMessage } = require('@jest/transform/build/enhanceUnexpectedTokenMessage'); //this got auto imported, not sure if necessary
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../Models/user')

router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(); //creates the salt
        const hashed = await bcrypt.hash(req.body.password, salt)//hashes and salts the pw
        await User.create({...req.body, password: hashed})//calls create and adds to your db
        res.status(201)
        .json({message: 'User created!'})
    } catch (error) {
        res.status(500)
        .json({error})
    }
})
//header, payload, signature
router.post('/login', async (req, res) => { //jwt token persistence method
    try {
        let user = await User.findByEmail(req.body.email); //find the user by email
        if(!user){ //check if the user exists
            throw new Error('User does not exist')
        }
        const authed = bcrypt.compare(req.body.password, user.passwordDigest) //compare given pw to our hashed one
        if(authed){ //once we know the user exists create the token
            const payload = {
                username: user.username,
                email: user.email
            }
            const sendToken = (err, token) => {
                if(err){
                    throw new Error(`Error in token generation`)
                }
                res.status(200)
                .json({
                    success: true,
                    token: "Bearer "+ token,
                })
            }
            jwt.sign(payload, process.env.SECRET, {
                expiresIn: 3600//1 hour timelimit from token generation to sign in
            }, sendToken); //call this only when token is signed
        } else {
            throw new Error(`User could not be authenticated`)
        }
    } catch (error) {
        console.log(error);
        res.status(401)
        .json({error});
    }
})

module.exports = router;