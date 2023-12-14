import { configureStore } from "@reduxjs/toolkit";
import trailsReducer from "./trailReducer";
import accountReducer from "./accountReducer";
const store = configureStore({
  reducer: {
    trailsReducer,
    accountReducer,
  },
});
export default store;