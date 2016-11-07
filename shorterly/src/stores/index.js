'use strict';

import {
  createStore, combineReducers,
  compose, applyMiddleware
} from 'redux';
import * as reducers from '../reducers/shorterly';
import thunk from 'redux-thunk';
import { syncHistory, routerReducer, routerMiddleware } from 'react-router-redux';
import { createHistory } from 'history';


export function factory(history, initialState={}) {

  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      applyMiddleware(
        routerMiddleware(history)
      ),
      window.devToolsExtension
        ? window.devToolsExtension()
        : f => f
    ),
  );

  return store
}
