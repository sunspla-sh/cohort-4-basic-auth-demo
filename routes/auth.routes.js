const { 
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController
} = require('../controllers/auth.controllers');

const router = require('express').Router();

router.get('/signup', signupGetController);

router.post('/signup', signupPostController);

router.get('/login', loginGetController);

router.post('/login', loginPostController);

module.exports = router;