import { configureStore } from "@reduxjs/toolkit";
// import trailsReducer from "./trailReducer";
import accountReducer from "./accountReducer";

const store = configureStore({
  reducer: {
    // NO LONGER NECESSARY
    // trailsReducer,
    accountReducer,
  },
});
export default store;