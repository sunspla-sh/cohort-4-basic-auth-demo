const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth.routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/basic-auth-demo')
  .then(x => console.log(`connected to db ${x.connections[0].name}`))
  .catch(err => console.log(err));

const hbs = require('hbs');

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));

app.use('/', authRouter);

app.get('/', (req, res, next) => {
  res.render('index.hbs')
});

app.listen(3000, () => console.log('app is running on port 3000'))