import { UPDATE_MY_PROFILE, RESET_MY_PROFILE } from "./action";

// null => not intialized yet
// empty strings => intialized but no data found from db

const initialState = {
  id: null,
  username: null,
  profilepic: null,
  bio: null,
  alias: null,
};

const myProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MY_PROFILE:
      return {
        ...state,
        ...action.payload, // Spread the payload to update multiple fields
      };
    case RESET_MY_PROFILE:
      return initialState;
    default:
      return state;
  }
};

export default myProfileReducer;
