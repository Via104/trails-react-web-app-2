import { createAsyncThunk } from "@reduxjs/toolkit";
import Profile from "../Profile";

export const profileThunk = createAsyncThunk(
    'profile',
    async () => await Profile()
)