const path = require('path');
const express = require('express');
const dockerconfig = require('./config.js');

const app = express();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

app.use(express.static(path.join(__dirname, '/www')));

app.get('/test1000', function response(req, res) {
  var start = Date.now();
  setTimeout(function() {
    res.send('test 111\n' + (Date.now() - start) + 'ms');
  }, getRandomInt(100, 800));
});

app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'www/index.html'));
});

if (!global.TESTING && dockerconfig.NODE_ENV !== 'test') {
  app.listen(dockerconfig.APP_PORT, dockerconfig.APP_HOST, function onStart(err) {
    if (err) {
      console.log(err);
    }
    console.info(`Express server listening on ${dockerconfig.APP_HOST}:${dockerconfig.APP_PORT}`);
  });
};
