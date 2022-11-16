const { 
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  profileGetController
} = require('../controllers/auth.controllers');

const { isLoggedIn, isAnon } = require('../middlewares/auth.middlewares');

const router = require('express').Router();

router.get('/signup', isAnon, signupGetController);

router.post('/signup', isAnon, signupPostController);

router.get('/login', isAnon, loginGetController);

router.post('/login', isAnon, loginPostController);

router.get('/profile', isLoggedIn, profileGetController);

router.get('/logout', (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;