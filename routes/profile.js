const router = require('express').Router();

router.route('/').get((req, res) => {
    res.json('hello from Profile');
});

router.route('/:id').get((req, res) => {
    res.json('hello Author #' + req.params.id);
})

module.exports = router;