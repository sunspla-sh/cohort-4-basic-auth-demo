const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');


const signupGetController = (req, res, next) => {
  res.render('signup.hbs');
};

const signupPostController = (req, res, next) => {
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
};

const loginGetController = (req, res, next) => {
  res.render('login.hbs');
};


/**
 * check if user exists
 * check if password is the same
 */
const loginPostController = (req, res, next) => {
  console.log(req.body);

  if(!req.body.email || ! req.body.password){
    res.send('Sorry you forgot email or password');
    return;
  }

  User.findOne({ email: req.body.email })
    .then(foundUser => {

      if(!foundUser){
        res.send('Sorry user does not exist');
        return;
      }

      const isValidPassword = bcryptjs.compareSync(req.body.password, foundUser.password);

      
      if(!isValidPassword){
        res.send('Sorry wrong password');
        return;
      }

      res.send('logged in');

    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
  
}

module.exports = {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController
};