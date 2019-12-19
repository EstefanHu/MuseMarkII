'use strict';
const express = require('express');
const redis = require('redis');
const mysql = require('mysql2/promise');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const client = redis.createClient();
const cors = require('cors');
const multer = require('multer');
const app = express();

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
  res.sendFile(__dirname + '/public/dashboard/dashboard.html');
});

app.get('/highlights/:city', async (req, res) => {
  try {
    let city = req.params.city;
    let qry = 'SELECT FROM posts WHERE city=? ORDER BY DESC LIMIT 10';
    let posts = await db.query(qry, city);
    res.json({"posts": posts.rows});
  } catch(err) {
    console.log(err);
    res.type('text').status(500).send('Something went wrong');
  }
});

app.post('/register', async (req, res) => {
  let email = req.body.email;
  let checkEmail = 'SELECT * FROM users WHERE email=?';
  await db.query(checkEmail, email, async (err, result) => {
    if (err) res.json({"Message": "Something went wrong with the server"});
    if (result === 0) {
      try {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let password = req.body.password;
        let qry = 'INSERT INTO user(firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
        await db.query(qry, [firstName, lastName, email, password], (err) => {
          if (err) {
            res.json({"Message": "failed registration"});
          } else {
            res.json({"Message": "Success"});
          }
        });
      } catch(err) {
        console.log(err);
        res.type('text').status(500).send('Something went wrong');
      }
    }
  });
});

app.post('/login', async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let qry = 'SELECT * FROM users WHERE email=? and password=?';
    let [rows, fields] = await db.query(qry, [email, password]);
    console.log(fields);
    if (rows.length !== 0) {

    } else {
      
    }
  } catch(err) {
    res.type('text').status(500).send(err);
  }
});

// NEEDS PAGINATION
app.get('/dashboard', async (req, res) => {
  if(!req.session.key) redirect('/');
  try {
    let city = req.session.city;
    let qryPosts = 'SELECT * FROM posts WHERE city=?';
    let qryDistricts = 'SELECT * FROM districts WHERE city=?';
    let posts = await db.query(qryPosts, city);
    let districts = await db.query(qryDistricts, city);

    res.json({
      "districts": districts.rows,
      "posts": posts.rows
    });
  } catch(err) {
    res.type('text').status(500).send(err);
  }
});

// Could store in localstorage
app.get('/profile', async (req, res) => {
  if(!req.session.key) redirect('/');
  try {
    let user = req.session.firstName + req.session.lastName;
    let qry = ''
  } catch(err) {
    console.log(err);
    res.type('text').status(500).send(err);
  }
});

app.post('/publish', async (req, res) => {
  try {

  } catch(err) {
    console.log(err);
    res.type('text').status(500).send(err);
  }
});

app.update('/update', async (req, res) => {
  try {

  } catch(err) {
    res.type('text').status(500).send(err);
  }
});

app.get('/logout', (req, res) => {
  if (req.session.key) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});