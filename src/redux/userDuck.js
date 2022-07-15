const initialData = {
  loggedIn: false,
};

// Constants
const LOGIN = "LOGIN";

// Reduces
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, loggedIn: true };
    default:
      return state;
  }
}
// Action (action creator)
