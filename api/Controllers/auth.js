require('dotenv').config();

const router = require('express').Router();

const bcrypt = require('bcrypt');
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

router.post('/login', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

module.exports = router;