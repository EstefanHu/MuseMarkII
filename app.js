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
  secret: 'GaryHost',
  store: new redisStore({host: 'localhost', port: 6379, client: client, ttl: 260}),
  saveUninitialized: false,
  resave: false
}));
app.use(cookieParser('secretSign#143_!223'));

function handle_database(req,type,callback) {
  async.waterfall([
    function(callback) {
      pool.getConnection(function(err,connection){
        if(err) {
        callback(true);
        } else {
        callback(null,connection);
        }
      });
    },
    function(connection,callback) {
      var SQLquery;
      switch(type) {
        case "login" :
          SQLquery = "SELECT * from user_login WHERE user_email='"+req.body.user_email+"' AND `user_password`='"+req.body.user_password+"'";
          break;
        case "checkEmail" :
          SQLquery = "SELECT * from user_login WHERE user_email='"+req.body.user_email+"'";
          break;
        case "register" :
          SQLquery = "INSERT into user_login(user_email,user_password,user_name) VALUES ('"+req.body.user_email+"','"+req.body.user_password+"','"+req.body.user_name+"')";
          break;
        case "addStatus" :
          SQLquery = "INSERT into user_status(user_id,user_status) VALUES ("+req.session.key["user_id"]+",'"+req.body.status+"')";
          break;
        case "getStatus" :
          SQLquery = "SELECT * FROM user_status WHERE user_id="+req.session.key["user_id"];
          break;
        default :
          break;
      }
      callback(null,connection,SQLquery);
    },
    function(connection,SQLquery,callback) {
      connection.query(SQLquery,function(err,rows){
        connection.release();
      if(!err) {
        if(type === "login") {
          callback(rows.length === 0 ? false : rows[0]);
        } else if(type === "getStatus") {
              callback(rows.length === 0 ? false : rows);
            } else if(type === "checkEmail") {
              callback(rows.length === 0 ? false : true);
            } else {
              callback(false);
            }
        } else {
          callback(true);
        }
      });
    }
  ],
  function(result){
    if(typeof(result) === "boolean" && result === true) {
      callback(null);
    } else {
      callback(result);
    }
  });
}

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