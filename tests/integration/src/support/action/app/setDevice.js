'use strict';

const path = require('path');
var devices = require('../../app/devices.js');
var appServers = require('../../app/helpers/appium-servers.js');
var logger = require('../../app/helpers/logging');
require('../../app/helpers/setup');

/** set the mobile device type
* @param  {String}   device type ios | android
* @param  {Function} done  Function to execute when finished
*/

module.exports = (device, done) => {
  global.device = device;
  let wd = require('wd');
  let driver = wd.promiseChainRemote(appServers.local);
  let desired = devices[device];
  logger.configure(driver);
  global.browser = driver;
  desired.app = path.resolve(desired.app);
  driver.init(desired)
    .then((e) => {
      done();
    })
    .catch((e) => { console.log('catch'); console.error(e); done(); });
}; 
