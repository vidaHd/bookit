import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string | null;
  familyName?: string | null;
  mobileNumber?: string | null;
  token: string | null;
  profile?: {
    age: number;
    avatar: string;
    description: string;
    gender: string;
  };
}

const initialState: UserState = {
  name: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).name
    : null,
  familyName: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).familyName
    : null,
  mobileNumber: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.familyName = action.payload.familyName;
      state.mobileNumber = action.payload.mobileNumber;
      state.token = action.payload.token;
      state.profile = action.payload.profile;

      action.payload.token &&
        localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.name = null;
      state.familyName = null;
      state.mobileNumber = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
