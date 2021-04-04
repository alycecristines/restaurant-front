import { applyMiddleware, createStore, compose } from 'redux';
import multi from 'redux-multi';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import reducers from '../reducers/index';

const middlewares = [thunk, multi, promise];

const enhancers = compose(applyMiddleware(...middlewares));

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store =
  process.env.NODE_ENV === 'local'
    ? createStore(reducers, devTools, enhancers)
    : createStore(reducers, {}, applyMiddleware(...middlewares));

export default store;
