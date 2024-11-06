import { configureStore } from "@reduxjs/toolkit";
import { myProfileReducer, userActionsReducer } from "./reducer";

const store = configureStore({
  reducer: {
    myProfile: myProfileReducer,
    userActions: userActionsReducer,
  },
});

export default store;
