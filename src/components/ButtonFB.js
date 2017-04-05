import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import fetch from 'isomorphic-fetch';

import * as navigatorActions from '../redux/navigator';
import * as authActions from '../redux/auth';
import * as panelActions from '../redux/panel';
import { registerFBUser, loginFBUser } from '../api/User';

import {
    Icon
} from 'react-onsenui';

import FacebookLogin from 'react-facebook-login';
import facebookUtils from '../utils/facebookUtils';

@connect((state) => ({ ...state }),
    (dispatch) => ({ actions: bindActionCreators({...navigatorActions, ...authActions, ...panelActions}, dispatch) }))

class ButtonFB extends React.Component {
  constructor(props) {
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.regestrationCB = this.regestrationCB.bind(this);
    this.state = {
      facebookLoginCallback: this.responseFacebook,
      facebookLoginOnClick: undefined
    };
  }

  componentDidMount() {
    if (this.props.registration) {
      this.setState({ facebookLoginCallback: this.regestrationCB });
    }
  }

  responseFacebook(response) {
    console.log('response -->', response);
    if (response.status !== 'unknown') {
      loginFBUser(response.accessToken)
      .then((jwt) => {
        console.log('LOGIN RESULT:', jwt);
        this.props.actions.addToken(jwt);
      });
      // this.props.actions.addFacebookToken(response.accessToken);
      // this.props.actions.addAuthFacebook(response);
      console.log('fbAuthData: ', this.props.auth.fbAuthData);
      this.props.actions.switchAuth(true);
      this.props.actions.setNavSwipeablePanel(true);
      this.props.actions.pushPage(false, 'HOME');
      this.props.actions.changeToolbarType('main');
    }
  }

  regestrationCB(response) {
    console.log('REGISTRATION FB', response);
    if (response.status !== 'unknown') {
      const regInfo = window.localStorage.getItem('regInfo');
      // let fbRegistration = true;
      // registerFBUser({
        // email: response.email,
        // firstName: response.first_name,
        // lastName: response.last_name,
      registerFBUser({ facebookAccessToken: response.accessToken, regInfo })
      .then(registerResponse => {
        console.log('REGISTERED USER\n', registerResponse);
        // this.props.actions.addAuth({
        //   email: registerResponse.userAuth.email, // TODO check email at FB reg
        //   identityID: registerResponse.userAuth._id,
        //   profile: registerResponse.userProfile
        // });
        this.props.actions.addToken(registerResponse.token);
        // step to next page
        window.localStorage.removeItem('regInfo');
        // this.pushPage();
      }).catch(error => {
        error.success = false;
        console.log('ACHTUNG OUTER( cannot login/facebook )', error);
      });

      this.props.actions.pushPage(true, 'ContinueRegister');
    }
  }

  render() {
    console.log('process.env', process);
    return (
      this.props.utility.isDevice
        ? <span
            className='facebookButtonClass buttonFB'
            onClick={() => {
              facebookUtils.facebook()
              .then(result => {
                this.responseFacebook(result);
              });
            }}>
            <Icon icon='ion-social-facebook, material:ion-social-facebook' className='buttonFB__mobile' />
            Login
          </span>
        : <FacebookLogin
            /* appId={process.env.FB_APP_ID || process.env.npm_config_FB_APP_ID} */
            appId={process.env.FB_APP_ID || '556708821182922'} // test appID. FB_APP_ID defined with build
            autoLoad={false}
            version= '2.8'
            fields='name,first_name,last_name,email,picture.type(large),id,link,gender,locale,timezone,updated_time,verified'
            textButton='Login'
            callback={this.state.facebookLoginCallback}
            // onClick={this.state.facebookLoginOnClick}
            cssClass='facebookButtonClass'
            icon={<Icon icon='ion-social-facebook, material:ion-social-facebook' className='buttonFB__web' />}
            />
    );
  }
}

export default ButtonFB;
