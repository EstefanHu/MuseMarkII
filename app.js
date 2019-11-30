'use strict';
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');

require('dotenv').config();

// EXPAND FOR AVERAGE SIZE OF POST
app.use(bodyParser.json({ limit: '500kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500kb' }))
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(multer().none());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})