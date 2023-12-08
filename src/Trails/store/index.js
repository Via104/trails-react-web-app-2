import { configureStore } from "@reduxjs/toolkit";
import trailsReducer from "../trailReducer";
const store = configureStore({
  reducer: {
    trailsReducer,
  },
});
export default store;