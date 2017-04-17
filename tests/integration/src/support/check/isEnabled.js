
import SectionToSelector from '../helpers/ElementNameToSelector';
/**
 * Check if the given element is enabled
 * @param  {String}   element   Element selector
 * @param  {String}   falseCase Whether to check if the given element is enabled
 *                              or not
 * @param  {Function} done      Function to execute when finished
 */
module.exports = (element, falseCase, done) => {
    /**
     * The enabled state of the given element
     * @type {Boolean}
     */
    if(!device){
    const isEnabled = browser.isEnabled(SectionToSelector(element));

    if (falseCase) {
        expect(isEnabled).to.not
            .equal(true, `Expected element "${element}" not to be enabled`);
    } else {
        expect(isEnabled).to
            .equal(true, `Expected element "${element}" to be enabled`);
    }

    done();
   }
   if(device){
     browser.elementByXPath(SectionToSelector(element)).then((el) => {
       el.isEnabled().then((isEnabled) => {
         if (falseCase) {
           expect(isEnabled).to.not
            .equal(true, `Expected element "${element}" not to be enabled`);
         } else {
          expect(isEnabled).to
            .equal(true, `Expected element "${element}" to be enabled`);
         }

         done();

       })
     })
   }
};
