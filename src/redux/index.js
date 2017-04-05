import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import navigator from './navigator';
import panel from './panel';
import auth from './auth';
import register from './register';
import utility from './utility';
import map from './map';
import conversations from './conversations';
import selectedConversation from './selectedConversation';

const logger = createLogger();

const store = createStore(combineReducers({
  navigator,
  panel,
  auth,
  register,
  utility,
  map,
  conversations,
  selectedConversation
}), window.devToolsExtension ? window.devToolsExtension() : f => f,
    process.env.NODE_ENV === 'production'
        ? applyMiddleware(thunk)
        : applyMiddleware(thunk, logger));

export default store;
