import React from 'react';
import { connect } from 'react-redux';

import {
  pushPage
} from '../redux/navigator';

import { registerUser } from '../redux/auth/authActions';
import { addRegisterData } from '../redux/register';
import { getAuth } from '../redux/auth/authSelectors';

import {
    Input,
    AlertDialog,
    Button,
    Icon
} from 'react-onsenui';

import LoginButton from './ButtonFB';

const mapStateToProps = state => {
  return ({
    navigator: state.navigator,
    panel: state.panel,
    auth: getAuth(state),
    register: state.register
  });
};

const mapDispatchToProps = dispatch => ({
  pushPage: (showPage, namePage) => dispatch(pushPage(showPage, namePage)),
  registerUser: user => dispatch(registerUser.request(user)),
  addRegisterData: (data, status) => dispatch(addRegisterData(data, status))
});

class DefaultRegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.createUser = this.createUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAlertDialogCancel = this.handleAlertDialogCancel.bind(this);
    this.handleAlertDialogOk = this.handleAlertDialogOk.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isOpenModel: false,
      acception: false,
      width: null,
      contentAlert: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: ''};
  }

  componentWillReceiveProps(nextProps) {
    const {register} = nextProps;
    const {userAuthData, token} = nextProps.auth;

    if (userAuthData && token) {
      if (!register.status) {
        this.props.addRegisterData({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        }, true);

        nextProps.pushPage(true, 'ContinueRegister');
      }
    }
  }

  handleChange(event) {
    this.setState({acception: event.target.checked});
  }

  handleAlertDialogCancel() {
    this.setState({isOpenModel: false});
  }

  handleAlertDialogOk() {
    this.setState({isOpenModel: false});
  }

  handleClick() {
    let messageAlert = '';

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.state.firstName === '' || this.state.lastName === '' || /* this.state.username === '' || */ this.state.email === '' || this.state.password === '' || this.state.password2 === '') {
      messageAlert = 'Not all fields are filled.';
    } else if (this.state.password === this.state.password2 && this.state.acception === true && re.test(this.state.email)) {
      messageAlert = 'Everything is fine';
    }
    if (!re.test(this.state.email)) {
      messageAlert += 'Implausible email.';
    }
    if (this.state.password !== this.state.password2) {
      messageAlert += 'Passwords do not match.';
    }
    if (this.state.password.length < 5 && this.state.password2.length < 5) {
      messageAlert += 'Passwords are a minimum of 5 characters.';
    }

    if (!this.state.acception) {
      messageAlert += 'You do not accept the agreement.';
    }
    if (messageAlert === 'Everything is fine') {
      this.createUser();
    } else {
      this.setState({contentAlert: messageAlert, isOpenModel: true});
    }
  }

  createUser() {
    const { email, password, firstName, lastName } = this.state;

    this.props.registerUser({
      email,
      password,
      firstName,
      lastName
    });
  }

  render() {
    let smallScreen, wideScreen;
    if (this.state.width <= 525) {
      smallScreen = (
          <div className='wrap__submit__small'>
            <div className='onsen__button'>
              <Button
                  onClick={this.handleClick}
                  >
                  <Icon icon='ion-arrow-right-b, material:ion-arrow-right-b' style={{display: 'flex', padding: '3px 1px', fontSize: '30px'}} />
              </Button>
            </div>
          </div>
      );
      wideScreen = (
          <div></div>
      );
    } else {
      smallScreen = (
          <div></div>
      );
      wideScreen = (
          <div className='wrap__submit'>
            <div className='onsen__button'>
              <Button
                  onClick={this.handleClick}
                  >
                  <Icon icon='ion-arrow-right-b, material:ion-arrow-right-b' style={{display: 'flex', padding: '3px 1px', fontSize: '30px'}} />
              </Button>
            </div>
          </div>
      );
    }
    return (
        <div>
            <div className='wrap__border'>
                <div className='title__head'>
                    <div className='title__head__text'>
                        Join the Action Sports Network
                    </div>
                </div>
                <div className='title__small'>
                    <div className='title__small__text'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>
                <div className='title__reg'>
                    <div className='title__reg__text'><span style={{marginRight: '10px'}}>Join With Your Facebook Account</span>
                        <LoginButton registration/>
                    </div>
                    <div className='title__reg__text_or'>Or</div>
                    <div className='title__reg__text'>Fill Out The form Below</div>
                </div>
                <div className='wrap__regForm'>
                    <div className='wrap__input'>
                        <div className='wrap__inline__seporator__col-wide'></div>
                        <div className='wrap__inline__input'>
                            <Input
                                style={{width: '100%'}}
                                value={this.state.firstName}
                                onChange={(event) => { this.setState({firstName: event.target.value}); } }
                                modifier='material'
                                placeholder='First Name' />

                            <div className='wrap__inline__seporator__row'></div>

                            <Input
                                style={{width: '100%'}}
                                modifier='material'
                                value={this.state.lastName}
                                onChange={(event) => { this.setState({lastName: event.target.value}); } }
                                placeholder='Last Name' />
                        </div>
                        <div className='wrap__inline__seporator__col'></div>
                        <div className='wrap__inline__input'>
                            <Input
                                style={{width: '100%'}}
                                modifier='material'
                                value={this.state.email}
                                onChange={(event) => { this.setState({email: event.target.value}); } }
                                placeholder='Email Address'
                                />
                        </div>
                        <div className='wrap__inline__seporator__col'></div>
                        <div className='wrap__inline__input'>
                            <Input
                                style={{width: '100%'}}
                                modifier='material'
                                value={this.state.password} float
                                type='password'
                                onChange={(event) => { this.setState({password: event.target.value}); } }
                                placeholder='Password'
                                />
                            <div className='wrap__inline__seporator__row'></div>
                            <Input
                                style={{width: '100%'}}
                                modifier='material'
                                value={this.state.password2}
                                type='password'
                                onChange={(event) => { this.setState({password2: event.target.value}); } }
                                placeholder='Confirm Password'
                                />
                        </div>
                    </div>
                    {wideScreen}

                </div>
                <div>
                    <div className='wrap__inline__input'>
            <span style={{margin: '10px 0'}}>
            <label className='label__checkbox__text'>
                <Input
                    type='checkbox'
                    checked={this.state.acception}
                    modifier='material'
                    onChange={(e) => { this.handleChange(e); } }
                    style={{marginRight: '7px'}}
                    />
                I have read and agree to the <a onClick={() => {
                  this.props.actions.pushPage(true, 'Terms');
                }}>terms</a> of service.*
            </label>
            </span>
                    </div>
                </div>
                {smallScreen}
            </div>
            <AlertDialog isOpen={this.state.isOpenModel} isCancelable={true} onCancel={this.handleAlertDialogCancel}>
                <div className='alert-dialog-title'>Warning</div>
                <div className='alert-dialog-content'>
                    {this.state.contentAlert}
                </div>
                <div className='alert-dialog-footer'>
                    <button onClick={this.handleAlertDialogCancel} className='alert-dialog-button'>
                        Cancel
                    </button>
                    <button onClick={this.handleAlertDialogOk} className='alert-dialog-button'>
                        OK
                    </button>
                </div>
            </AlertDialog>
        </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultRegisterPage);
