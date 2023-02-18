import { createSlice } from "@reduxjs/toolkit";

const web3Slice = createSlice({
  name: "web3",
  initialState: null,
  reducers: {
    setWeb3State: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setWeb3State } = web3Slice.actions;

export default web3Slice.reducer;
