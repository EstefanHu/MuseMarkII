const router = require('express').Router();
const path = require('path');


router.route('/').get((req, res) => {
  res.sendFile(path.resolve(__dirname + '/../public/login.html'));
});

module.exports = router;