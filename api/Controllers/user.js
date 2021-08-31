const router = require('express').Router();

const {verifyToken} = require('../middleware/auth')
const User = require('../Models/user')

router.get('/:username', verifyToken, async (req, res) => {
    try {
        const user = await User.findByUserName(req.params.username);
        res.json(user);
    } catch (error) {
        res.status(500)
        .send({error})
    }
})

module.exports = router;