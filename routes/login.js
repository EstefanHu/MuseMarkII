const router = require('express').Router();

router.route('/').get((req, res) => {
  res.sendFile(__dirname + '/index.html');
});

module.exports = router;