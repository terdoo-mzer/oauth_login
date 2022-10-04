const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user) {
        res.redirect('/auth/login');
    } else {
        // res.redirect('')
        next();
    }
}

router.get('/', authCheck, (req, res) => {
    // res.send(`You are logged in. This is your profile: ${req.user.username}`);
    res.render('profile', {user: req.user});

});

module.exports = router;