import SectionToSelector from '../../helpers/ElementNameToSelector';
var asserters = require('../../../../node_modules/wd/lib/asserters');
/**
 * Wait for the given element to become visible
 * @param  {String}   elem      Element selector
 * @param  {String}   falseCase Whether or not to expect a visible or hidden
 *                              state
 * @param  {Function} done      Function to execute when finished
 *
 * @todo  merge with waitfor
 */
module.exports = (elem, falseCase, done) => {
    /**
     * Maximum number of milliseconds to wait for
     * @type {Int}
     */
    const ms = 30000;
    if(!device){
    browser.waitForVisible(SectionToSelector(elem), ms, !!falseCase);

    done();
    }
    if(device){ 
      if(!!falseCase){
        // spawing 2 async checks whichever wins calls the callback?
       
       browser.elementByXPath(SectionToSelector(elem))
          .should.be.rejected
          .then((result) => {
              console.log("element was not found should stop other thread");
              done();
          })
          .catch((e) => { 
            console.log("element was present catch so going to await it not displayed");
            console.log(e);
            browser
              .waitForElementByXPath(SectionToSelector(elem), 
                asserters.isNotDisplayed, ms, 500, done);
          });

      } 
      else {
        browser
          .waitForElementByXPath(SectionToSelector(elem), asserters.isDisplayed, ms, 500, done);     
      }      
   }
};
