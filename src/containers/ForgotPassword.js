import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createValidator, required, email } from '../utils/validation';
import { pushPage, changeToolbarType } from '../redux/navigator';
import { forgotPassword } from '../redux/auth/authActions';
import { getAuth } from '../redux/auth/authSelectors';
import ForgotPasswordComponent from '../components/ForgotPasswordComponent';

class ForgotPassword extends Component {
  pushToLoginPage = () => {
    this.props.pushPage(true, 'LOGIN');
    this.props.changeToolbarType('main');
  }

  render() {
    const { handleSubmit, forgotPassword } = this.props;
    return (
      <ForgotPasswordComponent
        onSubmit={handleSubmit(forgotPassword)}
        pushToLoginPage={this.pushToLoginPage}
        {...this.props}
      />
    );
  }
}

const validate = createValidator({
  email: [required, email]
});

const mapStateToProps = state => ({
  auth: getAuth(state)
});

const mapDispatchToProps = dispatch => ({
  pushPage: (showPage, namePage) => dispatch(pushPage(showPage, namePage)),
  changeToolbarType: toolbarType => dispatch(changeToolbarType(toolbarType)),
  forgotPassword: email => dispatch(forgotPassword.request(email))
});

export const config = {
  form: 'ForgotPasswordForm',
  fields: ['email'],
  validate
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm(config)(ForgotPassword)
);
