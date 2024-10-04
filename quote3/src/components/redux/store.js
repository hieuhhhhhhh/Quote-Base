import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./reducer";

const store = configureStore({
  reducer: {
    myProfile: profileReducer,
  },
});

export default store;
