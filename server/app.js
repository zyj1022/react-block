'use strict';

const express = require('express');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == "OPTIONS") res.send(200);
  else next();
});

const analysis = require('./routes/analysis');
app.use('/analysis', analysis);

const monitor = require('./routes/monitor');
app.use('/monitor', monitor);

const recharts = require('./routes/recharts');
app.use('/recharts', recharts);

const chartjs = require('./routes/chartjs');
app.use('/chartjs', chartjs);

const echart = require('./routes/echart');
app.use('/echart', echart);

const buttons = require('./routes/buttons');
app.use('/buttons', buttons);

const cards = require('./routes/cards');
app.use('/cards', cards);

const grid = require('./routes/grid');
app.use('/grid', grid);

//{pages}//

const { resultData } = require('./common/utils');

app.get('/', function(req, res) {
  res.redirect('/index');
});

app.get('/index', function(req, res) {
  res.type('html');
  res.render('index');
});

app.get('/checkUser', function(req, res) {
  res.type('html');
  res.sendFile('views/checkUser.html', { root: __dirname });
});

app.get('/common/getLoginInfo', function(req, res) {
  res.type('json');
  let ret = {};

  Object.assign(ret, resultData, {
    data: 'test_user'
  });

  res.send(ret);
});

app.post('/common/getCurrentUserInfo', function(req, res) {
  res.type('json');
  let ret = {};

  Object.assign(ret, resultData, {
    data: {
      "pin": "testUser",
      "name": "testUser",
    }
  });

  res.send(ret);
});

app.get('/common/logout', function(req, res) {
  res.redirect('http://localhost:8000/dist/web/home.html');
});

let server = app.listen(8090, function() {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});