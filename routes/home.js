const router = require('express').Router();

router.route('/').get((req, res) => {
	res.json('hello from home router');
});

module.exports = router;