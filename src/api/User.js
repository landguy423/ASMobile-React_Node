import fetch from 'isomorphic-fetch';
import routes from './routes';
import config from '../config';

var HOST = (_ => {
    switch (config.API_HOST) {
        case 'local':
            return 'localhost';
        case 'web':
            return 'kubernetes.baseurl';
        case 'app':
            return 'api.actionsportscommunity.com';
    }
})();
// import apiCall from './index';

// const API_URL = 'http://api.actionsportscommunity.com/v1';

const API_GATEWAY = 'http://localhost:3003/v1';
const API_IDENTITY = 'http://localhost:3100/v1';
const API_PROFILES = 'http://localhost:3002/v1';

export const registerUser = (user) => {
  let userAuth;
  let token;
  let userProfile;

  return fetch(`http://${HOST}:${routes.auth.port}${routes.auth.apiext}`, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    })
    // body: `email=${user.email}&` +
    //       `password=${user.password}`
  })
  .then(response => {
    return response.json();
  })
  .then((userRegResponse) => {
    userAuth = userRegResponse;
    return fetch(`http://${HOST}:${routes.auth.port}${routes.auth.apiext}/login/basic`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      })
      // body: `email=${user.email}&` +
      //       `password=${user.password}`
    });
  })
  .then(response => {
    return response.text();
  })
  .then((tokenResponse) => {
    token = tokenResponse.slice(0, -1).slice(1);
    // console.log('token: ', typeof token, token);

    return fetch(`http://${HOST}:${routes.user.port}${routes.user.apiext}`, {
        method: 'POST',

        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            identityID: userAuth._id,
            //email: user.email,
            culture: user.regInfo ? user.regInfo : '',
        })
        // body: `identityID=${userAuth._id}&` +
        //       `email=${user.email}&` +
        //       `culture=${user.regInfo ? user.regInfo : ''}`
    });
;

  })
  .then(response => {
    return response.json();
  })
  .then((profileCreated) => {
    console.log('~~~~~~~~profileCreated',profileCreated);
    userProfile = profileCreated;
    return ({token, userAuth, userProfile: profileCreated, success: true});
  })
  .catch(error => {
    error.success = false;
    console.log('Error', error);
    throw error;
  });
};

export const registerFBUser = (user) => {
  let userAuth;
  let token;
  let userProfile;
  // console.log('BODY: ', user);

  return fetch(`http://${HOST}:${routes.auth.port}${routes.auth.apiext}`, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({facebookAccessToken: user.facebookAccessToken})
    // body: `facebookAccessToken=${user.facebookAccessToken}`
  })
  .then(response => {
    return response.json();
  })
  .then((userRegResponse) => {
    userAuth = userRegResponse;
    // console.log(777775555, '=================', response);
  })
  .then(() => {
    return fetch(`http://${HOST}:${routes.auth.port}${routes.auth.apiext}/login/facebook`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      // body: `facebookAccessToken=${user.facebookAccessToken}`
      body: JSON.stringify({facebookAccessToken: user.facebookAccessToken})
    });
  })
  .then(response => {
    return response.text();
  })
  .then((tokenResponse) => {
    token = tokenResponse.slice(0, -1).slice(1);
    console.log('token: ', token);
      return fetch(`http://${HOST}:${routes.user.port}${routes.user.apiext}`, {
          method: 'POST',
          headers: {
              // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              // 'Authorization': `Bearer ${token}`
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
              identityID: userAuth._id,
              culture: user.regInfo ? user.regInfo : '',
          })
          // body: `identityID=${userAuth._id}&` +
          //       `culture=${user.regInfo ? user.regInfo : ''}` // TODO: culture -> regInfo
      });
  })
  .then(response => {
    return response.json();
    // return apiCall(`${API_PROFILES}/profiles`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify({
    //     identityID: userAuth._id,
    //     culture: user.regInfo ? user.regInfo : '', // TODO: culture -> regInfo
    //     firstName: user.firstName,
    //     lastName: user.lastName
    //   }),
    //   method: 'POST'
    // });
    // })
  })
  .then((profileCreated) => { // separately save user's email
    console.log(profileCreated);
    userProfile = profileCreated;
    // return apiCall(`${API_IDENTITY}/identities`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify({
    //     email: user.email
    //   }),
    //   method: 'PUT'
    // });
    // resolve({token, userAuth, userProfile, success: true});
    return ({token, userAuth, userProfile, success: true});
  })
  .catch(error => {
    error.success = false;
    console.log('ACHTUNG', error);
    // reject({...error});
    // return ({...error});
    throw error;
  });
    // ///////////////////////////////////////////////////////////////////////////
  // });
};

export const loginFBUser = (fbToken) => {

  return fetch(`http://${HOST}:${routes.auth.port}${routes.auth.apiext}/login/facebook`, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
      body: JSON.stringify({facebookAccessToken: fbToken})
    // body: `facebookAccessToken=${fbToken}`s
  })
  .then(response => {
    return response.text();
  })
  .catch(error => {
    error.success = false;
    console.log('login FB user error\n', error);
    return error;
  });
};

export const editUser = (profileID, token, user) => {
  let body = '';
  // console.log(7777, user);
  // console.log('EDIT USER CALL', JSON.stringify({ ...user }));
  Object.keys(user).forEach((prop) => {
    // console.log(prop, JSON.stringify(user[prop]));
    if (typeof user[prop] === 'string') {
      body += (`${prop}=${user[prop]}&`);
    } else {
      body += (`${prop}=${JSON.stringify(user[prop])}&`);
    }
  });

  return fetch(`http://${HOST}:${routes.user.port}${routes.user.apiext}/${profileID}`, {
    method: 'PUT',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(user)
    // body
  })
  .then((profileCreated) => {
    console.log('EDIT USER RESOLVE', profileCreated);
    return ({ profileCreated, success: true });
  })
  .catch(error => {
    error.success = false;
    console.log('Edit profile error', error);
    throw error;
  });
};
