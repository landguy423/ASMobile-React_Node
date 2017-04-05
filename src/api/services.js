const fetch = require('isomorphic-fetch');
const CommandsFactory = require('hystrixjs').commandFactory;
const _ = require('lodash');
const config = require('../config');
const routes = require('./routes');

var HOST = (_ => {
  switch (config.API_HOST) {
    case 'local':
      return 'localhost';
    case 'web':
      return 'kubernetes.baseurl';
    case 'app':
      return 'api.actionsportscommunity.com';
  }
})();

const defaultServiceValues = {
  host: HOST,
  timeout: 1500,
  concurrency: 6,
  errorThreshold: 10
}

const errorHandler = function (error) {
  if (error) return error;
  if (error.statusCode === 503) {
    var unavailableError = new Error();
    unavailableError.name = 'ServiceUnavailableError';
    return unavailableError;
  }
  return null;
};

function prepareRequest(service) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  };
  return (options) => {
    console.log(`fetching ${service.host}${service.apiext}`)
    return fetch(`https://${service.host}/${service.apiext}`, _.assign({}, defaultOptions, options));
  }
}

module.exports = _.reduce(routes, (dic, value, key) => {
  const service = _.assign({}, defaultServiceValues, value);
  dic[key] = CommandsFactory
    .getOrCreate('Service on port : ' + service.port + ' with apiext: ' + service.apiext)
    .circuitBreakerErrorThresholdPercentage(service.errorThreshold)
    .timeout(service.timeout)
    .run(prepareRequest(service))
    .circuitBreakerRequestVolumeThreshold(service.concurrency)
    .circuitBreakerSleepWindowInMilliseconds(service.timeout)
    .statisticalWindowLength(10000)
    .statisticalWindowNumberOfBuckets(10)
    .errorHandler(errorHandler)
    .build();

  return dic;
}, {});
