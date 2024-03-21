import { AddCommentAction, checkAuthAction, fetchOfferAction, fetchOfferCommentsAction, fetchOfferNearAction, fetchOffersAction, loginAction, logoutAction } from './api-actions';
import {createReducer} from '@reduxjs/toolkit';
import {updateCity, insertOffer} from './action';
import { AuthorizationStatus, TCity, TComments, TOffer, TOfferId } from '../const';
import { City } from '../mocks/city';

export type InitalState = {
  offers: TOffer[];
  offersNear: TOffer[];
  offer?: TOfferId;
  city: TCity;
  isOfferLoading: boolean;
  hasError: boolean;
  authorizationStatus: AuthorizationStatus;
  comments?: TComments[];
}

const initialState: InitalState = {
  offers: [],
  offersNear: [],
  city: City[0],
  isOfferLoading: false,
  hasError: false,
  authorizationStatus: AuthorizationStatus.NoAuth,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(insertOffer, (state, action) => {
      state.offers.push(action.payload);
    })
    .addCase(updateCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.isOfferLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOfferLoading = false;
    })
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
    })
    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      state.offer = action.payload;
      state.hasError = false;
    })
    .addCase(fetchOfferAction.rejected, (state) => {
      state.hasError = true;
    })
    .addCase(fetchOfferNearAction.fulfilled, (state, action) => {
      state.offersNear = action.payload;
    })
    .addCase(fetchOfferCommentsAction.fulfilled, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(AddCommentAction.fulfilled, (state) => {
      state.hasError = false;
    });
});
