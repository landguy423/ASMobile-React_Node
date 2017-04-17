import SectionToSelector from '../helpers/ElementNameToSelector';
/**
 * Check if the given element exists in the current DOM
 * @param  {String}   selector  Element selector
 * @param  {String}   falseCase Whether to check if the element exists or not
 * @param  {Function} done      Function to execute when finished
 */
module.exports = (selector, falseCase, done) => {
    /**
     * Elements found in the DOM
     * @type {Object}
     */
   if(!device){
   const elements = browser.elements(SectionToSelector(selector)).value;
    
        
    if (falseCase) {
        expect(elements).to.have
            .lengthOf(0, `Expected element "${selector}" not to exist`);
    } else {
        expect(elements).to.have.length
            .above(0, `Expected element "${selector}" to exist`);
    }

    done();
  }
  if(device){
    browser.elementByXPath(SectionToSelector(selector)).should.be.fulfilled.then(() => done());
  }
};
