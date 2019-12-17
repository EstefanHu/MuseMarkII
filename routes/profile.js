const router = require('express').Router();
const path = require('path');
const profilePath = __dirname + '/../public/profile/';

router.route('/').get((req, res) => {
    res.sendFile(path.resolve(profilePath + 'profile.html'));
});

router.route('/:id').get((req, res) => {
    res.json('hello Author #' + req.params.id);
})

module.exports = router;