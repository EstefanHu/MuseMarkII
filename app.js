'use strict';
const express = require('express');
const app = express();
const multer = require('multer');

app.use(express.static('public'));
app.use(multer().none());

const PORT = process.env.PORT || 8000;
app.listen(PORT);