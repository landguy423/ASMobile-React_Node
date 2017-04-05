import _ from 'lodash';

const TYPE = {
  SWITCH_AUTH: 'SWITCH_AUTH',
  ADD_FACEBOOK_TOKEN: 'ADD_FACEBOOK_TOKEN',
  ADD_TOKEN: 'ADD_TOKEN',
  ADD_DATA: 'ADD_DATA',
  ADD_DATA_CONTINUE: 'ADD_DATA_CONTINUE',
  ADD_DATAFACEBOOK: 'ADD_DATAFACEBOOK'
};

export let switchAuth = (isLogin) => ({
  type: TYPE.SWITCH_AUTH,
  isLogin
});

export let addAuthFacebook = (fbAuthData) => ({
  type: TYPE.ADD_DATAFACEBOOK,
  fbAuthData
});

export let addAuth = (userAuthData) => ({
  type: TYPE.ADD_DATA,
  userAuthData
});

export let addAuthContinue = (userAuthData) => ({
  type: TYPE.ADD_DATA_CONTINUE,
  userAuthData
});

export let addFacebookToken = (fbToken) => ({
  type: TYPE.ADD_FACEBOOK_TOKEN,
  fbToken
});

export let addToken = (token) => ({
  type: TYPE.ADD_TOKEN,
  token
});

const initialState = {
  isLogin: false,
  fbToken: null,
  token: null,
  fbAuthData: null,
  userAuthData: null
};

export default (_state = initialState, action = {}) => {
  let state = {..._state};
  switch (action.type) {
    case TYPE.SWITCH_AUTH:
      return {
        ...state,
        isLogin: action.isLogin
      };
    case TYPE.ADD_DATAFACEBOOK:
      return {
        ...state,
        fbAuthData: action.fbAuthData
      };
    case TYPE.ADD_DATA:
      return {
        ...state,
        userAuthData: action.userAuthData
      };
    case TYPE.ADD_DATA_CONTINUE:
      return {
        ...state,
        userAuthData: _.merge(state.userAuthData, action.userAuthData)
      };
    case TYPE.ADD_FACEBOOK_TOKEN:
      return {
        ...state,
        fbToken: action.fbToken
      };
    case TYPE.ADD_TOKEN:
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
};
