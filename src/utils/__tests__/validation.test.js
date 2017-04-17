import * as v from '../validation';

test('email', () => {
  expect(v.email('invalid')).toBeTruthy();
  expect(v.email('invalid@invalid')).toBeTruthy();
  expect(v.email('valid@valid.com')).toBeFalsy();
});

test('required', () => {
  expect(v.required('')).toBeTruthy();
  expect(v.required(null)).toBeTruthy();
  expect(v.required(undefined)).toBeTruthy();
  expect(v.required('valid')).toBeFalsy();
});

test('minLength', () => {
  expect(v.minLength(5)('1234')).toBeTruthy();
  expect(v.minLength(5)('12345')).toBeFalsy();
});

test('maxLength', () => {
  expect(v.maxLength(5)('123456')).toBeTruthy();
  expect(v.maxLength(5)('12345')).toBeFalsy();
});

test('match', () => {
  expect(v.match('invalid')('123', { password: '321' })).toBeTruthy();
  expect(v.match('password')('123', { password: '321' })).toBeTruthy();
  expect(v.match('password')('321', { password: '321' })).toBeFalsy();
});

test('createValidator', () => {
  const validator = v.createValidator({
    email: [v.required, v.email],
    password: [v.required, v.minLength(6)],
    passwordRepeat: [v.match('password'), v.required]
  });

  expect(typeof validator).toBe('function');

  expect(validator({
    email: '',
    password: '',
    passwordRepeat: null
  })).toEqual({
    email: v.required(''),
    password: v.required(''),
    passwordRepeat: v.match('a')('c', { a: 'b' })
  }, 'Expected to follow the validation order');

  expect(Object.keys(validator({
    email: 'invalid',
    password: '12345',
    passwordRepeat: ''
  }))).toEqual(['email', 'password', 'passwordRepeat']);

  expect(Object.keys(validator({
    email: 'test@example.com',
    password: '12345',
    passwordRepeat: ''
  }))).toEqual(['password', 'passwordRepeat']);

  expect(Object.keys(validator({
    email: 'test@example.com',
    password: '123456',
    passwordRepeat: '654321'
  }))).toEqual(['passwordRepeat']);

  expect(validator({
    email: 'test@example.com',
    password: '123456',
    passwordRepeat: '123456'
  })).toEqual({});

  expect(validator()).toEqual({
    email: v.required(''),
    password: v.required(''),
    passwordRepeat: v.required('')
  });
});
