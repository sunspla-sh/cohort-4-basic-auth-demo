const isLoggedIn = (req, res, next) => {
  // console.log('hi')
  if(!req.session.user){
    res.redirect('/')
    return;
  }
  next()
};

const isAnon = (req, res, next) => {
  // console.log('hi')
  if(req.session.user){
    res.redirect('/profile')
    return;
  }
  next()
};

module.exports = {
  isLoggedIn,
  isAnon
};