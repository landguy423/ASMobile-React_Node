import checkIfElementExists from '../../lib/checkIfElementExists';
import SectionToSelector from '../../helpers/ElementNameToSelector';
/**
 * Set the value of the given input field to a new value or add a value to the
 * current element value
 * @param  {String}   method  The method to use (add or set)
 * @param  {String}   value   The value to set the element to
 * @param  {String}   element Element selector
 * @param  {Function} done    Function to execute when finished
 */
module.exports = (method, value, element, done) => {
    /**
     * The command to perform on the browser object (addValue or setValue)
     * @type {String}
     */
    
    const command = (method === 'add') ? 'addValue' : 'setValue';
    // for selenuim
    const el = SectionToSelector(element);
    if(!device){
      checkIfElementExists(SectionToSelector(el), false, 1);

      if (!value) {
        browser[command](el, '');
      } else {
        browser[command](el, value);
      }

      done();
   }
   // for appuim
   if(device){ 
     browser.elementByXPath(SectionToSelector(element)).then((el) => {
       el.sendKeys(value).then(() =>  done());
       })
   }
};
