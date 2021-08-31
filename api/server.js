const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./Controllers/auth');
const userRoutes = require('./Controllers/user');

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

app.get('/', (req,res)=> res.send('Shut it'));

module.exports = app;