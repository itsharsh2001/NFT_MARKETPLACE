import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  _id: string;
  walletAddress: string;
  userName: string;
  balance: string;
  profilePic: string;
  backgroundPic: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUserState: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserState } = userSlice.actions;

export default userSlice.reducer;
