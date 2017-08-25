'use strict';
const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Deze framboos is super vrolijk! :)');
});

let server = app.listen(8080, function () {
  let port = server.address().port;
  console.log(`Node express server listening at port: ${port}`);
});

