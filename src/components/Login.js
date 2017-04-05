import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navigatorActions from '../redux/navigator';
import * as authActions from '../redux/auth';
import * as panelActions from '../redux/panel';

import {
    Button,
    Input
} from 'react-onsenui';

import LoginButton from './ButtonFB';

@connect((state) => ({ ...state }),
    (dispatch) => ({ actions: bindActionCreators({...navigatorActions, ...authActions, ...panelActions}, dispatch) }))

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  render() {
    return (
        <div className='login-form'>
          <div className='title__reg__text'><span style={{marginRight: '10px'}}>Join With Your Facebook Account</span>
              <LoginButton/>
            </div>
          <div className='profile__input__child' >
            <Input
                className='profile__input__wide'
                value={this.state.email}
                onChange={this.handleEmailChange}
                modifier='material'
                placeholder='Email' />
          </div>
          <div className='profile__input__child' >
            <Input
                className='profile__input__wide'
                value={this.state.password}
                onChange={this.handlePasswordChange}
                modifier='material'
                type='password'
                placeholder='Password' />
          </div>
          <br/><br/>
          <Button modifier='large'
                  className='login-button'
                  onClick={() => {
                    console.log('Log In click');
                    this.props.actions.switchAuth(true);
                    /* this.props.actions.setSwipeablePanel(true);*/
                    this.props.actions.setNavSwipeablePanel(true);
                    this.props.actions.pushPage(false, 'HOME');
                    this.props.actions.changeToolbarType('main');
                  } } >Log In</Button>
          <Button modifier='quiet'
                  className='forgot-password'
                  onClick={() => {
                    this.props.actions.pushPage(true, 'Forgot password');
                    // this.props.actions.changeToolbarType('back');
                    console.log('Forgot password? click');
                  } }>Forgot password?</Button>
        </div>
    );
  }
}

export default Login;
