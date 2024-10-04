import {
  SET_USERNAME,
  SET_PROFILE_PICTURE,
  SET_BIOGRAPHY,
  SET_ALIAS,
  SET_MY_ID,
} from "./action";

// null => not intialized yet
// empty strings => intialized but no data found from db

const initialState = {
  myId: null,
  username: null,
  profilePicture: null,
  biography: null,
  alias: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case SET_PROFILE_PICTURE:
      return {
        ...state,
        profilePicture: action.payload,
      };
    case SET_BIOGRAPHY:
      return {
        ...state,
        biography: action.payload,
      };
    case SET_ALIAS:
      return {
        ...state,
        alias: action.payload,
      };
    case SET_MY_ID:
      return {
        ...state,
        myId: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
