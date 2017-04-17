import React from 'react';
import { connect } from 'react-redux';
// import fetch from 'isomorphic-fetch';

import {
  pushPage,
  changeToolbarType,
  setNavSwipeablePanel
} from '../redux/navigator';

import { registerFBUser, loginFacebook } from '../redux/auth/authActions';
import { addRegisterData } from '../redux/register';

import {
    Icon,
    AlertDialog
} from 'react-onsenui';

import FacebookLogin from 'react-facebook-login';
import facebookUtils from '../utils/facebookUtils';

const mapStateToProps = state => ({
  navigator: state.navigator,
  panel: state.panel,
  auth: state.auth,
  register: state.register,
  utility: state.utility
});

const mapDispatchToProps = dispatch => ({
  pushPage: (showPage, namePage) => dispatch(pushPage(showPage, namePage)),
  changeToolbarType: toolbarType => dispatch(changeToolbarType(toolbarType)),
  setNavSwipeablePanel: isSwipeable => {
    return dispatch(setNavSwipeablePanel(isSwipeable));
  },
  registerFBUser: user => dispatch(registerFBUser.request(user)),
  loginFacebook: user => dispatch(loginFacebook.request(user)),
  addRegisterData: (data, status) => dispatch(addRegisterData(data, status))
});

@connect(mapStateToProps, mapDispatchToProps)

class ButtonFB extends React.Component {
  constructor(props) {
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.regestrationCB = this.regestrationCB.bind(this);
    this.state = {
      isOpenModel: false,
      facebookLoginCallback: this.responseFacebook,
      facebookLoginOnClick: undefined
    };
  }

  componentDidMount() {
    if (this.props.registration) {
      this.setState({ facebookLoginCallback: this.regestrationCB });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { userAuthData, fbAuthData, fbUserToken, errors } = nextProps.auth;
    const { register } = nextProps;

    if (errors) {
      if (errors.registerFBUser) {
        this.setState({isOpenModel: true, alertDialogMessage: errors.registerFBUser.message});
      }
      if (errors.loginFacebook) {
        this.setState({isOpenModel: true, alertDialogMessage: errors.loginFacebook.message});
      }
    }

    if (userAuthData && fbUserToken) {
      // Fb user registration
      if (!register.status) {
        nextProps.pushPage(true, 'ContinueRegister');
      }
    }

    if (fbAuthData) {
      // Fb user login
      this.props.setNavSwipeablePanel(true);
      this.props.pushPage(false, 'HOME');
      this.props.changeToolbarType('main');
    }
  }

  responseFacebook(response) {
    // console.log('FacebookLogin Response -->', response);
    let signupFlag = window.localStorage.getItem('signupFlag');
    if (response.status !== 'unknown') {
      if (signupFlag === 'true') {
        // fb register
        const regInfo = window.localStorage.getItem('regInfo');

        this.props.addRegisterData({
          firstName: response.first_name,
          lastName: response.last_name,
          email: response.email,
          gender: response.gender
        }, true);

        this.props.registerFBUser({ facebookInfo: response, regInfo });
      } else {
        // fb login
        this.props.loginFacebook({ facebookInfo: response });
      }
    }
  }

  regestrationCB(response) {
    // console.log('Facebook Registration -->', response);
    if (response.status !== 'unknown') {
      const regInfo = window.localStorage.getItem('regInfo');
      this.setState({firstName: response.first_name, lastName: response.last_name, email: response.email, gender: response.gender});
      this.props.registerFBUser({ facebookInfo: response, regInfo });
    }
  }

  closeDialog() {
    this.setState({isOpenModel: false});
  }

  render() {
    return (
      <span>
      {this.props.utility.isDevice
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
      }
        <AlertDialog isOpen={this.state.isOpenModel} isCancelable={false}>
            <div className='alert-dialog-title'>Facebook Warning</div>
            <div className='alert-dialog-content'>
                {this.state.alertDialogMessage}
            </div>
            <div className='alert-dialog-footer'>
                <button onClick={this.closeDialog.bind(this)} className='alert-dialog-button'>
                    Close
                </button>
            </div>
        </AlertDialog>
      </span>
    );
  }
}

export default ButtonFB;
