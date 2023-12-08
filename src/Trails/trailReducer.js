import {createSlice } from "@reduxjs/toolkit";
import db from "./Database"

const initialState = {
  trails: db.trails,
  trail: { name: "New trail", length: 0, description: "Empty"}
  }

const trailsSlice = createSlice({
  name: "trails",
  initialState, 
  reducers: {
    setTrails: (state, action) => {
      state.trails = action.payload;
    },
    setTrail: (state, action) => {
      state.trail = action.payload;
    },
    addTrail: (state, action) => {
      state.trails = [
        {...action.payload, _id: new Date().getTime().toString() },
         ...state.modules,
      ]
    }

  }

})

export const {setTrails, setTrail, addTrail} = trailsSlice.actions;
export default trailsSlice.reducer;