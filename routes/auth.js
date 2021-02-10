const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/signup', (req, res, next) => {
    res.render('signup');
})

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    // hash the user's password
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    //console.log('my log after password:', password, salt, hash);
    User.create({ username, password: hash })
        .then(user => {
        console.log('this log: ', user);
        res.render('profile', { username: username })  
    })
})

router.get('/login', (req, res, next) => {
    res.render('login');
})

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username })
        .then(user => {
            if (user === null) {
                res.render('login', { message: 'Invalid credentials!' });
                return;
            }
            if (bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.render('profile', {username});
            } else {
                res.render('login', {message: 'Invalid credentials!'});
            }
        })
})

router.get('/profile', (req, res, next) => {
    res.render('profile');
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
})


module.exports = router;
