import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  createValidator,
  required,
  email,
  minLength
} from '../utils/validation';
import {
  pushPage,
  changeToolbarType,
  setNavSwipeablePanel
} from '../redux/navigator';
import { loginEmail } from '../redux/auth/authActions';
import { getAuth } from '../redux/auth/authSelectors';
import LoginComponent from '../components/LoginComponent';

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isLogin) {
      this.props.setNavSwipeablePanel(true);
      this.props.pushPage(false, 'HOME');
      this.props.changeToolbarType('main');
    }
  }

  pushToForgetPasswordPage = () => {
    this.props.pushPage(true, 'Forgot password');
    this.props.changeToolbarType('back');
  }

  pushToResetPasswordPage = () => {
    this.props.pushPage(true, 'Reset password');
    this.props.changeToolbarType('back');
  }

  render() {
    const { handleSubmit, loginEmail } = this.props;
    return (
      <LoginComponent
        onSubmit={handleSubmit(loginEmail)}
        pushToForgetPasswordPage={this.pushToForgetPasswordPage}
        pushToResetPasswordPage={this.pushToResetPasswordPage}
        {...this.props}
      />
    );
  }
}

const validate = createValidator({
  email: [required, email],
  password: [required, minLength(5)]
});

const mapStateToProps = state => ({
  auth: getAuth(state)
});

const mapDispatchToProps = dispatch => ({
  pushPage: (showPage, namePage) => dispatch(pushPage(showPage, namePage)),
  changeToolbarType: toolbarType => dispatch(changeToolbarType(toolbarType)),
  setNavSwipeablePanel: isSwipeable => {
    return dispatch(setNavSwipeablePanel(isSwipeable));
  },
  loginEmail: user => dispatch(loginEmail.request(user))
});

export const config = {
  form: 'LoginEmailForm',
  fields: ['email', 'password'],
  validate
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm(config)(Login)
);
