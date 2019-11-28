const router = require('express').Router();
let Login = require('../models/user.model');

router.route('/').get((req, res) => {
  res.sendFile(__dirname + '/index.html');
})