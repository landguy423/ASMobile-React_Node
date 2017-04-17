import NameToSelector from 'src/support/helpers/ElementNameToSelector';
describe('Name To Selector', () => {
  global.device = false;
  it('should return nothing for side', () => {
    expect(NameToSelector('side menu')).toMatch('');
  }),
  it('should return nothing for header', () => {
    expect(NameToSelector('header')).toMatch('');
  }),
  it('should return #topot for main', () => {
    expect(NameToSelector('main section')).toMatch('#topot');
  }),
  it('should return #topot for main', () => {
    expect(NameToSelector('main Section')).toBe('#topot');
  }),
  it('should return selector for app', () => {
    expect(NameToSelector('app section')).toMatch('#topot + div + div');
  }),
  it('should return selector for community', () => {
    expect(NameToSelector('community section')).toMatch('#topot + div + div + div');
  }),
  it('should return selector for connected', () => {
    expect(NameToSelector('connected section')).toMatch('#topot + div + div + div');
  }),
  it('should return selector for footer', () => {
    expect(NameToSelector('connected section')).toMatch('#topot + div + div + div + div');
  }),
  it('should return itself for default', () => {
    expect(NameToSelector('default')).toBe('default');
  });
  it('should return the same selector', () => { 
    const selector = "#topot .homeTablet__header__connect";
    expect(NameToSelector(selector)).toBe(selector);
  });
});
