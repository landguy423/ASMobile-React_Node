import SectionToSelector from '../../helpers/ElementNameToSelector';
var asserters = require('../../../../node_modules/wd/lib/asserters');
/**
 * Wait for the given element to be checked, enabled, selected, visible, contain
 * a text, contain a value or to exist
 * @param  {String}   elem                     Element selector
 * @param  {String}   obsolete                 Duration prefix (unused)
 * @param  {String}   ms                       Wait duration (optional)
 * @param  {String}   isWaitingOnSpecificState Wait for a specific state (else
 *                                             wait for existence)
 * @param  {String}   falseState               Check for opposite state
 * @param  {String}   state                    State to check for (default
 *                                             existence)
 * @param  {Function} done                     Function to execute when finished
 */
module.exports =
(elem, obsolete, ms, isWaitingOnSpecificState, falseState, state, done) => {
    /**
     * Maximum number of milliseconds to wait, default 3000
     * @type {Int}
     */
    const intMs = parseInt(ms, 10) || 3000;
    if(!device){
    /**
     * Command to perform on the browser object
     * @type {String}
     */
    let command = 'waitForExist';

    /**
     * Boolean interpretation of the false state
     * @type {Boolean}
     */
    let boolFalseState = !!falseState;

    /**
     * Parsed interpretation of the state
     * @type {String}
     */
    let parsedState = '';

    if (isWaitingOnSpecificState) {
        parsedState = state.indexOf(' ') > -1
                    ? state.split(/\s/)[state.split(/\s/).length - 1]
                    : state;

        // Check box checked state translates to selected state
        if (parsedState === 'checked') {
            parsedState = 'selected';
        }

        command = `waitFor${parsedState[0].toUpperCase()}` +
                    `${parsedState.slice(1)}`;
    }

    if (typeof falseState === 'undefined') {
        boolFalseState = false;
    }

    browser[command](elem, intMs, boolFalseState);

    done();
    }
    // if we're on a mobile device use this method instead
    if(device){ 
      const check = isWaitingOnSpecificState.trim().toUpperCase();
      console.log("check is " + check + " ms is " + intMs);
      switch(check){ 
        case "EXIST": 
          browser.waitForElementByXPath(SectionToSelector(elem), intMs, !!falseState)
            .then(() => done()); break;
        case "EXISTS": 
          browser.waitForElementByXPath(SectionToSelector(elem), intMs, !!falseState)
            .then(() => done()); break;
        default: 
          browser.waitForElementByXPath(SectionToSelector(elem), intMs, !!falseState)
            .then(() => done()); break;
      }
    }
};
