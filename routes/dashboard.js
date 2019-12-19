const router = require('express').Router();
const path = require('path');
const dashboardPath = __dirname + '/../public/dashboard/';

router.route('/').get((req, res) => {
	res.sendFile(path.resolve(dashboardPath + 'dashboard.html'));
});

module.exports = router;