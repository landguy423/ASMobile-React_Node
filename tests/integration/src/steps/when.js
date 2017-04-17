import clearInputField from '../support/action/web/clearInputField';
import clickElement from '../support/action/web/clickElement';
import closeLastOpenedWindow from '../support/action/web/closeLastOpenedWindow';
import deleteCookie from '../support/action/web/deleteCookie';
import dragElement from '../support/action/web/dragElement';
import focusLastOpenedWindow from '../support/action/web/focusLastOpenedWindow';
import handleModal from '../support/action/web/handleModal';
import moveToElement from '../support/action/web/moveToElement';
import pause from '../support/action/web/pause';
import pressButton from '../support/action/web/pressButton';
import scroll from '../support/action/web/scroll';
import selectOption from '../support/action/web/selectOption';
import selectOptionByIndex from '../support/action/web/selectOptionByIndex';
import setCookie from '../support/action/web/setCookie';
import setInputField from '../support/action/web/setInputField';
import setPromptText from '../support/action/web/setPromptText';
import submitForm from '../support/action/web/submitForm';
import nth from '../support/helpers/nth.js';
import privateField from '../support/helpers/privateVariables';

module.exports = function when() {
  this.When(
    /^I (click|doubleclick) on the (link|button|element) "([^"]*)?"$/,
    {timeout: 60 * 1000},     
    clickElement
  );

  this.When(
    /^I (add|set) "([^"]*)?" to the inputfield "([^"]*)?"$/,
    setInputField
  );
  
  this.When(
    /^I (add|set) the inputfield "([^"]*)?" to "([^"]*)?"$/,
    {timeout: 30 * 1000},
    (opt, element, value, cb) => setInputField(opt, privateField(value), element, cb)
  );

  this.When(
    /^I clear the inputfield "([^"]*)?"$/,
    clearInputField
  );

  this.When(
    /^I drag element "([^"]*)?" to element "([^"]*)?"$/,
    dragElement
  );

  this.When(
    /^I submit the form "([^"]*)?"$/,
    submitForm
  );

  this.When(
    /^I pause for (\d+)ms$/,
    pause
  );

  this.When(
    /^I set a cookie "([^"]*)?" with the content "([^"]*)?"$/,
    setCookie
  );

  this.When(
    /^I delete the cookie "([^"]*)?"$/,
    deleteCookie
  );

  this.When(
    /^I press "([^"]*)?"$/,
    pressButton
  );

  this.When(
    /^I (accept|dismiss) the (alertbox|confirmbox|prompt)$/,
    handleModal
  );

  this.When(
    /^I enter "([^"]*)?" into the prompt$/,
    setPromptText
  );

  this.When(
    /^I scroll to element "([^"]*)?"$/,
    scroll
  );

  this.When(
    /^I close the last opened (window|tab)$/,
    closeLastOpenedWindow
  );

  this.When(
    /^I focus the last opened (window|tab)$/,
    focusLastOpenedWindow
  );

  this.When(
    /^I select the (\d+)(st|nd|rd|th) option for element "([^"]*)?"$/,
    selectOptionByIndex
  );

  this.When(
    /^I select the option with the (name|value|text) "([^"]*)?" for element "([^"]*)?"$/,
    selectOption
  );

  this.When(
    /^I move to element "([^"]*)?"( with an offset of (\d+),(\d+))*$/,
    moveToElement
  );


   this.When(
   /^I (click|doubleclick) on the (first|second|third|fourth|fifth|sixth) (link|button|element) "([^"]*)?"\s*$/,
   (click, order, type, el, cb) =>  clickElement(click, type, nth(el, order), cb) 
   );
};
