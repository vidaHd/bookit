import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string | null;
  familyName?: string | null;
  mobileNumber?: string | null;
  token: string | null;
}

const initialState: UserState = {
  name: null,
  familyName: null,
  mobileNumber: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.familyName = action.payload.familyName;
      state.mobileNumber = action.payload.mobileNumber;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.name = null;
      state.familyName = null;
      state.mobileNumber = null;
      state.token = null;
    },
  },
});

export const { setUserName, clearUser } = userSlice.actions;
export default userSlice.reducer;
