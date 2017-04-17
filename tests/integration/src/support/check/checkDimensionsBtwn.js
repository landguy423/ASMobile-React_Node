
import SectionToSelector from '../helpers/ElementNameToSelector';
/**
 * Check the dimensions of the given element
 * @param  {String}   elem         Element selector
 * @param  {String}   falseCase    If the test should fail
 * @param  {String}   minSize      Expected mininum size
 * @param  {String}   maxSize      Expected maximum size
 * @param  {String}   dimension    Dimension to check (wide or broad or tall)
 * @param  {Function} done         Function to execute when finished
 */

module.exports = (elem, falseCase, minSize, maxSize, dimension, done) => {
    /**
     * The size of the given element
     * @type {Object}
     */
    const elementSize = browser.getElementSize(elem);

    /**
     * Parsed size to check for
     * @type {Int}
     */
    const intMinSize = parseInt(minSize, 10);
    const intMaxSize = parseInt(maxSize, 10);

    /**
     * The size property to check against
     * @type {Int}
     */
    let origionalSize = elementSize.height;

    /**
     * The label of the checked property
     * @type {String}
     */
    let label = 'height';

    if (dimension === 'broad' | dimension === 'wide') {
        origionalSize = elementSize.width;
        label = 'width';
    }

    const isBetween = origionalSize >= minSize && origionalSize <= maxSize;

    if (falseCase) {
        expect(isBetween).to.not
            .equal(
                true,
                `Element "${elem}" should have a ${label} between ` +
                `${minSize}px and ${maxSize}px`
            );
    } else {
        expect(isBetween).to
            .equal(
                true,
                `Element "${elem}" should have a ${label} between ` +
                `${minSize}px and ${maxSize}px`
            );
    }

    done();
};
