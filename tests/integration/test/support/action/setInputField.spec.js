/*eslint comma-dangle: ["error", "ignore"]*/
import setInputField from 'src/support/action/web/setInputField';

describe(
  'setInputField', () => {
    let expectToHaveLengthOf;
    let expectToHaveLengthOfAtLeast;
    let done;

    beforeEach(() => {
      global.device = false;
      global.browser = {
        addValue: jest.fn(),
        setValue: jest.fn(),
        elements: jest.fn(() => ({
          value: ['1'],
        })).mockImplementationOnce(() => ({
          value: [],
        })).mockImplementationOnce(() => ({
          value: ['1', '2'],
        })),
      };

      expectToHaveLengthOf = jest.fn();
      expectToHaveLengthOfAtLeast = jest.fn();

      global.expect = jest.fn(() => ({
        to: {
          have: {
            length: {
              of: {
                at: {
                  least: expectToHaveLengthOfAtLeast,
                },
              },
            },
            lengthOf: expectToHaveLengthOf,
          },
        },
      }));

      done = jest.fn();
    });

    it(
      'should fail if the element is not on the page',
      () => {
        setInputField('add', 'value', 'element', done);

        _expect(global.browser.addValue).toHaveBeenCalledTimes(1);
        _expect(global.browser.addValue)
          .toHaveBeenCalledWith('element', 'value');

        _expect(global.browser.setValue).not.toHaveBeenCalled();

        _expect(expectToHaveLengthOf).toHaveBeenCalledTimes(1);
        _expect(expectToHaveLengthOf).toHaveBeenCalledWith(
          1,
          'Element with selector "element" should exist ' +
          'exactly 1 time(s)'
        );

        _expect(done).toHaveBeenCalledTimes(1);
      }
    );

    it(
      'should fail if there is more than 1 element on the page',
      () => {
        setInputField('add', 'value', 'element', done);

        _expect(global.browser.addValue).toHaveBeenCalledTimes(1);
        _expect(global.browser.addValue)
          .toHaveBeenCalledWith('element', 'value');

        _expect(global.browser.setValue).not.toHaveBeenCalled();

        _expect(expectToHaveLengthOf).toHaveBeenCalledTimes(1);
        _expect(expectToHaveLengthOf).toHaveBeenCalledWith(
          1,
          'Element with selector "element" should exist ' +
          'exactly 1 time(s)'
        );

        _expect(done).toHaveBeenCalledTimes(1);
      }
    );

    it(
      'should be able to add a value to an element',
      () => {
        setInputField('add', 'value', 'element', done);

        _expect(global.browser.addValue).toHaveBeenCalledTimes(1);
        _expect(global.browser.addValue)
          .toHaveBeenCalledWith('element', 'value');

        _expect(global.browser.setValue).not.toHaveBeenCalled();

        _expect(expectToHaveLengthOf).toHaveBeenCalledTimes(1);
        _expect(expectToHaveLengthOf).toHaveBeenCalledWith(
          1,
          'Element with selector "element" should exist ' +
          'exactly 1 time(s)'
        );

        _expect(done).toHaveBeenCalledTimes(1);
      }
    );

    it(
      'should be able to set the value of an element',
      () => {
        setInputField('set', 'value', 'element', done);

        _expect(global.browser.setValue).toHaveBeenCalledTimes(1);
        _expect(global.browser.setValue)
          .toHaveBeenCalledWith('element', 'value');

        _expect(global.browser.addValue).not.toHaveBeenCalled();

        _expect(expectToHaveLengthOf).toHaveBeenCalledTimes(1);
        _expect(expectToHaveLengthOf).toHaveBeenCalledWith(
          1,
          'Element with selector "element" should exist ' +
          'exactly 1 time(s)'
        );

        _expect(done).toHaveBeenCalledTimes(1);
      }
    );

    it(
      'should be able to set an empty value of an element',
      () => {
        setInputField('set', '', 'element', done);

        _expect(global.browser.setValue).toHaveBeenCalledTimes(1);
        _expect(global.browser.setValue)
          .toHaveBeenCalledWith('element', '');

        _expect(global.browser.addValue).not.toHaveBeenCalled();

        _expect(expectToHaveLengthOf).toHaveBeenCalledTimes(1);
        _expect(expectToHaveLengthOf).toHaveBeenCalledWith(
          1,
          'Element with selector "element" should exist ' +
          'exactly 1 time(s)'
        );

        _expect(done).toHaveBeenCalledTimes(1);
      }
    );
  }
);
