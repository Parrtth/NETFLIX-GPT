import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import your user slice reducer

const appStore = configureStore({
  reducer: {
    user: userReducer,  
  },
});

export default appStore;