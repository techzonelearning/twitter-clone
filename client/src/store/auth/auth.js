import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  message: null,
};

let auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {},
    registerUser: (state, action) => {
      
    },
  },
});

let { loginUser, registerUser } = auth.actions;
let { reducer } = auth;

export { loginUser, registerUser, reducer as authReducer };
