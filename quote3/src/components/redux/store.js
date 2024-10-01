import { configureStore } from "@reduxjs/toolkit"; // npm install @reduxjs/toolkit react-redux
import usernameReducer from "./reducer";

const store = configureStore({
  reducer: {
    username: usernameReducer,
  },
});

export default store;
