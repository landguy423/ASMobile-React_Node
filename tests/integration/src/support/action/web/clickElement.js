import checkIfElementExists from '../../lib/checkIfElementExists';
import SectionToSelector from '../../helpers/ElementNameToSelector';
/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (link or selector)
 * @param  {String}   element Element selector
 * @param  {Function} done    Function to execute when finished
 */
module.exports = (action, type, element, done) => {
    /**
     * Element to perform the action on
     * @type {String}
     */
    const elem = (type === 'link') ? `=${element}` : element;

    /**
     * The method to call on the browser object
     * @type {String}
     */
    const method = (action === 'click') ? 'click' : 'doubleClick';

    if(!device){
      checkIfElementExists(elem);
      browser[method](SectionToSelector(elem));

      done();
    }
    if(device){
      browser.elementByXPath(SectionToSelector(element))
        .then((el) => {
          el.click().then(done);
        })
    }
};
