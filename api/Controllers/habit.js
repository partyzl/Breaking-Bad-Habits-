const router = require('express').Router()

const {verifyToken} = require('../middleware/auth')

const User = require('../Models/user')
const Habit = require('../Models/habit')

//Read all habits for user
router.get('/', verifyToken, async (req, res) => {
    try {
        const result = await Habit.sortByUserName(req.username);
        res.status(200)
        .json({result})
    } catch (error) {
        res.status
        .send({error})
    }
})