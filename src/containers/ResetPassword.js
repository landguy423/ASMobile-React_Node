import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  createValidator,
  required,
  email,
  minLength,
  match
} from '../utils/validation';
import { pushPage, changeToolbarType } from '../redux/navigator';
import { resetPassword } from '../redux/auth/authActions';
import { getAuth } from '../redux/auth/authSelectors';
import ResetPasswordComponent from '../components/ResetPasswordComponent';

class ResetPassword extends Component {
  
  pushToLoginPage = () => {
    this.props.pushPage(true, 'LOGIN');
    this.props.changeToolbarType('main');
  }

  render() {
    const { handleSubmit, resetPassword } = this.props;
    return (
      <ResetPasswordComponent
        onSubmit={handleSubmit(resetPassword)}
        pushToLoginPage={this.pushToLoginPage}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: getAuth(state)
});

const mapDispatchToProps = dispatch => ({
  pushPage: (showPage, namePage) => dispatch(pushPage(showPage, namePage)),
  changeToolbarType: toolbarType => dispatch(changeToolbarType(toolbarType)),
  resetPassword: data => dispatch(resetPassword.request(data))
});

const validate = createValidator({
  email: [required, email],
  newPassword: [required, minLength(5)],
  newPasswordConfirm: [required, match('newPassword')]
});

export const config = {
  form: 'ResetPasswordForm',
  // Need to remove token. It is a demo data!!!
  fields: ['token', 'email', 'newPassword', 'newPasswordConfirm'],
  validate
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm(config)(ResetPassword)
);
