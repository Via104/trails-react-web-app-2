import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      console.log(state.currentUser);
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;