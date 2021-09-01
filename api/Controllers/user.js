const router = require('express').Router();

const verifyToken = require('../middleware/auth')
const User = require('../Models/user')


router.get('/:username', verifyToken, async(req, res) => {
    try {
        console.log('the user')
        const user = await User.findByUserName(req.params.username);
        res.json(user);
    } catch (error) {
        console.log("not a user")
        res.status(500)
        .send({ error })
    }
})
    
    // router.use()
    
    // logout
router.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});
    
//habit route via user
const habitRoutes = require('./habit')
router.use('/:username/habits', habitRoutes)
//habit route via user

module.exports = router;