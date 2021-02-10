const express = require('express');
const router = express.Router();


// middleware to check if the user is logged in
const loginCheck = () => {
  return (req, res, next) => {
    // if user is logged in proceed to the next step
    if (req.session.user) {
      next();
    } else {
      // otherwise redirect to /login
      res.redirect('/login');
    }
  }
}

/* GET home page */
router.get('/', (req, res, next) => {
    res.render('index')
});

// protected route - can only be accessed by a logged in user
router.get('/profile', loginCheck(), (req, res) => {
  res.render('profile');
})

// protected route - can only be accessed by a logged in user
router.get('/private', loginCheck(), (req, res) => {
  res.render('private');
})



module.exports = router;
