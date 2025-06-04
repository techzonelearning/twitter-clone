import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../global";

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
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.message = action.payload?.message;
      state.error = action.payload?.error;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(emailVerification.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(emailVerification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.message = action.payload?.message;
      state.error = action.payload?.error;
    });
    builder.addCase(emailVerification.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload?.message;
      state.error = action.payload?.error;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(logoutUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = null;
      state.error = null;
    });
  },
});

let { reducer } = auth;

let registerUser = createAsyncThunk(
  "register/auth",
  async (userCredentials, thunkApi) => {
    try {
      let response = await axios.post(`${API}/register`, userCredentials, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);
let emailVerification = createAsyncThunk(
  "emailVarification/auth",
  async (token, thunkApi) => {
    try {
      let response = await axios.post(
        `${API}/emailVerification`,
        { token },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);
let loginUser = createAsyncThunk(
  "loginUser/auth",
  async (userCredentials, thunkApi) => {
    try {
      let response = await axios.post(`${API}/login`, userCredentials, {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);
let logoutUser = createAsyncThunk("logoutUser/auth", async (_, thunkApi) => {
  try {
    let response = await axios.get(`${API}/logout`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
});

export {
  registerUser,
  emailVerification,
  logoutUser,
  loginUser,
  reducer as authReducer,
};
