import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  user: { name: string; email: string } | null;
  errorMessage?: string | null;
}

const initialState: AuthState = {
  status: "checking",
  user: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = null;
      state.errorMessage = null;
    },

    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = null;
    },

    onLogout: (state, { payload = null }) => {
      state.status = "not-authenticated";
      state.user = null;
      state.errorMessage = payload || null;
    },

    clearErrorMessages: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessages} = authSlice.actions;
