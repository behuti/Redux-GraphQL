import { loginWithGoogle } from "../firebase";

const initialData = {
  loggedIn: false,
  fetching: false,
};

// Constants
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";

// Reduces
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true };
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, loggedIn: true, ...action.payload };
    case LOGIN_FAIL:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
}

// Utils
function saveStorage(storage) {
  localStorage.storage = JSON.stringify(storage)
}

// Action (action creator)
export const doGoogleLoginAction = () => (dispatch, getState) => {
  return loginWithGoogle().then((user) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { ...user },
    });
    saveStorage(getState())
  }).catch(e => {
    dispatch({
      type: LOGIN_FAIL,
      payload: e.message
    })
  });
};
