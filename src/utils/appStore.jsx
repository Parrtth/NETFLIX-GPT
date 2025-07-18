import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import your user slice reducer
import movieReducer from "./moviesSlice";
import gptReducer  from  "./gptSlice"
import configReducer from "./configSlice"

const appStore = configureStore({
  reducer: {
    user: userReducer,  
    movies: movieReducer,
    gpt: gptReducer,
    config: configReducer
    
  },
});

export default appStore;