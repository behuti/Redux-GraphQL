import axios from "axios";

// Constants
const initialData = {
  fetching: false,
  array: [],
  current: {},
};
const URL = "https://rickandmortyapi.com/api/character";
const GET_CHARACTERS = "GET_CHARACTERS";
const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
const GET_CHARACTERS_FAIL = "GET_CHARACTERS_FAIL";

const REMOVE_CHARACTER = "REMOVE_CHARACTER";

// Reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        fetching: true,
      };
    case GET_CHARACTERS_SUCCESS:
      return {
        ...state,
        array: action.payload,
        fetching: false,
      };
    case GET_CHARACTERS_FAIL:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case REMOVE_CHARACTER:
      return {
        ...state,
        array: action.payload,
      };
    default:
      return state;
  }
}

// Actions (thunks)
export const getCharactersAction = () => (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTERS,
  });
  return axios
    .get(URL)
    .then((res) => {
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: res?.data?.results,
      });
    })
    .catch((e) => {
      dispatch({
        type: GET_CHARACTERS_FAIL,
        payload: e.response.message,
      });
    });
};

export const removeCharacterAction = () => (dispatch, getState) => {
  const { array } = getState().chars;
  array.shift();
  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...array],
  });
};
