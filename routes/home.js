const router = require('express').Router();
const path = require('path');
const homePath = __dirname + '/../public/home/';

router.route('/').get((req, res) => {
	res.sendFile(path.resolve(homePath + 'home.html'));
});

module.exports = router;