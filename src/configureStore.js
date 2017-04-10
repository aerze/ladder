import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './stores';

const enhancers = [applyMiddleware(promiseMiddleware())];

 // Enable Chrome Redux DevTools if browser and BUILD_ENV env variable is explicitly set to 'DEV'
if (typeof (window) === 'object' && process.env.NODE_ENV === 'development') {
  enhancers.push(window.devToolsExtension ? window.devToolsExtension() : f => f);
}

const composedEnhancers = compose(...enhancers);

export default function configureStore() {
  return createStore(rootReducer, composedEnhancers);
}
