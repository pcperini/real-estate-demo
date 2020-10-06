import {
  createStore,
  combineReducers
} from 'redux';
import { loginReducer } from './login';
import { sessionReducer } from './session';
import { listingsReducer } from './listings';
import { shareReducer } from './share';

const store = createStore(combineReducers({
  login: loginReducer,
  session: sessionReducer,
  listings: listingsReducer,
  share: shareReducer
}));

function update(dispatchKey) {
  return function(dispatch, event) {
    dispatch({ type: dispatchKey, value: event.target.value });
  };
}

export default store;
export { update };
