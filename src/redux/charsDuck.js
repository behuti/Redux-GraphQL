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
// Reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_CHARACTERS:
    case GET_CHARACTERS_SUCCESS:
      return {
        ...state,
        array: action.payload,
      };
    case GET_CHARACTERS_FAIL:
    default:
      return state;
  }
}

// Actions (thunks)
export const getCharactersAction = () => (dispatch, getState) => {
  return axios.get(URL).then((res) => {
    dispatch({
      type: GET_CHARACTERS_SUCCESS,
      payload: res?.data?.results,
    });
  });
};
