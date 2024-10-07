import { configureStore } from "@reduxjs/toolkit";
import myProfileReducer from "./reducer";

const store = configureStore({
  reducer: {
    myProfile: myProfileReducer,
  },
});

export default store;
