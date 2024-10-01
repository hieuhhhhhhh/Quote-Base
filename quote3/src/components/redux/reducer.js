import { SET_USERNAME, SET_SUBMITOK } from "./action";

const initialState = {
  username: "",
  submitOk: false,
};

const usernameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload, // Updates username
      };
    case SET_SUBMITOK:
      return {
        ...state,
        submitOk: action.payload, // Updates submission of login info
      };
    default:
      return state;
  }
};

export default usernameReducer;
