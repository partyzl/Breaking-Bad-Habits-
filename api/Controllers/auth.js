require('dotenv').config();

const router = require('express').Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../Models/user')