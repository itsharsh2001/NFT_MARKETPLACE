import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  _id: string;
  walletAddress: string;
  userName: string;
  balance: string;
}

const initialState: UserState = {
  _id: "",
  walletAddress: "",
  userName: "",
  balance: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setId, setWalletAddress, setUserName, setBalance } =
  userSlice.actions;

export default userSlice.reducer;
