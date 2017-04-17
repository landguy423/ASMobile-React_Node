import SectionToSelector from '../../helpers/ElementNameToSelector';
/**
 * Scroll the page to the given element
 * @param  {String}   selector Element selector
 * @param  {Function} done     Function to execute when finished
 */
module.exports = (selector, done) => {
    if(!device){
    browser.scroll(SectionToSelector(selector));

    done();
    }
    if(device){
     browser.scroll(SectionToSelector(selector)).then(() => done());
    }
};
