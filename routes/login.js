const router = require('express').Router();

router.route('/').get((req, res) => {
  res.sendFile(__dirname + '/../public/index.html');
});

module.exports = router;