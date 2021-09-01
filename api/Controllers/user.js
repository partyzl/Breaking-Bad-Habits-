const router = require('express').Router();

const { verifyToken } = require('../middleware/auth')
const User = require('../Models/user')

//habit route via user
const habitRoutes = require('./habit')
router.use('/:username/habits', habitRoutes)
//habit route via user

router.get('/:username', verifyToken, async (req, res) => {
    try {
        const user = await User.findByUserName(req.params.username);
        res.json(user);
    } catch (error) {
        res.status(500)
        .send({error})
    }

// router.use()
})

module.exports = router;