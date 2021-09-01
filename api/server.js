const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const authRoutes = require('./Controllers/auth');
const userRoutes = require('./Controllers/user');

server.get('/', (req,res)=> res.send('Shut it'));

server.use('/user', userRoutes);
server.use('/auth', authRoutes);

module.exports = router;