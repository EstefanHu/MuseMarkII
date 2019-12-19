'use strict';
const express = require('express');
const redis = require('redis');
const mysql = require('mysql');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const async = require('async');
const client = redis.createClient();
const cors = require('cors');
const multer = require('multer');
const app = express();
const router = express.Router();

require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'redis_demo', //change
  debug: false
});

// EXPAND FOR AVERAGE SIZE OF POST
app.use(bodyParser.json({ limit: '500kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500kb' }))
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(multer().none());
app.use(session({
  secret: 'sshhhhhh',
  store: new redisStore({host: 'localhost', port: 6379, client: client, ttl: 260}),
  saveUninitialized: false,
  resave: false
}));
app.use(cookieParser('secretSign#143_!223'));

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