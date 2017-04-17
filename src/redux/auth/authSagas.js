import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { getAuth } from './authSelectors';
import { callApi } from '../../api/api';
import { retry } from '../../utils/sagaHelpers';
import { getAuthToken, setAuthToken } from '../../utils/localStorageStore';
import {
  REGISTER_USER_REQUESTED,
  LOGIN_EMAIL_REQUESTED,
  SAVE_PROFILE_REQUESTED,
  UPDATE_PROFILE_REQUESTED,
  GET_PROFILE_REQUESTED,
  GET_PROFILE_SUCCESS,
  REGISTER_FB_USER_REQUESTED,
  LOGIN_FACEBOOK_REQUESTED,
  FORGOT_PASSWORD_REQUESTED,
  RESET_PASSWORD_REQUESTED
} from './authConstants';
import {
  registerUser,
  loginEmail,
  saveProfile,
  updateProfile,
  getProfile,
  registerFBUser,
  loginFacebook,
  forgotPassword,
  resetPassword
} from './authActions';

// ------------------------------------
// Retry for auth requests
// ------------------------------------
export const retryAuth = retry({ delay: 1000, attempt: 5 });

// ------------------------------------
// Get Token saga
// ------------------------------------
export function * getToken(body) {
  const params = {
    method: 'POST',
    api: 'AUTH',
    endpoint: '/login/basic',
    body
  };

  const data = yield call(retryAuth, callApi, params);

  yield call(setAuthToken, data);
}

// ------------------------------------
// Reset Password Flow
// ------------------------------------
export function * resetPasswordFlow(action) {
  try {
    const { token, email, newPassword } = action.payload;

    const body = { token, email, newPassword };

    const params = {
      method: 'POST',
      api: 'AUTH',
      endpoint: '/password/reset',
      body
    };

    yield call(retryAuth, callApi, params);

    yield put(resetPassword.success());
  } catch (error) {
    yield put(resetPassword.failure(error));
  }
}

// ------------------------------------
// Forgot Password Flow
// ------------------------------------
export function * forgotPasswordFlow(action) {
  try {
    const params = {
      method: 'POST',
      api: 'AUTH',
      endpoint: '/password/forgotten',
      body: action.payload
    };

    yield call(retryAuth, callApi, params);

    yield put(forgotPassword.success());
  } catch (error) {
    yield put(forgotPassword.failure(error));
  }
}

// ------------------------------------
// Get User Profile Flow
// ------------------------------------
export function * getProfileFlow(action) {
  try {
    const params = {
      api: 'USER',
      endpoint: `?publicEmail=${action.payload}`,
      token: true
    };

    const data = yield call(retryAuth, callApi, params);

    yield put(getProfile.success(data[0]));
  } catch (error) {
    yield put(getProfile.failure(error));
  }
}

// ------------------------------------
// Update User Profile Flow
// ------------------------------------
export function * updateProfileFlow(action) {
  try {
    const { profileID, profile: body } = action.payload;

    const params = {
      method: 'PUT',
      api: 'USER',
      endpoint: `/${profileID}`,
      body,
      token: true
    };

    const data = yield call(retryAuth, callApi, params);

    yield put(updateProfile.success(data));
  } catch (error) {
    yield put(updateProfile.failure(error));
  }
}

// ------------------------------------
// Save User Profile Flow
// ------------------------------------
export function * saveProfileFlow(action) {
  try {
    const params = {
      method: 'POST',
      api: 'USER',
      body: action.payload,
      token: true
    };

    const data = yield call(retryAuth, callApi, params);

    yield put(saveProfile.success(data));
  } catch (error) {
    yield put(saveProfile.failure(error));
  }
}

// ------------------------------------
// Login via Email/Password Flow
// ------------------------------------
export function * loginEmailFlow(action) {
  try {
    const { email, password } = action.payload;

    const body = { email, password };

    yield call(getToken, body);
    const token = yield call(getAuthToken);

    yield put(getProfile.request(email));
    yield take(GET_PROFILE_SUCCESS);

    const auth = yield select(getAuth);

    const userAuthData = { email, identityID: auth.userProfile.identityID };

    yield put(loginEmail.success({ userAuthData, token }));
  } catch (error) {
    yield put(loginEmail.failure(error));
  }
}

// ------------------------------------
// Register User Flow
// ------------------------------------
export function * registerUserFlow(action) {
  try {
    const { email, password } = action.payload;

    const body = { email, password };

    const params = { method: 'POST', api: 'AUTH', body };

    const user = yield call(retryAuth, callApi, params);

    yield call(getToken, body);
    const token = yield call(getAuthToken);
    const { _id: identityID } = user;

    const userAuthData = { email, identityID };

    yield put(registerUser.success({ userAuthData, token }));
  } catch (error) {
    const { message, errors } = error;
    yield put(registerUser.failure({ message, errors }));
  }
}

// ------------------------------------
// Register a new facebook user saga
// ------------------------------------
export function * getFBUserToken(body) {
  const params = {
    method: 'POST',
    api: 'AUTH',
    endpoint: '/login/facebook',
    body
  };

  const data = yield call(retryAuth, callApi, params);

  if (data.status >= 300) {
    throw new Error(data.message);
  } else {
    yield window.localStorage.setItem('token', data);
    return data;
  }
}

// ------------------------------------
// Register Facebook User Flow
// ------------------------------------
export function * registerFBUserFlow(action) {
  try {
    const user = action.payload;
    const { facebookInfo } = user;

    const body = { facebookAccessToken: facebookInfo.accessToken };
    const params = { method: 'POST', api: 'AUTH', body };

    const fbUserAuth = yield call(retryAuth, callApi, params);
    const fbUserToken = yield call(getFBUserToken, body);

    const userAuthData = { email: facebookInfo.email, identityID: fbUserAuth._id };

    yield put(registerFBUser.success({ userAuthData, fbUserToken }));
  } catch (error) {
    const { message, errors } = error;
    yield put(registerFBUser.failure({ message, errors }));
  }
}

// ------------------------------------
// Login via Facebook Flow
// ------------------------------------
export function * loginFacebookFlow(action) {
  try {
    const user = action.payload;
    const { facebookInfo } = user;

    const params = { facebookAccessToken: facebookInfo.accessToken };
    const fbUserToken = yield call(getFBUserToken, params);

    yield put(getProfile.request(facebookInfo.email));
    yield take(GET_PROFILE_SUCCESS);

    const auth = yield select(getAuth);

    const fbAuthData = { email: facebookInfo.email, identityID: auth.userProfile.identityID };

    yield put(loginFacebook.success({ fbAuthData, fbUserToken }));
  } catch (error) {
    yield put(loginFacebook.failure(error));
  }
}

// ------------------------------------
// Watch Auth saga
// ------------------------------------
export function * watchAuth() {
  yield takeEvery(REGISTER_USER_REQUESTED, registerUserFlow);
  yield takeEvery(LOGIN_EMAIL_REQUESTED, loginEmailFlow);
  yield takeEvery(SAVE_PROFILE_REQUESTED, saveProfileFlow);
  yield takeEvery(UPDATE_PROFILE_REQUESTED, updateProfileFlow);
  yield takeEvery(GET_PROFILE_REQUESTED, getProfileFlow);
  yield takeEvery(REGISTER_FB_USER_REQUESTED, registerFBUserFlow);
  yield takeEvery(LOGIN_FACEBOOK_REQUESTED, loginFacebookFlow);
  yield takeEvery(FORGOT_PASSWORD_REQUESTED, forgotPasswordFlow);
  yield takeEvery(RESET_PASSWORD_REQUESTED, resetPasswordFlow);
}
