const router = require('express').Router();
const path = require('path');
const loginPath = __dirname + '/../public/login/';

router.route('/').get((req, res) => {
  res.sendFile(path.resolve(loginPath + 'login.html'));
});

module.exports = router;