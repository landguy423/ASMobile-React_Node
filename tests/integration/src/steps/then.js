import checkClass from '../support/check/checkClass';
import checkContainsAnyText from '../support/check/checkContainsAnyText';
import checkContainsText from '../support/check/checkContainsText';
import checkCookieContent from '../support/check/checkCookieContent';
import checkCookieExists from '../support/check/checkCookieExists';
import checkDimension from '../support/check/checkDimension';
import checkEqualsText from '../support/check/checkEqualsText';
import checkFocus from '../support/check/checkFocus';
import checkInURLPath from '../support/check/checkInURLPath';
import checkIsOpenedInNewWindow from '../support/check/checkIsOpenedInNewWindow';
import checkModal from '../support/check/checkModal';
import checkModalText from '../support/check/checkModalText';
import checkNewWindow from '../support/check/checkNewWindow';
import checkOffset from '../support/check/checkOffset';
import checkProperty from '../support/check/checkProperty';
import checkSelected from '../support/check/checkSelected';
import checkTitle from '../support/check/checkTitle';
import checkURL from '../support/check/checkURL';
import checkURLPath from '../support/check/checkURLPath';
import checkWithinViewport from '../support/check/checkWithinViewport';
import compareText from '../support/check/compareText';
import isEnabled from '../support/check/isEnabled';
import isExisting from '../support/check/isExisting';
import isVisible from '../support/check/isVisible';
import waitFor from '../support/action/web/waitFor';
import waitForVisible from '../support/action/web/waitForVisible';
import checkElementCount from '../support/check/checkElementCount';
import checkDimensionsBtwn from '../support/check/checkDimensionsBtwn';
import nth from '../support/helpers/nth.js';
import pause from '../support/action/web/pause';
import quitSimulator from '../support/action/app/quitSim';
import checkSendGrid from '../support/check/checkSendGrid';
import privateField from '../support/helpers/privateVariables';

