'use strict';
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const session = require('express-session');

const app = express();


require('dotenv').config();

// EXPAND FOR AVERAGE SIZE OF POST
app.use(bodyParser.json({ limit: '500kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500kb' }))
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(multer().none());
app.use(session({secret: 'sshhhhhh'}));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const profileRouter = require('./routes/profile');

app.use('/login', loginRouter);
app.use('/', homeRouter);
app.use('/profile', profileRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});