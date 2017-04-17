'use strict';
/**
* used to quit the current appuim simulator
* @param {Function} done is the standard cucumber callback
*/

module.exports = function(done) {
  global.browser.quit();
  done();
};