module.exports = function then() {

  this.Then(
	/^I expect that there are ([0-9]+) "([^"]*)?" elements$/,
	checkElementCount 
  );
  this.Then(
    /^I expect that the title is( not)* "([^"]*)?"$/,
    checkTitle
  );

  this.Then(
    /^I expect (that|the) (first|second|third|fourth|fifth|sixth)?\s?element "([^"]*)?" is( not)* visible$/,
    (article, ordinal, el, not, cb) => isVisible(nth(el, ordinal), not, cb)
  );

  this.Then(
    /^I expect (that|the) (first|second|third|fourth|fifth|sixth)?\s?element "([^"]*)?" becomes( not)* visible$/,
    {timeout: 60 * 1000},
    (article, ordinal, el, not, cb) => waitForVisible(nth(el, ordinal), not, cb)
  );

  this.Then(
    /^I expect (that|the) element "([^"]*)?" is( not)* within the viewport$/,
    (article, el, not, cb) => checkWithinViewport(el, not, cb)
  );

  this.Then(
    /^I expect (that|the) element "([^"]*)?" does( not)* exist$/,
    (article, el, not, cb) => isExisting(el, not, cb)
  );

  this.Then(
    /^I expect (that|the) element "([^"]*)?"( not)* contains the same text as element "([^"]*)?"$/,
    (article, el, not, text, cb) => compareText(el, not, text, cb)
  );

  this.Then(
    /^I expect (that|the) (element|inputfield) "([^"]*)?"( not)* matches the text "([^"]*)?"$/,
    (article, selector, el, not, text, cb) => checkEqualsText(selector, el, not, text, cb)
  );

  this.Then(
    /^I expect (that|the) (element|inputfield) "([^"]*)?"( not)* contains the text "([^"]*)?"$/,
    (article, selector, el, not, text, cb) => { 
      checkContainsText(selector, el, not, privateField(text), cb) }
  );
  
  this.Then(
    /^I expect (that|the) (first|second|third|fourth|fifth|sixth) (element|inputfield) "([^"]*)?"( not)* contains the text "([^"]*)?"$/,
    (article, order, selector, el, not, text, cb) => { 
      checkContainsText(selector, nth(el, order), not, text, cb); }
  );

  this.Then(
    /^I expect (that|the)\s(first|second|third|fourth|fifth|sixth)?\s?(element|inputfield) "([^"]*)?"( not)* contains any text$/,
    (article, ordinal, selector, el, not, cb) => 
      { checkContainsAnyText(selector, nth(el, ordinal), not, cb); }
  );

  this.Then(
    /^I expect (that|the) (element|inputfield) "([^"]*)?" is( not)* empty$/,
    (article, selector, el, not, cb) => checkContainsAnyText(selector, el, not, cb)
  );

  this.Then(
    /^I expect (that|the) the url is( not)* "([^"]*)?"$/,
    (article, not, url, cb) => checkURL(not, url, cb)
  );

  this.Then(
    /^I expect (that|the) the path is( not)* "([^"]*)?"$/,
    (article, not, path, cb) => checkURLPath(not, path, cb)
  );

  this.Then(
    /^I expect the url to( not)* contain "([^"]*)?"$/,
    checkInURLPath
  );

  this.Then(
    /^I expect (that|the) the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"$/,
    (article, css, attr_one, el, not, attr_two, cb ) => checkProperty(css, attr_one, el, not, attr_two, cb)
  );

  this.Then(
    /^I expect (that|the) checkbox "([^"]*)?" is( not)* checked$/,
    (article, el, not, cb) => checkSelected(el, not, cb)
  );

  this.Then(
    /^I expect (that|the) element "([^"]*)?" is( not)* selected$/,
    (article, el, not, cb) => checkSelected(el, not, cb)
  );

  this.Then(
    /^I expect (that|the) (first|second|third)?\s*element "([^"]*)?" is( not)* enabled$/,
    (article, ordinal, el, not, cb) => isEnabled(nth(el, ordinal), not, cb)
  );

  this.Then(
    /^I expect (that|the) cookie "([^"]*)?"( not)* contains "([^"]*)?"$/,
    (article, cookie, not, text, cb) => checkCookieContent(cookie, not, text, cb)
  );

  this.Then(
    /^I expect (that|the) cookie "([^"]*)?"( not)* exists$/,
    (article, cookie, not, cb) => checkCookieExists(cookie, not, cb)
  );

  this.Then(
    /^I expect (that|the) element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)$/,
    (article, el, not, px, size, cb) => checkDimension(el, not, px, size, cb)
  );

  this.Then(
    /^I expect (that|the) element "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x|y) axis$/,
    (article, el, not, px, axis, cb) => checkOffset(el, not, px, axis, cb)
  );

  this.Then(
    /^I expect (that|the) element "([^"]*)?" (has|does not have) the class "([^"]*)?"$/,
    (article, el, has, c, cb) => checkClass(el, has, c, cb)
  );

  this.Then(
    /^I expect a new (window|tab) has( not)* been opened$/,
    checkNewWindow
  );

  this.Then(
    /^I expect (that|the) url "([^"]*)?" is opened in a new (tab|window)$/,
    (article, url, type, cb) => checkIsOpenedInNewWindow(url, type, cb)
  );

  this.Then(
    /^I expect (that|the) element "([^"]*)?" is( not)* focused$/,
    (article, el, not, cb) => checkFocus(el, not, cb)
  );

  this.Then(
    /^I wait on element "([^"]*)?"( for (\d+)ms)*( to( not)* (be checked|be enabled|be selected|be visible|contain a text|contain a value|exist))*$/,
    waitFor
  );

  this.Then(
    /^I expect (that|the|a) (alertbox|confirmbox|prompt) is( not)* opened$/,
    (article, type, not, cb) => checkModal(type, not, cb)
  );

  this.Then(
    /^I expect (that|the|a) (alertbox|confirmbox|prompt)( not)* contains the text "([^"]*)?"$/,
    (article, type, not, text, cb) => checkModalText(type, not, text, cb)
  );
  
  this.Then(/^I expect the browser to pause for ([0-9]*) milliseconds$/, pause);

  this.Then(
    /^I expect the element "([^"]*)?" is( not)* between ([0-9]+)px and ([0-9]+)px (tall|wide|broad)$/,
    checkDimensionsBtwn
  );

  this.Then(/^I expect an email was sent to "([^"]*)?"$/, checkSendGrid);
  this.Then(/^I quit the simulator$/, quitSimulator);
};
