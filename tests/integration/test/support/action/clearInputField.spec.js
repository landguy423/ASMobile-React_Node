/*eslint comma-dangle: ["error", "ignore"]*/
import clearInputField from 'src/support/action/web/clearInputField';

describe(
  'clearInputField', () => {
    let element;
    let done;

    beforeEach(() => {
      global.browser = {
        clearElement: jest.fn(),
      };
      
      global.device = false;

      element = 'element_selector';

      done = jest.fn();
    });

    it('should call clearElement on the browser', () => {
      clearInputField(element, done);

      expect(browser.clearElement).toHaveBeenCalledWith(element);

      expect(done).toHaveBeenCalledTimes(1);
    });
  }
);
