import { createAction, createSlice } from '@reduxjs/toolkit';
import initialState from 'domain/entities/auth';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
    getTokenPending: (state) => {
      state.isFetchingGetToken = true;
      state.isSuccessGetToken = false;
      state.isErrorGetToken = false;
    },
    getTokenSuccess: (state, { payload }) => {
      state.isAuthenticated = true;
      state.isFetchingGetToken = false;
      state.isSuccessGetToken = true;
      state.isErrorGetToken = false;

      if(payload !== null){
        state.name = payload.name;
        state.lastName = payload.lastName;
        state.isWrongCredentials = false;
        state.isAuthenticated = true;
        sessionStorage.setItem('user', payload);
      } else {
        state.isWrongCredentials = true;
        state.isAuthenticated = false;
      }
      
    },
    getTokenError: (state, { payload } ) => {
      state.isFetchingGetToken = false;
      state.isSuccessGetToken = false;
      state.isWrongCredentials = false;
      state.isErrorGetToken = false;
      state.isAuthenticated = false;
      sessionStorage.removeItem('user');

      if (payload?.code === 404) {
        state.isWrongCredentials = true;
      } else {
        state.isErrorGetToken = true;
      }
    },
    refreshTokenPending: (state) => {
      state.isAuthenticated = true;
      state.isFetchingRefreshToken = true;
      state.isSuccessRefreshToken = false;
      state.isErrorRefreshToken = false;
      state.isAuthenticated = false;
      sessionStorage.removeItem('user');
    },
    refreshToken: (state, { payload }) => {
      state.isAuthenticated = true;
      state.isFetchingGetToken = false;
      state.isSuccessGetToken = true;
      state.isErrorGetToken = false;
      state.name = payload.name;
      state.lastName = payload.lastName;
      state.isWrongCredentials = false;
      state.isAuthenticated = true;
      sessionStorage.setItem('user', payload);
    },
    refreshTokenSuccess: (state) => {
      state.isFetchingRefreshToken = false;
      state.isSuccessRefreshToken = true;
      state.isErrorRefreshToken = false;
    },
    refreshTokenError: (state) => {
      state.isAuthenticated = false;
      state.isFetchingRefreshToken = false;
      state.isSuccessRefreshToken = false;
      state.isErrorRefreshToken = true;
    },
    revokeTokenPending: (state) => {
      state.isAuthenticated = false;
      state.isFetchingRevokeToken = true;
      state.isSuccessRevokeToken = false;
      state.isErrorRevokeToken = false;
    },
    revokeTokenSuccess: (state) => {
      state.isFetchingRevokeToken = false;
      state.isSuccessRevokeToken = true;
      state.isErrorRevokeToken = false;
    },
    revokeTokenError: (state) => {
      state.isFetchingRevokeToken = false;
      state.isSuccessRevokeToken = false;
      state.isErrorRevokeToken = true;
    },
    deleteSession: (state) => {
      state.isAuthenticated = false;
      state.isWrongCredentials = false;
      state.name = '';
      state.lastName = '';
      state.email = '';
      state.authorization = '';
      state.isFetchingGetToken = false;
      state.isSuccessGetToken = false;
      state.isErrorGetToken = false;
      state.isFetchingRefreshToken = false;
      state.isSuccessRefreshToken = false;
      state.isErrorRefreshToken = false;
      state.isFetchingRevokeToken = false;
      state.isSuccessRevokeToken = false;
      state.isErrorRevokeToken = false; 
      sessionStorage.removeItem('user');

    },

  },
});

export default authSlice.reducer;
export const authActions = {
  ...authSlice.actions,
  getToken: createAction('auth/getToken'),
};