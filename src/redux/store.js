import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import userReducer from "./userDuck";
import charsReducer, { getCharactersAction } from "./charsDuck";
import thunk from "redux-thunk";

// First combine all reducers in a rootReducer
const rootReducer = combineReducers({
  user: userReducer,
  chars: charsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  // Get characters for the first time
  getCharactersAction()(store.dispatch, store.getState);
  return store;
}
