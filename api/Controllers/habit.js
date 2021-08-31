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

//Read habit by id
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params;
        const result = await Habit.findById(id);
        res.status(200)
        .send({result})
    } catch (error) {
        res.status(500)
        .send(error)
    }
})

//Create habit for user
router.post('/', verifyToken, async (req, res) =>{
    try {
        const newHabit = await Habit.create({...req.body, username: req.username});
        res.status(201)
        .send({newHabit})
    } catch (error) {
        res.status(500)
        .send({error})
    }
})

//Update habit 
//Delete habit 