const router = require('express').Router()

const {verifyToken} = require('../middleware/auth')

const User = require('../Models/user')
const Habit = require('../Models/habit')