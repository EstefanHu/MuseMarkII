const router = require('express').Router();

router.route('/').get((req, res) => {
    res.json('hello from Profile');
});

module.exports = router;