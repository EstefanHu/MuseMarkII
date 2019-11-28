'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const multer = require('multer');

require('dotenv').config();

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