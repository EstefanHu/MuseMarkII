'use strict';
const express = require('express');
const redis = require('redis');
const mysql = require('mysql2/promise');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const client = redis.createClient();
const cors = require('cors');
const multer = require('multer');
const app = express();

require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_URL || 'localhost',
	port: process.env.DB_PORT || '8889',
	user: process.env.DB_USERNAME || 'root',
	password: process.env.DB_PASSWORD || 'root',
	database: process.env.DB_NAME || 'hw5db'
});

// EXPAND FOR AVERAGE SIZE OF POST
app.use(bodyParser.json({ limit: '500kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500kb' }))
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(multer().none());
app.use(session({
  secret: 'GaryHost',
  store: new redisStore({host: 'localhost', port: 6379, client: client, ttl: 260}),
  saveUninitialized: false,
  resave: false
}));
app.use(cookieParser('secretSign#143_!223'));

app.get('/', (req, res) => {
  try {

  } catch(err) {

  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});