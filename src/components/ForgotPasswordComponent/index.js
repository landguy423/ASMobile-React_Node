import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { Button, AlertDialog } from 'react-onsenui';
import InputField from '../InputField';
import './ForgotPasswordComponent.css';
import '../../styles/global.css';

const renderAlert = (title, message, cancelFn) => (
  <AlertDialog isOpen isCancelable onCancel={cancelFn}>
    <div className='alert-dialog-title'>{title}</div>
    <div className='alert-dialog-content'>{message}</div>
  </AlertDialog>
);

const ForgotPasswordComponent = ({
  onSubmit,
  pushToLoginPage,
  pristine,
  submitSucceeded,
  auth: {
    resetPasswordEmailIsSend,
    errors: { forgotPassword: forgotPasswordError }
  }
}) => (
  <div className='login-form'>
    {
      forgotPasswordError &&
      submitSucceeded &&
      !pristine &&
      renderAlert('Server Error', forgotPasswordError.message)
    }
    {
      resetPasswordEmailIsSend &&
      renderAlert(
        'Check your email',
        'An e-mail has been sent with further instructions',
        pushToLoginPage
      )
    }
    <div className='title__reg__text'>Enter your email</div>
    <div className='profile__input__child'>
      <Field
        name='email'
        type='text'
        label='Email'
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

ForgotPasswordComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  pushToLoginPage: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  resetPasswordEmailIsSend: PropTypes.bool,
  forgotPasswordError: PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
    React.PropTypes.string
  ])
};

export default ForgotPasswordComponent;
