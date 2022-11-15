const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');

const router = require('express').Router();

router.get('/signup', (req, res, next) => {
  res.render('signup.hbs');
});


router.post('/signup', (req, res, next) => {
  console.log(req.body);

  if(!req.body.email || ! req.body.password){
    res.send('Sorry you forgot an email or password');
    return;
  }

  User.findOne({ email: req.body.email })
    .then(foundUser => {
      
      if(foundUser){
        res.send('Sorry user already exists');
        return;
      }

      const myHashedPassword = bcryptjs.hashSync(req.body.password)

      return User.create({
        email: req.body.email,
        password: myHashedPassword
      })
      
    })
    .then(createdUser => {
      console.log("here's the new user", createdUser);
      res.send(createdUser);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
});

router.get('/login', (req, res, next) => {
  res.render('login.hbs');
});

module.exports = router;