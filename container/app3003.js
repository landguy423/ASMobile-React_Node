// const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const http = require('request-promise-json');

// const hystrix = require('hystrixjs');
const hystrixStream = require('hystrixjs').hystrixSSEStream;
const CommandsFactory = require('hystrixjs').commandFactory;

const app = express();
const _ = require('lodash');

const DEV = true;

var makeRequest = function(options) {
    const req = _.assign(options);
    return http.request(req);
};

var isErrorHandler = function(error) {
    if (error) return error;
    if (error.statusCode === 503) {
        var unavailableError = new Error();
        unavailableError.name = 'ServiceUnavailableError';
        return unavailableError;
    }
    return null;
};
const commands = [];

const HOST = DEV ? 'http://localhost' : 'http://prod.addr';

const services = [
    {
        srvName: '/v1/identities',
        port: 3000,
        host: `${HOST}`,
        timeout: 1500,
        concurrency: 6,
        errorThreshold: 10
    },
    {
        srvName: '/v1/profiles',
        port: 3002,
        host: `${HOST}`,
        timeout: 1500,
        concurrency: 6,
        errorThreshold: 10
    },
    {
        srvName: '/v1/email', // comms
        port: 3900,
        host: `${HOST}`,
        timeout: 1500,
        concurrency: 6,
        errorThreshold: 10
    },
    {
        srvName: '/v1/tags',
        port: 3901,
        host: `${HOST}`,
        timeout: 1500,
        concurrency: 6,
        errorThreshold: 10
    }
];

services.forEach(function(service) {
    const serviceCommand = CommandsFactory
        .getOrCreate('Service on port :' + service.port)
        .circuitBreakerErrorThresholdPercentage(service.errorThreshold)
        .timeout(service.timeout)
        .run(makeRequest)
        .circuitBreakerRequestVolumeThreshold(service.concurrency)
        .circuitBreakerSleepWindowInMilliseconds(service.timeout)
        .statisticalWindowLength(10000)
        .statisticalWindowNumberOfBuckets(10)
        .errorHandler(isErrorHandler)
        .build();
    serviceCommand.service = service;
    commands.push(serviceCommand);
});

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

app.post('/post1', (req, res) => {
    var data = req.body;
    return res.json(data);
});

function routeCb(req, res, method) {
    const command = commands.find((item, idx) => {
        if (req.url.indexOf(item.service.srvName) === 0) {
            return true;
        }
    });
    const url = `${command.service.host}${command.service.port ? ':' + command.service.port : ''}${req.url}`;
    let PromiseReq = command.execute({
        body: req.body,
        method: method,
        headers: {authorization: req.headers.authorization}, // QUESTION stay this 1 header or pass all?
        url: url
    });
    PromiseReq.then(function(result) {
        res.append('Access-Control-Allow-Origin', 'http://localhost:9000'); // TODO: replace in prod
        res.append('Access-Control-Allow-Headers', 'Authorization');
        res.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.send(result);
    }).catch(function(error) {
        // res.send('Error: ' + error);

        // delete error.request;
        res.send(error);
    });
}
app.post('*', (req, res) => {
    routeCb(req, res, 'POST');
});

app.get('*', (req, res) => {
    routeCb(req, res, 'GET');
});

app.put('*', (req, res) => {
    routeCb(req, res, 'PUT');
});

app.delete('*', (req, res) => {
    routeCb(req, res, 'DELETE');
});

app.options('*', (req, res) => {
    routeCb(req, res, 'OPTIONS');
});

app.listen('3003', '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('Express server listening on 0.0.0.0:3003');
});