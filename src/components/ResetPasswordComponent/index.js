import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { Button, AlertDialog } from 'react-onsenui';
import InputField from '../InputField';
import './ResetPasswordComponent.css';
import '../../styles/global.css';

const renderAlert = (title, message, cancelFn) => (
  <AlertDialog isOpen isCancelable onCancel={cancelFn}>
    <div className='alert-dialog-title'>{title}</div>
    <div className='alert-dialog-content'>{message}</div>
  </AlertDialog>
);

const ResetPasswordComponent = ({
  onSubmit,
  pushToLoginPage,
  pristine,
  submitSucceeded,
  auth: {
    passwordIsReset,
    errors: { resetPassword: resetPasswordError }
  }
}) => (
  <div className='login-form'>
    {
      resetPasswordError &&
      submitSucceeded &&
      !pristine &&
      renderAlert('Server Error', resetPasswordError.message)
    }
    {
      passwordIsReset &&
      renderAlert(
        'Password was changed',
        'You can use a new password to login',
        pushToLoginPage
      )
    }
    <div className='title__reg__text'>RESET PASSWORD COMPONENT - DEMO</div>
    <div className='profile__input__child'>
      <Field
        name='token'
        type='text'
        label='Token (WE WILL GET A TOKEN FROM URL PARAMETERS)'
        css='profile__input__wide'
        component={InputField}
      />
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
        name='newPassword'
        type='password'
        label='Password'
        css='profile__input__wide'
        component={InputField}
      />
    </div>
    <div className='profile__input__child'>
      <Field
        name='newPasswordConfirm'
        type='password'
        label='Password confirmation'
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
      Reset password
    </Button>
  </div>
);

ResetPasswordComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  pushToLoginPage: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  passwordIsReset: PropTypes.bool,
  resetPasswordError: PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
    React.PropTypes.string
  ])
};

export default ResetPasswordComponent;
