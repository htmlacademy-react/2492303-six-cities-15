import { createSlice } from '@reduxjs/toolkit';
import {AuthorizationStatus, NameSpace} from '../../const';
import { loginAction, logoutAction, checkAuthAction} from '../api-actions';

export type InitialState = {
  authorizationStatus: AuthorizationStatus;
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.NoAuth
};

export const userProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
