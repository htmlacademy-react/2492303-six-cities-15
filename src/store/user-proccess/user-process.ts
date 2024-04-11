import { createSlice } from '@reduxjs/toolkit';
import {AuthorizationStatus, NameSpace} from '../../const';
import { loginAction, logoutAction, checkAuthAction} from '../api-actions';
import { UserData } from '../../types/user-data';

export type InitialState = {
  authorizationStatus: AuthorizationStatus;
  user? : UserData;
}

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.NoAuth,
};

export const userProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(checkAuthAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
      });
  }
});
