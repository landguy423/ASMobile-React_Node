const express = require('express');
const bodyParser = require('body-parser');
const hystrixStream = require('hystrixjs').hystrixSSEStream;
const app = express();
const _ = require('lodash');

const services = require('../src/api/services');


app.get('/hystrix-sse-stream', (request, reply) => {
  reply.append('Content-Type', 'text/event-stream;charset=UTF-8');
  reply.append('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
  reply.append('Pragma', 'no-cache');
  hystrixStream.toObservable().subscribe(
    function onNext(sseData) {
      reply.write('data: ' + sseData + '\n\n');
    },
    function onError(error) {
      reply(error);
    },
    function onComplete() {
      reply.continue();
    }
  );
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', (req, res) => {
  services.auth.execute({
    method: 'POST',    
    body: 'dummyBody'
  })
  .then(r => {
    console.log(r)
    return r
  })
  .catch(err => console.log(`error: ${err}`));
  
});

app.listen('3003', '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('Express server listening on 0.0.0.0:3003');
});
