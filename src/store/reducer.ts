import {createReducer} from '@reduxjs/toolkit';
import {updateCity, insertOffer} from './action';
import OffersData from '../mocks/offers';
import { City } from '../mocks/city';

const initialState = {
  offers: OffersData,
  city: City
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(insertOffer, (state, action) => {
      state.offers.push(action.payload.offer);
    })
    .addCase(updateCity, (state, action) => {
      state.city.push(action.payload.city);
    });
});
