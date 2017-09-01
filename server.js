'use strict';
const express = require('express');
const request = require('request');

const app = express();
const url ='https://requestb.in/uinu00ui';

request(url, function (error, response, body) {
  if (!error) {
    console.log(body);
  }
});

app.get('/', function (req, res) {
  res.send('Deze framboos is super vrolijk! :)');
});

let server = app.listen(8080, function () {
  let port = server.address().port;
  console.log(`Node express server listening at port: ${port}`);
});

