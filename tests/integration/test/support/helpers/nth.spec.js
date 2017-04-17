import nth from 'src/support/helpers/nth';

global.device = false;
describe('nth should return the selector with child selector', () => {
  it('should return div :nth-child(1)', () => {
    expect(nth('div ', 'first')).toMatch('div :nth-child(1)');
  }),
  it('should return div :nth-child(2)', () => {
    expect(nth('div ', 'second')).toMatch('div :nth-child(2)');
  }),
  it('should return div :nth-child(3)', () => {
    expect(nth('div ', 'third')).toMatch('div :nth-child(3)');
  }),
  it('should return div :nth-child(4)', () => {
    expect(nth('div ', 'fourth')).toMatch('div :nth-child(4)');
  }),
  it('should return div :nth-child(5)', () => {
    expect(nth('div ', 'fifth')).toMatch('div :nth-child(5)');
  }),
  it('should return div :nth-child(6)', () => {
    expect(nth('div ', 'sixth')).toMatch('div :nth-child(6)');
  }),
  it('should return div :nth-child(7)', () => {
    expect(nth('div ', 'seventh')).toMatch('div :nth-child(7)');
  }),
  it('should return itself', () => {
    expect(nth('div', 'div')).toMatch('div');
  }),
  it('should trim the order', () => {
    expect(nth('div', '   first    ')).toMatch('div:nth-child(1)');
  });
});
