const router = require('express').Router();
const path = require('path');
const dashboardPath = __dirname + '/../public/dashboard/';

router.route('/').get((req, res) => {
	res.sendFile(path.resolve(dashboardPath + 'dashboard.html'));
});

router.route('/').post((req, res) => {
  try {
	} catch {
		res.type('text').status(500).send('Error: Somethign went wrong');
	}
});

module.exports = router;