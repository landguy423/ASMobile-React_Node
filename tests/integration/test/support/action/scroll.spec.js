/*eslint comma-dangle: ["error", "ignore"]*/
import scroll from 'src/support/action/web/scroll';

describe(
    'scroll', () => {
        let done;

        beforeEach(() => {
            global.device = false;
            global.browser = {
                scroll: jest.fn(),
            };

            done = jest.fn();
        });

        it(
            'should call scroll on the browser object',
            () => {
                scroll('element', done);

                expect(global.browser.scroll).toHaveBeenCalledTimes(1);
                expect(global.browser.scroll).toHaveBeenCalledWith('element');

                expect(done).toHaveBeenCalledTimes(1);
            }
        );
    }
);
