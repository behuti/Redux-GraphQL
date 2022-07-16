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
  localStorage.storage = JSON.stringify(storage);
}

// Action (action creator)
export const restoreSessionAction = () => (dispatch, getState) => {
  let storage = localStorage.getItem('storage')
  storage = JSON.parse(storage)
  if ( storage && storage.user) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage.user
    });
  }
}

export const doGoogleLoginAction = () => (dispatch, getState) => {
  return loginWithGoogle()
    .then((user) => {
      const { uid, displayName, photoURL } = user;
      console.log(user)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid,
          displayName,
          photoURL,
        },
      });
      saveStorage(getState());
    })
    .catch((e) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: e.message,
      });
    });
};
