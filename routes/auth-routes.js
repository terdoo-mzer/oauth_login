const res = require('express/lib/response');

const router = require('express').Router();

// auth login

router.get('/login', (req, res) => {
    res.render("login");
})

router.get('/logout', (req, res) => {
    res.send('login out');
})

router.get('/google', (req, res) => {
    res.send('logging in');
})


module.exports = router;
