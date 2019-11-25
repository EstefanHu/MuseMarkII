'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(multer().none());

app.get('/', (req, res) => {
  res.type('text');
  res.send('Hello World');
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})