
import SectionToSelector from '../helpers/ElementNameToSelector';
import checkIfElementExists from '../lib/checkIfElementExists';
/**
  * Check if the given element exists
  * @param  {String}   elem       Element selector
  * @param  {Number}   count      Expected Element Count
  * @param  {Function} done       Function to execute when finished
  */
 module.exports = (count, elem, done) => {
   checkIfElementExists(SectionToSelector(elem), false, count);
   done();
};
