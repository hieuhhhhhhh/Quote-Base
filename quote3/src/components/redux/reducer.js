import {
  UPDATE_MY_PROFILE,
  RESET_MY_PROFILE,
  UPDATE_USER_ACTIONS,
} from "./action";

// null => not intialized yet
// empty strings => intialized but no data found from db

const myProfileInit = {
  id: null,
  name: null,
  avatar: null,
  bio: null,
  role: null,
};

const myProfileReducer = (state = myProfileInit, action) => {
  switch (action.type) {
    case UPDATE_MY_PROFILE:
      return {
        ...state,
        ...action.payload, // Spread the payload to update multiple fields
      };
    case RESET_MY_PROFILE:
      return myProfileInit;
    default:
      return state;
  }
};

const userActionsInit = {
  isCreatingPost: false,
};

const userActionsReducer = (state = userActionsInit, action) => {
  switch (action.type) {
    case UPDATE_USER_ACTIONS:
      return {
        ...state,
        ...action.payload, // Spread the payload to update multiple fields
      };

    default:
      return state;
  }
};

export { myProfileReducer, userActionsReducer };
