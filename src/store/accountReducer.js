import { createSlice } from "@reduxjs/toolkit";
import * as client from "../Users/client.js";
const initialState = {
  account: await client.account(),
};

const accountSlice = createSlice({
  name: "account",
  initialState, 
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload;
    },
  },

});

export const {setAccount} = accountSlice.actions;
export default accountSlice.reducer;