import React from 'react';
import {render} from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {AppContainer} from 'react-hot-loader';

import {Provider} from 'react-redux';

import Store from './src/redux';
import App from './src/components/App';

import ons from 'onsenui';
import 'onsenui/css/onsenui.css';
import './src/stylus/index.styl';

const rootElement = document.getElementById('root');

injectTapEventPlugin();
ons.ready(() => {
  render(
  <AppContainer>
    <MuiThemeProvider>
      <Provider store={Store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </AppContainer>,
  rootElement
 );
});

if (module.hot) {
  module.hot.accept('./src/components/App', () => {
    const NextApp = require('./src/components/App').default;
    render(
      <AppContainer>
        <MuiThemeProvider>
          <Provider store={Store}>
            <NextApp />
          </Provider>
        </MuiThemeProvider>
      </AppContainer>,
      rootElement
    );
  });
}
