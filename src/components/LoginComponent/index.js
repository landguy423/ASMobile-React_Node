import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { Button, AlertDialog } from 'react-onsenui';
import LoginButton from '../ButtonFB';
import InputField from '../InputField';
import './LoginComponent.css';
import '../../styles/global.css';

const renderAlert = (message) => (
  <AlertDialog isOpen isCancelable>
    <div className='alert-dialog-title'>Server Error</div>
    <div className='alert-dialog-content'>{message}</div>
  </AlertDialog>
);

const LoginComponent = ({
  onSubmit,
  pushToForgetPasswordPage,
  pushToResetPasswordPage,
  pristine,
  submitSucceeded,
  auth: { errors: { loginEmail: loginEmailError } }
}) => (
  <div className='login-form'>
    {
      loginEmailError &&
      submitSucceeded &&
      !pristine &&
      renderAlert(loginEmailError.message)
    }
    <div className='title__reg__text'>
      <span style={{ marginRight: '10px' }}>
        Join With Your Facebook Account
      </span>
      <LoginButton/>
    </div>
    <div className='profile__input__child'>
      <Field
        name='email'
        type='text'
        label='Email'
        css='profile__input__wide'
        component={InputField}
      />
    </div>
    <div className='profile__input__child'>
      <Field
        name='password'
        type='password'
        label='Password'
        css='profile__input__wide'
        component={InputField}
      />
    </div>
    <br/><br/>
    <Button
      modifier='large'
      className='login-button'
      onClick={onSubmit}
      disabled={pristine}
    >
      Log In
    </Button>
    <Button
      modifier='quiet'
      className='forgot-password'
      onClick={pushToForgetPasswordPage}
    >
      Forgot password?
    </Button>
    <Button
      modifier='large'
      className='forgot-password'
      onClick={pushToResetPasswordPage}
    >
      TEST RESET PASSWORD
    </Button>
  </div>
);

LoginComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  pushToForgetPasswordPage: PropTypes.func.isRequired,
  pushToResetPasswordPage: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  loginEmailError: PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
    React.PropTypes.string
  ])
};

export default LoginComponent;
