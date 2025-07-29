import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUserAuth } from "../helpers/api_helper";
import { AuthState } from "../types/auth";

const initialState: AuthState = {
  user: {
    userId: 0,
    userName: "",
    firstName: "",
    secondName: "",
    idNo: "",
    phoneNo: null,
    email: null,
    address: null,
    userRoleId: 0,
    userRole: "",
    userStatus: false,
    companyDetailId: 0,
    companyName: "",
    clientCode: "",
  },
  token: "",
  refreshToken: "",
  isAuthenticated: false,
  isLoading: false,
  error: "",
};

export const loginUser = createAsyncThunk(
  "/Auth",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await loginUserAuth({ username, password });
      return response;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message || "Login failed");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {
        userId: 0,
        userName: "",
        firstName: "",
        secondName: "",
        idNo: "",
        phoneNo: null,
        email: null,
        address: null,
        userRoleId: 0,
        userRole: "",
        userStatus: false,
        companyDetailId: 0,
        companyName: "",
        clientCode: "",
      };
      state.token = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthState>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.isAuthenticated = true;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  logout,
  //  loginSuccess, loginFailure, logout
} = authSlice.actions;

export default authSlice.reducer;
