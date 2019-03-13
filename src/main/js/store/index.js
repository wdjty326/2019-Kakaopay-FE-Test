import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducer from './reducer';

/**
 * Logging
 * @param {} store
 */
const logger = store => next => (action) => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

// 비동기 통신을 위한 thunk 미들웨어 설정
// logging 설정
const composeMiddleware = applyMiddleware(thunk, logger);
export default createStore(Reducer, composeMiddleware);
