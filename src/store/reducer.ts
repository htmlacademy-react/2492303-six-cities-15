import { AddCommentAction, AddFavoriteAction, checkAuthAction, fetchFavoriteAction, fetchOfferAction, fetchOfferCommentsAction, fetchOfferNearAction, fetchOffersAction, loginAction, logoutAction } from './api-actions';
import {createReducer} from '@reduxjs/toolkit';
import {updateCity, insertOffer} from './action';
import { AuthorizationStatus, TCity, TComments, TOffer, TOfferFull } from '../const';
import { cities } from '../mocks/city';

export type InitalState = {
  offers: TOffer[];
  offersNear: TOffer[];
  offer?: TOfferFull;
  city: TCity;
  isOffersLoading: boolean;
  hasError: boolean;
  authorizationStatus: AuthorizationStatus;
  comments?: TComments[];
  favorite?: TOffer[];
}

const initialState: InitalState = {
  offers: [],
  offersNear: [],
  city: cities[0],
  isOffersLoading: false,
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
      state.isOffersLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
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
    })
    .addCase(fetchFavoriteAction.pending, (state, action) => {
      state.favorite = action.payload;
    })
    .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
      state.favorite = action.payload;
    })
    .addCase(AddFavoriteAction.fulfilled, (state) => {
      state.hasError = false;
    });
});