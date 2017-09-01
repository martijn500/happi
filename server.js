'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/test', function (req, res) {
  if (req.body.answer === '100') {
    res.json({ result: 'correct' });
  } else {
    res.json({ result: 'false' });
  }
});

app.get('/', function (req, res) {
  res.send('Deze framboos is super vrolijk! :)');
});

let server = app.listen(8080, function () {
  let port = server.address().port;
  console.log(`Node express server listening at port: ${port}`);
});

