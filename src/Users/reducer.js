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
      console.log("Current User:" );
      console.log(state.currentUser);
    },
    setViewedUser(state, action) {
      state.viewedUser = action.payload;
      console.log("Viewed User:" );
      console.log(state.viewedUserUser);
    },
  },
});

export const { setCurrentUser,setViewedUser } = userSlice.actions;
export default userSlice.reducer;