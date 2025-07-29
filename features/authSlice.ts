import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserAuth } from "../helpers/api_helper";
import { Response, User } from "../types/auth";

interface AuthState {
  user: User;
  response: Response;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
}

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
  response: {
    token: "",
    refreshToken: "",
  },
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
    // loginStart: (state) => {
    //   state.isLoading = true;
    // },
    // loginSuccess: (state, action) => {
    //   state.user = action.payload.user;
    //   state.token = action.payload.token;
    //   state.isAuthenticated = true;
    //   state.loading = false;
    //   state.error = null;
    // },
    // loginFailure: (state, action) => {
    //   state.error = action.payload;
    //   state.loading = false;
    // },
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
      //   state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      //   .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
      .addCase(loginUser.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.user = action.payload.user;
        //   state.token = action.payload.token;
        state.isAuthenticated = true;
      })
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
