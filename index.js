const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/basic-auth-demo')
  .then(x => console.log(`connected to db ${x.connections[0].name}`))
  .catch(err => console.log(err));

/*
  - models folder
    - User model
    - export User model

  - import User model in routes
  - hash password with bcryptjs
  - use User model to add user to database
  
*/

const hbs = require('hbs');

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.render('index.hbs')
});

app.get('/signup', (req, res, next) => {
  res.render('signup.hbs');
});

app.post('/signup', (req, res, next) => {
  console.log(req.body);
  res.send('ok');
})

app.get('/login', (req, res, next) => {
  res.render('login.hbs');
})



app.listen(3000, () => console.log('app is running on port 3000'))